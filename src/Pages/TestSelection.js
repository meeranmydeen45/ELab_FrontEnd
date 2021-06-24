import React, { useState, useEffect } from "react";
import {
  getDataForTestSelection,
  getTestParamsAPI,
} from "../Utils/Shared/apiCall";
import TestSelectionCheckBox from "../Fields/CheckBox/TestSelectionCheckBox";
import ChxBoxSelectionPreview from "../Pages/CheckBoxSelectionPreview";
import Patient from "../Components/Patient";
import DynamicTextBox from "../Pages/DynamicTextBox";
import $ from "jquery";

function TestSelection() {
  const [checkboxData, setCheckBoxData] = useState([]);
  const [checkboxValue, setCheckBoxValue] = useState([]);
  const [dynamicTextBoxData, setDynamicTextBoxData] = useState([]);
  const [dynamicTextBoxField, setDynamicTextBoxField] = useState([]);
  const [renderDynamic, setRenderDynamic] = useState(false);
  let component = "Component";
  useEffect(() => {
    let mounted = true;
    const promiseDataForCheckBox = getDataForTestSelection();
    promiseDataForCheckBox
      .then((res) => {
        let serverData = res.data;
        if (mounted) setCheckBoxData(serverData);
      })
      .catch((err) => {
        console.log(err);
        alert("Error Occured whilte Fetching Data for CheckBox");
      });
    return function cleanup() {
      mounted = false;
    };
  }, []);

  const totalCost = checkboxValue.reduce(
    (sum, item) => sum + parseInt(item.cost),
    0
  );

  const handleChekBoxChange = (e) => {
    let inputId = e.target.id;
    let checkBox = $("#" + inputId);
    let isChecked = checkBox.is(":checked");

    let objArray = [];
    let previewBox = "";
    if (isChecked) {
      objArray = [...checkboxValue];
      let obj = {};
      obj.id = checkBox.attr("id");
      obj.testName = checkBox.attr("value");
      obj.cost = checkBox.attr("cost");
      objArray.push(obj);
      setCheckBoxValue(objArray);
    } else {
      objArray = [...checkboxValue];
      objArray = objArray.filter((item) => item.id !== checkBox.attr("id"));
      setCheckBoxValue(objArray);
    }
    previewBox = document.getElementsByClassName(
      "preview-checkbox-selection"
    )[0];

    if (objArray.length > 0) {
      previewBox.style.maxHeight = previewBox.scrollHeight + 40 + "px";
    } else {
      previewBox.style.maxHeight = 0;
    }
  };

  const handleIconClick = (e) => {
    let checkBoxCollection = e.currentTarget.parentNode.nextElementSibling;

    if (checkBoxCollection.style.height) {
      checkBoxCollection.style.height = null;
    } else {
      checkBoxCollection.style.display = "block";
      checkBoxCollection.style.height = checkBoxCollection.scrollHeight + "px";
    }
  };

  const handleConfirmClick = () => {
    let arrayofIds = [];
    for (let i = 0; i < checkboxValue.length; i++) {
      arrayofIds.push(checkboxValue[i].id);
    }
    let TestTypeIdPostModel = {};
    TestTypeIdPostModel.TestTypeId = arrayofIds;

    const promiseParams = getTestParamsAPI(TestTypeIdPostModel, totalCost);
    promiseParams
      .then((res) => {
        let data = res.data;
        setDynamicTextBoxData(data);
        let arrayofObj = [];
        data.forEach((item, i) => {
          let obj = {};
          obj.id = item.testName;
          obj.array = [];
          if (item.testParamList.length > 0) {
            item.testParamList.forEach((item, j) => {
              let obj2 = {};
              obj2[item.paramName] = "";
              obj.array.push(obj2);
            });
          }

          arrayofObj.push(obj);
        });
        setDynamicTextBoxField(arrayofObj);
        setRenderDynamic(true);
      })
      .catch((err) => {
        alert("Error Occured whilte Fetching Params");
      });
  };

  const handleDynamicBoxChange = () => {};

  if (renderDynamic) {
    component = (
      <DynamicTextBox
        data={dynamicTextBoxData}
        onChange={handleDynamicBoxChange}
        field={dynamicTextBoxField}
      />
    );
  }
  return (
    <div className="testSelection-Page">
      <div className="top-Page">
        <Patient />
      </div>
      <div className="bottom-Page">
        <h4>Choose Your Test Here</h4>
        <div>
          <TestSelectionCheckBox
            data={checkboxData}
            onChange={handleChekBoxChange}
            onHandleIconClick={handleIconClick}
          ></TestSelectionCheckBox>
        </div>
        <ChxBoxSelectionPreview
          data={checkboxValue}
          onClick={handleConfirmClick}
        />
      </div>
      <div className="dynamic">{component}</div>
    </div>
  );
}

export default TestSelection;
