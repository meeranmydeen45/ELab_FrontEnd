import React, { useState, useEffect } from "react";
import SelectDoctor from "../Fields/Select/SelectDoctor";
import { getDoctors } from "../Utils/Shared/apiCall";

const initialTextBoxValue = {
  patientName: "",
  mobileNumber: "",
  age: "",
  bloodGroup: "",
  email: "",
  address: "",
};

function Patient() {
  const [textBoxValue, setTexBoxValue] = useState(initialTextBoxValue);
  const [docorData, setDoctorData] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    let mounted = true;
    const promiseDoctor = getDoctors();
    promiseDoctor
      .then((res) => {
        let serverData = res.data;
        if (mounted) setDoctorData(serverData);
      })
      .catch((err) => {
        console.log(err);
        alert("Error occured while Fetching Doctors");
      });
    return function cleanup() {
      mounted = false;
    };
  }, []);

  const handleTextBoxChange = (e) => {
    let copied = { ...textBoxValue };
    copied[e.target.name] = e.target.value;
    setTexBoxValue(copied);
  };

  const genderSelectChange = (e) => {
    setGender(e.target.value);
  };
  const doctorSelectChange = (e) => {
    let value = e.target.value;
    let arrayValue = value.split("-");
    let doctorId = arrayValue[0];
    let doctorGender = arrayValue[1];
    setDoctorId(doctorId);
  };
  console.log(gender);
  console.log(doctorId);
  return (
    <div>
      <h4>Provide Patient Info</h4>
      <div>
        <label>Patient Name</label>
        <input
          type="text"
          value={textBoxValue.patientName}
          name="patientName"
          onChange={handleTextBoxChange}
        />
      </div>
      <div>
        <label>Mobile</label>
        <input
          type="text"
          value={textBoxValue.mobileNumber}
          name="mobileNumber"
          onChange={handleTextBoxChange}
        />
      </div>
      <div>
        <label>Age</label>
        <input
          type="text"
          value={textBoxValue.age}
          name="age"
          onChange={handleTextBoxChange}
        />
      </div>
      <div>
        <label>Gender</label>
        <select onChange={genderSelectChange}>
          <option>CHOOSE</option>
          <option>MALE</option>
          <option>FEMALE</option>
          <option>OTHERS</option>
        </select>
      </div>
      <div>
        <label>Doctor</label>
        <SelectDoctor data={docorData} onChange={doctorSelectChange} />
      </div>
      <div>
        <label>BloodGroup</label>
        <input
          type="text"
          value={textBoxValue.bloodGroup}
          name="bloodGroup"
          onChange={handleTextBoxChange}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          value={textBoxValue.email}
          name="email"
          onChange={handleTextBoxChange}
        />
      </div>
      <div>
        <label>Address</label>
        <input
          type="text"
          value={textBoxValue.address}
          name="address"
          onChange={handleTextBoxChange}
        />
      </div>
      <div>
        <input type="button" value="SAVE" />
      </div>
    </div>
  );
}

export default Patient;
