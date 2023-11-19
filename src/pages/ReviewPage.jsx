import { useState } from "react";

import ReviewBoard from "../components/ReviewBoard";
import ReviewCards from "../components/ReviewCards";

export default function ReviewPage() {
  const [wordStats, setWordStats] = useState({
    all: "loading...",
    mastered: "loading...",
    review: "loading...",
  });
  const [wordFilter, setWordFilter] = useState("");

  return (
    <>
      <ReviewBoard wordStats={wordStats} setWordFilter={setWordFilter} />
      <ReviewCards setWordStats={setWordStats} wordFilter={wordFilter} />
    </>
  );
}
