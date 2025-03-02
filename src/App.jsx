import "./App.css";
import CardsViewer from "./components/CardsViewer/CardsViewer";
import { useState, useRef } from "react";

function App() {
  const [search, setSearch] = useState("");

  const timeoutRef = useRef(null);

  function handleSearch(e) {
    const value = e.target.value;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setSearch(value);
    }, 5000);
  }

  return (
    <>
      <h1>React Price Comparator</h1>
      <input onChange={handleSearch} type="text" placeholder="Search for a game..." />
      <CardsViewer search={search} />
    </>
  );
}

export default App;
