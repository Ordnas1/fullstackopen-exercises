import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ text }) => {
  return <h2>{text}</h2>;
};

const Button = ({ label, handleClick }) => (
  <button onClick={handleClick}>{label}</button>
);

const Stats = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <table>
        <tbody>
          <StatCategory label={"good"} value={good} />
          <StatCategory label={"neutral"} value={neutral} />
          <StatCategory label={"bad"} value={bad} />
          <Average good={good} neutral={neutral} bad={bad} />
          <Positive good={good} neutral={neutral} bad={bad} />
        </tbody>
      </table>
    );
  }
};

const StatCategory = ({ label, value }) => (
  <tr>
    <td>{label}</td>
    <td>{value}</td>
  </tr>
);

const Average = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <tr>no average</tr>;
  } else {
    return (
      <tr>
        <td>average</td>
        <td>{(good - bad) / (good + neutral + bad)}</td>
      </tr>
    );
  }
};

const Positive = ({ good, neutral, bad }) => {
  if (good === 0) {
    return <tr>no positive</tr>;
  } else {
    return (
      <tr>
        <td>positive</td>
        <td>{(good / (good + neutral + bad)) * 100 + "%"}</td>
      </tr>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Handle state functions

  const addFeedback = (category, setCategory) => () => {
    setCategory(category + 1);
  };

  return (
    <div>
      <Header text="give feedback" />
      <Button label="good" handleClick={addFeedback(good, setGood)} />
      <Button label="neutral" handleClick={addFeedback(neutral, setNeutral)} />
      <Button label="bad" handleClick={addFeedback(bad, setBad)} />
      <Header text="statistics" />
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
