import "./FilterCheckbox.css";

function FilterCheckbox({ onFilterChange, isFilter }) {
  return (
    <label className="filter-checkbox">
      <input className="filter-checkbox__hidden" type="checkbox" value={isFilter} onChange={(evt) => onFilterChange(evt.target.checked)}/>
      <span className="filter-checkbox__visible"></span>
      Короткометражки
    </label>
  );
}

export default FilterCheckbox;
