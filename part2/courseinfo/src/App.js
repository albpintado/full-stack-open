import React from "react";

const Course = ({ course }) => {
  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const Header = (props) => <h1>{props.courseName}</h1>;

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
);

const Content = (props) => {
  return props.parts.map((part) => (
    <Part key={part.name} part={part.name} exercises={part.exercises} />
  ));
};

const Total = (props) => {
  const total = props.parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0
  );
  return (
    <p>
      <strong>Total of {total} exercises</strong>
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
