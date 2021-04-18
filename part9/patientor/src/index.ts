// express and middleware
import express = require("express");
import cors from "cors";
import morgan from "morgan";

// Routes
import diagnosesRoute from "./routers/diagnoses";
import patientsRoute from "./routers/patients";

// App init
const app = express();

// constants
const PORT = 3001;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

// routes
app.use("/api/diagnoses", diagnosesRoute);
app.use("/api/patients", patientsRoute);

app.listen(PORT, () => {
  console.log("Server listening to port", PORT);
});
