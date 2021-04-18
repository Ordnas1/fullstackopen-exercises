import React from "react";
import { CoursePart } from "../interfaces/coursePart.interface";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => (
  <ul>
    {courseParts.map((part) => (
      <PartContent key={part.name} part={part} />
    ))}
  </ul>
);

const PartContent = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <p>
            {part.name} {part.name}
          </p>
          <em>{part.description}</em>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount}
          </p>
          <em>Proyect Count {part.groupProjectCount}</em>
        </div>
      );
    case "submission":
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount}
          </p>
          <em>{part.description}</em> <br />
          <a href={part.exerciseSubmissionLink}>Submit</a>
        </div>
      );
    case "special":
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount}
          </p>
          <em>{part.description}</em> <br />
          <p>
            Requirements:{" "}
            <ul>
              {part.requirements.map((req) => (
                <li key={req}>{req}</li>
              ))}
            </ul>
          </p>
        </div>
      );
    default:
      break;
  }
  return <div></div>;
};

export default Content;
