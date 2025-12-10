import { useId } from "react";

export const UseId = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // const userId = useId();
  // const passwordId = useId();
  // const firstNameId = useId();

  const id = useId();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor={id + "username"}>Username</label>
        <input type="text" id={id + "username"} name="username" />
        <br />
        <label htmlFor={id + "password"}>Password</label>
        <input type="password" id={id + "password"} name="password" />
        <br />
        <label htmlFor={id + "firstname"}>First Name</label>
        <input type="text" name="firstname" id={id + "firstname"} />
        <br />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
};
