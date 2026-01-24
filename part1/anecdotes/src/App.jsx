import { useState } from "react";
import Button from "../components/Button";
import Title from "../components/Title";
import Anecdote from "../components/Anecdote";
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const anecdote_length = anecdotes.length - 1;
  const votes = Array.from({ length: anecdote_length + 1 }).reduce(
    (acc, _, i) => {
      acc[i] = 0;
      return acc;
    },
    {},
  );

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState({ ...votes, maxVotes: 0 });

  function generateRandomNum(min, max) {
    const n = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(n);
    return n;
  }

  return (
    <div>
      <Title text="Anecdote of the day"></Title>
      <Anecdote text={anecdotes[selected]} votes={vote[selected]}></Anecdote>
      <Button
        text="vote"
        onClick={() => {
          const newVotes = {
            ...vote,
            [selected]: vote[selected] + 1,
          };
          const newerVotes = {
            ...newVotes,
            maxVotes: parseInt(
              Object.keys(newVotes).reduce((acc, key) =>
                newVotes[acc] > newVotes[key] ? acc : key,
              ),
            ),
          };
          console.log(newerVotes);
          setVote(newerVotes);
        }}
      ></Button>
      <Button
        text="next anecdote"
        onClick={() => setSelected(generateRandomNum(0, anecdote_length))}
      ></Button>
      <Title text="Anecdote with most votes"></Title>
      <Anecdote
        text={anecdotes[vote.maxVotes]}
        votes={vote[vote.maxVotes]}
      ></Anecdote>
    </div>
  );
};

export default App;
