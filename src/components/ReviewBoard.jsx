export default function ReviewBoard({ wordStats, setWordFilter }) {
  function handleButtonClick(evt) {
    setWordFilter(evt.target.value);
  }
  return (
    <>
      <button
        onClick={handleButtonClick}
        value={"all"}
        className="btn btn-outline btn-info"
      >
        All
      </button>
      <span>{wordStats.all}</span>
      <button
        onClick={handleButtonClick}
        value={"mastered"}
        className="btn btn-outline btn-success"
      >
        Mastered
      </button>
      <span>{wordStats.mastered}</span>
      <button
        onClick={handleButtonClick}
        value={"review"}
        className="btn btn-outline btn-warning"
      >
        For Review
      </button>
      <span>{wordStats.review}</span>
    </>
  );
}
