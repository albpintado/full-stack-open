const Search = (props) => (
  <div>
    <label htmlFor={props.text}>Search name </label>
    <input name={props.text} onChange={props.function} />
  </div>
);

export default Search;
