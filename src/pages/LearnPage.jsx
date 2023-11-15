import { useState, useEffect } from "react";

import SearchBar from "../components/SearchBar";
import RandomCards from "../components/RandomCards";
import SearchCard from "../components/SearchCard";

import { fetchAirTableWords } from "../functions/apiCalls";

export default function LearnPage() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetchAirTableWords(setWords);
  }, []);

  let displayWords = [];
  words.forEach((word) => {
    displayWords.push(
      <div key={word.id}>
        <p>{word.id}</p>
        <p>{word.fields.word_en}</p>
        <p>{word.fields.type}</p>
      </div>
    );
  });

  return (
    <>
      <SearchBar />
      <RandomCards />
      <SearchCard />
      <div>{displayWords}</div>
    </>
  );
}
