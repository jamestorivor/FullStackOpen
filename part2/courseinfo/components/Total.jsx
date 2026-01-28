const Total = (props) => {
  const sum = props.parts.reduce((acc, part) => acc + part.exercises, 0);
  return (
    <>
      <b>total of {sum} exercises</b>
    </>
  );
};

export default Total;
