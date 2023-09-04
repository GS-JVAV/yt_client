import req from "../utils/req";

let BASEURL = "/yt-util/api";

const getYtUtilListByType = (type: string) => {
    return req
        .get(`${BASEURL}/getYtUtilList/${type}`)
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
    getYtUtilListByType
}