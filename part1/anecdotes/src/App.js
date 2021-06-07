import React, { useEffect, useState } from "react";

const Anecdote = (props) => <p>{props.anecdotes[props.index]}</p>;

const Votes = (props) => <p>Has {props.votes[props.index]} votes</p>;

const Button = (props) => (
  <button onClick={props.function}>{props.text}</button>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients",
  ];

  const initialVotes = new Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(initialVotes);
  const [mostVotedIndex, setMostVotedIndex] = useState(0);

  useEffect(() => {
    setMostVotedIndex(votes.indexOf(Math.max(...votes)));
  }, [votes]);

  const addVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const selectRandomAnecdote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} index={selected} />
      <Votes votes={votes} index={selected} />
      <Button function={addVote} text="Vote" />
      <Button function={selectRandomAnecdote} text="Next anecdote" />
      <h2>Anecdote with most votes</h2>
      <Anecdote anecdotes={anecdotes} index={mostVotedIndex} />
      <Votes votes={votes} index={mostVotedIndex} />
    </div>
  );
};

export default App;
