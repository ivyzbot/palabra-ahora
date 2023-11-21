import { useState } from "react";

import ReviewBoard from "../components/ReviewBoard";
import ReviewCards from "../components/ReviewCards";

export default function ReviewPage() {
  const [wordStats, setWordStats] = useState({
    all: null,
    mastered: null,
    review: null,
  });
  const [wordFilter, setWordFilter] = useState("");
  const [isBoardLoading, setIsBoardLoading] = useState(true);

  return (
    <>
      <ReviewBoard
        wordStats={wordStats}
        setWordFilter={setWordFilter}
        isBoardLoading={isBoardLoading}
      />
      <ReviewCards
        setWordStats={setWordStats}
        wordFilter={wordFilter}
        setIsBoardLoading={setIsBoardLoading}
      />
    </>
  );
}
