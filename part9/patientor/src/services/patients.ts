import { v1 as uuidv1 } from "uuid";

import patientsData from "../data/patients";
import Patient, {
  NonSensitivePatientData,
  NewPatient,
} from "../types/patients.interface";

const getNonSensitivePatientsData = (): NonSensitivePatientData[] =>
  patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });

const getSingleNonSensitivePatientData = (
  id: string
): NonSensitivePatientData | undefined => {
  const patient = patientsData
    .map(({ id, name, dateOfBirth, gender, occupation, entries, ssn }) => {
      return { id, name, dateOfBirth, gender, occupation, entries, ssn };
    })
    .find((patient) => patient.id === id);

  if (!patient) {
    throw new Error("patient not found");
  } else {
    patient.entries = [];
    return patient;
  }
};

const addPatient = (data: NewPatient): NonSensitivePatientData => {
  const id = uuidv1();
  const result: Patient = { ...data, id: id, entries: [] };
  patientsData.push(result);
  const { ssn, ...safeResult } = result;
  return safeResult;
};

export default {
  getSingleNonSensitivePatientData,
  getNonSensitivePatientsData,
  addPatient,
};
