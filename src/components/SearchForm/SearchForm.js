import "./SearchForm.css";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({error, isSearchError, searchValues, handleCheckboxChange, handleInputChange, onFormSubmit}) {

  return (
    <section className="search">

      <form className="search__form" name="search">

        <div className="search__inner">
          <input className="search__input" name="search" placeholder="Фильм" required type="text"
                 onChange={handleInputChange} value={searchValues.input || ""}/>
          <button className="search__button" type="submit" onClick={onFormSubmit}></button>
        </div>
        <div className="search__errors">
          {isSearchError ? (
            <p className="search-form__error">
              Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите
              немного и попробуйте ещё раз
            </p>
          ) : ("")}
          <p className="search-form__error">{error}</p>
        </div>
        <FilterCheckbox isFilterOn={searchValues} onFilter={handleCheckboxChange}/>

      </form>

    </section>
  );
}

export default SearchForm;
