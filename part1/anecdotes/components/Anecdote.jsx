const Anecdote = ({ text, votes }) => {
  return (
    <>
      {text}
      <br />
      has {votes} votes
      <br />
    </>
  );
};
export default Anecdote;
