import Part from "./Part";
const Content = (props) => {
  return (
    <>
      {props.parts.map((part, index) => (
        <Part key={index} part_name={part.name} ex_num={part.exercises}></Part>
      ))}
    </>
  );
};

export default Content;
