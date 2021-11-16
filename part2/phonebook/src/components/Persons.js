const Persons = ({ persons, deleteFunction }) => {
  return (
    <div>
      {persons.map((person) => (
        <article key={person.name} className="person-card">
          <p className="person-text">
        {person.name} - {person.number}
          </p>
        <button onClick={() => deleteFunction(person)}>Delete</button>
        </article>
      ))}
    </div>
  );
};

export default Persons;
