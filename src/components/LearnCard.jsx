export default function LearnCard({ cardData }) {
  return (
    <>
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
                // checked
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
