import { client } from "./clickhouseClient";

export async function getSeqNearDatetime(datetime: string): Promise<string> {
  const result = await client.query({
    query: `
      SELECT
        time,
        seq,
        abs(
          date_diff('microsecond', toDateTime64('${datetime}', 6, 'Asia/Shanghai'), time)
        ) AS diff
      FROM road_data
      ORDER BY diff
      LIMIT 1
    `,
    format: "JSON",
  });

  const resultJson: any = await result.json();

  return resultJson.data[0].seq;
}
