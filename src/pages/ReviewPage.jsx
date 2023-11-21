import { useState, createContext } from "react";

import ReviewBoard from "../components/ReviewBoard";
import ReviewMode from "../components/ReviewMode";
import ReviewCards from "../components/ReviewCards";

export const Context = createContext();

export default function ReviewPage() {
  const [wordStats, setWordStats] = useState({
    all: null,
    mastered: null,
    review: null,
  });
  const [wordFilter, setWordFilter] = useState("");
  const [isBoardLoading, setIsBoardLoading] = useState(true);
  const [language, setLanguage] = useState("EN");

  return (
    <>
      <ReviewBoard
        wordStats={wordStats}
        setWordFilter={setWordFilter}
        isBoardLoading={isBoardLoading}
      />
      <Context.Provider value={{ language, setLanguage }}>
        <ReviewMode />
        <ReviewCards
          setWordStats={setWordStats}
          wordFilter={wordFilter}
          setIsBoardLoading={setIsBoardLoading}
        />
      </Context.Provider>
    </>
  );
}
