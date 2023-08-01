import axios from "axios";
import testv4_api_url from '../url'

export const getRegistryList = async (token, vehicle_id) => {
  try {
    const res = await axios({
      method: "get",
      url: `${testv4_api_url}/api/TabHoSoGiayToController/getHSGTDangKiem?vehicle_id=${vehicle_id}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return JSON.parse(res.data.trim())
  } catch(error) {
    return 'error '+error;
  }
};

export const getRegistryCenterList = async (token) => {
  try {
    const res = await axios({
      method: "get",
      url: `${testv4_api_url}/api/TabHoSoGiayToController/getDSTrungTamDangKiem`,
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return JSON.parse(res.data.trim()).data
  } catch(error) {
    return 'error '+error;
  }
};

export const deleteRegistry = async(token, id, vehicle_id) => {
  try {
    const res = await axios({
      method: "get",
      url: `${testv4_api_url}/api/TabHoSoGiayToController/deleteDangKiem?vehicle_id=${vehicle_id}&id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return JSON.parse(res.data.trim())
  } catch(error) {
    return 'error '+error;
  }
};

export const insertRegistry = async(token, formRegistry) => {
  try {
    const res = await axios({
      method: "post",
      url: `${testv4_api_url}/api/TabHoSoGiayToController/insertBaoHiem`,
      data: formRegistry,
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

export const viewRegistry = async(token, id, vehicle_id) => {
  try {
    const res = await axios({
      method: "get",
      url: `${testv4_api_url}/api/TabHoSoGiayToController/viewDetailDangKiem?id=${id}&vehicle_id=${vehicle_id}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return JSON.parse(res.data.trim()).data
  } catch(error) {
    return 'error '+error;
  }
};

export const updateRegistry = async(token, formRegistry) => {
  console.log(formRegistry);
  try {
    const res = await axios({
      method: "post",
      url: `${testv4_api_url}/api/TabHoSoGiayToController/updateBaoHiem`,
      data: formRegistry,
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