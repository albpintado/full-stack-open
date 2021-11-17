const Search = ({ type, setFilterQuery }) => {

  const handleInput = (event) => {
    const { value } = event.target;
    setFilterQuery(value);
  }
  return (
    <form onSubmit={(event) => event.preventDefault()} className="search-form">
      <label htmlFor={type}>Search name</label>
      <input
        name={type}
        onChange={handleInput}
        placeholder="Search for an entry"
        className="search-input"  
      />
    </form>
  )
};

export default Search;
