const Search = (props) => (
  <form onSubmit={(event) => event.preventDefault()} className="search-form">
    <label htmlFor={props.text}>Search name</label>
    <input
      name={props.text}
      onChange={props.function}
      placeholder="Search for an entry"
      className="search-input"  
    />
  </form>
);

export default Search;
