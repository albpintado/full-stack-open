import HeaderTwo from "../components/HeaderTwo";

const Persons = ({ persons, deleteFunction }) => {
  return (
    <section>
      <HeaderTwo text="Persons in phonebook" />
      {persons.map((person) => (
        <article key={person.name} className="person-card">
          <p className="person-text">
        {person.name} - {person.number}
          </p>
        <button onClick={() => deleteFunction(person)}>Delete</button>
        </article>
      ))}
    </section>
  );
};

export default Persons;
