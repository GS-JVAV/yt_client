
import config from "./config"
import router from "@/router";

import store from "../store";



/**
 * 重定向一次 (强制刷新页面)
 * @param path 即将跳转的路径
 */
const redirect = (path: string) => {
    store.commit(
        "setToPath", path);
    router.push("/redirect");
}

/**
 * 把图片url字符串转成数组
 * @param str 图片url字符串
 * @returns 图片url数据
 */
const i2a = (str: string) => {

    if (str == "" || str == null) {
        return null;
    }
    let arr = str.split(";");
    // for (let i in arr) {
    //     arr[i] = config.fileBaseUrl + "/" + arr[i];
    // }
    return arr;
}

/**
 * 把字符串转成json
 * @param str 字符串
 * @returns json
 */
const string2json = (str: any) => {
    if(str == "" || str ==null){
        return null;
    }
    if (typeof str == "string") {
        str = JSON.parse(str);
    }
    return str;
}

/**
 * 把换行转义的字符串转成换行的字符串
 * @param str 字符串
 * @returns 换行的字符串
 */
const n2entry = (str: any) => {
    if (typeof str == "string") {
        str = str.replaceAll(
            "\\n",
            "\n"
        );
    }
    return str;
}

/**
 * 时间转成可视化时间 XX分钟前或其他
 */

const time2visualTime = (time: string) => {
    let visualTime = "";
    let updateTime = new Date(time).getTime();
    let now = new Date().getTime();
    let seconds = (now - updateTime) / 1000;

    // console.log(seconds);

    let minutes = seconds / 60;
    let hours = minutes / 60;
    let days = hours / 24;
    let weeks = days / 7;
    let months = weeks / 4;
    let years = months / 12;
    // console.log(weeks, days, hours, minutes);

    if (minutes > 60) {
        if (hours > 24) {
            if (days > 7) {
                if (weeks > 4) {
                    if (months > 12) {
                        return `${Math.floor(years)}年前`;
                    } else {
                        return `${Math.floor(months)}月前`;
                    }
                } else {
                    return `${Math.floor(weeks)}周前`;
                }
            } else {
                return `${Math.floor(days)}天前`;
            }
        } else {
            return `${Math.floor(hours)}小时前`;
        }
    } else {
        if (minutes < 1) {
            return `刚刚`;
        }
        return `${Math.floor(minutes)}分钟前`;
    }

}

// 打开新页面
const goBlankPage = (url: string) => {
    window.open(`${url}`, "_blank");
};

/**
 * 打开用户信息页面
 * @param uid 用户id
 */
const goUserInfoView = (uid : number)=>{
    // if(store.getters.getUserInfo["id"]==uid){
    //     window.open(`/info`,"_blank");
    // }else{
    // window.open(`/userInfo?uid=${uid}`,"_blank");
    // }
    window.open(`/userInfo?uid=${uid}`,"_blank");

}

export default {
    i2a,
    string2json,
    n2entry,
    redirect,
    time2visualTime,
    goBlankPage,
    goUserInfoView
}