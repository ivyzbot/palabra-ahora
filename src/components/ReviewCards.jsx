import { useEffect, useState } from "react";
import { fetchAllAirTableWords } from "../functions/apiCalls";
import ReviewCard from "./ReviewCard";

export default function ReviewCards({
  setWordStats,
  wordFilter,
  setIsBoardLoading,
}) {
  const [reviewWords, setReviewWords] = useState([]);

  //data format: [{id:, word_en:, word_sp:, status:}]

  useEffect(() => {
    setIsBoardLoading(reviewWords.length === 0 ? true : false);
    fetchAllAirTableWords(setReviewWords);
  }, []);

  function countWordByStatus(result, currentObj) {
    result[currentObj.status] = (result[currentObj.status] || 0) + 1;
    return result;
  }
  useEffect(() => {
    let result = reviewWords.reduce(countWordByStatus, {});
    result = { ...result, all: (result.review || 0) + (result.mastered || 0) };
    setWordStats(result);
  }, [reviewWords]);

  function updateWordStatus(word) {
    const idx = reviewWords.findIndex((obj) => obj.id === word.id);
    const newReviewWords = [...reviewWords];
    newReviewWords[idx].status = word.status;
    setReviewWords(newReviewWords);
  }

  let reviewWordsFiltered =
    wordFilter === "all"
      ? reviewWords
      : reviewWords.filter((word) => word.status === wordFilter);

  let cards = reviewWordsFiltered.map((word) => (
    <ReviewCard
      key={word.id}
      id={word.id}
      word_en={word.word_en}
      word_sp={word.word_sp}
      status={word.status}
      updateWordStatus={updateWordStatus}
    />
  ));

  useEffect(() => {
    setIsBoardLoading(reviewWords.length === 0 ? true : false);
  }, [reviewWords]);

  return (
    <>
      <div className="grid grid-cols-5 px-48 pt-10">{cards}</div>
    </>
  );
}
