import type { DataTableColumns } from "naive-ui";
import { getAllObjects } from "./clickhouseClient";
import { type AccelerationRowData, PARTICIPANT_NAME_MAP, type RowData } from "./types";

export function createOverSpeedColumns(): DataTableColumns<RowData> {
  return [
    {
      type: "selection",
      multiple: false,
    },
    {
      title: "ID",
      key: "id",
    },
    {
      title: "Type",
      key: "type",
      render(row) {
        return PARTICIPANT_NAME_MAP[row.type];
      },
    },
    {
      title: "Velocity",
      key: "velocity",
    },
    {
      title: "Time",
      key: "time",
    },
  ];
}

export async function getOverSpeed(): Promise<RowData[]> {
  return getAllObjects("overspeed");
}

export function createAccelrationColumns(): DataTableColumns<AccelerationRowData> {
  return [
    {
      type: "selection",
      multiple: false,
    },
    {
      title: "ID",
      key: "id",
    },
    {
      title: "Type",
      key: "type",
      render(row) {
        return PARTICIPANT_NAME_MAP[row.type];
      },
    },
    {
      title: "Acceleration (ABS)",
      key: "acceleration",
    },
    {
      title: "Time",
      key: "time",
    },
  ];
}

export async function getAcceleration(): Promise<AccelerationRowData[]> {
  return getAllObjects("acceleration");
}
