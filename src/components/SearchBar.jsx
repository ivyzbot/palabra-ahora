export default function SearchBar() {
  return (
    <>
      <span>Random Words</span>
      <select className="select select-info w-full max-w-xs">
        {/* <option disabled selected>
          Number of Words
        </option> */}
        <option>20</option>
        <option>40</option>
        <option>60</option>
      </select>
      <button className="btn btn-outline">GO</button>
      <span>Search for Your Word</span>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
      />
      <button className="btn btn-outline">Search</button>
    </>
  );
}
