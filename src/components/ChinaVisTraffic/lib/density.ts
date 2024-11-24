import { getDensityByTenMinutes } from "./clickhouseClient";
import { PARTICIPANT_NAME_MAP } from "./types";

export async function renderDensityEcharts() {
  const data = await getDensityByTenMinutes();

  const xData = [...new Set(data.map((item: any) => item.interval_start))]; // already sorted

  const series = Object.entries(PARTICIPANT_NAME_MAP).map(
    ([key, value]) => ({
      name: value,
      type: "line",
      stack: "Total",
      areaStyle: {},
      selectedMode: "single",
      smooth: true,
      data: xData.map((item: any) => {
        const dataItem: any = data.find((d: any) => d.interval_start === item && d.type === key);
        return dataItem ? dataItem.type_count : 0;
      }),
    }),
  );

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: Object.values(PARTICIPANT_NAME_MAP),
    },
    xAxis: {
      type: "category",
      data: xData,
    },
    yAxis: {
      type: "value",
    },
    series,
  };

  return option;
}
