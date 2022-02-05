export default function QueryInput({ onQueryChange, value }) {
  return (
    <div className="query">
      <label>
        <input
          onChange={e => onQueryChange(e.target.value)}
          name="filter"
          value={value}
          placeholder="Search"
          type="search"
        />
      </label>
    </div>
  );
}
