import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(props.anecdotes.length));

  const selectRandom = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length));
  };

  const addVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }
  const getMostVoted = () => {
    if (votes === 0 ) {
      return -1
    };

    var max = votes[0]
    var maxIndex = 0

    for(var i = 1; i < votes.length; i++) {
      if (votes[i] > max) {
        maxIndex = i
        max = votes[i]
      }
    }
    return maxIndex
  }

  return (
    <div>
      {props.anecdotes[selected]}
      <br />
      <p>has {votes[selected]} votes</p>
      <button onClick={selectRandom}>Random</button>
      <button onClick={addVote}>Vote</button>
      <h2>Anecdote of the day</h2>
      <p>{props.anecdotes[getMostVoted()]}</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
