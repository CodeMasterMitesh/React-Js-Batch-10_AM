import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, selectCounter } from "../app/createSlice.jsx";
// console.log("select",selectCounter);
const Counter = () => {
  const count = useSelector(selectCounter);
  console.log(count);
  const dispatch = useDispatch();
  // console.log(dispatch);
  return (
    <div>
      <h1>Count :{count}</h1>
      <button onClick={() => dispatch(increment())}>Increase</button>
      <button onClick={() => dispatch(decrement())}>Decrease</button>
    </div>
  );
};

export default Counter;
