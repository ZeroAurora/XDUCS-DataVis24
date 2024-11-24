import type { RowData } from "./types";
import { PARTICIPANT_NAME_MAP } from "./types";

export function renderMapEcharts(data: RowData[]) {
  const series = Object.entries(PARTICIPANT_NAME_MAP).map(([key, value]) => ({
    name: value,
    type: "scatter",
    coordinateSystem: "geo",
    geoIndex: 0,
    emphasis: {
      label: {
        show: true,
        formatter: "{b}",
      },
    },
    animation: false,
    data: data.filter((item: RowData) => item.type === key).map((item: RowData) => ({
      name: `${item.id} - ${value}`,
      id: item.id,
      value: [item.position.x, item.position.y],
    })),
  }));

  const option = {
    geo: [
      {
        id: 0,
        map: "road10",
        roam: true,
        emphasis: {
          disabled: true,
        },
      },
    ],
    legend: {
      data: Object.values(PARTICIPANT_NAME_MAP),
    },
    series,
  };

  return option;
}
