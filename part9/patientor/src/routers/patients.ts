import express from "express";
import patientsService from "../services/patients";

import utils from "../commons/utils";

const router = express.Router();

router.get("/", (_req, res) => {
  try {
    res.json(patientsService.getNonSensitivePatientsData());
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/:id", (req, res) => {
  res.json(patientsService.getSingleNonSensitivePatientData(req.params.id));
});

router.post("/", (req, res) => {
  try {
    const newPatient = utils.toNewPatient(req.body);
    console.log("newPatient", newPatient);

    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
