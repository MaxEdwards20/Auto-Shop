import { getAllUsers, updateUser } from "../urls";
import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  status: "employee" | "user" | "manager";
}

const ManagerUpdateUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const collectUsers = () => {
    let url = getAllUsers;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  };

  useEffect(() => {
    collectUsers();
  }, []);

  const handleStatusChange = (id: string, newStatus: User["status"]) => {
    fetch(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status: newStatus }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Current Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.status}
            <button onClick={() => handleStatusChange(user.id, "employee")}>
              Set Employee
            </button>
            <button onClick={() => handleStatusChange(user.id, "user")}>
              Set User
            </button>
            <button onClick={() => handleStatusChange(user.id, "manager")}>
              Set Manager
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagerUpdateUser;
