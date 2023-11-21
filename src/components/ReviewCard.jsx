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
      <div className="flex flex-col justify-center pb-10">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front flex items-center justify-center bg-neutral">
              <h1 className="text-2xl font-bold text-neutral-content">
                {word_en}
              </h1>
            </div>
            <div className="flip-card-back flex items-center justify-center bg-neutral-content">
              <h1 className="text-2xl font-bold text-primary-content">
                {word_sp}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex pt-4">
          <span className="text-base px-5">Review Later</span>
          <label className="cursor-pointer label inline p-0">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              onChange={handleToggleChange}
              id={id}
              checked={cardStatus === "mastered" ? false : true}
            />
          </label>
        </div>
      </div>
    </>
  );
}
