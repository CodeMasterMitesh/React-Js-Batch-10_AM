import { useContext } from "react";
import { MyContext } from "../components/hooks/ContextApi.jsx";
import Nav from "../components/nav.jsx";
import HeroBanner from "../components/HeroBanner.jsx";
console.log(MyContext);
export const About = () => {
  const value = useContext(MyContext).value;
  const data = useContext(MyContext).data;
  return (
    <>
      <Nav />
      <div>
        <h1>About Page</h1>
        <p>This is the about page of our application.</p>
        <p>{value}</p>
        <p>{data}</p>
      </div>
    </>
  );
};