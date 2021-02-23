import React from 'react'


const Header = ({ title }) => <h1>{title}</h1>;

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} name={part.name} exercises={part.exercises}></Part>
    ))}
  </div>
);

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Total = ({ parts }) => (
  <p>
    Number of exercises{" "}
    {parts.map((part) => part.exercises).reduce((acc, curr) => acc + curr)}
  </p>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  );
};

export default Course
