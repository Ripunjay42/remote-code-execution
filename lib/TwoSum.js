import assert from "assert";

// C++ starter code for Two Sum
const starterCodeTwoSum = `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your code here
        return {}; // Placeholder
    }
};`;

// Handler to test the user's submitted code
const handlerTwoSum = async (code) => {
    const testCases = [
        { input: `vector<int> nums = {2, 7, 11, 15}; int target = 9;`, expectedOutput: "[0, 1]" },
        { input: `vector<int> nums = {3, 2, 4}; int target = 6;`, expectedOutput: "[1, 2]" },
        { input: `vector<int> nums = {3, 3}; int target = 6;`, expectedOutput: "[0, 1]" },
    ];

    for (const testCase of testCases) {
        const fullCode = `
            #include <iostream>
            ${code}

            int main() {
                Solution solution;
                ${testCase.input}
                vector<int> result = solution.twoSum(nums, target);
                cout << "[" << result[0] << "," << result[1] << "]" << endl;
                return 0;
            }
        `;
        
        const result = await compileCppCode(fullCode); // Function to handle C++ execution

        assert.strictEqual(result.trim(), testCase.expectedOutput, `Test failed for input: ${testCase.input}`);
    }
};

export const twoSum = {
    id: "two-sum",
    title: "Two Sum",
    problemStatement: `
        <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, 
        return the indices of the two numbers such that they add up to <code>target</code>.</p>`,
    examples: [
        { id: 1, inputText: "nums = [2,7,11,15], target = 9", outputText: "[0,1]" },
        { id: 2, inputText: "nums = [3,2,4], target = 6", outputText: "[1,2]" }
    ],
    constraints: `<li>2 ≤ nums.length ≤ 10^4</li><li>-10^9 ≤ nums[i] ≤ 10^9</li>`,
    handlerFunction: handlerTwoSum,
    starterCode: starterCodeTwoSum,
};
