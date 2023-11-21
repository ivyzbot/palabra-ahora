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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchWord) {
      setIsLoading(searchWord ? true : false);
      getWordInfo(searchWord);
    } else {
      setCardToDisplay(0);
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

  useEffect(() => {
    setIsLoading(false);
  }, [searchWordData]);

  let card;
  if (numWords === 0 && cardToDisplay === 1) {
    card = <SearchCardDB cardData={searchWordData} />;
  } else if (numWords === 0 && cardToDisplay === 2) {
    card = <SearchCardLive cardData={searchWordData} />;
  } else {
    card === null;
  }

  const loading = (
    <div className="flex justify-center w-full w-96">
      <div className="flex flex-col gap-4 w-96 mt-20">
        <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-4">
            <div className="skeleton h-12 w-72 bg-info-content"></div>
            <div className="skeleton h-12 w-96 bg-info-content"></div>
          </div>
        </div>
        <div className="skeleton h-64 w-full bg-info-content"></div>
      </div>
    </div>
  );

  return <>{isLoading ? loading : card}</>;
}
