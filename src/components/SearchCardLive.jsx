import { useState } from "react";
import { createAirTableWord } from "../functions/apiCalls";

export default function SearchCardDB({ cardData }) {
  function handleClick() {
    createAirTableWord(cardData);
  }
  return (
    <>
      <div className="indicator">
        <span className="indicator-item badge badge-secondary">New</span>
        <div className="card w-96 bg-base-100 shadow-x border-white border-solid border-2">
          <div className="card-body">
            <h2 className="card-title">{cardData.word_sp}</h2>
            <p>{cardData.word_en}</p>
          </div>
          <figure className="pb-3">
            <img src={cardData.url} alt={cardData.word_en} />
          </figure>
        </div>
      </div>
      <button onClick={handleClick} className="btn btn-primary">
        Add to DB
      </button>
    </>
  );
}
