import React from "react";

import Part from "../interfaces/part.interface";

const Total = ({ courseParts }: { courseParts: Part[] }) => (
  <p>Total exercise count {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</p>
);

export default Total;
