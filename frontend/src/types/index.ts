export type ID = string | number;

export type Slot = {
  id: ID;
  startTime: string; // ISO
  endTime?: string;
  isBooked?: boolean;
};