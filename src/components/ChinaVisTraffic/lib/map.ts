import { client } from "./clickhouseClient";
import { PARTICIPANT_NAME_MAP } from "./types";
import { getSeqNearDatetime } from "./utils";

export async function getObjectsAtSeq(seq: string) {
  const result = await client.query({
    query: `
      SELECT * FROM road_data
      WHERE seq='${seq}'
    `,
    format: "JSON",
  });

  const resultJson = await result.json();

  return resultJson.data;
}

export async function renderMapEchartsAtSeq(seq: string) {
  const data = await getObjectsAtSeq(seq);
  if (!data) {
    return {};
  }

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
    data: data.filter((item: any) => item.type === key).map((item: any) => ({
      name: `${item.id} - ${value}`,
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
