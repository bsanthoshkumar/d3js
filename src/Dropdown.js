const Dropdown = (props) => {
  return (
    <select
      name="states"
      onChange={(e) => props.onClick(e.target.value)}
      defaultValue={props.stateIndex}
    >
      {props.statesList.map((stateName, index) => (
        <option key={index} value={index}>
          {stateName}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
