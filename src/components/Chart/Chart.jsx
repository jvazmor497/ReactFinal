import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { BarChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([GridComponent, BarChart, CanvasRenderer, UniversalTransition]);

import { useEffect } from "react";

export default function Chart(prop) {
  useEffect(() => {
    let chartDom = document.getElementById(prop.id);
    const myChart = echarts.init(chartDom);
    let option;

    option = {
      xAxis: {
        data: ["Animals", "Fruits", "Cars"],
      },
      yAxis: {},
      dataGroupId: "",
      animationDurationUpdate: 500,
      series: {
        type: "bar",
        id: "sales",
        data: [
          {
            value: 5,
            groupId: "animals",
          },
          {
            value: 2,
            groupId: "fruits",
          },
          {
            value: 4,
            groupId: "cars",
          },
        ],
        universalTransition: {
          enabled: true,
          divideShape: "clone",
        },
      },
    };

    const drilldownData = [
      {
        dataGroupId: "animals",
        data: [
          ["Cats", 4],
          ["Dogs", 2],
          ["Cows", 1],
          ["Sheep", 2],
          ["Pigs", 1],
        ],
      },
      {
        dataGroupId: "fruits",
        data: [
          ["Apples", 4],
          ["Oranges", 2],
        ],
      },
      {
        dataGroupId: "cars",
        data: [
          ["Toyota", 4],
          ["Opel", 2],
          ["Volkswagen", 2],
        ],
      },
    ];

    myChart.on("click", function (event) {
      if (event.data) {
        let subData = drilldownData.find(function (data) {
          return data.dataGroupId === event.data.groupId;
        });
        if (!subData) {
          return;
        }
        myChart.setOption({
          xAxis: {
            data: subData.data.map(function (item) {
              return item[0];
            }),
          },
          series: {
            type: "bar",
            id: "sales",
            dataGroupId: subData.dataGroupId,
            data: subData.data.map(function (item) {
              return item[1];
            }),
            universalTransition: {
              enabled: true,
              divideShape: "clone",
            },
          },
          graphic: [
            {
              type: "text",
              left: 50,
              top: 20,
              style: {
                text: "Back",
                fontSize: 18,
              },
              onclick: function () {
                myChart.setOption(option);
              },
            },
          ],
        });
        option && myChart.setOption(option);
      }
    });

    return <div id="chart" style={{ width: "600px", height: "400px" }}></div>;
  });
}
