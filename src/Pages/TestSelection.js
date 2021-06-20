import React, { useState, useEffect } from "react";
import { getDataForTestSelection } from "../Utils/Shared/apiCall";
import TestSelectionCheckBox from "../Fields/CheckBox/TestSelectionCheckBox";
import ChxBoxSelectionPreview from "../Pages/CheckBoxSelectionPreview";
import $ from "jquery";

function TestSelection() {
  const [checkboxData, setCheckBoxData] = useState([]);
  const [checkboxValue, setCheckBoxValue] = useState([]);

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

  return (
    <div className="testSelection-Page">
      <h4>Choose Your Test Here</h4>
      <div>
        <TestSelectionCheckBox
          data={checkboxData}
          onChange={handleChekBoxChange}
          onHandleIconClick={handleIconClick}
        ></TestSelectionCheckBox>
      </div>
      <ChxBoxSelectionPreview data={checkboxValue} />
    </div>
  );
}

export default TestSelection;
