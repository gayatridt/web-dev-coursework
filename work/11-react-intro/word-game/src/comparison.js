export function comparison(secretWord, guess) {
    const secretChars = secretWord.toUpperCase().split('');
    const guessChars = guess.toUpperCase().split('');
    
    const count = guessChars.reduce((total, char) => {
      const secretIndex = secretChars.indexOf(char);
      if (secretIndex >= 0) {
        secretChars.splice(secretIndex, 1); 
        return total + 1;
      }
      return total;
    }, 0);
  
    return count;
  }