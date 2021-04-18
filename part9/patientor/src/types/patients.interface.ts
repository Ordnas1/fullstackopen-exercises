// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export default interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NonSensitivePatientData = Omit<Patient, "ssn" | "entries">;

export type NewPatient = Omit<Patient, "id" | "entries">;

export enum Gender {
  Other = "other",
  Male = "male",
  Female = "female",
}
