import React, { useState } from "react";
import { storeCategory } from "../Utils/Shared/apiCall";

const Category = () => {
  const [category, setCategory] = useState("");

  const handleClick = () => {
    if (category !== null && isNaN(category)) {
      const promiseSaveCategory = storeCategory(category);
      promiseSaveCategory
        .then((res) => {
          let serverData = res.data;
          alert(serverData);
          setCategory("");
        })
        .catch((err) => {
          console.log(err);
          alert("Error Occured While Adding Category");
        });
    } else {
      alert("Enter Valid Data");
    }
  };
  return (
    <div className="category-Component">
      <h4>Category Component</h4>
      <div>
        <div className="form-group">
          <label>CategoryName</label>
          <input
            type="text"
            className="form-control"
            placeholder="caterory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <input
            type="button"
            value="SAVE"
            className="btn btn-primary"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Category;
