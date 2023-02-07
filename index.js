/*
 * Function main is used for testing the correctness of the task and obtaining the desired result
 */
function main() {
  let text = `The Tao gave birth to machine language.  Machine language gave birth
    to the assembler.
    The assembler gave birth to the compiler.  Now there are ten thousand
    languages.
    Each language has its purpose, however humble.  Each language
    expresses the Yin and Yang of software.  Each language has its place within
    the Tao.
    But do not program in COBOL if you can avoid it.
            -- Geoffrey James, "The Tao of Programming"`;
  // text = `C makes it' easy for you to shoot yourself in the foot. C++ makes that harder, but when you do, it blows away your whole leg. (с) Bjarne Stroustrup`;

  const resSymbol = getResultSymbol(text);
  console.log('Result Symbol is', resSymbol);
}

/*
 * Function displays the algorithm of task execution and returns the first unique symbol, that is a result.
 * If the input parameter is not a string, so the TypeError will be returned
 */
function getResultSymbol(text) {
  if (typeof text === 'string') {
    const wordsArr = makeWordsArr(text);
    const cleanWordsArr = makeCleanArray(wordsArr);
    const charsArr = convertWordsArrToCharsArr(cleanWordsArr);
    const resSymbol = findFirstNonDuplicate(charsArr);

    return resSymbol;
  } else return new TypeError('Type of input parameter must be string!');
}

/*
 * Function makeWordsArr converts text into array of words and returns this array.
 *
 * The regular expression /\s+/ matches one or more white-space characters,
 * so the split method splits the text into an array of words based on these white-space characters.
 */
function makeWordsArr(text) {
  return text.split(/\s+/);
}

/*
 * Function makeCleanArray cleans every word from punctuation marks and checks that each word started with a letter.
 * If word is not started from the letter, so it is not a word and we remove it from array.
 * Function returns arrray of clean words.
 */
function makeCleanArray(wordsArr) {
  return wordsArr
    .map((word) => removePunctuationFromEdges(word))
    .filter((word) => isWordStartLetter(word));
}

/*
 * Function removes punctuation marks from the edges of the word
 */
function removePunctuationFromEdges(word) {
  return word.replace(/^[\.,;:\!\?'"\s]+|[\.,;:\!\?'"\s]+$/g, '').trim();
}

/*
 * Function checks if a word starts with a letter and returns appropriate boolean value
 */
function isWordStartLetter(word) {
  if (!/^[a-zA-Z]/.test(word)) return false;

  return true;
}

/*
 * Function converts array of words to array of chars and returns this array.
 * Chars array consists of first found unique symbols in each word.
 */
function convertWordsArrToCharsArr(wordsArr) {
  const chars = [];

  for (let word of wordsArr)
    for (let char of word)
      if (word.indexOf(char) === word.lastIndexOf(char)) {
        chars.push(char);
        break;
      }

  return chars;
}

/*
 * Function finds first non-duplicate element in the array of chars and returns it if such exists.
 */
function findFirstNonDuplicate(charArr) {
  for (let i = 0; i < charArr.length; i++) {
    let j = charArr.indexOf(charArr[i]);
    if (j === i && charArr.indexOf(charArr[i], j + 1) === -1) return charArr[i];
  }

  return null;
}

main(); // Call the main method
