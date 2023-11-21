import { useState } from "react";
import { createAirTableWord } from "../functions/apiCalls";

export default function SearchCardDB({ cardData }) {
  function handleClick() {
    (async () => {
      const response = await createAirTableWord(cardData);
      if (response.status === 200) {
        document.getElementById("my_modal_1").showModal();
      }
    })();
  }
  return (
    <>
      <div className="flex justify-center w-full mt-20">
        <div className="indicator">
          <span className="indicator-item badge badge-error">New</span>
          <div className="card w-96 bg-base-100 shadow-x border-white border-solid border-2">
            <div className="card-body">
              <h2 className="card-title text-5xl text-primary">
                {cardData.word_sp}
              </h2>
              <p className="text-2xl mt-3">{cardData.word_en}</p>
            </div>
            <figure className="pb-3">
              <img src={cardData.url} alt={cardData.word_en} />
            </figure>
          </div>
        </div>
        <button onClick={handleClick} className="btn btn-primary mt-80 ml-3">
          Add to DB
        </button>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Cheers!</h3>
          <p className="py-4">
            The new word{" "}
            <span className="text-primary font-bold text-lg">
              {cardData.word_sp}
            </span>{" "}
            has been added to your database!
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
