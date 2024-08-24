import { FormEvent, useState } from "react";

const Form = () => {
  const [person, setPerson] = useState({
    name: "",
    age: 0,
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(person);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label" htmlFor="name">
          Name
        </label>
        <input
          value={person.name}
          onChange={(event) => {
            setPerson({ ...person, name: event.target.value });
          }}
          id="name"
          className="form-control"
          type="text"
        />
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="age">
          Age
        </label>
        <input
          value={person.age}
          onChange={(event) => {
            setPerson({ ...person, age: Number.parseInt(event.target.value) });
          }}
          id="age"
          className="form-control"
          type="number"
        />
      </div>

      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
