import { setDate } from 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import { useEffect } from 'react';


const SetDate = () =>{

    const date = new Date()
    const [timepreference, settimepreference] = React.useState(1);
    const [ampmpreference, setampmpreference] = React.useState("AM");

    const [selectedDate, setSelectedDate] = React.useState(new Date(date.setTime( date.getTime() + 1 * 86400000 )));

    const [selectedDate1, setSelectedDate1] = React.useState(new Date(date.setTime( date.getTime() + 1 * 86400000 )));

    const handleDateChange1 = (date) => {
        // console.log("aqaa"+date)
        let a = date.split('T')[0]
        // let b = (date.toISOString().split('T')[1]).split('.')[0]
        // console.log("aqaa1"+a)
        // console.log("aqaa2"+b)

        let c = ""

        if(ampmpreference == 'PM') {
            c = a +' '+(parseInt(timepreference)+12)+':00:00'
        } else {
            c = a +' '+(parseInt(timepreference))+':00:00'
        }

        // console.log("aqaa3"+c)
        setSelectedDate(c);
        setSelectedDate1(date);

    };

    const handleDateChange = (date) => {
        // console.log("aqaa"+date)
        let a = date.toISOString().split('T')[0]
        // let b = (date.toISOString().split('T')[1]).split('.')[0]
        // console.log("aqaa1"+a)
        // console.log("aqaa2"+b)

        let c = ""

        if(ampmpreference == 'PM') {
            c = a +' '+(parseInt(timepreference)+12)+':00:00'
        } else {
            c = a +' '+(parseInt(timepreference))+':00:00'
        }

        // console.log("aqaa3"+c)
        setSelectedDate(c);
        setSelectedDate1(date);

    };

    const handleTimeChange = (timepreference1) => {

        // console.log("aqaa3"+timepreference1)

        let a = selectedDate1.toISOString().split('T')[0]
        // let b = (date.toISOString().split('T')[1]).split('.')[0]
        // console.log("aqaa1"+a)
        // console.log("aqaa2"+b)

        let c = ""

        if(ampmpreference == 'PM') {
            c = a +' '+(parseInt(timepreference1)+12)+':00:00'
        } else {
            c = a +' '+(parseInt(timepreference1))+':00:00'
        }


        setSelectedDate(c);
        settimepreference(timepreference1);

    };

    const handleAMPMChange = (ampmpreference1) => {

        let a = selectedDate1.toISOString().split('T')[0]
        // let b = (date.toISOString().split('T')[1]).split('.')[0]
        // console.log("aqaa1"+a)
        // console.log("aqaa2"+b)

        let c = ""

        if(ampmpreference1 == 'PM') {
            c = a +' '+(parseInt(timepreference)+12)+':00:00'
        } else {
            c = a +' '+(parseInt(timepreference))+':00:00'
        }

        // console.log("aqaa3"+c)
        setSelectedDate(c);
        setampmpreference(ampmpreference1);

    };
    

    useEffect(()=>{
        // GetTradeOnGoingTransaction();
        handleDateChange(selectedDate)
    },[])

    return (
        <div>
            <div className="row">
                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-6 col-12">
                <lable className="text-small">Last Date of offer validity *</lable>
                    <div className="border rounded p-1 mt-2">
                        <MuiPickersUtilsProvider utils={DateFnsUtils} className="w-100 m-0">
                            <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            value={selectedDate1}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            className="m-0 text-small w-100"
                            minDate = {selectedDate1}
                            maxDate = {new Date(date.setTime( date.getTime() + 4 * 86400000 ))}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-6 col-12">
                    <div className="row">
                        <div className="col-lg-7 col-md-7 col-12 validit_input">
                            <div>
                                <div class="form-group validit_input">
                                    <label for="TimeValidity" className="text-small">Time Of Validity</label>
                                    <select class="form-control custom-select-options" id="TimeValidity"
                                            onChange={(e) => {
                                                handleTimeChange(e.target.value);
                                            }}
                                            value={timepreference}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-5 col-12">
                            <div>
                                <div class="form-group">
                                    <label className="text-small" for="AmPm">Am/Pm</label>
                                    <select class="form-control custom-select-options" id="AmPm"
                                            onChange={(e) => {
                                                handleAMPMChange(e.target.value);
                                            }}
                                            value={ampmpreference}>
                                    <option>AM</option>
                                    <option>PM</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default setDate;