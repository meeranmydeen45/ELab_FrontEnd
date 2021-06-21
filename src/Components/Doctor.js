import React, { useState } from "react";
import { registerDoctorAPI } from "../Utils/Shared/apiCall";

function Doctor() {
  const [doctorName, setDoctorName] = useState("");
  const [gender, setGender] = useState("");

  const handleSelectChange = (e) => {
    setGender(e.target.value);
  };

  const handleSaveClick = () => {
    if ((doctorName !== "") & (gender !== "CHOOSE")) {
      const promise = registerDoctorAPI(doctorName, gender);
      promise
        .then((res) => {
          let serverData = res.data;
          alert(serverData);
          setDoctorName("");
        })
        .catch((err) => {
          alert("Error Occured while Regiter Doctor");
        });
    } else {
      alert("Provide Valid Data");
    }
  };
  return (
    <div>
      <h4>Add Your Doctors</h4>
      <div>
        <label>DoctorName</label>
        <input
          type="text"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
        />
      </div>
      <div>
        <label>Gender</label>
        <select onChange={handleSelectChange}>
          <option>CHOOSE</option>
          <option>MALE</option>
          <option>FEMALE</option>
          <option>OTHERS</option>
        </select>
      </div>
      <div>
        <input type="button" value="SAVE" onClick={handleSaveClick} />
      </div>
    </div>
  );
}

export default Doctor;
