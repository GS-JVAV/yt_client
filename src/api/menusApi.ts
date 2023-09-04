import req from "../utils/req";


let BASEURL = "/menus/api";

const getMenus = () => {
    return req
        .get(`${BASEURL}/getMenus`)
        .then((res) => {
            let _navItem: { [key: string]: any } = {};
            if (Array.isArray(res.data.data)) {
                res.data.data.forEach((item : any) => {
                    item["children"] = {};
                    item["url"] = item["toPage"].split("/")[1];
                    item["from"] = item["desc"] || null;
                    _navItem[String(item.sort)] = item;
                });
            }
            return Promise.resolve(_navItem);
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        });
}

const getPlate = () => {
    return req
        .get(`${BASEURL}/getMenusVoUserList`)
        .then((res) => {
            let _data: { [key: string]: any } = {};
            if (Array.isArray(res.data.data["thream"])) {
                res.data.data["thream"].forEach(item => {
                    _data[item['desc']] = item;
                });
            }
            _data["index"]=res.data.data["index"];
            return Promise.resolve(_data);
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        });
}

export default {
    getMenus,
    getPlate
}