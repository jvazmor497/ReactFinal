import { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import "./Chart.css";
import { getPriceData } from "../../services/cheapSharkAPI";

export default function Chart(props) {
  const [option, setOption] = useState(null);

  const stores = JSON.parse(localStorage.getItem("stores"));

  useEffect(() => {
    const fetchPrices = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const gameID = props.prop.gameID;

      const games = await getPriceData(gameID);

      if (!games || !games.deals) {
        console.error("No deals found for the game");
        return;
      }

      console.table(games);

      setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: games.deals.map((deal) => {
            const store = stores.find(
              (store) => store.storeID === deal.storeID
            );
            return store ? store.storeName : deal.storeID;
          }),
          // axisLabel: {
          //   interval: 0,
          //   // rotate: 30, // Rotar etiquetas si es necesario
          //   formatter: function (value) {
          //     return value.length > 10 ? value.slice(0, 10) + "..." : value;
          //   },
          // },
        },
        series: [
          {
            data: games.deals.map((deal) => deal.price),
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      });
    };

    fetchPrices();
  }, [props, stores]);

  // console.group("Prices");
  // console.dir(priceData);
  // console.log("Precios:");
  // if (priceData.deals) {
  //   console.log(priceData.deals.map((deal) => deal.storeID));
  //   console.log(priceData.deals.map((deal) => deal.price));
  // }
  // console.groupEnd();

  return (
    <div className="chart-container">
      {option !== null && option !== undefined ? (
        <ReactECharts option={option} className="eChart" />
      ) : null}
    </div>
  );
}
