import HeaderOne from "../components/HeaderOne";
import Search from "../components/Search";

const Header = ({ setFilterQuery }) => {
return (
  <header>
    <HeaderOne text="Phonebook" />
    <Search type="search" setFilterQuery={setFilterQuery} />
  </header>
  )
};

export default Header;
