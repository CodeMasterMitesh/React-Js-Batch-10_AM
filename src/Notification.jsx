// props with Destructuring
import Button from "./components/ButtonUi";
function Notification({ msg }) {
  return (
    <>
      <div>
        <h1>{msg}</h1>
        <Button href="https://codemastermitesh.com" value="Open Btn" />
      </div>
    </>
  );
}

export default Notification;

// props
// import Button from "./components/button-ui"
// function Notification(props) {

//   return (
//     <>
//       <div>
//           <h1>{props.msg}</h1>
//           <Button/>
//       </div>
//     </>
//   )
// }

// export default Notification
