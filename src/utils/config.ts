// 版本号
const version = "1.0.0"

const baseUrl = {
    dev:"http://173.82.153.44:8003/client",
    test:"http://127.0.0.1:8080/client",
    production:"http://127.0.0.1:8080/client"
}

const fileBaseUrl={
    dev:"http://127.0.0.1:8080/upload",
    test:"http://127.0.0.1:8080/upload",
    production:"http://127.0.0.1:8080/upload"
}

// 是否允许跨域携带cookie
const withCredentials = false;

// 环境模式 dev test production
const environment = 'dev';

const baseTitle = "阴天论坛【打倒狗庄是我们的宗旨 爱党 爱国 爱人民】";

const baseLogo = "";
export default {
    version: version,
    apiUrl:baseUrl[environment],
    fileBaseUrl:fileBaseUrl[environment],
    timeout:15000,
    withCredentials:withCredentials,
    baseTitle:baseTitle,
    baseLogo:baseLogo,
}