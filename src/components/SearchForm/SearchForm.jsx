import { useState } from "react";

import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleChange = (evt) => setKeyword(evt.target.value);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const trimmedKeyword = keyword.trim();
    if (trimmedKeyword) {
      onSearch(trimmedKeyword);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-form__input"
        name="keyword"
        placeholder="Search Topic"
        value="Enter Topic"
        onChange={handleChange}
        required
      />
      <button className="search-form__button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
