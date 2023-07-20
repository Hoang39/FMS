import axios from "axios";
import testv4_api_url from '../url'

export const getVehiclesList = async (token) => {
  try {
    const res = await axios({
      method: "post",
      url: `${testv4_api_url}/api/FuelExtendedChangeController/getVehiclesList`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/form-data; charset=UTF-8',
      },
    });
    return JSON.parse(res.data.trim()).data
  } catch(error) {
    return 'error '+error;
  }
};

export const getFuelTypeList = async (token) => {
  try {
    const res = await axios({
      method: "get",
      url: `${testv4_api_url}/api/FuelExtendedChangeController/getFuelTypeList`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return JSON.parse(res.data.trim()).data
  } catch(error) {
    return 'error '+error;
  }
};

export const getLocationList = async (token) => {
  try {
    const res = await axios({
      method: "get",
      url: `${testv4_api_url}/api/FuelExtendedChangeController/getLocationList`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return JSON.parse(res.data.trim()).data
  } catch(error) {
    return 'error '+error;
  }
};

export const getActionList = async(token, formDate) => {
  try {
    const res = await axios({
      method: "post",
      url: `${testv4_api_url}/api/FuelExtendedChangeController/searchAction`,
      data: formDate,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      },
    });
    return JSON.parse(res.data.trim()).data
  } catch(error) {
    return 'error '+error;
  }
};

export const insertFuelChange = async(token, formFuel) => {
  try {
    const res = await axios({
      method: "post",
      url: `${testv4_api_url}/api/FuelExtendedChangeController/insertFuelChange`,
      data: formFuel,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      },
    });
    return JSON.parse(res.data.trim())
  } catch(error) {
    return 'error '+error;
  }
};

export const uploadTmpFileFuel = async(token, file_attach) => {
  console.log(file_attach)
  try {
    const res = await axios({
      method: "post",
      url: `${testv4_api_url}/api/FuelExtendedChangeController/uploadTmpFileFuel`,
      data: file_attach,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      },
    });
    console.log(res)
    // return JSON.parse(res.data.trim())
  } catch(error) {
    return 'error '+error;
  }
};