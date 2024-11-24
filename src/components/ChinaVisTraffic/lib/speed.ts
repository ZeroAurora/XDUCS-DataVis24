import type { RowData } from "./types";

export function renderSpeedLineEcharts(data: RowData[]) {
  const option = {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: data.map((item: RowData) => item.time),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "line",
        smooth: true,
        data: data.map((item: RowData) => item.velocity),
      },
    ],
  };

  return option;
}
