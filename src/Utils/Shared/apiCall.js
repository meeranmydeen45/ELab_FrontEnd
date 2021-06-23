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

export const registerDoctorAPI = (name, gender) => {
  return axios.post(
    `https://localhost:44334/api/addfields/register-doctor/?name=${name}&gender=${gender}`
  );
};

export const getDoctors = () => {
  return axios.get(`https://localhost:44334/api/addfields/get-doctors`);
};

export const storePatientAPI = (textBoxValue, gender) => {
  const formData = new FormData();
  formData.append("PatientName", textBoxValue.patientName);
  formData.append("MobileNumber", textBoxValue.mobileNumber);
  formData.append("Age", textBoxValue.age);
  formData.append("Gender", gender);
  formData.append("BloodGroup", textBoxValue.bloodGroup);
  formData.append("Email", textBoxValue.email);
  formData.append("Address", textBoxValue.address);

  return axios.post(
    `https://localhost:44334/api/addfields/register-patient`,
    formData
  );
};

export const getTestParamsAPI = (TestTypeIdPostModel, totlaCost) => {
  return axios.post(
    `https://localhost:44334/api/TestSelection/get-test-params?TotalCost=${totlaCost}`,
    TestTypeIdPostModel
  );
};
