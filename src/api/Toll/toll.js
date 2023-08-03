import axios from "axios";
import testv4_api_url from '../url'

export const getTollList = async (token, vehicle_id) => {
  try {
    const res = await axios({
      method: "get",
      url: `${testv4_api_url}/api/TabHoSoGiayToController/getHSGTPhiDuongBo?vehicle_id=${vehicle_id}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return JSON.parse(res.data.trim())
  } catch(error) {
    return undefined;
  }
};

export const getVehicleTollList = async (token) => {
    try {
      const res = await axios({
        method: "get",
        url: `${testv4_api_url}/api/TabHoSoGiayToController/get_list_loaiphuongtien_phiduongbo`,
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      return JSON.parse(res.data.trim()).data
    } catch(error) {
      return 'error '+error;
    }
};

export const getVehiclePeriodTollList = async (token) => {
    try {
      const res = await axios({
        method: "get",
        url: `${testv4_api_url}/api/TabHoSoGiayToController/get_list_phiduongbo_theo_loaiphuongtien`,
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      return JSON.parse(res.data.trim()).data
    } catch(error) {
      return 'error '+error;
    }
};

export const deleteToll = async(token, id, vehicle_id) => {
    try {
      const res = await axios({
        method: "get",
        url: `${testv4_api_url}/api/TabHoSoGiayToController/deletePhiduongbo?vehicle_id=${vehicle_id}&id=${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      return JSON.parse(res.data.trim())
    } catch(error) {
      return 'error '+error;
    }
};

export const insertToll = async(token, formToll) => {
    try {
      const res = await axios({
        method: "post",
        url: `${testv4_api_url}/api/TabHoSoGiayToController/insertPhiduongbo`,
        data: formToll,
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

export const updateToll = async(token, formToll) => {
    try {
      const res = await axios({
        method: "post",
        url: `${testv4_api_url}/api/TabHoSoGiayToController/updatePhiduongbo`,
        data: formToll,
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

export const viewToll = async(token, id, vehicle_id) => {
    try {
      const res = await axios({
        method: "get",
        url: `${testv4_api_url}/api/TabHoSoGiayToController/viewDetailPhiDuongBo?id=${id}&vehicle_id=${vehicle_id}`,
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      return JSON.parse(res.data.trim()).data
    } catch(error) {
      return 'error '+error;
    }
  };