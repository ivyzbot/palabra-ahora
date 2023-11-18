import { useState, useEffect } from "react";

import SearchBar from "../components/SearchBar";
import RandomCards from "../components/RandomCards";
import SearchCard from "../components/SearchCard";

export default function LearnPage() {
  const [numWords, setNumWords] = useState(10);
  const [searchWord, setSearchWord] = useState();
  return (
    <>
      <SearchBar setNumWords={setNumWords} setSearchWord={setSearchWord} />
      <RandomCards numWords={numWords} />
      <SearchCard searchWord={searchWord} />
    </>
  );
}
