import { useEffect, useState } from "react";
import Board from "../components/Board";
import { fetchAirtableWordsRandom } from "../functions/apiCalls";

export default function LearnPage() {
  //change to useContext
  const [words, setWords] = useState([]);
  const [wordsLocation, setWordsLocation] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [grid, setGrid] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // console.log(words);
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
      console.log("selected:");
      console.log(JSON.stringify(selectedLetters.sort(compareFn)));
      console.log("answer:");
      console.log(JSON.stringify(wordLocation.sort(compareFn)));

      if (
        JSON.stringify(selectedLetters.sort(compareFn)) ===
        JSON.stringify(wordLocation)
      ) {
        const newGrid = [...grid];
        for (const l of wordLocation) {
          newGrid[l[0]][l[1]].islocked = true;
        }
        // console.log(newGrid);
        // console.log("correct");
        setSelectedLetters([]);
        setGrid(newGrid);
        return;
      }
    }
    // console.log("wrong");
  }

  async function fetchWords(numWords, setResult) {
    const result = await fetchAirtableWordsRandom(numWords, () => {});
    const newWords = result.map((record) => ({
      word: record.fields.word_sp,
      islocked: false,
    }));
    console.log(newWords);
    setResult(newWords);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <button
          onClick={() => {
            fetchWords(3, setWords);
          }}
          className="btn btn-accent my-10"
        >
          Generate Board
        </button>
        <Board
          words={words}
          selectedLetters={selectedLetters}
          setSelectedLetters={setSelectedLetters}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
          setWordsLocation={setWordsLocation}
          grid={grid}
          setGrid={setGrid}
        />
        <button onClick={checkResult} className="btn btn-accent my-10">
          Check
        </button>
      </div>
    </>
  );
}
