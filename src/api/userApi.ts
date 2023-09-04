import { AxiosResponse } from "axios";
import req from "../utils/req";

let BASEURL = "/user";

const logout = () => {
    return req
        .put(`${BASEURL}/api/logout`)
        .then((res) => {
            console.log(res);
            return Promise.resolve(res);
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        });
}
const reset = (data: any) => {
    return req
        .post(`${BASEURL}/resetPass`, data)
        .then((res) => {
            console.log(res);
            return Promise.resolve(res);
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        });
}

const todayCheckIn = () => {
    return req
        .put(`${BASEURL}/today/check_in`)
        .then((res) => {
            console.log(res);
            return Promise.resolve(res);
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        });
}

const lottery = () => {
    return req
        .put(`${BASEURL}/lottery`)
        .then((res) => {
            console.log(res);
            return Promise.resolve(res);
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        });
}


const getUserInfoByUid = (uid: number) => {
    return req
        .get(`${BASEURL}/api/getUserInfo/${uid}`)
        .then((res) => {
            console.log(res);
            return Promise.resolve(res);
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        });
}
const getUserInfo = () => {
    return req
        .get(`${BASEURL}/getUserInfo`)
        .then((res) => {
            console.log(res);
            return Promise.resolve(res);
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        });
}

const getUserInfoDetail = () => {
    return req
        .get(`${BASEURL}/getUserInfoDetail`)
        .then((res) => {
            console.log(res);
            return Promise.resolve(res);
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        });
}

const withdraw = (data: any) => {
    return req
        .post(`${BASEURL}/withdraw`, data)
        .then((res) => {
            console.log(res);
            return Promise.resolve(res);
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        });
}

const getWithDrawLog = () => {
    return req
        .get(`/money-withdraw-log/getLog`)
        .then((res) => {
            console.log(res);
            return Promise.resolve(res);
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        });
}
export default {
    getUserInfoByUid,
    logout, reset, todayCheckIn, lottery, getUserInfo, withdraw, getWithDrawLog, getUserInfoDetail


}