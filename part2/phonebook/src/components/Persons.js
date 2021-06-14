const Persons = ({ persons, deleteFunction }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} <span>-</span> <span>{person.number} </span>
          <button onClick={() => deleteFunction(person)}>Delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
