import axios from "axios";

export const storeCategory = (textValue) => {
  return axios.post(
    `https://localhost:44334/api/addfields/category/?CategoryName=${textValue}`
  );
};

export const getCategory = () => {
  return axios.get(`https://localhost:44334/api/addfields/getcategory`);
};

export const storeTestType = (categoryId, textValue, testCost) => {
  return axios.post(
    `https://localhost:44334/api/addfields/testtype/?CategoryId=${categoryId}&TestName=${textValue}&TestCost=${testCost}`
  );
};

export const getTestTypeById = (categoryId) => {
  return axios.get(
    `https://localhost:44334/api/addfields/gettesttype/?CategoryId=${categoryId}`
  );
};

export const StoreTestParams = (testTypeId, textBoxValues) => {
  let formData = new FormData();
  formData.append("ParamName", textBoxValues.paramName);
  formData.append("Unit", textBoxValues.paramUnit);
  formData.append("Range", textBoxValues.paramRange);
  formData.append("TypeId", testTypeId);

  return axios.post(
    `https://localhost:44334/api/addfields/storeparams`,
    formData
  );
};

export const getDataForTestSelection = () => {
  return axios.get(`https://localhost:44334/api/TestSelection/checkbox-data`);
};

export const getTestParamsAPI = (TestTypeIdPostModel, totlaCost) => {
  console.log(TestTypeIdPostModel);
  return axios.post(
    `https://localhost:44334/api/TestSelection/get-test-params?TotalCost=${totlaCost}`,
    TestTypeIdPostModel
  );
};

export const registerDoctorAPI = (name, gender) => {
  return axios.post(
    `https://localhost:44334/api/addfields/register-doctor/?name=${name}&gender=${gender}`
  );
};

export const getDoctors = () => {
  return axios.get(`https://localhost:44334/api/addfields/get-doctors`);
};
