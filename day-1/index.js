import { promises as fs } from "fs";

const input = await fs.readFile("./input.txt", "utf8");
let lines = input
  .split("\n")
  .map((l) => Number(l))
  .sort((a, b) => a - b);

const puzzle1 = checkSum();
console.log("Solution 1 = ", getResult(puzzle1)); //1010299

const puzzle2 = checkDoubleSum();
console.log("Solution 2 = ", getResult(puzzle2)); //42140160

function checkDoubleSum(index = 0) {
  const maxSearch = 2020 - lines[index];
  const checkSumResult = checkSum(index, lines, maxSearch);
  return checkSumResult
    ? [lines[index], ...checkSumResult]
    : checkDoubleSum(index++);
}

function checkSum(index = 0, searchLines = lines, maxSearch = 2020) {
  const currentLine = lines[index];
  const searchLine = searchLines[Math.floor(searchLines.length / 2)];
  const sum = currentLine + searchLine;
  const isOverflowing = currentLine > searchLine;
  if (index > Math.ceil(lines.length / 2)) {
    return undefined;
  }
  if (isOverflowing || (searchLines.length <= 1 && sum !== maxSearch)) {
    return checkSum(index + 1, lines, maxSearch);
  }
  if (sum === maxSearch) {
    return [currentLine, searchLine];
  }
  const nextLines =
    sum > 2020
      ? searchLines.slice(0, Math.floor(searchLines.length / 2))
      : searchLines.slice(Math.floor(searchLines.length / 2));
  return checkSum(index, nextLines, maxSearch);
}

function getResult(arr) {
  return arr.reduce((prev, acc) => prev * acc, 1);
}
