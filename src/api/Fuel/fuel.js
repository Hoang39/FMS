import axios from "axios";

const encodeFormData = (params={}) => {
  return Object.keys(params).map(
    (key) =>
      `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&")
}

export const getVehiclesList = async (token) => {
  try {
    // const res = await axios({
    //   method: "post",
    //   url: "http://testv4.adagps.com/index.php/api/FuelExtendedChangeController/getVehiclesList",
    //   headers: {
    //     Authorization: `bearer ${token}`,
    //   },
    //   params: encodeFormData({
    //     Authentication: `${token}`,
    //   })
    // });
    const res = await axios.post(
      'http://testv4.adagps.com/index.php/api/FuelExtendedChangeController/getVehiclesList',
      encodeFormData({Authentication: token}),
      {
        headers: {
          Authorization: `bearer ${token}`
        }
      }
    )
    return res.data;
  } catch(error) {
    console.log('error', error)
    return [];
  }
};