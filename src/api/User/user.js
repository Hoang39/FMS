import axios from 'axios';

export const loginAction = async(formValue) => {
    try {
        const res = await axios({
            method: "post",
            url: 'http://testv4.adagps.com/index.php/auth/login/loginAction',
            data: formValue,
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
    } catch(error) {
        return error.response.data;
    }
}