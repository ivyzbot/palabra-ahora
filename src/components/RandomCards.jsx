import { useEffect, useState } from "react";
import { fetchAirTableWords, fetchGiphy } from "../functions/apiCalls";
import LearnCard from "./LearnCard";

export default function RandomCards({ numWords }) {
  const [fetchedWords, setFetchedWords] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchAirTableWords(numWords, setFetchedWords);
  }, [numWords]);

  useEffect(() => {
    prepareCards();
  }, [fetchedWords]);

  async function prepareCards() {
    let cardsTemp = [];
    for (const word of fetchedWords) {
      const url = await fetchGiphy(word.fields.word_en);
      const cardData = {
        word_en: word.fields.word_en,
        word_sp: word.fields.word_sp,
        url: url,
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

  console.log(`fetchedWords:${fetchedWords}`);
  console.log(`cards:${cards}`);

  return (
    <>
      <h1>test</h1>
      <div className="w-96 carousel rounded-box">{cards}</div>
    </>
  );
}
