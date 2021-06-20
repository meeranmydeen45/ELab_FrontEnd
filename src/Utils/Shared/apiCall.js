import axios from "axios";

export const storeCategory = (textValue) => {
  return axios.post(
    `https://localhost:44334/api/addfields/category/?CategoryName=${textValue}`
  );
};

export const getCategory = () => {
  return axios.get(`https://localhost:44334/api/addfields/getcategory`);
};

export const storeTestType = (categoryId, textValue) => {
  return axios.post(
    `https://localhost:44334/api/addfields/testtype/?CategoryId=${categoryId}&TestName=${textValue}`
  );
};
