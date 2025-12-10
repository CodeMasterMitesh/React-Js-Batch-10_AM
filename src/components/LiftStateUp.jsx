import React, { useState } from "react";

export const LiftStateUp = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <InputComponent inputValue={inputValue} setInputValue={setInputValue} />
      <DisplayComponent inputValue={inputValue} />
    </>
  );
};

const InputComponent = ({ inputValue, setInputValue }) => {
  // console.log(inputValue);
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        placeholder="Type something..."
      />
    </div>
  );
};

const DisplayComponent = ({ inputValue }) => {
  return (
    <div>
      <h2>Display Component</h2>
      <p>The input value will be displayed here: {inputValue}</p>
    </div>
  );
};
