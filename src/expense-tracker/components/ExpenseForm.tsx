import { z } from "zod";
import { useForm } from "react-hook-form";
import categories from "../categories";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description should at least have 3 characters" })
    .max(50, { message: "Description should at most have 50 characters" }),
  amount: z
    .number({ invalid_type_error: "Amount is required" })
    .min(0.01, { message: "Amount should be at least 1 cent" })
    .max(100_000, { message: "Amount should at most be $100,000" }),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required" }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;

type Props = {
  onSubmit: (data: ExpenseFormData) => void;
};

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label className="form-label" htmlFor="description">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          className="form-control"
          type=""
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="amount">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          className="form-control"
          type="number"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="category">
          Category
        </label>
        <select
          {...register("category")}
          id="category"
          className="form-select"
          defaultValue={""}
        >
          <option></option>
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>

      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default ExpenseForm;
