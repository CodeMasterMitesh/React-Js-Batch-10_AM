import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  // console.log(count);
  // console.log(count);

  return (
    <div>
      <h1>Count :{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
};

export default Counter;
