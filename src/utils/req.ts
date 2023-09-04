import axios from "axios";
import config from "./config"
import auth from "./auth"
import store from "../store";
import router from "@/router";
import util from "../utils/util";
import { ElMessage } from "element-plus";


const server = axios.create({
    baseURL: config.apiUrl,
    timeout: config.timeout,
    withCredentials: config.withCredentials,
})
server.interceptors.request.use(req => {
    req.headers["Y-TOKEN"] = store.getters.getToken || auth.getCookie();
    req.headers["Content-Type"] = req.headers["Content-Type"] || "application/json;charset=UTF-8";
    return req;
}, err => {
    return Promise.reject(err);
});

server.interceptors.response.use((res) => {
    if (res.status == 200 && res.data.status == 1) {
        if (res.data.code == 201) {
            // if (res.headers["y-token"] != undefined && (store.getters.getToken == "" || store.getters.getToken == undefined)) {
            store.commit("setToken", res.headers["y-token"]);
            let _data = JSON.parse(res.data.data);
            // console.log(res.data.data);
            // console.log(_data);
            store.commit("setUserInfo", { checkIn: _data.userInfo.checkIn, jpg: _data.userInfo.jpg, username: _data.userInfo.username, nickname: _data.userInfo.nickname, id: _data.userInfo.id, createTime: _data.userInfo.createTime, email: _data.userInfo.email,sendPostCount:_data.userInfo.sendPostCount });
            // } else {
            //     // console.log("token is exits");
            // }
        }
        if (res.data.toPage != null && res.data.toPage != '') {
            // if(res.data.toPage = "/index"){
            //     router.push({
            //         path:"/redirect",
            //         query:{
            //             from:res.data.toPage
            //         }
            //     });
            // }
            // store.commit(
            //     "setToPath", res.data.toPage);
            // router.push("/redirect");
            // if (res.data.toPage == "/index") {
            //     console.log("this");
            //     util.redirect(res.data.toPage+"?from=all");
            // } else {
            util.redirect(res.data.toPage);
            // }
            // util.redirect(store.getters.getToPath);

        }
        return Promise.resolve(res);
    } else if (res.status == 200 && res.data.code == 200402) {
        ElMessage.error(res.data.msg);
        return Promise.reject(res);
    } else {
        ElMessage.error(res.data.msg);
        router.push("/login");
    }
    if (typeof res.data.data == "string") {
        res.data.data = JSON.parse(res.data.data);
    }

    // return res;
    return Promise.reject(res);
}, err => {
    if (err.response.status === 500) {
        router.push("/error");
    }
    return Promise.reject(err);
})


export default server;