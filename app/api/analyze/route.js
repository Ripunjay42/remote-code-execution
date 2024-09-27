import { NextResponse } from 'next/server';
import axios from 'axios';

// const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models/bigcode/starcoder';

// Enhanced rule-based analyzer for C++ with <bits/stdc++.h> and using namespace std;
function analyzeComplexity(code) {
  let timeComplexity = 'O(1)';
  let spaceComplexity = 'O(1)';

  // Count loops

  // Analyze STL and algorithms in <bits/stdc++.h>
  if (code.includes('#include<bits/stdc++.h>')) {
    // Using direct function calls since 'using namespace std;' is assumed
    if (code.includes('sort')) {
      timeComplexity = 'O(n log n)'; // Average case for sorting
    }
    if (code.includes('reverse')) {
      timeComplexity = 'O(n)'; // Linear time for reversing
    }
    if (code.includes('find')) {
      timeComplexity = 'O(n)'; // Linear search time
    }
    if (code.includes('binary_search')) {
      timeComplexity = 'O(log n)'; // Binary search time
    }
    if (code.includes('push_back') || code.includes('emplace_back')) {
      spaceComplexity = 'O(n)'; // Space for vector elements
    }
    if (code.includes('map') || code.includes('unordered_map')) {
      if(!code.includes('(map') && !code.includes('(unordered_map'))
        {
          spaceComplexity = 'O(n)';
        }
    }
    if (code.includes('set') || code.includes('unordered_set')) {
      if(!code.includes('(set') && !code.includes('(unordered_set'))
        {
          spaceComplexity = 'O(n)';
        }
    }
    if (code.includes('queue')) {
      if(!code.includes('(queue'))
      {
        spaceComplexity = 'O(n)'; // Space for queue elements
      }
    }
    if (code.includes('stack')) {
      if(!code.includes('(stack'))
        {
          spaceComplexity = 'O(n)'; // Space for queue elements
        }
    }

    // Additional STL Algorithms
    if (code.includes('accumulate')) {
      timeComplexity = 'O(n)'; // Linear time for summation
    }
    if (code.includes('transform')) {
      timeComplexity = 'O(n)'; // Linear time for transformations
    }
    if (code.includes('copy')) {
      timeComplexity = 'O(n)'; // Linear time for copying
    }
    if (code.includes('unique')) {
      timeComplexity = 'O(n)'; // Linear time to remove duplicates
    }
    if (code.includes('merge')) {
      timeComplexity = 'O(n log n)'; // Merging two sorted ranges
    }
    if (code.includes('partial_sort')) {
      timeComplexity = 'O(n log k)'; // Partially sorting
    }
    if (code.includes('nth_element')) {
      timeComplexity = 'O(n)'; // Finding the nth element
    }

    // Handling other structures
    if (code.includes('vector')) {
      if(!code.includes('(vector'))
      {
        spaceComplexity = 'O(n)';
      }
    }
    if (code.includes('list')) {
      spaceComplexity = 'O(n)'; // Space for list elements
    }
    if (code.includes('deque')) {
      spaceComplexity = 'O(n)'; // Space for deque elements
    }
    if (code.includes('array')) {
      spaceComplexity = 'O(n)'; // Space for fixed-size arrays
    }

    // Check for dynamic memory allocation
    if (code.includes('new') || code.includes('malloc')) {
      spaceComplexity = 'O(n)'; // Space for dynamically allocated memory
    }
  }


  const forLoops = (code.match(/for\s*\(/g) || []).length;
  const whileLoops = (code.match(/while\s*\(/g) || []).length;
  const doWhileLoops = (code.match(/do\s*\{/g) || []).length;

  const totalLoops = forLoops + whileLoops + doWhileLoops;

 if (totalLoops === 1) {
    timeComplexity = 'O(n)'; // Single loop contributes to linear time
  }else  if (code.includes('sort')) {
    timeComplexity = 'O(n log n)'; // Average case for sorting
  }else  if (totalLoops > 1) {
    timeComplexity = `O(n^${totalLoops})`; // Nested loops contribute to polynomial time
  } 

  // Check for recursion
  const functionMatches = code.match(/(\w+)\s*\(.*\)\s*{/g);
  if (functionMatches) {
    const functionName = functionMatches[0].split(' ')[0];
    if (code.includes(functionName + '(')) {
      timeComplexity = 'O(2^n)'; // Exponential time for recursive functions
      spaceComplexity = 'O(n)';  // Linear space for call stack
    }
  }


  return { timeComplexity, spaceComplexity };
}

export async function POST(request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    // First, use the rule-based analyzer
    const { timeComplexity, spaceComplexity } = analyzeComplexity(code);

    // Then, use the language model for additional insights
//     const prompt = `Analyze the following code for its time and space complexity. If the complexities are different from ${timeComplexity} and ${spaceComplexity}, provide only the correct complexities without explanation. Format your response exactly like this: Time Complexity: O(...), Space Complexity: O(...)

// Code:
// ${code}

// Time Complexity: ${timeComplexity}
// Space Complexity: ${spaceComplexity}

// Your analysis:`;

//     const response = await axios.post(
//       HUGGINGFACE_API_URL,
//       { inputs: prompt },
//       {
//         headers: {
//           'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

    let analysisResult = `Time Complexity: ${timeComplexity}   Space Complexity: ${spaceComplexity}`;

    return NextResponse.json({ complexity: analysisResult });
  } catch (error) {
    console.error('Error analyzing code complexity:', error.response ? error.response.data : error.message);
    return NextResponse.json({ error: 'Error analyzing code complexity. Please try again later.' }, { status: 500 });
  }
}
