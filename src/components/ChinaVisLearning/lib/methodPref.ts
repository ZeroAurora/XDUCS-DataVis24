import type { SubmitRecordRowData } from "./types";

enum methodMap {
  lang1 = "Method_BXr9AIsPQhwNvyGdZL57",
  lang2 = "Method_5Q4KoXthUuYz3bvrTDFm",
  lang3 = "Method_gj1NLb4Jn7URf9K2kQPd",
  lang4 = "Method_m8vwGkEZc3TSW2xqYUoR",
  lang5 = "Method_Cj9Ya2R7fZd6xs1q5mNQ",
};

export function renderMethodPrefEcharts(data: SubmitRecordRowData[]) {
  const option = {
    radar: {
      indicator: [
        { name: "Lang 1", max: 10 },
        { name: "Lang 2", max: 10 },
        { name: "Lang 3", max: 10 },
        { name: "Lang 4", max: 10 },
        { name: "Lang 5", max: 10 },
      ],
    },
    series: [
      {
        type: "radar",
        data: [
          {
            value: [
              data.reduce((acc, curr) => acc + (curr.method === methodMap.lang1 ? 1 : 0), 0),
              data.reduce((acc, curr) => acc + (curr.method === methodMap.lang2 ? 1 : 0), 0),
              data.reduce((acc, curr) => acc + (curr.method === methodMap.lang3 ? 1 : 0), 0),
              data.reduce((acc, curr) => acc + (curr.method === methodMap.lang4 ? 1 : 0), 0),
              data.reduce((acc, curr) => acc + (curr.method === methodMap.lang5 ? 1 : 0), 0),
            ],
            name: "Method",
          },
        ],
      },
    ],
  };

  return option;
}
