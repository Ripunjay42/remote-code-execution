import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const AceEditor = dynamic(
  async () => {
    const ace = await import('react-ace');
    await import('ace-builds/src-noconflict/mode-c_cpp');
    await import('ace-builds/src-noconflict/theme-monokai');
    return ace;
  },
  { ssr: false }
);

export default function CodeEditor({ code, onChange }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="custom-ace-editor">
    <style jsx global>{`
      .custom-ace-editor .ace_scrollbar::-webkit-scrollbar {
        width: 5px;
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
      mode="c_cpp"
      theme="monokai"
      onChange={onChange}
      value={code}
      name="code-editor"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 6,
      }}
      style={{ width: '100%', height: '600px', padding: '10px' }}
    />
  </div>
  );
}