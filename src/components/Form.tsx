import { FieldValues, useForm } from "react-hook-form";

type FormData = {
  name: string;
  age: number;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

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
          {...register("name", { required: true, minLength: 3 })}
          id="name"
          className="form-control"
          type="text"
        />
        {errors.name?.type === "required" && (
          <p className="text-danger">The name is required.</p>
        )}
        {errors.name?.type === "minLength" && (
          <p className="text-danger">The name must be at least 3 characters.</p>
        )}
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
