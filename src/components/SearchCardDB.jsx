import { useEffect, useState } from "react";
import { updateAirTableWords } from "../functions/apiCalls";

export default function SearchCardDB({ cardData }) {
  const [cardStatus, setCardStatus] = useState(cardData.status);
  // !!!!!
  useEffect(() => {
    setCardStatus(cardData.status);
  }, [cardData]);

  function handleToggleChange() {
    setCardStatus(cardStatus === "mastered" ? "review" : "mastered");
    const newStatus = cardStatus === "mastered" ? "review" : "mastered";
    updateAirTableWords(cardData.id, { status: newStatus });
  }
  return (
    <div className="indicator">
      <span className="indicator-item badge badge-primary">Old</span>
      <div className="card w-96 bg-base-100 shadow-x border-white border-solid border-2">
        <div className="card-body">
          <h2 className="card-title">{cardData.word_sp}</h2>
          <p>{cardData.word_en}</p>
          <div className="form-control w-52">
            <label className="cursor-pointer label">
              <span className="label-text">Review Later</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
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
    </div>
  );
}
