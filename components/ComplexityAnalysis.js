'use client'
import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const ComplexityAnalysis = ({ code, setComplexity, isAnalyzing, setIsAnalyzing, setHasErrors}) => {

  const analyzeComplexity = async (code) => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `provide only Time and Space Complexity for the following code nothing else not even single word other than time and space complexity:

${code}`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  };

  const handleAnalyzeComplexity = async () => {
    setHasErrors(false);
    setIsAnalyzing(true);
    setComplexity(null);

    try {
      const analysis = await analyzeComplexity(code);
      // Remove backticks and split into separate lines
      const cleanedAnalysis = analysis.replace(/[`*]/g, '').split('\n').filter(Boolean);
      
      // Format the complexity as an object
      const complexityObject = {
        Time_Complexity: cleanedAnalysis.find(line => line.toLowerCase().includes('time'))?.split(':')[1]?.trim() || 'N/A',
        Space_Complexity: cleanedAnalysis.find(line => line.toLowerCase().includes('space'))?.split(':')[1]?.trim() || 'N/A'
      };
      
      setComplexity(complexityObject);
    } catch (error) {
      console.error('Error analyzing code complexity:', error);
      setComplexity('Error: Unable to analyze code complexity');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="">
      <button
        onClick={handleAnalyzeComplexity}
        disabled={isAnalyzing}
        className={`px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded ${
          isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isAnalyzing ? 'Analyzing Complexity...' : 'Analyze Complexity'}
      </button>
      {isAnalyzing && (
        <div className="ml-2 inline-block">
          {/* Loader Animation */}
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-700 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-700 rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-blue-700 rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplexityAnalysis;


// 'use client';

// import { useState } from 'react';

// export default function ComplexityAnalysis({ code, setComplexity, isAnalyzing, setIsAnalyzing }) {
//   const handleAnalyzeComplexity = async () => {
//     setIsAnalyzing(true);
//     setComplexity(null);

//     try {
//       const response = await fetch('/api/analyze', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ code }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to analyze code complexity');
//       }

//       const result = await response.json();
//       setComplexity(result.complexity);
//     } catch (error) {
//       console.error('Error analyzing code complexity:', error);
//       setComplexity('Error: Unable to analyze code complexity');
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   return (
//     <div>
//       <button
//         onClick={handleAnalyzeComplexity}
//         disabled={isAnalyzing}
//         className={`px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded ${
//           isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''
//         }`}
//       >
//         {isAnalyzing ? 'Analyzing...' : 'Analyze Complexity'}
//       </button>
//       {isAnalyzing && (
//         <div className="ml-2 inline-block">
//           <div className="w-4 h-4 border-t-2 border-r-2 border-blue-700 rounded-full animate-spin"></div>
//         </div>
//       )}
//     </div>
//   );
// }