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
  pattern = pattern.split('');
  string = string.split('');

  // pattern and string
  if (pattern.length === 1 && string.length !== 1 && pattern[0] !== '*') {
    return false;
  }

  const table = buildTable(string, pattern);

  /* rules:
  if currPatternChar = '.' -> take previous diagonal value;
    table[row][col] = table[row - 1][col -1];
  if currPatternChar = '*' -> take left value or top value;
    table[row][col] = table[row][col-1] || table[row -1][col]
  else:
    table[row][col] = F
  */

  for (var row = 1; row < table.length; row += 1) {
    for (var col = 1; col < table[row].length; col += 1) {

      let currentPatternChar = table[0][col];
      let currentStringChar = table[row][0];

      if (currentPatternChar === '.') {
        table[row][col] = handleOneWildCard(table, row, col);
      } else if (currentPatternChar === '*') {
        table[row][col] = handleMultiWildCards(table, row, col);
      } else {
        let matched = currentPatternChar === currentStringChar;
        table[row][col]  = matched
      }
    }
  }
  //console.log(table)
  return table[row - 1][col - 1];
}

function buildTable(string, pattern) {
  pattern.unshift(true); //table[0][0] will always be true;
  let table = new Array(string.length + 1).fill('');

  table.forEach((row, index) => {
    let emptyColumns = new Array(pattern.length).fill('');
    if (index === 0) {
      table[index] = pattern;
    } else if (index === 1) {
      table[index] = emptyColumns;
      table[index][0] = string[index - 1];
    } else {
      table[index] = emptyColumns;
      table[index][0] = string[index - 1];
    }
  });
  return table;
}


function handleOneWildCard(table, row, col) {
  let previousDiagonal = table[row - 1][col - 1];
  if (typeof previousDiagonal === 'boolean') {
    return  previousDiagonal;
  } else {
    return false;
  }
}

function handleMultiWildCards(table, row, col) {
  // if row === 1 --> row - 1 will be out of bounce;
  // if col === 1 --> col - 1 will be out of bounce;
  let top = row !== 1 ? table[row - 1][col] : true;
  let left = col !== 1 ? table[row][col - 1] : true;

  //return currentcell to either top or left; (true will take precedence)
  return top || left;
}


console.log('input:  text = "xaylmz", pattern = "x.*z" -> true', isMatch('xaylmz', 'x.*z'));

console.log('input:  text = "aa", pattern = "a" -> false', isMatch('aa', 'a'));

console.log('input:  text = "aa", pattern = "*" -> true', isMatch('aa', '*'));

console.log('input:  text = "aa", pattern = "aa" -> true', isMatch('aa', 'aa'));

console.log('input:  text = "abc", pattern = "a.c" -> true', isMatch('abc', 'a.c'));

console.log('input:  text = "abbb", pattern = "ab*" -> true', isMatch('abbb', 'ab*'));

console.log('input:  text = "acd", pattern = "ab*c." -> true', isMatch('acd', 'ab*c.'));
