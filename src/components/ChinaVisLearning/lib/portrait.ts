import type { SubmitRecordRowData } from "./types";

export function renderPortraitEcharts(data: SubmitRecordRowData[]) {
  const avgTCBonus = data.reduce((acc, curr) => acc + curr.tc_bonus, 0) / data.length;
  const avgMemoryBonus = data.reduce((acc, curr) => acc + curr.mem_bonus, 0) / data.length;
  const avgScoreBonus = data.reduce((acc, curr) => acc + curr.score_bonus, 0) / data.length;
  const avgRankBonus = data.reduce((acc, curr) => acc + curr.rank_bonus, 0) / data.length;

  const avgErrorTypeCount = data.reduce((acc, curr) => acc + curr.error_type_count, 0) / data.length;
  const avgRetryCount = data.reduce((acc, curr) => acc + curr.retry_count, 0) / data.length;
  const errorFreeBonus = Math.max(0, 7 - avgErrorTypeCount); // 8 is manually counted
  const retryFreeBonus = Math.max(0, 150 - avgRetryCount);

  const option = {
    radar: {
      indicator: [
        { name: "TC", max: 100 },
        { name: "Memory", max: 100 },
        { name: "Score", max: 100 },
        { name: "Rank", max: 100 },
        { name: "Error Free", max: 8 },
        { name: "Retry Free", max: 80 },
      ],
    },
    series: [
      {
        type: "radar",
        data: [
          {
            value: [
              avgTCBonus,
              avgMemoryBonus,
              avgScoreBonus,
              avgRankBonus,
              errorFreeBonus,
              retryFreeBonus,
            ],
            name: "Average",
          },
        ],
      },
    ],
  };

  return option;
}
