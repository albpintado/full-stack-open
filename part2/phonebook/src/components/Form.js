const Form = (props) => (
  <form className="create-form">
    <label htmlFor="name">Name </label>
    <input
    name="name"
    onChange={props.functionOne}
    value={props.valueOne}
    placeholder="Enter a name"
    />
    <label htmlFor="number">Number </label>
    <input
    name="number"
    onChange={props.functionTwo}
    value={props.valueTwo}
    placeholder="Enter a number"
    />
    <button onClick={props.functionThree}>Add</button>
  </form>
);

export default Form;
