/**
 * 🎨 Mehndi Pattern Maker - Recursion
 *
 * Mehndi artist hai tu! Intricate patterns banane hain using RECURSION.
 * Yahan loops use karna MANA hai — sirf function khud ko call karega
 * (recursive calls). Har function mein base case aur recursive case hoga.
 *
 * Functions:
 *
 *   1. repeatChar(char, n)
 *      - Repeat char n times using recursion (NO loops, NO .repeat())
 *      - Base case: n <= 0 => return ""
 *      - Recursive: char + repeatChar(char, n - 1)
 *      - Agar char not a string or empty, return ""
 *
 *   2. sumNestedArray(arr)
 *      - Sum all numbers in an arbitrarily nested array
 *      - e.g., [1, [2, [3, 4]], 5] => 15
 *      - Skip non-number values
 *      - Base case: empty array => 0
 *      - Agar input not array, return 0
 *
 *   3. flattenArray(arr)
 *      - Flatten an arbitrarily nested array into a single flat array
 *      - e.g., [1, [2, [3, 4]], 5] => [1, 2, 3, 4, 5]
 *      - Agar input not array, return []
 *
 *   4. isPalindrome(str)
 *      - Check if string is palindrome using recursion
 *      - Case-insensitive comparison
 *      - Base case: string length <= 1 => true
 *      - Compare first and last chars, recurse on middle
 *      - Agar input not string, return false
 *
 *   5. generatePattern(n)
 *      - Generate symmetric mehndi border pattern
 *      - n = 1 => ["*"]
 *      - n = 2 => ["*", "**", "*"]
 *      - n = 3 => ["*", "**", "***", "**", "*"]
 *      - Pattern goes from 1 star up to n stars, then back down to 1
 *      - Use recursion to build the ascending part, then mirror it
 *      - Agar n <= 0, return []
 *      - Agar n is not a positive integer, return []
 *
 * Hint: Every recursive function needs a BASE CASE (when to stop) and a
 *   RECURSIVE CASE (calling itself with a smaller/simpler input).
 *
 * @example
 *   repeatChar("*", 4)        // => "****"
 *   sumNestedArray([1, [2, [3]]]) // => 6
 *   flattenArray([1, [2, [3]]]) // => [1, 2, 3]
 *   isPalindrome("madam")     // => true
 *   generatePattern(3)        // => ["*", "**", "***", "**", "*"]
 */
export function repeatChar(char, n) {
  // Your code here
  if (typeof char !== "string" || char === "") return "";

  if (n <= 0) return "";
  return char + repeatChar(char, n - 1);
}

export function sumNestedArray(arr) {
  // Your code here
  if (!Array.isArray(arr) || arr.length === 0) return 0;

  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "number" && !Array.isArray(arr[i])) continue;
    else if (!Array.isArray(arr[i])) sum += arr[i]; //if [3,4] then it would be 3+4 error coming in this line that i was doing sum = arr[i] so 3 gets replaced by 4 in second iteration
    sum = sum + sumNestedArray(arr[i]);
  }
  return sum;
}

//[1, [2, [3, 4]], 5]
//let resArr = []
export function flattenArray(arr) {
  // Your code here
  if (!Array.isArray(arr)) {
    return [];
  }
  let resArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (!Array.isArray(arr[i])) resArr.push(arr[i]);
    else resArr.push(...flattenArray(arr[i]));
  }
  return resArr;
}

export function isPalindrome(str) {
  // Your code here
  if (typeof str !== "string") {
    return false;
  }
  //madam

  let i = 0;
  let j = str.length - 1;
  if (i >= j) {
    return true;
  }
  if (str[i].toLowerCase() === str[j].toLowerCase()) {
    return isPalindrome(str.slice(i + 1, j));
  } else {
    return false;
  }
}

export function generatePattern(n) {
  // Your code here
  if (!Number.isInteger(n) || n <= 0) {
    return [];
  }

  function buildAscending(k) {
    // i had to get AI help for this question
    if (k <= 0) {
      return [];
    }
    let arr = buildAscending(k - 1);
    let str = "";
    for (let i = 1; i <= k; i++) {
      str += "*";
    }
    arr.push(str);
    return arr;
  }

  let asc = buildAscending(n); // ["*", "**", "***"]
  let desc = buildAscending(n - 1).reverse(); // ['*','**']

  return [...asc, ...desc];
}
