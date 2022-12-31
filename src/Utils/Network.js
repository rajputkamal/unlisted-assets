import { useHistory } from "react-router-dom";


// const BASE_URL = "http://localhost:8080/"
// const BASE_URL_WEBSITE = "http://localhost:3000/"

const BASE_URL_WEBSITE = "https://www.unlistedassets.com/"
const BASE_URL = "https://api.unlistedassets.com/"

const BASE_URL_IMG = "https://d1znhr1wdx5z43.cloudfront.net/"
var ACCESS_TOKEN = window.localStorage.getItem("ACCESS_TOKEN")
var DisclaimerModal = window.localStorage.getItem("disclaimer")
var CHANGE_PASSWORD_REDIRECT = window.sessionStorage.getItem("CHANGE_PASSWORD_REDIRECT")

let basicAuth = {username: "mobile", password: "abc"}



// console.log("ACCESS_TOKEN 12",ACCESS_TOKEN)


async function apiCall(url, method='GET', body, history) { 

    let completeUrl = BASE_URL + url
    if(ACCESS_TOKEN && !url.includes("oauth"))
        completeUrl = completeUrl + "?access_token=" + ACCESS_TOKEN

    let headers = {
        "content-type": "application/json" ,
        "Authorization": 'Basic ' + btoa(basicAuth.username + ":" + basicAuth.password)
    }
    let response = '';

    try {


        if(method == 'GET' || method =='HEAD') {
            response = await fetch(completeUrl, {method, headers })
        } else {
            response = await fetch(completeUrl, {method, body: JSON.stringify(body), headers })
        }

        if(response.status == 401) {
            clearAccessToken()
            if(history != undefined) {
                history.replace("/login")
            }
        }
    } catch (e) {

        console.log("hahahha ", e)
        if(!window.location.href.includes("error")) {

            // console.log("hahahha11111 "+window.location.href)
            history.push({ pathname: "/error500", state: { urlcrashed: window.location.href } });
            // // errorToast("Invalid", "Internet or Service is down, try after some time...");
            // // window.location.reload();
        }
    }

    // console.log('aaaaaaaaa'+response.status);

    try {
        if(CHANGE_PASSWORD_REDIRECT != undefined || CHANGE_PASSWORD_REDIRECT != null) {
            // let history1 = useHistory();
            history.push("/resetpassword");

        }
    } catch (e) {
        console.log("hahahha "+e)
    }

    return response
}

function getBaseurL() {
    return BASE_URL
}

function getBaseurLWebsite() {
    return BASE_URL_WEBSITE
}

async function apiCall00(url, method='GET', body, history, option1, option2) {

    let completeUrl = BASE_URL + url
    if(ACCESS_TOKEN && !url.includes("oauth"))
        completeUrl = completeUrl + "?access_token=" + ACCESS_TOKEN

    let headers = {
        "content-type": "application/json" ,
        "Authorization": 'Basic ' + btoa(basicAuth.username + ":" + basicAuth.password)
    }
    let response = '';

    completeUrl = completeUrl + "&a="+option1
    completeUrl = completeUrl + "&b="+option2

    if(method == 'GET' || method =='HEAD') {
        response = await fetch(completeUrl, {method, headers })
    } else {
        response = await fetch(completeUrl, {method, body: JSON.stringify(body), headers })
    }


    // console.log('aaaaaaaaa'+response.status);

    if(response.status == 200 || CHANGE_PASSWORD_REDIRECT) {
        // history.push("/resetpassword");
    }

    return response
}

async function redirectFirstLogin(history) {
    let response1 = await apiCall(
        `useronboarding/firsttimelogin`,
        "GET", '', ""
    );
    console.log("response1",response1);

    if(response1.status == 200) {
        // console.log('pass1'+password)
        setChangePasswordRedirect('CHANGE_PASSWORD_REDIRECT');
        history.push("/resetpassword");

    } else {
        // // console.log('pass2'+password)
        // clearChangePasswordRedirect(null)
        // history.push("/inventory_1");
    }

}

