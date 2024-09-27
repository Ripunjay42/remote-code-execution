'use client';

import { useState } from 'react';

export default function ComplexityAnalysis({ code, setComplexity, isAnalyzing, setIsAnalyzing }) {
  const handleAnalyzeComplexity = async () => {
    setIsAnalyzing(true);
    setComplexity(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze code complexity');
      }

      const result = await response.json();
      setComplexity(result.complexity);
    } catch (error) {
      console.error('Error analyzing code complexity:', error);
      setComplexity('Error: Unable to analyze code complexity');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleAnalyzeComplexity}
        disabled={isAnalyzing}
        className={`px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded ${
          isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isAnalyzing ? 'Analyzing...' : 'Analyze Complexity'}
      </button>
      {isAnalyzing && (
        <div className="ml-2 inline-block">
          <div className="w-4 h-4 border-t-2 border-r-2 border-blue-700 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}