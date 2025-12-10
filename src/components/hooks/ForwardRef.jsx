import { forwardRef } from "react";
import { useRef } from "react";
import { useId } from "react";

export const ForwardRef = () => {
  const Username = useRef("");
  const Password = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Username:", Username.current.value);
    console.log("Password:", Password.current.value);
    console.log("Form submitted");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input type="text" label="Username" ref={Username} />
        <Input type="password" label="Password" ref={Password} />
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

// this is how to create a forward ref component before react 18
// const Input = forwardRef((props, ref) => {
//     const id = useId();
//     return (
//         <div>
//             <label htmlFor={id}>{props.label}</label>
//             <input id={id} type={props.type} ref={ref} style={{ padding: '8px', margin: '8px 0', borderRadius: '4px', border: '1px solid #ccc' }} />
//         </div>
//     )
// });

// in react 18 and +version we can directly use ref in function component without forwardRef
// const Input = (props) => {
//     const id = useId();
//     return (
//         <div>
//             <label htmlFor={id}>{props.label}</label>
//             <input id={id} type={props.type} ref={ref} style={{ padding: '8px', margin: '8px 0', borderRadius: '4px', border: '1px solid #ccc' }} />
//         </div>
//     )
// };

const Input = ({ type, label, ref }) => {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        ref={ref}
        style={{
          padding: "8px",
          margin: "8px 0",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
};
