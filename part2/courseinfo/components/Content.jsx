import Part from "./Part";
const Content = (props) => {
  return (
    <>
      {props.parts.map((part, index) => (
        <Part key={index} name={part.name} exercises={part.exercises}></Part>
      ))}
    </>
  );
};

export default Content;
