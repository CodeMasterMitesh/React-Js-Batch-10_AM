import React, { useState } from "react";

export const ContactFormNew = () => {
  // 1️⃣ Define state for all fields
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    mobile: "",
  });

  const [submittedData, setSubmittedData] = useState(null);

  // 2️⃣ Handle change for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name,value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 3️⃣ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
  };

  return (
    <div id="form">
      <form id="contactForm" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Your Name"
        />
        <br />

        <label htmlFor="lastname">Last Name</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Enter Your Last Name"
        />
        <br />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="mail@domain.com"
        />
        <br />

        <label htmlFor="mobile">Mobile Number</label>
        <input
          type="text"
          name="mobile"
          id="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Enter Your Mobile Number"
        />
        <br />

        <input type="submit" value="Submit" />
      </form>
      {submittedData && <ShowData {...submittedData} />}
    </div>
  );
};
export const ShowData = ({ name, lastname, email, mobile }) => {
  // console.log(name);
  return (
    <>
      <p>Name is {name}</p>
      <p>Last Name is {lastname}</p>
      <p>Email Id {email}</p>
      <p>Mobile Number Is {mobile}</p>
    </>
  );
};
