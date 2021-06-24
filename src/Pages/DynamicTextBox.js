import React, { useState } from "react";

function DynamicTextBox({ data, field }) {
  const [fieldValue, setFieldValue] = useState(field);

  const handleTextBoxChange = (e, i, j) => {
    let copied = [...fieldValue];
    copied[i].array[j][e.target.name] = e.target.value;
    setFieldValue(copied);
  };

  let inputFieldData = data.map((item, i) => {
    return (
      <div key={i}>
        <label>{item.testName}</label>

        {item.testParamList.map((item, j) => {
          return (
            <div key={j}>
              <input
                type="text"
                name={item.paramName}
                value={fieldValue[i].array[j][item.paramName]}
                onChange={(e) => handleTextBoxChange(e, i, j)}
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
  console.log(fieldValue);
  return (
    <div>
      <div>{inputFieldData}</div>
    </div>
  );
}

export default DynamicTextBox;
