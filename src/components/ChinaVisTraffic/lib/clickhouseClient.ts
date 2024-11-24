import type { RowData } from "./types";
import { createClient } from "@clickhouse/client-web";

const client = createClient({
  url: "http://localhost:8123",
});

export async function getAllObjects<T>(collection: string): Promise<T[]> {
  const result = await client.query({
    query: `
      SELECT * FROM ${collection}
    `,
    format: "JSON",
  });

  const resultJson = await result.json();

  return resultJson.data as T[];
}

export async function getObjectsAtSeq(seq: string): Promise<RowData[]> {
  const result = await client.query({
    query: `
      SELECT * FROM road_data
      WHERE seq='${seq}'
    `,
    format: "JSON",
  });

  const resultJson = await result.json();

  return resultJson.data as RowData[];
}

export async function getObjectsOfId(id: string): Promise<RowData[]> {
  const result = await client.query({
    query: `
      SELECT * FROM road_data
      WHERE id='${id}'
    `,
    format: "JSON",
  });

  const resultJson = await result.json();

  return resultJson.data as RowData[];
}

export async function getDensityByTenMinutes() {
  const result = await client.query({
    query: `
      SELECT 
        toStartOfInterval(time, INTERVAL 10 MINUTE) AS interval_start,
        type,
        count(DISTINCT id) AS type_count
      FROM road_data
      GROUP BY interval_start, type
      ORDER BY interval_start, type
    `,
    format: "JSON",
  });

  const resultJson = await result.json();

  return resultJson.data;
}

export async function getSeqNearDatetime(datetime: string) {
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

  return resultJson.data[0].seq as string;
}
