import { useState } from "react";
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isChecked: boolean;
}

const users: User[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    isChecked: false,
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@example.com",
    isChecked: false,
  },
  {
    id: 3,
    firstName: "Ziggy",
    lastName: "Doe",
    email: "ziggy@example.com",
    isChecked: false,
  },
];

const NewHome = () => {
  const [myUsers, setMyUsers] = useState<User[]>(users);
  const [filteredUsers, SetFilteredUsers] = useState<User[]>(myUsers);

  const [search, setSearch] = useState<string>("");

  const handleCheck = (user: User) => {
    user.isChecked = !user.isChecked;
    setMyUsers([...users]);
  };

  const filterUsers = (keyword: string) => {
    const myfilteredUsers = users.filter((user: User) => {
      return (
        user.firstName.toLowerCase().includes(keyword.toLowerCase()) ||
        user.lastName.toLowerCase().includes(keyword.toLowerCase())
      );
    });
    SetFilteredUsers(myfilteredUsers);
  };
  //   console.log(myUsers);
  //   console.log(search);
  return (
    <div>
      <div>
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 mx-2"
        />
      </div>
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <input
              type="checkbox"
              checked={user.isChecked}
              onChange={() => handleCheck(user)}
            />
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewHome;
