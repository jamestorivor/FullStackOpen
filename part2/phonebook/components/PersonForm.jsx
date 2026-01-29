const PersonForm = ({
  name,
  onSubmit,
  onChangeName,
  number,
  onChangeNumber,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name : <input value={name} onChange={onChangeName} />
      </div>
      <div>
      number : <input value={number} onChange={onChangeNumber}></input>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
