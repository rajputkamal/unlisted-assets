import React from "react";
import money from "./completetransactionstepsGroup.png"
import trustee from "./trustee.png"
import deposit from "./deposit.png"
import copyfile from "./copyfile.png"
import NotificationIcon from "./notification-icon.svg"
import ClockIcon from "./clock.svg"
import "./notification.scoped.css"
import Buttons from "../../Components/Buttons";
import { apiCall } from '../../Utils/Network';
import Breadcrumbs from "../../Components/Breadcrumbs";
import {
    useHistory
} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Notifications(){

    let history = useHistory();

    // const [notification,setnotification] = React.useState([]);
    const [hasmore, sethasmore] = React.useState(true)
    const [num, setnum] = React.useState(20)
    // let notificationlist = []
    const [isLoading, setisLoading] = React.useState(true)



    const [notificationlist,setNotificationlist] = React.useState([]);
    React.useEffect( () => {
        getAllNotifications()

        // const interval = setInterval(async () => {
        //     await getAllNotifications()
        //     //setSeconds(seconds => seconds + 1);
        // }, 20000);
        //
        // return () => clearInterval(interval);

    }, []);
    const getAllNotifications = async function (){
        // setisLoading(true)
        let response = await apiCall("notificationua/findallaccount/"+num,'GET','', history)
        // console.log(response)
        let responseJSON = await response.json();
        // console.log(responseJSON)
        // await setnotification(responseJSON)

        setnum(num+20)
        if(responseJSON.length % 20 != 0) {
            sethasmore(false)
        } else {
            sethasmore(true)
        }

        createNotificationgrid(responseJSON)

        setisLoading(false)
        //await setNotificationlist(notificationlist1)
        await apiCall("notificationua/notificationunreadaccount",'PUT','', history)

    }

    const createNotificationgrid =(notification) =>{
        let notificationlist1 = []
        for (let i=0;i<notification.length;i++){
            notificationlist1.push(
                <div className="sign-notification ">
                    <div className="notification_row row border-bottom pt-4 pb-4 p-3">
                        <div className="col-2 col-md-1">
                            <div className="notification-img">
                                <img src={NotificationIcon} />
                                {/* <img src={notification[i].notificationImage}/> */}
                            </div>
                        </div>
                        <div className="col-10 col-md-7">
                            <div className="notification_marginLeft notification-list w-100 align-items-center">
                                {notification[i].isRead ? <p className="m-0 noti-msg"><b>{notification[i].message}</b></p>
                                    : <p className="m-0 noti-msg">{notification[i].message}</p> }

                                <p className="m-0 noti-time">
                            <span className="clock-icon">
                            <img src={ClockIcon} /></span>{notification[i].updateDate}
                                </p>

                                {/*<Buttons.PrimaryButton value="See Details"*/}

                                {/*                       onClick={()=>{*/}
                                {/*                                    //trade*/}
                                {/*                                    //trade forms*/}
                                {/*                                    //holding*/}
                                {/*                                    //holding forms*/}
                                {/*                                    //ongoingtxn*/}
                                {/*                                    //negotiations window*/}
                                {/*                                    //aggrement window*/}
                                {/*                                   // history.push({ pathname: "/notification[i].messageType" })*/}
                                {/*                           }*/}
                                {/*                       }*/}
                                {/*/>*/}

                            </div>
                        </div>
                        <div className="col-12 col-md-4 d-flex justify-content-end">
                            <div className="action-button">
                                {(notification[i].viewDetailLink == "welcome")?
                                    null:
                                    <button className="btn Sign-default float-right"

                                            onClick={async ()=>{

                                                if(notification[i].viewDetailLink == "transactions"
                                                    || notification[i].viewDetailLink == "buyeragreement") {
                                                    let response1 = await apiCall("tradeongoingtranaction/specifictxn/"+notification[i].onGoingTxnId,'GET','', history)
                                                    let responseJSON1 = await response1.json();

                                                    let response2 = await apiCall("trade/"+notification[i].tradeId,'GET','', history)
                                                    let responseJSON2 = await response2.json();

                                                    history.push({ pathname: notification[i].viewDetailLink, state: { selectedTrade: responseJSON2, selectedongoingtxn: responseJSON1 } })
                                                }
                                                if(notification[i].viewDetailLink == "holdings") {

                                                    history.push({ pathname: '/'+notification[i].viewDetailLink, state: { } })
                                                }
                                            }}>View Details</button>
                                }

                            </div>
                        </div>



                    </div>
                </div>

            )
        }
        setNotificationlist(notificationlist1)

    }
    const fetchMoreData = () => {
        getAllNotifications()
    };




    return(
    <div className="container mt-3 mb-5">
        <Breadcrumbs />
        <div className="notification_container1 bg-white pl-3 pr-3">
            {/*<div className="sign-notification">*/}
            {/*    <div className="notification_row border-bottom bg-grey pt-4 pb-4 p-3">*/}
            {/*        <div className="notification-img">*/}
            {/*            <img src={NotificationIcon} />*/}
            {/*            /!* <img src={notification[i].notificationImage}/> *!/*/}
            {/*        </div>*/}
            {/*        <div className="notification_marginLeft notification-list d-flex w-100 align-items-center">*/}
            {/*            <div className="notification-info">*/}
            {/*                <p className="m-0 noti-msg">Sign the Aggrement for Order No: <b>17881238181</b></p>*/}
            {/*                <p className="m-0 noti-time">1 day ago*/}
            {/*                    <span className="clock-icon"><img src={ClockIcon} /></span> 10:45 AM (24 hours remaining) </p>*/}
            {/*            </div>*/}
            {/*            <div className="action-button">*/}
            {/*                <button className="btn Sign-default float-right">Sign Agreement</button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="sign-notification">*/}
            {/*    <div className="notification_row border-bottom pt-4 pb-4 p-3">*/}
            {/*        <div className="notification-img">*/}
            {/*            <img src={NotificationIcon} />*/}
            {/*            /!* <img src={notification[i].notificationImage}/> *!/*/}
            {/*        </div>*/}
            {/*        <div className="notification_marginLeft notification-list d-flex w-100 align-items-center">*/}
            {/*            <div className="notification-info">*/}
            {/*                <p className="m-0 noti-msg">Sign the Aggrement for Order No: <b>17881238181</b></p>*/}
            {/*                <p className="m-0 noti-time">1 day ago*/}
            {/*                    <span className="clock-icon"><img src={ClockIcon} /></span> 10:45 AM (24 hours remaining) </p>*/}
            {/*            </div>*/}
            {/*            <div className="action-button">*/}
            {/*                <button className="btn Sign-default float-right">View Order</button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="galaxy">

                { !isLoading ?

                        <InfiniteScroll
                            dataLength={notificationlist.length}
                            next={fetchMoreData}
                            hasMore={hasmore}
                            loader={<h4>Loading...</h4>}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }
                        >
                            {notificationlist}
                        </InfiniteScroll>
                    : null
                }
            </div>





            {/*<div className="sign-notification">*/}
            {/*    <div className="notification_row bg-grey border-bottom pt-4 pb-4 p-3">*/}
            {/*        <div className="notification-img">*/}
            {/*            <img src={NotificationIcon} />*/}
            {/*            /!* <img src={notification[i].notificationImage}/> *!/*/}
            {/*        </div>*/}
            {/*        <div className="notification_marginLeft notification-list d-flex w-100 align-items-center">*/}
            {/*            <div className="notification-info">*/}
            {/*                <p className="m-0 noti-msg">Sign the Aggrement for Order No: <b>17881238181</b></p>*/}
            {/*                <p className="m-0 noti-time">1 day ago*/}
            {/*                    <span className="clock-icon"><img src={ClockIcon} /></span> 10:45 AM (24 hours remaining) </p>*/}
            {/*            </div>*/}
            {/*            <div className="action-button">*/}
            {/*                <button className="btn Sign-default float-right">Sign Agreement</button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="sign-notification">*/}
            {/*    <div className="notification_row bg-grey pt-4 pb-4 p-3">*/}
            {/*        <div className="notification-img">*/}
            {/*            <img src={NotificationIcon} />*/}
            {/*            /!* <img src={notification[i].notificationImage}/> *!/*/}
            {/*        </div>*/}
            {/*        <div className="notification_marginLeft notification-list d-flex w-100 align-items-center">*/}
            {/*            <div className="notification-info">*/}
            {/*                <p className="m-0 noti-msg">Sign the Aggrement for Order No: <b>17881238181</b></p>*/}
            {/*                <p className="m-0 noti-time">1 day ago*/}
            {/*                    <span className="clock-icon"><img src={ClockIcon} /></span> 10:45 AM (24 hours remaining) </p>*/}
            {/*            </div>*/}
            {/*            <div className="action-button">*/}
            {/*                <button className="btn Sign-default float-right">View Order</button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/* <div className="notification_row">
            <div>
                <img src={trustee}/>
            </div>
            <div className="notification_marginLeft">
                <p><b>Trustee has verified</b> the transfer for order No.1762543234</p>
                <p>20 mins ago</p>
            </div>
            </div>

            <div className="notification_row">
            <div>
                <img src={trustee}/>
            </div>
            <div className="notification_marginLeft">
                <p><b>Buyer has verified</b> the transfer for order No.1762543234</p>
                <p>25 mins ago</p>
            </div>
            </div>

            <div className="notification_row">
            <div>
                <img src={deposit}/>
            </div>
            <div className="notification_marginLeft">
                <p>Buyer has <b>deposited the amount</b> in Escrow Account please upload share transfer documents. </p>
                <p>10 mins ago</p>
            </div>
            </div>

            <div className="notification_two_colums">
            <div style={{display:"flex"}}>
            <div>
                <img src={money}/>
            </div>
            <div className="notification_marginLeft">
                <p><b>Sign the agreement</b> for the order No.1876547889</p>
                <p>10 mins ago</p>
            </div>
            </div>
            <div>
                <Buttons.SecondaryButton value="Sign Agreement"/>
            </div>
            </div>

            <div className="notification_two_colums">
            <div style={{display:"flex"}}>
            <div>
                <img src={copyfile}/>
            </div>
            <div className="notification_marginLeft ">
                <p>Your sell order for Reliance 100 shares at Rs.288.55 the transfer for order No.<b>1762545678</b></p>
                <p>10 mins ago</p>
            </div>
            </div>
            <div>
                <Buttons.SecondaryButton value="View Order"/>
            </div>
            </div>

            <div className="notification_row">
            <div>
                <img src={money}/>
            </div>
            <div className="notification_marginLeft">
                <p><b>Sign the agreement</b> for the order No.1876547889</p>
                <p>10 mins ago</p>
            </div>
            </div>

            <div className="notification_row">
            <div>
                <img src={copyfile}/>
            </div>
            <div className="notification_marginLeft">
                <p>Your sell order for Reliance 100 shares at Rs.288.55 the transfer for order No.<b>1762545678</b></p>
                <p>10 mins ago</p>
            </div>
            </div>

            <div className="notification_row">
            <div>
                <img src={copyfile}/>
            </div>
            <div className="notification_marginLeft">
                <p>Your sell order for Reliance 100 shares at Rs.288.55 the transfer for order No.<b>1762545678</b></p>
                <p>10 mins ago</p>
            </div>
            </div> */}

        </div>
    </div>)
}