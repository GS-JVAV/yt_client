import {useCookies} from "vue3-cookies"

const { cookies } = useCookies();

const TOKENKEY = "Y-TOKEN";

// 7 days timout
const expires = 60*60*24*7;

function getCookie(){
    return cookies.get(TOKENKEY);
}
function setCookie(token : any){
    return cookies.set(TOKENKEY,token,expires);
}

function removeCookie(){
    return cookies.remove(TOKENKEY);
}
function setCookieAndName(name :string,token : any){
    return cookies.set(name,token,expires);
}
function getCookieAndName(name :string){
    return cookies.get(name);
}
function removeCookieAndName(name :string,){
    return cookies.remove(name);
}

function setCookieAndNameAndTime(name:string,value:any,time?:string | "1d"){
    return cookies.set(name,value,time);
}

export default{
    getCookie,
    setCookie,
    removeCookie,
    setCookieAndName,
    getCookieAndName,
    removeCookieAndName,
    setCookieAndNameAndTime
}