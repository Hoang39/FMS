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
      }
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

export const deleteFuelChange = async(token, id, trk_time) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${testv4_api_url}/api/FuelExtendedChangeController/deleteFuelChange?id=${id}&trk_time=${trk_time}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return JSON.parse(res.data.trim())
  } catch(error) {
    return 'error '+error;
  }
};

export const viewFuelChange = async(token, id, trk_time) => {
  try {
    const res = await axios({
      method: "get",
      url: `${testv4_api_url}/api/FuelExtendedChangeController/viewDetailAction?id=${id}&trk_time=${trk_time}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return JSON.parse(res.data.trim()).data
  } catch(error) {
    return 'error '+error;
  }
};

export const updateFuelChange = async(token, formFuel, id) => {
  try {
    const res = await axios({
      method: "post",
      url: `${testv4_api_url}/api/FuelExtendedChangeController/updateFuelChange`,
      data: {
        ...formFuel,
        'id': id
      },
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
  console.log(file_attach._parts)
  try {
    const res = await axios({
      method: "post",
      url: `${testv4_api_url}/api/FuelExtendedChangeController/uploadTmpFileFuel`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: {
        'file_attach': file_attach
      },
    });
    console.log(res.data.trim())
    // return JSON.parse(res.data.trim())
  } catch(error) {
    console.log('error '+error);
    return 'error '+error;
  }
};