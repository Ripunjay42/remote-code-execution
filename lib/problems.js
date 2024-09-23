export const problems = [
  {
    id: "twoSum",
    title: "Two Sum",
    difficulty: "Easy",
    problemStatement: `
    <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, 
    return the indices of the two numbers such that they add up to <code>target</code>.</p>
    <p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p><br><br>
    <p>You can return the answer in any order.</p><br><br>
    
    <h3>Example 1:</h3>
    <pre>
    Input: nums = {2,7,11,15}, target = 9
    Output: {0,1}
    Explanation: Because nums[0] + nums[1] == 9, we return {0, 1}.
    </pre>

    <h3>Example 2:</h3>
    <pre>
    Input: nums = {3,2,4}, target = 6
    Output: {1,2}
    </pre>

    <h3>Example 3:</h3>
    <pre>
    Input: nums = {3,3}, target = 6
    Output: {0,1}
    </pre><br><br>

    <h3>Constraints:</h3>
    <ul>
      <li>2 <= nums.length <= 10^4</li>
      <li>-10^9 <= nums[i] <= 10^9</li>
      <li>-10^9 <= target <= 10^9</li><br>
      <li>Only one valid answer exists.</li>
    </ul>
  `,
    starterCode: `#include<bits/stdc++.h>
using namespace std;

class Solution {
  public:
      vector<int> twoSum(vector<int>& nums, int target) {
          // Write your code here
      }
};`,
testCases: [
  { 
    input: `nums = {2,7,11,15}, target = 9`,
    expectedOutput: "{0,1} | {1,0}"
  },
  { 
    input: `nums = {3,2,4}, target = 6`,
    expectedOutput: "{1,2} | {2,1}"
  },
  { 
    input: `nums = {3,3}, target = 6`,
    expectedOutput: "{0,1} | {1,0}"
  },
],
    mainFunction: `
      int main() {
        Solution solution;
        vector<int> nums = {INPUT_VALUES};
        int target = TARGET_VALUE;
        vector<int> result = solution.twoSum(nums, target);
        cout << "{" << result[0] << "," << result[1] << "}" << endl;
        return 0;
      }
    `,
  },
  {
    id: "validParentheses",
    title: "Valid Parentheses",
    difficulty: "Medium",
    problemStatement: `
      <p>Given a string <code>s</code> containing just the characters '(', ')', '{', '}', '[' and ']', 
      determine if the input string is valid.</p>
      <p>An input string is valid if:</p>
      <ul>
        <li>Open brackets must be closed by the same type of brackets.</li>
        <li>Open brackets must be closed in the correct order.</li>
        <li>Every close bracket has a corresponding open bracket of the same type.</li>
      </ul><br><br>
      
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
      </pre><br><br>

      <h3>Constraints:</h3>
      <ul>
        <li>1 <= s.length <= 10<sup>4</sup></li>
        <li><code>s</code> consists of parentheses only: '()[]{}'.</li>
      </ul>
    `,
    starterCode: `#include<bits/stdc++.h>
using namespace std;

class Solution {
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
      int main() {
        Solution solution;
        string s = "INPUT_STRING";
        bool result = solution.isValid(s);
        cout << (result ? "true" : "false") << endl;
        return 0;
      }
    `,
  },
  {
    id: "addBinary",
    title: "Add Binary",
    difficulty: "Easy",
    problemStatement: `
      <p>Given two binary strings <code>a</code> and <code>b</code>, return their sum as a binary string.</p><br><br>
      
      <h3>Example 1:</h3>
      <pre>
      Input: a = "11", b = "1"
      Output: "100"
      </pre>

      <h3>Example 2:</h3>
      <pre>
      Input: a = "1010", b = "1011"
      Output: "10101"
      </pre><br><br>

      <h3>Constraints:</h3>
      <ul>
        <li>1 <= a.length, b.length <= 10<sup>4</sup></li>
        <li><code>a</code> and <code>b</code> consist only of '0' or '1' characters.</li>
        <li>Each string does not contain leading zeros except for the zero itself.</li>
      </ul>
    `,
    starterCode: `#include<bits/stdc++.h>
using namespace std;

class Solution {
  public:
      string addBinary(string a, string b) {
          // Write your code here
      }
};`,
    testCases: [
      { input: `a = "11", b = "1"`, expectedOutput: '100' },
      { input: `a = "1010", b = "1011"`, expectedOutput: '10101' },
    ],
    mainFunction: `
      int main() {
        Solution solution;
        string a = "A_VALUE";
        string b = "B_VALUE";
        string result = solution.addBinary(a, b);
        cout << result <<  endl;
        return 0;
      }
    `,
  },
  
  {
    id: "medianOfTwoSortedArrays",
    title: "Median Sorted Arrays",
    difficulty: "Hard",
    problemStatement: `
      <p>Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size <code>m</code> and <code>n</code> respectively, 
      return <strong>the median</strong> of the two sorted arrays.</p>
      <p>The overall run time complexity should be <code>O(log (m+n))</code>.</p><br><br>
      
      <h3>Example 1:</h3>
      <pre>
      Input: nums1 = [1,3], nums2 = [2]
      Output: 2.00000
      Explanation: merged array = [1,2,3] and median is 2.
      </pre>

      <h3>Example 2:</h3>
      <pre>
      Input: nums1 = [1,2], nums2 = [3,4]
      Output: 2.50000
      Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
      </pre><br><br>

      <h3>Constraints:</h3>
      <ul>
        <li><code>nums1.length == m</code></li>
        <li><code>nums2.length == n</code></li>
        <li><code>0 <= m <= 1000</code></li>
        <li><code>0 <= n <= 1000</code></li>
        <li><code>1 <= m + n <= 2000</code></li>
        <li><code>-10^6 <= nums1[i], nums2[i] <= 10^6</code></li>
      </ul>
    `,
    starterCode: `#include<bits/stdc++.h>
using namespace std;

class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // Write your code here
    }
};`,
    testCases: [
      { 
        input: `nums1 = {1,3}, nums2 = {2}`,
        expectedOutput: "2.00000"
      },
      { 
        input: `nums1 = {1,2}, nums2 = {3,4}`,
        expectedOutput: "2.50000"
      },
    ],
    mainFunction: `
      int main() {
        Solution solution;
        vector<int> nums1 = {NUMS1_VALUES};
        vector<int> nums2 = {NUMS2_VALUES};
        double result = solution.findMedianSortedArrays(nums1, nums2);
        cout << fixed << setprecision(5) << result << endl;
        return 0;
      }
    `,
  },

  {
    id: "reverseInteger",
    title: "Reverse Integer",
    difficulty: "Medium",
    problemStatement: `
      <p>Given a signed 32-bit integer <code>x</code>, return <code>x</code> <em>with its digits reversed</em>. 
      If reversing <code>x</code> causes the value to go outside the signed 32-bit integer range <code>[-2<sup>31</sup>, 2<sup>31</sup> - 1]</code>, then return <code>0</code>.</p>
      <p><strong>Assume the environment does not allow you to store 64-bit integers (signed or unsigned).</strong></p><br><br>

      <h3>Example 1:</h3>
      <pre>
      Input: x = 123
      Output: 321
      </pre>

      <h3>Example 2:</h3>
      <pre>
      Input: x = -123
      Output: -321
      </pre>

      <h3>Example 3:</h3>
      <pre>
      Input: x = 120
      Output: 21
      </pre><br><br>

      <h3>Constraints:</h3>
      <ul>
        <li><code>-2<sup>31</sup> <= x <= 2<sup>31</sup> - 1</code></li>
      </ul>
    `,
    starterCode: `#include<bits/stdc++.h>
using namespace std;

class Solution {
public:
    int reverse(int x) {
        // Write your code here
    }
};`,
    testCases: [
      { input: `x = 123`, expectedOutput: "321" },
      { input: `x = -123`, expectedOutput: "-321" },
      { input: `x = 120`, expectedOutput: "21" },
    ],
    mainFunction: `
      int main() {
        Solution solution;
        int x = INPUT_VALUE;
        int result = solution.reverse(x);
        cout << result << endl;
        return 0;
      }
    `,
  },

];
