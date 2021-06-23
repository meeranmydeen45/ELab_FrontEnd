import React, { useState } from "react";
import { storePatientAPI } from "../Utils/Shared/apiCall";

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

  const [gender, setGender] = useState("");

  const handleTextBoxChange = (e) => {
    let copied = { ...textBoxValue };
    copied[e.target.name] = e.target.value;
    setTexBoxValue(copied);
  };

  const genderSelectChange = (e) => {
    setGender(e.target.value);
  };

  const handleSave = () => {
    if (
      textBoxValue.patientName !== "" &&
      textBoxValue.mobileNumber !== "" &&
      gender !== "CHOOSE"
    ) {
      const promiseSave = storePatientAPI(textBoxValue, gender);
      promiseSave
        .then((res) => {
          let serverData = res.data;
          alert(serverData);
          setTexBoxValue(initialTextBoxValue);
        })
        .catch((err) => {
          console.log(err);
          alert("Error Occured while Saving Patient Info");
        });
    } else {
      alert("Enter Valid Data");
    }
  };

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
        <input type="button" value="SAVE" onClick={handleSave} />
      </div>
    </div>
  );
}

export default Patient;
