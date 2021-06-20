import React from "react";
import { getTestParamsAPI } from "../Utils/Shared/apiCall";

export default function ChxBoxSelectionPreview(props) {
  const data = props.data;

  const totalCost = data.reduce((sum, item) => sum + parseInt(item.cost), 0);
  const tableBody = data.map((item, i) => {
    return (
      <tr key={i}>
        <td>{item.testName}</td>
        <td>{item.cost}</td>
      </tr>
    );
  });

  const handleConfirmClick = () => {
    let arrayofIds = [];
    for (let i = 0; i < data.length; i++) {
      arrayofIds.push(data[i].id);
    }
    let TestTypeIdPostModel = {};
    TestTypeIdPostModel.TestTypeId = arrayofIds;

    const promiseParams = getTestParamsAPI(TestTypeIdPostModel, totalCost);
    promiseParams
      .then((res) => {
        let data = res.data;
        console.log(data);
      })
      .catch((err) => {
        alert("Error Occured whilte Fetching Params");
      });
  };
  return (
    <div className="preview-checkbox-selection">
      <p style={{ textAlign: "center" }}>Test Preview</p>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Test Name</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
      <p style={{ background: "lightblue", display: "flex" }}>
        <input
          style={{
            flex: 1,
          }}
          type="button"
          className="btn btn-primary"
          value="Confirm"
          onClick={handleConfirmClick}
        />
        <label
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "lightgreen",
            fontSize: "14px",
          }}
        >
          Total: {totalCost} INR
        </label>
      </p>
    </div>
  );
}
