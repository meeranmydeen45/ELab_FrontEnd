import React, { useState, useEffect } from "react";
import SelectCategory from "../Fields/Select/SelectCategory";
import SelectTestType from "../Fields/Select/SelectTestType";
import {
  getCategory,
  getTestTypeById,
  StoreTestParams,
} from "../Utils/Shared/apiCall";

const TestParams = () => {
  const initialTextBoxValue = {
    paramName: "",
    paramUnit: "",
    paramRange: "",
  };

  const [categoryData, setCategoryData] = useState("");
  const [testTypeData, setTestTypeData] = useState("");
  const [testTypeId, setTestTypeId] = useState("");
  const [textBoxValue, setTextBoxValue] = useState(initialTextBoxValue);

  useEffect(() => {
    let mounted = true;
    const promiseCategory = getCategory();
    promiseCategory
      .then((res) => {
        let serverData = res.data;
        if (mounted) setCategoryData(serverData);
      })
      .catch((err) => {
        console.log(err);
        alert("Error Occured While Fetching Category");
      });

    return function cleanup() {
      mounted = false;
    };
  }, []);

  const handleSelectChangeCategory = (e) => {
    let categoryID = e.target.value;
    if (!isNaN(categoryID)) {
      let promiseTestType = getTestTypeById(categoryID);
      promiseTestType
        .then((res) => {
          let serverData = res.data;
          setTestTypeData(serverData);
        })
        .catch((err) => {
          console.log(err);
          alert("Error Occured while Fetching TestTypes");
        });
    }
  };

  const handleSelectChangeTestType = (e) => {
    setTestTypeId(e.target.value);
  };

  const handleTextBoxChange = (e) => {
    let copied = { ...textBoxValue };
    copied[e.target.name] = e.target.value;
    setTextBoxValue(copied);
  };

  const handleClickSave = () => {
    if (
      !testTypeId !== "" &&
      textBoxValue.paramName !== "" &&
      (textBoxValue.paramRange !== "") & (textBoxValue.paramUnit !== "")
    ) {
      const promiseParam = StoreTestParams(testTypeId, textBoxValue);
      promiseParam
        .then((res) => {
          let serverData = res.data;
          alert(serverData);
          setTextBoxValue(initialTextBoxValue);
        })
        .catch((err) => {
          console.log(err);
          alert("Error Occured while posting Params");
        });
    }
  };

  return (
    <div className="testParam-component">
      <h4>Add Your Params Here</h4>

      <div className="form-group">
        <label>Choose Category</label>
        <SelectCategory
          data={categoryData}
          onChange={handleSelectChangeCategory}
        />
      </div>

      <div className="form-group">
        <label>Choose TestType</label>
        <SelectTestType
          data={testTypeData}
          onChange={handleSelectChangeTestType}
        />
      </div>

      <div className="form-group">
        <label>ParamName</label>
        <input
          type="text"
          value={textBoxValue.paramName}
          onChange={handleTextBoxChange}
          name="paramName"
        />
      </div>

      <div className="form-group">
        <label>Unit</label>
        <input
          type="text"
          value={textBoxValue.paramUnit}
          onChange={handleTextBoxChange}
          name="paramUnit"
        />
      </div>

      <div className="form-group">
        <label>Range</label>
        <input
          type="text"
          value={textBoxValue.paramRange}
          onChange={handleTextBoxChange}
          name="paramRange"
        />
      </div>

      <div>
        <input type="button" value="SAVE" onClick={handleClickSave} />
      </div>
    </div>
  );
};

export default TestParams;
