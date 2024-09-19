export const problems = [
  {
    id: "twoSum",
    title: "Two Sum",
    difficulty: "Easy",
    problemStatement: `
    <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, 
    return the indices of the two numbers such that they add up to <code>target</code>.</p>
    <p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
    <p>You can return the answer in any order.</p>
    
    <h3>Example 1:</h3>
    <pre>
    Input: nums = [2,7,11,15], target = 9
    Output: [0,1]
    Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
    </pre>

    <h3>Example 2:</h3>
    <pre>
    Input: nums = [3,2,4], target = 6
    Output: [1,2]
    </pre>

    <h3>Example 3:</h3>
    <pre>
    Input: nums = [3,3], target = 6
    Output: [0,1]
    </pre>

    <h3>Constraints:</h3>
    <ul>
      <li>2 <= nums.length <= 10^4</li>
      <li>-10^9 <= nums[i] <= 10^9</li>
      <li>-10^9 <= target <= 10^9</li>
      <li>Only one valid answer exists.</li>
    </ul>
  `,
    starterCode: `class Solution {
      public:
          vector<int> twoSum(vector<int>& nums, int target) {
              // Write your code here
          }
    };`,
    testCases: [
      { input: `nums = [2,7,11,15], target = 9`, expectedOutput: "[0,1]" },
      { input: `nums = [3,2,4], target = 6`, expectedOutput: "[1,2]" },
      { input: `nums = [3,3], target = 6`, expectedOutput: "[0,1]" },
    ],
    mainFunction: `
      #include <iostream>
      #include <vector>
      using namespace std;

      int main() {
        Solution solution;
        vector<int> nums = {INPUT_VALUES};
        int target = TARGET_VALUE;
        vector<int> result = solution.twoSum(nums, target);
        cout << "[" << result[0] << "," << result[1] << "]" << endl;
        return 0;
      }
    `,
  },
  {
    id: "validParentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    problemStatement: `
      <p>Given a string <code>s</code> containing just the characters '(', ')', '{', '}', '[' and ']', 
      determine if the input string is valid.</p>
      <p>An input string is valid if:</p>
      <ul>
        <li>Open brackets must be closed by the same type of brackets.</li>
        <li>Open brackets must be closed in the correct order.</li>
        <li>Every close bracket has a corresponding open bracket of the same type.</li>
      </ul>
      
      <h3>Example 1:</h3>
      <pre>
      Input: s = "()"
      Output: true
      </pre>

      <h3>Example 2:</h3>
      <pre>
      Input: s = "()[]{}"
      Output: true
      </pre>

      <h3>Example 3:</h3>
      <pre>
      Input: s = "(]"
      Output: false
      </pre>

      <h3>Example 4:</h3>
      <pre>
      Input: s = "([])"
      Output: true
      </pre>

      <h3>Constraints:</h3>
      <ul>
        <li>1 <= s.length <= 10<sup>4</sup></li>
        <li><code>s</code> consists of parentheses only: '()[]{}'.</li>
      </ul>
    `,
    starterCode: `class Solution {
      public:
          bool isValid(string s) {
              // Write your code here
          }
    };`,
    testCases: [
      { input: `s = "()"`, expectedOutput: "true" },
      { input: `s = "()[]{}"`, expectedOutput: "true" },
      { input: `s = "(]"`, expectedOutput: "false" },
      { input: `s = "([])"`, expectedOutput: "true" },
    ],
    mainFunction: `
      #include <iostream>
      #include <string>
      using namespace std;

      int main() {
        Solution solution;
        string s = "INPUT_STRING";
        bool result = solution.isValid(s);
        cout << (result ? "true" : "false") << endl;
        return 0;
      }
    `,
  },
  // Add more problems as needed
];
