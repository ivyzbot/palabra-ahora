import { useEffect, useState } from "react";
import { fetchAirTableWords, fetchGiphy } from "../functions/apiCalls";
import LearnCard from "./LearnCard";

export default function RandomCards({ numWords, searchWord }) {
  const [fetchedWords, setFetchedWords] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchAirTableWords(numWords, setFetchedWords);
  }, [numWords]);

  useEffect(() => {
    prepareCards();
  }, [fetchedWords]);

  //update
  async function prepareCards() {
    let cardsTemp = [];
    for (const word of fetchedWords) {
      const url = await fetchGiphy(word.fields.word_en);
      const cardData = {
        word_en: word.fields.word_en,
        word_sp: word.fields.word_sp,
        status: word.fields.status,
        url: url,
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
    <div className="w-96 carousel rounded-box">{cards}</div>
  );

  return <>{cardsToDisplay}</>;
}
