import { useState } from "react";

import SearchBar from "../components/SearchBar";
import RandomCards from "../components/RandomCards";
import SearchCard from "../components/SearchCard";

export default function LearnPage() {
  const [numWords, setNumWords] = useState(0);
  const [searchWord, setSearchWord] = useState("");
  return (
    <>
      <SearchBar setNumWords={setNumWords} setSearchWord={setSearchWord} />
      <RandomCards numWords={numWords} searchWord={searchWord} />
      <SearchCard searchWord={searchWord} numWords={numWords} />
    </>
  );
}
