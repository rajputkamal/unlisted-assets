import React from 'react';
import "./Error.css";
import Error500img from './assets/Error500.svg'
import { apiCall,getBaseurL, getBaseurLWebsite } from "../../Utils/Network"
import {
    BrowserRouter as Router,
    useLocation, useHistory, Link
} from "react-router-dom";

export default function Error500() {

    let history = useHistory();
    const location = useLocation();

    const [urlcrashed,seturlcrashed]=React.useState(location.state.urlcrashed); 

    React.useEffect(() => {
        const interval= setInterval(() => {
            // var condition = navigator.onLine ? 'online' : 'offline';

            serverupornot()

            // clearInterval(interval);
            // console.log("condition check")
        }, 8000);

        return function stopTimer() {
            clearInterval(interval)
        }
    }, []); // <-- Have to pass in [] here!

        const serverupornot = async () => {
            console.log(urlcrashed)
            try{
            let response1 = await apiCall(
                `app/healthcheck`,
                "GET", '', history
            );

            if(response1.status == 200) {

                //console.error("serverupor status 200"+urlcrashed.replace(getBaseurL(),''));

                console.log(urlcrashed+" **url** "+getBaseurLWebsite())

                let urlc = urlcrashed.replace(getBaseurLWebsite(),'')


                history.push({ pathname: "/"+urlc, state: { } });

            }

            } catch (e) {
                // console.error("serverupor not");
            }
        }

    return (
    <>
    <div className='container error_container mt-5'>
        <div className='row d-flex justify-content-center align-items-center'>            
            <div className='col-md-8 col-12'>
                <img src={Error500img} className='error-img'/>
            </div>
        </div>
    </div>
</>
)
}
