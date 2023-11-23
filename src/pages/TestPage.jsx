import { useEffect, useState } from "react";
import Board from "../components/Board";
import { json } from "react-router";

export default function LearnPage() {
  const [words, setWords] = useState([
    { word: "casa", islocked: false },
    { word: "hermano", islocked: false },
    { word: "hijo", islocked: false },
  ]);
  const [wordsLocation, setWordsLocation] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [grid, setGrid] = useState([]);
  //[[[letter:xxx, islocked:xxx],[],[],],[],[]...]

  useEffect(() => {
    console.log(wordsLocation);
  }, [wordsLocation]);

  function compareFn(a, b) {
    if (a[0] > b[0]) {
      return 1;
    } else if (a[0] < b[0]) {
      return -1;
    } else if (a[1] > b[1]) {
      return 1;
    } else if (a[1] < b[1]) {
      return -1;
    } else {
      return 0;
    }
  }

  function checkResult() {
    for (const wordLocation of wordsLocation) {
      //[[rowIdx, colIdx],[],[]]

      if (
        JSON.stringify(selectedLetters.sort(compareFn)) ===
        JSON.stringify(wordLocation)
      ) {
        const newGrid = [...grid];
        for (const l of wordLocation) {
          newGrid[l[0]][l[1]].islocked = true;
        }
        // console.log(newGrid);
        console.log("correct");
        setSelectedLetters([]);
        setGrid(newGrid);
        return;
      }
    }
    console.log("wrong");
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <button className="btn btn-accent my-10">Generate Board</button>
      <Board
        words={words}
        selectedLetters={selectedLetters}
        setSelectedLetters={setSelectedLetters}
        setWordsLocation={setWordsLocation}
        grid={grid}
        setGrid={setGrid}
      />
      <button onClick={checkResult} className="btn btn-accent my-10">
        Check
      </button>
    </div>
  );
}
