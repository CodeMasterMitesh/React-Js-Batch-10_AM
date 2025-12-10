import { useState } from "react";
import { useEffect } from "react";
export const Company = () => {
  const [state, setState] = useState([]);

  const getCompanyInfo = async () => {
    const response = await fetch("http://localhost:3000/getCompanyData");
    // console.log("Response:", response);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    getCompanyInfo()
      .then((data) => {
        console.log("Company Data:", data);
        setState(data);
      })
      .catch((error) => {
        console.log("Error fetching company data:", error);
      });
  }, []);
  // console.log("State:", state);
  // const data = state;
  return (
    <>
      <h1>Company Page</h1>
      <div>
        {state.map((data, index) => (
          <CompanyInfo key={index} data={data} />
        ))}
      </div>
    </>
  );
};

const CompanyInfo = ({ data }) => {
  return (
    <>
      <div
        style={{ border: "1px solid black", margin: "10px", padding: "10px" }}
      >
        <h2>Company Name: {data.name}</h2>
        <p>Company Code: {data.company_code}</p>
        <p>Contact Number: {data.contact_number}</p>
        <p>Email: {data.email}</p>
      </div>
    </>
  );
};
