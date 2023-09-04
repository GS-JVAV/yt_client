import req from "../utils/req";
let BASEURL = "/post-reply";


/**
 * 获取回复集合
 * @returns 
 */
const getReplyList = (pid : number) => {
    return req
        .get(`${BASEURL}/api/getReply/${pid}`)
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        });
}


/**
 * 获取回复集合
 * @returns 
 */
 const getReplyReplyList = (prid : number) => {
    return req
        .get(`${BASEURL}/api/getReplyReply/${prid}`)
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        });
}

/**
 * 新增回复
 * @returns 
 */
 const createReply = (data : any) => {
    return req
        .post(`${BASEURL}/createReply`,data)
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        });
}

export default {
    createReply,
    getReplyList,
    getReplyReplyList
}