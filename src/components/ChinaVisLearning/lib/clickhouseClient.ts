import type { StudentInfoRowData, SubmitRecordRowData, TitleInfoRowData } from "./types";
import { createClient } from "@clickhouse/client-web";

const client = createClient({
  url: "http://localhost:8123",
});

export async function getAllObjects<T>(collection: string) {
  const result = await client.query({
    query: `
      SELECT * FROM ${collection}
    `,
    format: "JSON",
  });

  const resultJson = await result.json();

  return resultJson.data as T[];
}

export async function getStudentSubmitRecords(studentId: string) {
  const result = await client.query({
    query: `
      SELECT * FROM submit_record
      WHERE student_ID='${studentId}'
    `,
    format: "JSON",
  });

  const resultJson = await result.json();

  return resultJson.data as SubmitRecordRowData[];
}

export async function getStudentInfo(studentId: string) {
  const result = await client.query({
    query: `
      SELECT * FROM student_info
      WHERE student_ID='${studentId}'
    `,
    format: "JSON",
  });

  const resultJson = await result.json();

  return resultJson.data[0] as StudentInfoRowData;
}

export async function getTitleInfo(titleId: string) {
  const result = await client.query({
    query: `
      SELECT * FROM title_info
      WHERE title_ID='${titleId}'
    `,
    format: "JSON",
  });

  const resultJson = await result.json();

  return resultJson.data as TitleInfoRowData[];
}

export async function getSubmitRecordOfTitle(titleId: string) {
  const result = await client.query({
    query: `
      SELECT * FROM submit_records
      WHERE title_ID='${titleId}'
    `,
    format: "JSON",
  });

  const resultJson = await result.json();

  return resultJson.data as SubmitRecordRowData[];
}
