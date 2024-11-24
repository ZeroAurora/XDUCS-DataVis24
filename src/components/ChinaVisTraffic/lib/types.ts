export enum ParticipantType {
  Unknown = "0",
  Car = "1",
  Pedestrian = "2",
  Cyclist = "3",
  Truck = "4",
  Van = "5",
  Bus = "6",
  Static = "7",
  StaticEdge = "8",
  Cone = "9",
  Trolley = "10",
  Robot = "11",
  Gate = "12",
}

export const PARTICIPANT_NAME_MAP = {
  [ParticipantType.Unknown]: "Unknown",
  [ParticipantType.Car]: "Car",
  [ParticipantType.Pedestrian]: "Pedestrian",
  [ParticipantType.Cyclist]: "Cyclist",
  [ParticipantType.Truck]: "Truck",
  [ParticipantType.Van]: "Van",
  [ParticipantType.Bus]: "Bus",
  [ParticipantType.Static]: "Static",
  [ParticipantType.StaticEdge]: "StaticEdge",
  [ParticipantType.Cone]: "Cone",
  [ParticipantType.Trolley]: "Trolley",
  [ParticipantType.Robot]: "Robot",
  [ParticipantType.Gate]: "Gate",
};

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface RowData {
  id: string;
  seq: string;
  is_moving: boolean;
  position: Position;
  shape: Position;
  orientation: number;
  velocity: number;
  type: ParticipantType;
  heading: number;
  time: string;
}

export interface AccelerationRowData {
  id: string;
  type: ParticipantType;
  time: string;
  acceleration: number;
}