async function apiCall25(url, method='GET', body, history) {

    let completeUrl = url
    body = BASE_URL + body
    if(ACCESS_TOKEN && !url.includes("oauth"))
        completeUrl = completeUrl + "?access_token=" + ACCESS_TOKEN

    let headers = {
        "content-type": "text/uri-list" ,
        "Authorization": 'Basic ' + btoa(basicAuth.username + ":" + basicAuth.password)
    }
    let response = '';

    if(!completeUrl.includes("localhost")) {
        completeUrl = completeUrl.replace("http", "https")
    }


    if(method == 'GET' || method =='HEAD') {
        response = await fetch(completeUrl, {method, headers })
    } else {
        response = await fetch(completeUrl, {method, body: body, headers })
    }


    // console.log('aaaaaaaaa'+response.status);

    if(response.status == 200 || CHANGE_PASSWORD_REDIRECT) {
        // history.push("/resetpassword");
    }

    return response
}
async function apiCall26(url, method='GET', body, history) {

    let completeUrl = BASE_URL + url
    body = BASE_URL + body
    if(ACCESS_TOKEN && !url.includes("oauth"))
        completeUrl = completeUrl + "?access_token=" + ACCESS_TOKEN

    let headers = {
        "content-type": "text/uri-list" ,
        "Authorization": 'Basic ' + btoa(basicAuth.username + ":" + basicAuth.password)
    }
    let response = '';

    if(method == 'GET' || method =='HEAD') {
        response = await fetch(completeUrl, {method, headers })
    } else {
        response = await fetch(completeUrl, {method, body: body, headers })
    }


    // console.log('aaaaaaaaa'+response.status);

    if(response.status == 200 || CHANGE_PASSWORD_REDIRECT) {
        // history.push("/resetpassword");
    }

    return response
}
async function apiCall12(url, method='GET', body, history) {

    let completeUrl = BASE_URL + url
    if(ACCESS_TOKEN && !url.includes("oauth"))
        completeUrl = completeUrl + "&access_token=" + ACCESS_TOKEN

    let headers = {
        "content-type": "application/json" ,
        "Authorization": 'Basic ' + btoa(basicAuth.username + ":" + basicAuth.password)
    }
    let response = '';

    if(method == 'GET' || method =='HEAD') {
        response = await fetch(completeUrl, {method, headers })
    } else {
        response = await fetch(completeUrl, {method, body: JSON.stringify(body), headers })
    }


    // console.log('aaaaaaaaa'+response.status);

    if(response.status == 200 || CHANGE_PASSWORD_REDIRECT) {
        // history.push("/resetpassword");
    }

    return response
}

async function apiCall1(url, method='GET', body, history) {

    let completeUrl = BASE_URL + url
    if(ACCESS_TOKEN && !url.includes("oauth"))
        completeUrl = completeUrl + "?access_token=" + ACCESS_TOKEN

    let headers = {
        // "content-type": "multipart/form-data; boundary =-----",
        "Authorization": 'Basic ' + btoa(basicAuth.username + ":" + basicAuth.password)
    }
    let response = '';

    if(method == 'GET' || method =='HEAD') {
        response = fetch(completeUrl, {method, headers })
    } else {
        response = fetch(completeUrl, {method, body: body, headers })
    }


    if(response.status == 200 || CHANGE_PASSWORD_REDIRECT) {
        // history.push("/resetpassword");
    }
    return response
}

function downloadurl(url) {

    let completeUrl = BASE_URL + url
    if(ACCESS_TOKEN && !url.includes("oauth"))
        completeUrl = completeUrl + "?access_token=" + ACCESS_TOKEN



    return completeUrl
}


function imgurl(url) {

    let completeUrl = BASE_URL_IMG + url
    // if(ACCESS_TOKEN && !url.includes("oauth"))
    //     completeUrl = completeUrl + "?access_token=" + ACCESS_TOKEN
    return completeUrl
}

function setAccessToken(token) {
    ACCESS_TOKEN = token
    window.localStorage.setItem("ACCESS_TOKEN", token);
}

// function statusDisclaimer(dis) {
//     DisclaimerModal =  window.localStorage.getItem("disclaimer")
//     setTimeout(() => {
//         window.localStorage.setItem("disclaimer", false);
//           }, 5000);    
// }

function setChangePasswordRedirect(value) {
    CHANGE_PASSWORD_REDIRECT = value
    window.sessionStorage.setItem("CHANGE_PASSWORD_REDIRECT", value);
}

function clearChangePasswordRedirect(value) {
    CHANGE_PASSWORD_REDIRECT = null
    window.sessionStorage.removeItem("CHANGE_PASSWORD_REDIRECT");
}

function clearAccessToken(token) {
    ACCESS_TOKEN = null
    window.localStorage.removeItem("ACCESS_TOKEN");
}

// console.log("ACCESS_TOKEN 234",ACCESS_TOKEN)


function isLoggedIn() {    
    // console.log("ACCESS_TOKEN 238",ACCESS_TOKEN)

    if(ACCESS_TOKEN){
        return true;
    }
    return false
}

function returnTodayDate() {

    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const today1 = dd + '-' + mm + '-' + yyyy;
    return today1

}

export { getBaseurL, apiCall00,apiCall26, apiCall25, apiCall12, apiCall, apiCall1, setChangePasswordRedirect,clearChangePasswordRedirect, downloadurl, setAccessToken,  isLoggedIn, clearAccessToken, getBaseurLWebsite, returnTodayDate, imgurl}

// prod // 8080 and api.unlistedassets.com
// ua-dashboard.unlistedassets.com
//
// uat // 8081 and api1.unlistedassets.com
// www.unlistedassets.com