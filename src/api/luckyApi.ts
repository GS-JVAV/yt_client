import req from "../utils/req";
let BASEURL = "/prize";

const getPrizeInfo = () => {
    return req
        .get(`${BASEURL}/api/getPrizeInfo`)
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        });

}

// 抽奖记录
let BASEURL_LOG = "/lottery-log";
/**
 * 获取抽奖记录
 * @returns 
 */
const getLotteryLogInfo = () => {
    return req
        .get(`${BASEURL_LOG}/api/getLotteryLog`)
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        });

}

export default {
    getPrizeInfo,
    getLotteryLogInfo
}