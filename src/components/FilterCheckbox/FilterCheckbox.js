import "./FilterCheckbox.css";

function FilterCheckbox({ onFilter, isFilterOn, }) {
  return (
    <label className="filter-checkbox">
      <input className="filter-checkbox__hidden" type="checkbox"
             checked={isFilterOn.checkbox}
             onChange={onFilter}
      />
      <span className="filter-checkbox__visible"></span>
      Короткометражки
    </label>
  );
}

export default FilterCheckbox;
