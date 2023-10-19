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
    return undefined;
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
      url: `${testv4_api_url}/api/TabHoSoGiayToController/insertDangKiem`,
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
  console.log(formRegistry.file_attach);
  try {
    const res = await axios({
      method: "post",
      url: `${testv4_api_url}/api/TabHoSoGiayToController/updateDangKiem`,
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

export const upLoadImageRegistry = async(token, file_image) => {
  console.log(file_image._parts);
  try {
    const res = await axios({
      method: "post",
      url: `${testv4_api_url}/api/TabHoSoGiayToController/uploadTmpFileDangKiem`,
      data: file_image,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      },
    });
    console.log(res.data.trim())
    return JSON.parse(res.data.trim())
    // return JSON.parse(res.data.trim()).data
  } catch(error) {
    return 'error '+error;
  }
};