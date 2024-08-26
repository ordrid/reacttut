import { useState } from "react";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/components/ExpensesFilter";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 10, category: "Utilities" },
    { id: 2, description: "bbb", amount: 10, category: "Groceries" },
    { id: 3, description: "ccc", amount: 10, category: "Utilities" },
    { id: 4, description: "ddd", amount: 10, category: "Entertainment" },
    { id: 5, description: "eee", amount: 10, category: "Utilities" },
  ]);

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <>
      <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        />
      </div>

      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => {
            setSelectedCategory(category);
          }}
        />
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id: number) => {
          setExpenses(expenses.filter((expense) => expense.id !== id));
        }}
      />
    </>
  );
}

export default App;
