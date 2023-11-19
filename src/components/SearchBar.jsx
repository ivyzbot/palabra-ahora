import { useState } from "react";

export default function SearchBar({ setNumWords, setSearchWord }) {
  const [optionVal, setOptionVal] = useState(10);
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
    setSearchWord(inputVal);
  }

  function handleClear() {
    setNumWords(0);
    setSearchWord("");
  }

  return (
    <>
      <div className="flex w-full">
        <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
          <span>Generate Random Words</span>
          <select
            onChange={handleChangeSelect}
            className="select select-info w-1/3 select-sm max-w-xs inline"
          >
            <option value="0">Clear</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <button
            onClick={handleSelectSubmit}
            className="btn btn-sm btn-outline inline"
          >
            GO
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
          <span>Search for Your Word</span>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={inputVal}
            onChange={handleInputChange}
          />
          <button onClick={handleInputSubmit} className="btn btn-outline">
            Search
          </button>
          <button onClick={handleClear} className="btn btn-outline">
            Clear
          </button>
        </div>
      </div>
    </>
  );
}
