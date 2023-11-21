export default function ReviewBoard({
  wordStats,
  setWordFilter,
  isBoardLoading,
}) {
  console.log(isBoardLoading);
  function handleButtonClick(evt) {
    setWordFilter(evt.target.value);
  }

  const loading = <span className="loading loading-ring loading-lg"></span>;
  return (
    <>
      <div className="flex justify-center justify-items-center mt-5">
        <button
          onClick={handleButtonClick}
          value={"all"}
          className="btn btn-outline btn-info"
        >
          All
        </button>
        <span className="flex items-center justify-center mx-4 text-2xl">
          {isBoardLoading ? loading : wordStats.all}
        </span>
        <button
          onClick={handleButtonClick}
          value={"mastered"}
          className="btn btn-outline btn-success"
        >
          Mastered
        </button>
        <span className="flex items-center justify-center mx-4 text-2xl">
          {isBoardLoading ? loading : wordStats.mastered}
        </span>
        <button
          onClick={handleButtonClick}
          value={"review"}
          className="btn btn-outline btn-warning"
        >
          For Review
        </button>
        <span className="flex items-center justify-center mx-4 text-2xl">
          {isBoardLoading ? loading : wordStats.review}
        </span>
      </div>
    </>
  );
}
