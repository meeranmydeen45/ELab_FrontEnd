import React, { useState, useEffect } from "react";
import SelectCategory from "../Fields/Select/SelectCategory";
import { getCategory, storeTestType } from "../Utils/Shared/apiCall";

const TestType = () => {
  const [data, setData] = useState();
  const [testType, setTestType] = useState("");
  const [testCost, setTestCost] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    let mounted = true;
    const promiseCategory = getCategory();
    promiseCategory
      .then((res) => {
        let serverData = res.data;
        if (mounted) {
          setData(serverData);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error Occured whilte Fetching Category");
      });

    return function cleanup() {
      mounted = false;
    };
  }, []);

  const handleSelectChange = (e) => {
    setCategoryId(e.target.value);
  };

  const handleSaveClick = () => {
    if (!isNaN(categoryId) && testType !== "" && !isNaN(testCost)) {
      const promiseSave = storeTestType(categoryId, testType, testCost);
      promiseSave
        .then((res) => {
          let serverData = res.data;
          alert(serverData);
          setTestType("");
          setTestCost("");
        })
        .catch((err) => {
          console.log(err);
          alert("Error occured while store testtype");
        });
    } else {
      alert("Please Enter Valid Data");
    }
  };

  return (
    <div className="testType-component">
      <h4>Add Your TestType</h4>
      <div className="form-group">
        <label>Choose Category</label>
        <SelectCategory data={data} onChange={handleSelectChange} />
      </div>
      <div className="form-group">
        <label>TestTypeName</label>
        <input
          type="text"
          className="form-control"
          value={testType}
          onChange={(e) => {
            setTestType(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Test Cost</label>
        <input
          type="text"
          value={testCost}
          onChange={(e) => setTestCost(e.target.value)}
        />
      </div>
      <div>
        <input type="button" value="SAVE" onClick={handleSaveClick} />
      </div>
    </div>
  );
};

export default TestType;
