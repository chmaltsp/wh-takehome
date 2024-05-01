# Weekend Health Take Home Challenge

## Problem Statment 

Implement a function named findWords that accepts two arguments: 1) an input string and 2) a dictionary. This function should return an array of words from the dictionary that can be formed by rearranging some or all of the letters in the input string. Each letter in the input string may be used up to once per word.

```ts
function findWords(inputString: string, dictionary:string[]): string[]
```

## Running the function

1. `npm install`
2. `npm start`


## Approach
Also copied in the code, but added here as well. 

1. We should first check for a valid input, and a valid dictionary.
2. The input could also be made lowercase and whitespace trimmed
3. Now we need to keep track of the letters in the input words, as well as their counts since each letter could only be used once.
    
    a. One approach would be to create an array of letters from the word and pop them out as we iterate through each word in the dict. 
        
    We'll also need to reset the original word for each iteration of the dictionary loop. This would be a little inefficient because there would a function call
    to create the word. There would also need to a call to arr.splice(). 
    
    b. Another approach to do this would to be to count the letter frequency in the input word and compare that against the letter frequency of the word in the dictionary.
    If the character doesn't exist we can break out of the loop, otherwise continue until all letters of the dictionary word have been checked.  

4. Another thing to handle would be situations with one letter, for correctness.. the only 2 words in the english language are "a" and "I"
but that should work since we are filtering out words that are longer than the input. 

## TODOs for the future

- Add more test cases and benchmark performance of 2 
- Sanitize inputs for illegal characters


