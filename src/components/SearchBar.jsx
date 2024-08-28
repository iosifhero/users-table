import React from "react";
import "../App.css";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  filterParams,
  setFilterParams,
}) => {
  const handleRadioChange = (e) => {
    const { value } = e.target;
    setFilterParams({ column: value });
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Поиск..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar-input"
      />
      <div className="search-bar-filters">
        <label>
          <input
            type="radio"
            name="searchColumn"
            value="fullName"
            checked={filterParams.column === "fullName"}
            onChange={handleRadioChange}
          />
          ФИО
        </label>
        <label>
          <input
            type="radio"
            name="searchColumn"
            value="age"
            checked={filterParams.column === "age"}
            onChange={handleRadioChange}
          />
          Возраст
        </label>
        <label>
          <input
            type="radio"
            name="searchColumn"
            value="gender"
            checked={filterParams.column === "gender"}
            onChange={handleRadioChange}
          />
          Пол
        </label>
        <label>
          <input
            type="radio"
            name="searchColumn"
            value="phone"
            checked={filterParams.column === "phone"}
            onChange={handleRadioChange}
          />
          Номер телефона
        </label>
        <label>
          <input
            type="radio"
            name="searchColumn"
            value="address"
            checked={filterParams.column === "address"}
            onChange={handleRadioChange}
          />
          Адрес
        </label>
      </div>
    </div>
  );
};

export default SearchBar;
