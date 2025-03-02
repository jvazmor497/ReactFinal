import { lazy, Suspense, useEffect, useState } from "react";
const Card = lazy(() => import("../Card/Card"));
import { getGamesList } from "../../services/cheapSharkAPI.js";
// import Card from "../Card/Card";

export default function CardsViewer(prop) {
  const [gameList, setGameList] = useState([]);

  // Fetch games
  useEffect(() => {
    const fetchGames = async () => {
      const games = await getGamesList(prop);
      setGameList(games);
    };
    fetchGames();
  }, [prop]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      {gameList.map(
        (game) => game.steamAppID && <Card key={game.gameID} {...game} />
      )}
    </Suspense>
  );
}
