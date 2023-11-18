import { useEffect, useState } from "react";
import {
  fetchDictionaryAndGiphy,
  fetchAirTableWordsWithFilter,
} from "../functions/apiCalls";

import SearchCardDB from "./SearchCardDB";
import SearchCardLive from "./SearchCardLive";

export default function SearchCard({ searchWord, numWords }) {
  const [searchWordData, setSearchWordData] = useState({});
  const [cardToDisplay, setCardToDisplay] = useState(0);

  useEffect(() => {
    if (searchWord) {
      getWordInfo(searchWord);
    }
  }, [searchWord]);

  async function getWordInfo(searchWord) {
    const airTableResult = await fetchAirTableWordsWithFilter(searchWord);
    if (airTableResult.length === 1) {
      let data = {
        word_en: searchWord,
        word_sp: airTableResult[0].fields.word_sp,
        url: airTableResult[0].fields.url,
        id: airTableResult[0].id,
        status: airTableResult[0].fields.status,
      };
      // console.log(data);
      setSearchWordData(data);
      setCardToDisplay(1);
    } else {
      const dictionaryResult = await fetchDictionaryAndGiphy(searchWord);
      let data = {
        word_en: searchWord,
        word_sp: dictionaryResult.word_sp,
        url: dictionaryResult.url,
      };
      setSearchWordData(data);
      setCardToDisplay(2);
    }
  }

  let card;
  if (numWords === 0 && cardToDisplay === 1) {
    card = <SearchCardDB cardData={searchWordData} />;
  } else if (numWords === 0 && cardToDisplay === 2) {
    card = <SearchCardLive cardData={searchWordData} />;
  } else {
    card === null;
  }

  return <>{card}</>;
}
