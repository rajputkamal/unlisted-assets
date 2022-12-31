import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    Fragment,
} from 'react';
import moment from 'moment';
import { useLocation, useHistory } from "react-router-dom";

import { isLoggedIn, clearAccessToken } from "./Network";


const SessionTimeOut1 = (props) => {
    const [events, setEvents] = useState(['click', 'load', 'scroll']);
    const [second, setSecond] = useState(0);
    const [isOpen, setOpen] = useState(false);

    let history = useHistory();

    let timeStamp;
    let warningInactiveInterval = useRef();
    let startTimerInterval = useRef();

    // start inactive check
    let timeChecker = () => {
        startTimerInterval.current = setTimeout(() => {
            // alert("hiyoyo")
            let storedTimeStamp = sessionStorage.getItem('lastTimeStamp');
            warningInactive(storedTimeStamp);
        }, 60000);
    };

    // warning timer
    let warningInactive = (timeString) => {
        clearTimeout(startTimerInterval.current);

        warningInactiveInterval.current = setInterval(() => {
            const maxTime = 120;
            const popTime = 119;

            const diff = moment.duration(moment().diff(moment(timeString)));
            const minPast = diff.minutes();
            const leftSecond = 60 - diff.seconds();

            if (minPast === popTime) {
                setSecond(leftSecond);
                setOpen(true);
            }

            if (minPast === maxTime) {
                clearInterval(warningInactiveInterval.current);
                setOpen(false);
                sessionStorage.removeItem('lastTimeStamp');
                clearAccessToken();
                if(history != undefined) {
                    history.replace("/login")
                }
            }
        }, 100000);
    };

    // reset interval timer
    let resetTimer = useCallback(() => {
        clearTimeout(startTimerInterval.current);
        clearInterval(warningInactiveInterval.current);

        if (isLoggedIn()) {
            timeStamp = moment();
            sessionStorage.setItem('lastTimeStamp', timeStamp);
        } else {
            clearInterval(warningInactiveInterval.current);
            sessionStorage.removeItem('lastTimeStamp');
        }
        timeChecker();
        setOpen(false);
    }, [
        isLoggedIn()
    ]);

    // handle close popup
    const handleClose = () => {
        setOpen(false);

        resetTimer();
    };

    useEffect(() => {
        events.forEach((event) => {
            window.addEventListener(event, resetTimer);
        });

        timeChecker();

        return () => {
            clearTimeout(startTimerInterval.current);
            //   resetTimer();
        };
    }, [resetTimer, events, timeChecker]);

    console.log(second);

    if (!isOpen) {
        console.log("You have been inactive from last 2 hours, and will be logged out in 100 seconds if not active")
        return null;
    }

    // change fragment to modal and handleclose func to close
    return <Fragment/>;
};

export default SessionTimeOut1;