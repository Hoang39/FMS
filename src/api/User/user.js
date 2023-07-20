import axios from 'axios';
import testv4_api_url from '../url'

export const loginAction = async(formValue) => {
    try {
        const res = await axios({
            method: "post",
            url: `${testv4_api_url}/auth/login/loginAction`,
            data: formValue,
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
    } catch(error) {
        return error.response.data;
    }
}

export const loginInfo = async(token) => {
    try {
        const res = await axios({
            method: "get",
            url: `${testv4_api_url}/api/AuthController/getInfoUserLogin`,
            headers: { 
                Authorization: `Bearer ${token}`,
            },
        });
        return JSON.parse(res.data.trim()).data
    } catch(error) {
        console.log(error)
        return [];
    }
}