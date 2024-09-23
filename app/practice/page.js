'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Topbar from '@/components/Topbar';

const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com';

// Store all API keys in an array for rotation
const apiKeys = [
  process.env.NEXT_PUBLIC_JUDGE0_API_KEY_5,
  process.env.NEXT_PUBLIC_JUDGE0_API_KEY_3,
  process.env.NEXT_PUBLIC_JUDGE0_API_KEY_2,
  process.env.NEXT_PUBLIC_JUDGE0_API_KEY_1,
  process.env.NEXT_PUBLIC_JUDGE0_API_KEY_4,
];

const AceEditor = dynamic(
  async () => {
    const ace = await import('react-ace');
    await import('ace-builds/src-noconflict/mode-c_cpp');
    await import('ace-builds/src-noconflict/mode-java');
    await import('ace-builds/src-noconflict/mode-python');
    await import('ace-builds/src-noconflict/mode-javascript');
    await import('ace-builds/src-noconflict/theme-monokai');
    return ace;
  },
  { ssr: false }
);

const languageOptions = [
  { label: 'C++', value: '54', mode: 'c_cpp', boilerplate: 
`#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}` },
  { label: 'Java', value: '62', mode: 'java', boilerplate: 
`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}` },
  { label: 'Py', value: '71', mode: 'python', boilerplate: 
`def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()` },
  { label: 'JS', value: '63', mode: 'javascript', boilerplate: 
`function main() {
    console.log("Hello, World!");
}

main();` },
];

