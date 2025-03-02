const cheapSharkAPI = "https://www.cheapshark.com/api/1.0";


async function getPriceData(gameID) {
  console.log(`%c GAME ID CHART: ${gameID}`, "color: red; font-size: 16px;");

  if (!gameID) {
    console.error("No gameID provided");
    return null;
  }

  try {
    const response = await fetch(`${cheapSharkAPI}/games?id=${gameID}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Price data fetched");
    console.table(data);

    return data;
  } catch (error) {
    console.error("Error fetching price data", error);
    return null;
  }
};


async function getGamesList(props) {

  const response = await fetch(
    cheapSharkAPI + "/games?title=" +
    props.search +
    "&limit=15"
  ).then((response) => response.json());

  console.group("Games list");
  console.table(response);
  console.groupEnd();
  return (response);
};

export { getPriceData, getGamesList };