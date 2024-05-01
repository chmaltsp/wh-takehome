/*
    Approach:
    1. We should first check for a valid input, and a valid dictionary.
    2. The input could also be made lowercase and whitespace trimmed
    3. Now we need to keep track of the letters in the input words, as well as their counts since each letter could only be used once.

    One approach would be to create an array of letters from the word and pop them out as we iterate through each word in the dict. 
    We'll also need to reset the original word for each iteration of the dictionary loop. This would be a little inefficient because there would a function call
    to create the word. There would also need to a call to arr.splice(). 
    
    Another approach to do this would to be to count the letter frequency in the input word and compare that against the letter frequency of the word in the dictionary.
    If the character doesn't exist we can break out of the loop, otherwise continue until all letters of the dictionary word have been checked.  

    4. Another thing to handle would be situations with one letter, for correctness.. the only 2 words in the english language are "a" and "I"
    but that should work since we are filtering out words that are longer than the input. 
*/

function findWords(input: string, dict: string[]): string[] | string {
  if (!dict || !input || input === "" || dict.length === 0) {
    return "Invalid Input";
  }

  // Init results
  const result: string[] = [];

  // Basic sanitization remove non letters
  input = input
    .trim()
    .toLowerCase()
    .replace(/[^a-z]/gi, "");

  const inputCharFreq = getCharacterFrequency(input);

  // we can also filter out any words that are longer than the original since they will never be a match
  // While running a filter in JS takes O(n) time, we end up with a smaller set of potential matches
  const shortDict = dict.filter((word) => word.length <= input.length);

  shortDict.forEach((word) => {
    word = word
      .trim()
      .toLowerCase()
      .replace(/[^a-z]/gi, "");

    const wordCharFreq = getCharacterFrequency(word);

    let canForm = true;

    for (const [char, count] of Object.entries(wordCharFreq)) {
      // If word
      if (!inputCharFreq[char] || inputCharFreq[char] < count) {
        canForm = false;
        break;
      }
    }

    if (canForm) {
      result.push(word);
    }
  });

  return result;
}

function getCharacterFrequency(word: string): Record<string, number> {
  const freq: Record<string, number> = {};

  word.split("").forEach((l) => {
    freq[l] = freq[l] + 1 || 1;
  });

  return freq;
}

const testCases = [
  {
    input: "",
    dict: [],
    expected: "Invalid Input",
  },
  {
    input: "",
    dict: ["asd"],
    expected: "Invalid Input",
  },
  {
    input: "a",
    dict: [],
    expected: "Invalid Input",
  },
  {
    input: "ate",
    dict: ["ate", "eat", "tea", "dog", "do", "god", "goo", "go", "good"],
    expected: ["ate", "eat", "tea"],
  },
  {
    input: "dog",
    dict: ["og", "god", "do", "not", "a", "doge"],
    expected: ["og", "god", "do"],
  },
  {
    input: "oogd",
    dict: ["ate", "eat", "tea", "dog", "do", "god", "goo", "go", "good"],
    expected: ["dog", "do", "god", "goo", "go", "good"],
  },
  {
    input: "a",
    dict: ["be", "am", "a", "i"],
    expected: ["a"],
  },
  {
    input: "Listen",
    dict: ["Enlists", "Google", "inLets", "banana"],
    expected: ["inlets"],
  },
  {
    input: "can't",
    dict: ["cant", "tan", "act"],
    expected: ["cant", "tan", "act"],
  },
];

testCases.forEach((testCase, index) => {
  try {
    const result = findWords(testCase.input, testCase.dict);
    const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
    console.log(`TEST CASE: ${index}: ${passed ? "PASSED" : "FAILED"}`);
    console.log(`RESULT: ${JSON.stringify(result)}`);
  } catch (error) {
    console.log(`TEST CASE: ${index}: ERROR`);
    console.error(error);
  }
});
