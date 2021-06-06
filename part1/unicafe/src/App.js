import React, { useState } from "react";

const Button = (props) => (
  <button onClick={props.function}>{props.text}</button>
);

const Statistic = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
);

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad;
  const average = (props.good - props.bad) / all;
  const positive = (props.good * 100) / all + "%";

  if (all === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <Statistic text="Good" value={props.good} />
          <Statistic text="Neutral" value={props.neutral} />
          <Statistic text="Bad" value={props.bad} />
          <Statistic text="All" value={all} />
          <Statistic text="Average" value={average} />
          <Statistic text="Positive" value={positive} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="Good" function={() => setGood(good + 1)} />
      <Button text="Neutral" function={() => setNeutral(neutral + 1)} />
      <Button text="Bad" function={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
