const Dropdown = (props) => {
  return (
    <select
     className="drop-down"
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
