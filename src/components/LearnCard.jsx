import { useState } from "react";
import { updateAirTableWords } from "../functions/apiCalls";

export default function LearnCard({ cardData }) {
  const [cardStatus, setCardStatus] = useState(cardData.status);

  function handleToggleChange() {
    setCardStatus(cardStatus === "mastered" ? "review" : "mastered");
    const newStatus = cardStatus === "mastered" ? "review" : "mastered";
    updateAirTableWords(cardData.id, { status: newStatus });
  }

  return (
    <>
      <div className="card w-96 bg-base-100 shadow-x border-white border-solid border-2">
        <div className="card-body">
          <h2 className="card-title text-5xl text-primary">
            {cardData.word_sp}
          </h2>
          <p className="text-2xl mt-3">{cardData.word_en}</p>
          <div className="form-control w-52 ml-auto">
            <label className="cursor-pointer label">
              <span className="text-base ml-auto mr-5">Review Later</span>
              <input
                type="checkbox"
                className="toggle toggle-warning"
                onChange={handleToggleChange}
                id={cardData.id}
                checked={cardStatus === "mastered" ? false : true}
              />
            </label>
          </div>
        </div>
        <figure className="pb-3">
          <img src={cardData.url} alt={cardData.word_en} />
        </figure>
      </div>
    </>
  );
}
