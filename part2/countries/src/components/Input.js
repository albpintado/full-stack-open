const Input = (props) => {
  return <>
    <label htmlFor={props.label}>{props.text}</label>
    <input name={props.label} onChange={props.function} />
  </>;
};

export default Input;