export default function CodeEditorPage() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [compilationError, setCompilationError] = useState(null);
  const [language, setLanguage] = useState(languageOptions[0]); // Default to C++
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');
  const [currentApiKey, setCurrentApiKey] = useState(apiKeys[0]);
  const apiKeyIndex = useRef(0);

  useEffect(() => {
    setMounted(true);
    // Set default language and boilerplate code
    setLanguage(languageOptions[0]); // C++
    setCode(languageOptions[0].boilerplate); // C++ boilerplate
  }, []);

  useEffect(() => {
    const rotateKey = () => {
      apiKeyIndex.current = (apiKeyIndex.current + 1) % apiKeys.length;
      setCurrentApiKey(apiKeys[apiKeyIndex.current]);
    };

    const intervalId = setInterval(rotateKey, 600000); // Rotate every 10 mins (600000 ms)
    
    return () => clearInterval(intervalId);
  }, []);

  const handleLanguageChange = (event) => {
    const selectedLang = languageOptions.find(lang => lang.value === event.target.value);
    setLanguage(selectedLang);
    setCode(selectedLang.boilerplate); // Update to the selected language's boilerplate
    setCompilationError(null);
    setOutput(null);
  };

  const decodeBase64 = (str) => {
    try {
      return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    } catch (e) {
      console.error('Decoding error:', e);
      return atob(str); // Fallback to simple atob if decodeURIComponent fails
    }
  };

  const handleCompile = async () => {
    const trimmedCode = code.trim();
    if (trimmedCode === '') {
      setOutput('Please enter code to compile.');
      return;
    }
  
    setLoading(true);
    setCompilationError(null);
    setOutput('');
    setDebugInfo('');
  
    try {
      setDebugInfo(prevInfo => prevInfo + 'Submitting code...\n');
      
      const useBase64 = ['54', '62'].includes(language.value); // C++ and Java
      const apiUrl = `${JUDGE0_API_URL}/submissions${useBase64 ? '?base64_encoded=true' : ''}`;
      
      const submissionResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': currentApiKey,
        },
        body: JSON.stringify({
          source_code: useBase64 ? btoa(unescape(encodeURIComponent(trimmedCode))) : trimmedCode,
          language_id: language.value,
          stdin: '',
        }),
      });
  
      const submissionResult = await submissionResponse.json();
      setDebugInfo(prevInfo => prevInfo + `Submission response: ${JSON.stringify(submissionResult)}\n`);
      
      if (!submissionResponse.ok) throw new Error(`Failed to submit code: ${submissionResponse.statusText}`);
  
      const { token } = submissionResult;
  
      let outputResult;
      const maxAttempts = 10;
      let attempts = 0;
  
      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000));
  
        setDebugInfo(prevInfo => prevInfo + `Fetching output (attempt ${attempts + 1})...\n`);
        const outputResponse = await fetch(`${JUDGE0_API_URL}/submissions/${token}${useBase64 ? '?base64_encoded=true' : ''}`, {
          headers: {
            'X-RapidAPI-Key': currentApiKey,
          },
        });
  
        outputResult = await outputResponse.json();
        setDebugInfo(prevInfo => prevInfo + `Output response: ${JSON.stringify(outputResult)}\n`);
        
        if (!outputResponse.ok) {
          throw new Error(`Failed to get output: ${outputResponse.statusText}`);
        }
  
        if (outputResult.status.id !== 1 && outputResult.status.id !== 2) {
          break;
        }
        attempts++;
      }
  
      if (attempts === maxAttempts) {
        throw new Error('Polling timeout: Result not ready after multiple attempts');
      }
  
      const decodeOutput = (output) => useBase64 ? decodeBase64(output) : output;
  
      if (outputResult.status.id === 6) {
        setCompilationError(formatError(decodeOutput(outputResult.compile_output)));
      } else if (outputResult.status.id === 5) {
        setOutput('Runtime Error: ' + (decodeOutput(outputResult.stderr) || 'No additional error information'));
      } else {
        setOutput(decodeOutput(outputResult.stdout) || decodeOutput(outputResult.stderr) || 'No output');
      }
    } catch (error) {
      console.error('Error compiling code:', error);
      setOutput('Error compiling code: ' + error.message);
      setDebugInfo(prevInfo => prevInfo + `Error: ${error.message}\n`);
    } finally {
      setLoading(false);
    }
  };
  
  const formatError = (errorOutput) => {
    return errorOutput.split('\n').map(line => {
      if (line.includes('error:')) {
        return `Error: ${line}`;
      }
      return line;
    }).join('\n');
  };

  if (!mounted) return null;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen relative px-4">
      <div className="max-w-7xl mx-auto">
        <Topbar />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <div className='mt-4'>
            <label htmlFor="language" className="mr-2 text-violet-300 font-bold text-md">Language:</label>
            <select
              id="language"
              value={language.value}
              onChange={handleLanguageChange}
              className="bg-gray-900 text-white px-2 py-1 border border-white text-xs font-bold rounded"
            >
              {languageOptions.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center mt-4">
          <button
            onClick={handleCompile}
            disabled={loading}
            className="bg-violet-600 hover:bg-violet-900 text-white text-xs font-bold py-1 px-4 rounded"
          >
            {loading ? 'Compiling...' : 'Run Code'}
          </button>
          {loading && (
                <div className="ml-2">
                  <div className="w-4 h-4 border-t-2 border-r-2 border-red-500 rounded-full animate-spin"></div>
                </div>
              )}
          </div>
        </div>
        
        <div className="custom-ace-editor">
        <style jsx global>{`
      .custom-ace-editor .ace_scrollbar::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      .custom-ace-editor .ace_scrollbar::-webkit-scrollbar-track {
        background: #1a1a1a;
      }
      .custom-ace-editor .ace_scrollbar::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
      }
      .custom-ace-editor .ace_scrollbar::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
      `}</style>
        <AceEditor
          mode={language.mode}
          theme="monokai"
          onChange={setCode}
          value={code}
          name="code-editor"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 4,
          }}
          style={{ width: '100%', height: '400px', padding: '10px' }}
        />
        </div>

        <div className="mt-8">
          {compilationError && (
            <div className="mb-4 p-4 border border-red-500 rounded bg-gray-900 text-white text-sm">
              <p className="font-bold text-red-300">Compilation Error:</p>
              <pre className="whitespace-pre-wrap text-red-400">{compilationError}</pre>
            </div>
          )}
          <h2 className="text-lg font-bold mb-2 text-white">Output:</h2>
          <pre className="bg-gray-800 p-4 rounded h-48 overflow-auto custom-scrollbar text-white">{output || 'No output yet'}
          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
              height: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #1a1a1a;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #888;
              border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #555;
            }
          `}</style>
          </pre>
        </div>
      </div>
    </div>
  );
}
