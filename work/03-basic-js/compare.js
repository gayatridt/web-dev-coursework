"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY THIS LINE

/* YOU MAY MODIFY THE LINES BELOW */

  const firstWord = word.toUpperCase();
  const secondWord = guess.toUpperCase();
  
  const firstWordLetters = {};
  const secondWordLetters = {};
  
  for (const letter of firstWord) 
  {
    if (!firstWordLetters[letter]) 
    {
      firstWordLetters[letter] = 1;
    } 
    else 
    {
      firstWordLetters[letter] += 1;
    }
  }
  
  for (const letter of secondWord) 
  {
    if (!secondWordLetters[letter]) 
    {
      secondWordLetters[letter] = 1;
    } 
    else 
    {
      secondWordLetters[letter] += 1;
    }
  }
  
  let matches = 0;
  
  for (const letter of Object.keys(firstWordLetters)) 
  {
    if (secondWordLetters[letter]) 
    {
      if (firstWordLetters[letter] < secondWordLetters[letter])
      {
        matches += firstWordLetters[letter];
      } 
      else 
      {
        matches += secondWordLetters[letter];
      }
    }
  }
  
  return matches;
}
