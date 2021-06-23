import React, { useState } from "react";

function DynamicTextBox({ data, field }) {
  const [fieldValue, setFieldValue] = useState([]);

  const handleTextBoxChange = (e, j) => {
    let copied = [...field];
    console.log(j);
    copied[j][e.target.name] = e.target.value;
    setFieldValue(copied);
  };
  console.log(fieldValue);
  let inputFieldData = data.map((item, i) => {
    return (
      <div>
        <label>{item.testName}</label>
        {item.testParamList.map((item, j) => {
          return (
            <div>
              <input
                type="text"
                name={item.paramName}
                value={() => {
                  return fieldValue.length > 0
                    ? fieldValue[j][item.paramName]
                    : "";
                }}
                onChange={(e) => handleTextBoxChange(e, j)}
              />
              <label>{item.paramName}</label>
              <label>{item.unit}</label>
              <label>{item.range}</label>
              <label>{item.result}</label>
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <div>
      <div>{inputFieldData}</div>
    </div>
  );
}

export default DynamicTextBox;
