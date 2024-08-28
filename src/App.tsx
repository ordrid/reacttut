import { useEffect, useState } from "react";
import { CanceledError } from "./services/api-client";
import userService, { User } from "./services/user-service";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const { request, cancel } = userService.getAll<User>();

    request
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
        console.log("IsLoading: ", isLoading);
      })
      .catch((err) => {
        if (err instanceof CanceledError) {
          return;
        }

        setIsLoading(false);
        console.log("IsLoading: ", isLoading);
        setError(err.message);
      });
    setIsLoading(false);

    return () => cancel();
  }, []);

  const addUser = () => {
    const newUser = { id: 0, name: "Mosh" };
    const origUsers = [...users];
    setUsers([...users, newUser]);

    userService
      .create<User>(newUser)
      .then(({ data: saveduser }) => setUsers([...users, saveduser]))
      .catch((err) => {
        setError(err.message);
        setUsers(origUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };

    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    userService.update<User>(user.id, updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const deleteUser = (user: User) => {
    const origUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    userService.delete(user.id).catch((err) => {
      setError(err.message);
      setUsers(origUsers);
    });
  };

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add user
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
