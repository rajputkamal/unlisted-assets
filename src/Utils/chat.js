import { getBaseurL, apiCall1, apiCall } from "./Network";
import { store} from "./uaredux";

const url = getBaseurL();
let stompClient;


let newMessages = new Map();

var isconnected = false;

initNetworkEvents();
let interval = ""

let intervalrunning = false

async function initNetworkEvents() {

    window.addEventListener('offline', function () {
        triggerReconnect('offline')
    });
    window.addEventListener('online', function () {
        triggerReconnect('online')
    });
}
async function triggerReconnect(eventName) {

    console.log(eventName, "event received")

    // This will trigger the "onWebSocketClose" method in stompClient
    // SockJS.close();
    if(eventName == 'online') {
        reConnectWebSocket()
    } {
        isconnected = false
    }

}


async function connectToChat (){

    //console.log("establishing connection:  "+connectionEstablished)
    if(isconnected) {
        return
    }
    try {

        console.log("connectingurl---"+url);
        const Stomp = require('stompjs')
        var SockJS = require('sockjs-client')
        SockJS = new SockJS(url + 'chat')
        stompClient = Stomp.over(SockJS);

        stompClient.connect({}, onConnected, onError);
    }catch (err) {
        // alert(err.message);
        // console.log("errrrrrrrrrrrr---"+err);

    }


}

async function onError(e) {
    try {
        // console.log("error occured in chat.js---"+e);

        reConnectWebSocket();

    }catch (err) {
        // alert(err.message);
    }

}
async function reConnectWebSocket() {
    try{
        clearTimeout(interval)
    }catch (e) {

    }

    intervalrunning = false

    const retryTimeout = 5000;
    isconnected = false;

   if(intervalrunning == false) {
       intervalrunning = true
        interval= setInterval(() => {
            // console.log('Re-connecting websocket after', retryTimeout , 'secs...')

            connectToChat();

        }, retryTimeout);
    }

}
const registerToServer = async function (){

}

async function onConnected () {

    // console.log("hhhhhhhhhh occured in chat.js---");
    try{
        clearTimeout(interval)
    }catch (e) {

    }
    intervalrunning = false
    try {
        let username = ""
        let response1 = await apiCall("chatregistration",'GET', '', "dummy")
        console.log(response1.status)

        if(response1.status == 200) {

            username = await response1.text()
            stompClient.subscribe("/topic/messages/" + username, onMessageReceived);
            console.log("able to subscribe "+username)
        } else {
            console.log("ooooo unable to subscribe "+username)
        }

        isconnected = true;
    }catch (err) {
        // alert(err.message);
        isconnected = false;
    }


}

async function onMessageReceived (payload){

    try {

        console.log("message received from server");
        // var message = JSON.parse(payload.body);

        store.dispatch({ type: 'chatupdated' })

        // console.log("message parsed211 ---"+message.message);
    }catch (err) {
        // alert(err.message+"aaaaa");
        // store.dispatch({ type: 'chatupdated' })
    }
}

async function sendMessage (from, text, selectedUser) {

    try {

        // console.log("sending message to server---");
        if (stompClient) {
            let chatMessage = {
                fromLogin: from,
                message: text
            }
            stompClient.send("/app/chat/" + selectedUser, {}, JSON.stringify(chatMessage));

        }
        console.log("message sent to the server---");
    }catch (err) {
        // alert(err.message);
        isconnected = false;
    }

}
export {connectToChat}