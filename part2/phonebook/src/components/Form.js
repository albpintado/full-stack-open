const Form = (props) => (
  <form>
    <label htmlFor="name">Name </label>
    <input name="name" onChange={props.functionOne} value={props.valueOne} />
    <br />
    <label htmlFor="number">Number </label>
    <input name="number" onChange={props.functionTwo} value={props.valueTwo} />
    <br />
    <button onClick={props.functionThree}>Add</button>
  </form>
);

export default Form;
