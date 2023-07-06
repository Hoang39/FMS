import axios from "axios";

export const getVehiclesList = async (token) => {
  try {
    const res = await axios({
      method: "get",
      url: "http://testv4.adagps.com/index.php/api/FuelExtendedChangeController/getVehiclesList",
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return res.data;
  } catch(error) {
    console.log(error)
    return error.response.data;
  }
};