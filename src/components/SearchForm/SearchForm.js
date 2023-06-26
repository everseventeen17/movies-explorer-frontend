import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
function handleSubmit(e) {
  e.preventDefault();
}
function SearchForm({onFilterChange, isFilter}) {
  return (
    <section className="search">

      <form className="search__form" name="search">
        <div className="search__inner">
          <input className="search__input"  name="search" placeholder="Фильм" required type="text"/>
          <button className="search__button" type="submit" onClick={handleSubmit} ></button>
        </div>
        <FilterCheckbox onFilterChange={onFilterChange} isFilter={isFilter}/>
      </form>

    </section>
  );
}

export default SearchForm;
