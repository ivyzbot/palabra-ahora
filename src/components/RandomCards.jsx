import { useEffect, useState } from "react";
import { fetchAirTableWords } from "../functions/apiCalls";
import LearnCard from "./LearnCard";

export default function RandomCards({ numWords, searchWord }) {
  const [fetchedWords, setFetchedWords] = useState([]);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(numWords === "0" ? false : true);
    fetchAirTableWords(numWords, setFetchedWords);
  }, [numWords]);

  useEffect(() => {
    prepareCards();
  }, [fetchedWords]);

  //update
  function prepareCards() {
    let cardsTemp = [];
    for (const word of fetchedWords) {
      const cardData = {
        word_en: word.fields.word_en,
        word_sp: word.fields.word_sp,
        status: word.fields.status,
        url: word.fields.url,
        id: word.id,
      };

      const card = (
        <div className="carousel-item w-full" key={word.id}>
          <LearnCard cardData={cardData} />
        </div>
      );
      cardsTemp.push(card);
    }
    setCards(cardsTemp);
  }

  const cardsToDisplay = searchWord ? null : (
    <div className="flex justify-center w-full">
      <div className="w-96 carousel rounded-box mt-20">{cards}</div>
    </div>
  );

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

  useEffect(() => {
    setIsLoading(false);
  }, [cards]);

  return <>{isLoading ? loading : cardsToDisplay}</>;
}
