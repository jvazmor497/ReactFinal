import "./App.css";
import SearchBox from "./components/SeachBox/SearchBox";
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
    }, 1000);
  }

  return (
    <>
      <h1>Steam Price Comparator</h1>
      <p>Compare the price of your games</p>
      <input onChange={handleSearch} type="text" />
      <CardsViewer search={search} />
    </>
  );
}

export default App;
