import { useState } from "react";

export default function SearchBar({ setNumWords, setSearchWord }) {
  const [optionVal, setOptionVal] = useState(0);
  const [inputVal, setInputVal] = useState("");

  function handleChangeSelect(evt) {
    setOptionVal(evt.target.value);
  }

  function handleSelectSubmit() {
    setSearchWord("");
    setNumWords(optionVal);
  }

  function handleInputChange(evt) {
    setInputVal(evt.target.value);
  }

  function handleInputSubmit() {
    setNumWords(0);
    setInputVal("");
    if (inputVal) {
      setSearchWord(inputVal);
    }
  }

  function handleClear() {
    setNumWords(0);
    setSearchWord("");
  }

  return (
    <>
      <div className="flex w-full mt-5">
        <div className="flex flex-row justify-center h-20 flex-grow card bg-base-300 bg-neutral rounded-box place-items-center basis-5/12">
          <span className="mr-5">Generate Random Words</span>
          <select
            onChange={handleChangeSelect}
            className="select select-warning w-1/3 select-sm max-w-xs inline"
          >
            <option value="0">Clear</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <button
            onClick={handleSelectSubmit}
            className="btn btn-sm btn-outline inline ml-5"
          >
            GO
          </button>
        </div>

        <div className="divider before:bg-warning after:bg-warning divider-horizontal basis-1/12">
          OR
        </div>

        <div className="flex flex-row justify-center h-20 flex-grow card bg-base-300 bg-neutral rounded-box place-items-center basis-5/12">
          <span className="mr-5">Search for Your Word</span>
          <input
            type="text"
            placeholder="Type here"
            className="input input-warning input-bordered w-1/3 max-w-xs"
            value={inputVal}
            onChange={handleInputChange}
          />
          <button
            onClick={handleInputSubmit}
            className="btn btn-sm btn-outline mx-5"
          >
            Search
          </button>
          <button onClick={handleClear} className="btn btn-sm btn-outline">
            Clear
          </button>
        </div>
      </div>
    </>
  );
}
