import { useEffect, useState } from "react";
import Card from "../Card/Card";

export default function CardsViewer(prop) {
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    const getGameList = async () => {
      const response = await fetch(
        "https://www.cheapshark.com/api/1.0/games?title=" + prop.search
      ).then((response) => response.json());

      setGameList(response);
      console.log(response);
    };

    getGameList();
  }, [prop]);

  return (
    <>
      {gameList.map((game) => (
        game.steamAppID && <Card key={game.gameID} {...game} />
      ))}
    </>
  );
}
