import HeaderTwo from "../components/HeaderTwo";
import Input from "../components/Input";

const Form = ({ newPerson, setNewPerson, onSubmit }) => {
  const handleInput = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setNewPerson({...newPerson, [name]: value})
  }
    return (<>
    <HeaderTwo text="Add a person to phonebook" />
    <form className="create-form" onSubmit={onSubmit}>
      <Input
        name="name"
        onChange={handleInput}
        value={newPerson.name}
        placeholder="Enter a name"
      />
      <Input
        name="number"
        onChange={handleInput}
        value={newPerson.number}
        placeholder="Enter a number"
      />
      <button>Add</button>
    </form>
    </>
  )
}
;

export default Form;
