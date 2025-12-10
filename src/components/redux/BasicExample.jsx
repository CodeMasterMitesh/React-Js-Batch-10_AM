// Counter.js
import React from "react";
import { connect } from "react-redux";
// Action creators
const increment = () => ({
  type: "INCREMENT",
});

const decrement = () => ({
  type: "DECREMENT",
});

const Counter = ({ count, increment, decrement }) => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Redux Counter Example</h1>
      <h2>Count: {count}</h2>
      <button
        onClick={increment}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Increment
      </button>
      <button
        onClick={decrement}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Decrement
      </button>
    </div>
  );
};

// Map state to props
const mapStateToProps = (state) => ({
  count: state.count,
});
// console.log('Connect function:',connect);

// Map dispatch to props
const mapDispatchToProps = {
  increment,
  decrement,
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
