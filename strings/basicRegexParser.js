/*
Basic Regex Parser

Implement a regular expression function isMatch that supports the '.' and '*' symbols.
The function receives two strings - text and pattern - and should return true
if the text matches the pattern as a regular expression. For simplicity, assume
that the actual symbols '.' and '*' do not appear in the text string and are used as special
symbols only in the pattern string.

In case you aren’t familiar with regular expressions, the function determines if the text
and pattern are the equal, where the '.' is treated as a single a character
wildcard (see third example), and '*' is matched for a zero or more sequence of the previous
letter (see fourth and fifth examples). For more information on regular expression matching,
see the Regular Expression Wikipedia page.

Explain your algorithm, and analyze its time and space complexities.

input:  text = "aa", pattern = "a"
output: false

input:  text = "aa", pattern = "aa"
output: true

input:  text = "abc", pattern = "a.c"
output: true

input:  text = "abbb", pattern = "ab*"
output: true

input:  text = "acd", pattern = "ab*c."
output: true
*/

function isMatch(string, pattern) {
  string = string.split('');
  pattern = pattern.split('');
  pattern = removeMultipleWildCard(pattern);

  let table = buildTable(string, pattern);
  if (pattern.length > 0 && pattern[0] === '*') {
    table[0][1] = true;
  }

  table[0][0] = true;

  for (var row = 1; row < table.length; row +=1) {
    for (var col = 1; col < table[row].length; col +=1 ) {

      let currStringChar = string[row - 1];
      let currPatternChar = pattern[col - 1];
      let matched = currStringChar === currPatternChar;

      if (currPatternChar === '.' || matched === true) {
        table[row][col] = table[row - 1][col - 1];
      } else if ( currPatternChar === '*') {
        let top = table[row - 1][col];
        let left = table[row][col-1];
        table[row][col] = top || left;
      }
    }
  }
  console.log(table, row, col, pattern, string)
  return table[row - 1][col - 1] || false
}


function buildTable(string, pattern) {

  //replace multimple consecutive '*' with just one '*'
  pattern = removeMultipleWildCard(pattern);
  const table = new Array(string.length + 1)
    .fill('')
    .map( ()=> {
      return new Array(pattern.length + 1).fill('');
    });

  return table;
}

function removeMultipleWildCard(pattern) {

  let  writeIndex = 0;
  let  isFirst = true;
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === '*') {
       if (isFirst) {
         pattern[writeIndex] = pattern[i];
         writeIndex++
         isFirst = false;
       }
    } else {
      pattern[writeIndex] = pattern[i];
      writeIndex++
      isFirst = true;
    }
  }

  return pattern.slice(0, writeIndex);
}


//console.log())





// console.log('input:  text = "xaylmz", pattern = "x.*z" -> true', isMatch('xaylmz', 'x.*z'));
//
// console.log('input:  text = "aa", pattern = "a" -> false', isMatch('aa', 'a'));
//
// console.log('input:  text = "aa", pattern = "*" -> true', isMatch('aa', '*'));
//
// console.log('input:  text = "aa", pattern = "aa" -> true', isMatch('aa', 'aa'));
//
// console.log('input:  text = "abc", pattern = "a.c" -> true', isMatch('abc', 'a.c'));
//
// console.log('input:  text = "abbb", pattern = "ab*" -> true', isMatch('abbb', 'ab*'));

console.log('input:  text = "acd", pattern = "ab*c." -> true', isMatch('acd', 'ab*c.'));
