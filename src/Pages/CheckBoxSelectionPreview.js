import React from "react";

export default function ChxBoxSelectionPreview(props) {
  const data = props.data;
  const OnClick = props.onClick;

  const totalCost = data.reduce((sum, item) => sum + parseInt(item.cost), 0);
  const tableBody = data.map((item, i) => {
    return (
      <tr key={i}>
        <td>{item.testName}</td>
        <td>{item.cost}</td>
      </tr>
    );
  });

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
          onClick={OnClick}
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
