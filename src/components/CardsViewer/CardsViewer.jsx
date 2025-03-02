import { lazy, Suspense, useEffect, useState } from "react";
const Card = lazy(() => import("../Card/Card"));
import { getGamesList } from "../../services/cheapSharkAPI.js";
// import Card from "../Card/Card";

export default function CardsViewer(props) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [gameList, setGameList] = useState([]);

  // Fetch games
  useEffect(() => {
    const fetchGames = async () => {
      const games = await getGamesList(props);
      setGameList(games);
    };
    fetchGames();
  }, [props]);

  // Callback function to set active index
  const callbackFunction = (gameID) => {
    setActiveIndex(gameID === activeIndex ? null : gameID);
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      {gameList.map(
        (game) =>
          game.steamAppID && (
            <Card
              key={game.gameID}
              {...game}
              isActive={activeIndex === game.gameID}
              onClick={() => callbackFunction(game.gameID)}
            />
          )
      )}
    </Suspense>
  );
}
