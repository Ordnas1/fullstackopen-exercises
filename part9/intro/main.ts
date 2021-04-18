/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express, { response } from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercise from "./exerciseCalculator";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  const result = calculateBmi(height, weight);

  if (!height || !weight) {
    return res.status(400).json({ error: "Malformed Input" });
  }

  return res.json({ height, weight, result });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { listing, target } = req.body;
  listing.map((num: string) => Number(num));

  const result = calculateExercise(listing, Number(target));
  return res.json(result);
});
app.listen(PORT, () => {
  console.log("server listening on port", PORT);
});
