import { useState, useEffect } from "react";
import { LETTERS } from "../assets/consts";
import Sqaure from "./Sqaure";

export default function Board({
  words,
  selectedLetters,
  setSelectedLetters,
  setErrorMsg,
  errorMsg,
  setWordsLocation,
  grid,
  setGrid,
}) {
  function generateBoard(words, LETTERS) {
    //create an empty 10*10 board
    const grid = Array.from(Array(10), () => new Array(10).fill(null));
    const tempWordsLocation = [];
    // Insert each word into the grid at a random location and orientation
    for (const word of words) {
      // console.log(`word: ${JSON.stringify(word)}`);
      let wordLocation = [];
      const wordLength = word.word.length;
      const maxIterations = 1000;
      let iterations = 0;
      if (wordLength > 10) {
        // console.log(
        //   `Word length must not exceed 10 characters. Word: ${word.word}`
        // );
        setErrorMsg(
          `Word length must not exceed 10 characters. Word: ${word.word}`
        );
        return;
      }
      while (iterations < maxIterations) {
        const orientation = Math.floor(Math.random() * 4); // 0 = horizontal, 1 = vertical, 2 = diagonal up, 3 = diagonal down
        let startRow, startCol, rowStep, colStep;

        if (orientation === 0) {
          // Horizontal
          startRow = Math.floor(Math.random() * 10);
          startCol = Math.floor(Math.random() * (10 - wordLength + 1));
          rowStep = 0;
          colStep = 1;
        } else if (orientation === 1) {
          // Vertical
          startRow = Math.floor(Math.random() * (10 - wordLength + 1));
          startCol = Math.floor(Math.random() * 10);
          rowStep = 1;
          colStep = 0;
        } else if (orientation === 2) {
          // Diagonal up
          startRow = Math.floor(
            Math.random() * (10 - wordLength + 1) + wordLength - 1
          );
          startCol = Math.floor(Math.random() * (10 - wordLength + 1));
          rowStep = -1;
          colStep = 1;
        } else {
          // Diagonal down
          startRow = Math.floor(Math.random() * (10 - wordLength + 1));
          startCol = Math.floor(Math.random() * (10 - wordLength + 1));
          rowStep = 1;
          colStep = 1;
        }

        let validLocation = true;

        // Check if the word fits in the grid at the chosen location and orientation
        for (let i = 0; i < wordLength; i++) {
          const row = startRow + i * rowStep;
          const col = startCol + i * colStep;
          // console.log(word);
          if (grid[row][col] !== null && grid[row][col] !== word.word[i]) {
            validLocation = false;
            break;
          }
        }

        // If the word fits, insert it into the grid and exit the loop
        if (validLocation) {
          for (let i = 0; i < wordLength; i++) {
            const rowIndex = startRow + i * rowStep;
            const colIndex = startCol + i * colStep;
            const letter = word.word[i];
            grid[rowIndex][colIndex] = {
              letter: letter,
              islocked: word.islocked,
            };
            wordLocation.push([rowIndex, colIndex]);
          }
          break;
        }
        iterations++;
      }
      tempWordsLocation.push(wordLocation);
      setGrid(grid);
      setWordsLocation(tempWordsLocation);
    }

    // fill the empty spaces with random letters
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (grid[i][j] == null) {
          grid[i][j] = {
            letter: LETTERS[Math.floor(Math.random() * LETTERS.length)],
            islocked: false,
          };
        }
      }
    }
  }

  useEffect(() => {
    generateBoard(words, LETTERS);
  }, [words]);

  useEffect(() => {
    // console.log(selectedLetters);
  }, [selectedLetters]);

  return (
    <>
      <div className="w-full max-w-full flex flex-col items-center justify-center">
        {errorMsg
          ? errorMsg
          : grid.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-row items-center justify-center max-w-full"
              >
                {row.map((letter, colIndex) => (
                  <Sqaure
                    key={colIndex}
                    index={[rowIndex, colIndex]}
                    letter={letter.letter}
                    islocked={letter.islocked}
                    selectedLetters={selectedLetters}
                    setSelectedLetters={setSelectedLetters}
                    words={words}
                  />
                ))}
              </div>
            ))}
      </div>
    </>
  );
}
