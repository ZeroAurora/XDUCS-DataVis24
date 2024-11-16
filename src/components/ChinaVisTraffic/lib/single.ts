import { client } from "./clickhouseClient";

export async function getObjectsOfId(id: string) {
  const result = await client.query({
    query: `
      SELECT * FROM road_data
      WHERE id='${id}'
    `,
    format: "JSON",
  });

  const resultJson = await result.json();

  return resultJson.data;
}

