import { FieldValues, useForm } from "react-hook-form";

const Form = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label" htmlFor="name">
          Name
        </label>
        <input
          {...register("name")}
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
          {...register("age")}
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
