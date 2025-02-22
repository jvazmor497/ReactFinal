import "./SearchBox.css";

export default function SearchBox(prop) {
  return (
    <div className="search-box">
      <input
        className="search-bar"
        onChange={prop.handleSearch}
        type="text"
        placeholder="Search for a game..."
      />
    </div>
  );
}
