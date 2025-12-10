import React, { useState } from "react";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    mobile: "",
  });

  const changeData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formDetails = (e) => {
    e.preventDefault();
    // setFormData(formData);
    // console.log(formData);
    let name = formData.name;
    let lastName = formData.lastname;
    let email = formData.email;
    let mobile = formData.mobile;
    console.log(name, lastName, email, mobile);
  };
  return (
    <>
      <div id="form">
        <form action="" method="POST" id="contactForm" onSubmit={formDetails}>
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={changeData}
            placeholder="Enter Your Name"
          />
          <br />
          <label htmlFor="">Last Name</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={formData.lastname}
            onChange={changeData}
            placeholder="Enter Your LastName"
          />
          <br />
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={changeData}
            placeholder="mail@domain.com"
          />
          <br />
          <label htmlFor="">Mobile Number</label>
          <input
            type="text"
            name="mobile"
            id="mobile"
            value={formData.mobile}
            onChange={changeData}
            placeholder="Enter Your Mobile Number"
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
      <p>
        {formData.name} {formData.lastname} {formData.email} {formData.mobile}
      </p>
    </>
  );
};
