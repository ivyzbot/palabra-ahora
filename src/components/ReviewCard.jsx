import { useState } from "react";
import { updateAirTableWords } from "../functions/apiCalls";

export default function ReviewCard({
  word_en,
  word_sp,
  id,
  status,
  updateWordStatus,
}) {
  const [cardStatus, setCardStatus] = useState(status);

  function handleToggleChange() {
    setCardStatus(cardStatus === "mastered" ? "review" : "mastered");
    const newStatus = cardStatus === "mastered" ? "review" : "mastered";
    updateWordStatus({ id: id, status: newStatus });
    updateAirTableWords(id, { status: newStatus });
  }

  return (
    <>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <h1>{word_en}</h1>
          </div>
          <div className="flip-card-back">
            <h1>{word_sp}</h1>
          </div>
        </div>
      </div>
      <label className="cursor-pointer label">
        <span className="label-text">Review Later</span>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          onChange={handleToggleChange}
          id={id}
          checked={cardStatus === "mastered" ? false : true}
        />
      </label>
    </>
  );
}
