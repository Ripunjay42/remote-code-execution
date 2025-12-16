'use client'
import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const ComplexityAnalysis = ({ code, setComplexity, isAnalyzing, setIsAnalyzing, setHasErrors, user, setShowAuthMessage}) => {

  const analyzeComplexity = async (code) => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `provide only Time and Space Complexity for the following code nothing else not even single word other than time and space complexity and 
    if code is not complete than dont give any complexity just write  Time_Complexity: 'n/a            ', Space_Complexity: 'n/a          '. 

${code}`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  };

  const handleAnalyzeComplexity = async () => {

    if (!user) {
      setShowAuthMessage(true);
      setTimeout(() => setShowAuthMessage(false), 3000);
      return;
    }
    
    setHasErrors(false);
    setIsAnalyzing(true);
    setComplexity(null);

    try {
      const analysis = await analyzeComplexity(code);
      
      // Extract complexity values - match O(...) patterns completely
      const timeComplexityMatch = analysis.match(/[Tt]ime[^:]*:\s*['"]?\s*(O\([^)]*\)|O\(.*?\)|n\/a|N\/A)/i);
      const spaceComplexityMatch = analysis.match(/[Ss]pace[^:]*:\s*['"]?\s*(O\([^)]*\)|O\(.*?\)|n\/a|N\/A)/i);
      
      // Clean up the extracted values
      const cleanValue = (value) => {
        if (!value) return 'N/A';
        // Remove quotes and extra whitespace
        return value.replace(/['`"]/g, '').trim() || 'N/A';
      };
      
      const complexityObject = {
        Time_Complexity: cleanValue(timeComplexityMatch?.[1]),
        Space_Complexity: cleanValue(spaceComplexityMatch?.[1])
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
    <div>
      <button
        onClick={handleAnalyzeComplexity}
        disabled={isAnalyzing}
        className={`px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded transition ${
          isAnalyzing ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
        }`}
      >
        {isAnalyzing ? 'Analyzing...' : 'Analyze Complexity'}
      </button>
      {isAnalyzing && (
        <div className="ml-2 inline-block">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplexityAnalysis;