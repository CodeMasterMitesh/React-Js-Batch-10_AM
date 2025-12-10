import React, { useState } from "react";

const userData = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

export const Test = () => {
  const [data, setData] = useState(userData);

  const countUsers = data.length;
  console.log("Total Users:", countUsers);

  const avgAge = data.reduce((sum, user) => sum + user.age, 0) / countUsers;
  console.log("Average Age:", avgAge);
  return (
    <div>
      {data.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>Age: {user.age}</p>
          <p>Average Age: {avgAge}</p>
          <p>{user.age > avgAge ? "Above Average" : "Below Average"}</p>
          <p>Total Users: {countUsers}</p>
        </div>
      ))}
    </div>
  );
};
