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
        <li>1 <= a.length, b.length <= 10<sup>4</sup></li><br>
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

  {
    id: "palindromeNumber",
    title: "Palindrome Number",
    difficulty: "Easy",
    problemStatement: `
      <p>Given an integer <code>x</code>, return <code>true</code> if <code>x</code> is a 
      <strong>palindrome</strong>, and <code>false</code> otherwise.</p><br><br>
      
      <h3>Example 1:</h3>
      <pre>
      Input: x = 121
      Output: true
      Explanation: 121 reads as 121 from left to right 
      and from right to left.
      </pre>

      <h3>Example 2:</h3>
      <pre>
      Input: x = -121
      Output: false
      Explanation: From left to right, it reads -121. 
      From right to left, it becomes 121-. 
      Therefore it is not a palindrome.
      </pre>

      <h3>Example 3:</h3>
      <pre>
      Input: x = 10
      Output: false
      Explanation: Reads 01 from right to left. 
      Therefore it is not a palindrome.
      </pre><br><br>

      <h3>Constraints:</h3>
      <ul>
        <li>-2<sup>31</sup> <= x <= 2<sup>31</sup> - 1</li>
      </ul>
    `,
    starterCode: `#include<bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool isPalindrome(int x) {
        // Write your code here
    }
};`,
    testCases: [
      { input: `x = 121`, expectedOutput: "true" },
      { input: `x = -121`, expectedOutput: "false" },
      { input: `x = 10`, expectedOutput: "false" },
    ],
    mainFunction: `
      int main() {
        Solution solution;
        int x = INPUT_VALUE;
        bool result = solution.isPalindrome(x);
        cout << (result ? "true" : "false") << endl;
        return 0;
      }
    `,
  },
  
  {
    id: "longestValidParentheses",
    title: "Longest Valid Parentheses",
    difficulty: "Hard",
    problemStatement: `
      <p>Given a string containing just the characters <code>'('</code> and <code>')'</code>, return the length of the longest valid (well-formed) parentheses substring.</p><br><br>
      
      <h3>Example 1:</h3>
      <pre>
      Input: s = "(()"
      Output: 2
      Explanation: The longest valid parentheses substring is "()".
      </pre>

      <h3>Example 2:</h3>
      <pre>
      Input: s = ")()())"
      Output: 4
      Explanation: The longest valid parentheses substring is "()()".
      </pre>

      <h3>Example 3:</h3>
      <pre>
      Input: s = ""
      Output: 0
      </pre><br><br>

      <h3>Constraints:</h3>
      <ul>
        <li>0 <= s.length <= 3 * 10<sup>4</sup></li>
        <li><code>s[i]</code> is either <code>'('</code> or <code>')'</code></li>
      </ul>
    `,
    starterCode: `#include<bits/stdc++.h>
using namespace std;

class Solution {
public:
    int longestValidParentheses(string s) {
        // Write your code here
    }
};`,
    testCases: [
      { input: `s = ")()())"`, expectedOutput: "4" },
      { input: `s = "(()"`, expectedOutput: "2" },
      { input: `s = ""`, expectedOutput: "0" },
    ],
    mainFunction: `
      int main() {
        Solution solution;
        string s = "INPUT_STRING";
        int result = solution.longestValidParentheses(s);
        cout << result << endl;
        return 0;
      }
    `,
  },

  {
    id: "romanToInteger",
    title: "Roman to Integer",
    difficulty: "Easy",
    problemStatement: `
      <p>Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.</p><br>
      <pre>
Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
      </pre><br>
      <p>For example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.</p><br>
      <p>Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. 
      The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:</p><br>
      <ul>
        <li>I can be placed before V (5) and X (10) to make 4 and 9.</li>
        <li>X can be placed before L (50) and C (100) to make 40 and 90.</li>
        <li>C can be placed before D (500) and M (1000) to make 400 and 900.</li>
      </ul><br>
      <p>Given a roman numeral, convert it to an integer.</p><br>

      <h3>Example 1:</h3>
      <pre>
Input: s = "III"
Output: 3
Explanation: III = 3.
      </pre>

      <h3>Example 2:</h3>
      <pre>
Input: s = "LVIII"
Output: 58
Explanation: L = 50, V= 5, III = 3.
      </pre>

      <h3>Example 3:</h3>
      <pre>
Input: s = "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
      </pre><br>

      <h3>Constraints:</h3>
      <ul>
        <li>1 <= s.length <= 15</li>
        <li>s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').</li>
        <li>It is guaranteed that s is a valid roman numeral in the range [1, 3999].</li>
      </ul>      
    `,
    starterCode: `#include<bits/stdc++.h>
using namespace std;

class Solution {
public:
    int romanToInt(string s) {
        // Write your code here
    }
};`,
    testCases: [
      { input: `s = "III"`, expectedOutput: "3" },
      { input: `s = "LVIII"`, expectedOutput: "58" },
      { input: `s = "MCMXCIV"`, expectedOutput: "1994" },
    ],
    mainFunction: `
      int main() {
        Solution solution;
        string s = "INPUT_STRING";
        int result = solution.romanToInt(s);
        cout << result << endl;
        return 0;
      }
    `,
  },

  {
    id: "singleNumber",
    title: "Single Number",
    difficulty: "Easy",
    problemStatement: `
      <p>Given a <strong>non-empty</strong> array of integers <code>nums</code>, every element appears <em>twice</em> except for one. Find that single one.</p>
      <p>You must implement a solution with a linear runtime complexity and use only constant extra space.</p><br><br>

      <h3>Example 1:</h3>
      <pre>
Input: nums = [2,2,1]
Output: 1
      </pre>

      <h3>Example 2:</h3>
      <pre>
Input: nums = [4,1,2,1,2]
Output: 4
      </pre>

      <h3>Example 3:</h3>
      <pre>
Input: nums = [1]
Output: 1
      </pre><br><br>

      <h3>Constraints:</h3>
      <ul>
        <li><code>1 <= nums.length <= 3 * 10^4</code></li>
        <li><code>-3 * 10^4 <= nums[i] <= 3 * 10^4</code></li><br>
        <li>Each element in the array appears twice except for one element which appears only once.</li>
      </ul>
    `,
    starterCode: `#include<bits/stdc++.h>
using namespace std;

class Solution {
public:
    int singleNumber(vector<int>& nums) {
        // Write your code here
    }
};`,
    testCases: [
      { input: `nums = {2,2,1}`, expectedOutput: "1" },
      { input: `nums = {4,1,2,1,2}`, expectedOutput: "4" },
      { input: `nums = {1}`, expectedOutput: "1" },
    ],
    mainFunction: `
      int main() {
        Solution solution;
        vector<int> nums = {INPUT_ARRAY};
        int result = solution.singleNumber(nums);
        cout << result << endl;
        return 0;
      }
    `,
  },

  {
    id: "nextPermutation",
    title: "Next Permutation",
    difficulty: "Medium",
    problemStatement: `
      <p>A <strong>permutation</strong> of an array of integers is an arrangement of its members into a sequence or linear order.</p><br>
      <ul>
        <li>For example, for <code>arr = [1,2,3]</code>, the following are all the permutations of 
        <code>arr</code>: <code>[1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1]</code>.</li>
      </ul><br>
      <p>The <strong>next permutation</strong> of an array of integers is the next lexicographically greater permutation of its integer. 
      More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, 
      then the <strong>next permutation</strong> of that array is the permutation that follows it in the sorted container. If such arrangement 
      is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).</p><br>
      <ul>
        <li>For example, the next permutation of <code>arr = [1,2,3]</code> is <code>[1,3,2]</code>.</li>
        <li>Similarly, the next permutation of <code>arr = [2,3,1]</code> is <code>[3,1,2]</code>.</li>
        <li>While the next permutation of <code>arr = [3,2,1]</code> is <code>[1,2,3]</code> because <code>[3,2,1]</code> does not have a lexicographical larger rearrangement.</li>
      </ul><br>
      <p>Given an array of integers <code>nums</code>, <em>find the next permutation of</em> <code>nums</code>.</p>
      <p>The replacement must be <strong>in place</strong> and use only constant extra memory.</p><br><br>

      <h3>Example 1:</h3>
      <pre>
Input: nums = [1,2,3]
Output: [1,3,2]
      </pre>

      <h3>Example 2:</h3>
      <pre>
Input: nums = [3,2,1]
Output: [1,2,3]
      </pre>

      <h3>Example 3:</h3>
      <pre>
Input: nums = [1,1,5]
Output: [1,5,1]
      </pre><br><br>

      <h3>Constraints:</h3>
      <ul>
        <li><code>1 <= nums.length <= 100</code></li>
        <li><code>0 <= nums[i] <= 100</code></li>
      </ul>
    `,
    starterCode: `#include<bits/stdc++.h>
using namespace std;

class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        // Write your code here
    }
};`,
    testCases: [
      { input: `nums = {1,2,3}`, expectedOutput: "{1,3,2}" },
      { input: `nums = {3,2,1}`, expectedOutput: "{1,2,3}" },
      { input: `nums = {1,1,5}`, expectedOutput: "{1,5,1}" },
    ],
    mainFunction: `
      int main() {
        Solution solution;
        vector<int> nums = {INPUT_ARRAY};
        solution.nextPermutation(nums);
        cout << "{";
        for (int i = 0; i < nums.size(); i++) {
          cout << nums[i];
          if (i < nums.size() - 1) cout << ",";
        }
        cout << "}" << endl;
        return 0;
      }
    `,
  },

  {
    id: "firstMissingPositive",
    title: "First Missing Positive",
    difficulty: "Hard",
    problemStatement: `
      <p>Given an unsorted integer array <code>nums</code>. Return the <em>smallest positive integer</em> that is <em>not present</em> in <code>nums</code>.</p>
      <p>You must implement an algorithm that runs in <code>O(n)</code> time and uses <code>O(1)</code> auxiliary space.</p><br><br>

      <h3>Example 1:</h3>
      <pre>
Input: nums = [1,2,0]
Output: 3
Explanation: The numbers in the range [1,2] are all in the array.
      </pre>

      <h3>Example 2:</h3>
      <pre>
Input: nums = [3,4,-1,1]
Output: 2
Explanation: 1 is in the array but 2 is missing.
      </pre>

      <h3>Example 3:</h3>
      <pre>
Input: nums = [7,8,9,11,12]
Output: 1
Explanation: The smallest positive integer 1 is missing.
      </pre><br><br>

      <h3>Constraints:</h3>
      <ul>
        <li><code>1 <= nums.length <= 10^5</code></li>
        <li><code>-2^31 <= nums[i] <= 2^31 - 1</code></li>
      </ul>
    `,
    starterCode: `#include<bits/stdc++.h>
using namespace std;

class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        // Write your code here
    }
};`,
    testCases: [
      { input: `nums = {1,2,0}`, expectedOutput: "3" },
      { input: `nums = {3,4,-1,1}`, expectedOutput: "2" },
      { input: `nums = {7,8,9,11,12}`, expectedOutput: "1" },
    ],
    mainFunction: `
      int main() {
        Solution solution;
        vector<int> nums = {INPUT_ARRAY};
        int result = solution.firstMissingPositive(nums);
        cout << result << endl;
        return 0;
      }
    `,
  },
];
