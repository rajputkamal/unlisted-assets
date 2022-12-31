import React,{ useState,useEffect } from "react"
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function Loader(){
    
    const [loading,setLoading]=React.useState(false)

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        },8000)
    },[])
    return(<div>
{
    loading ? <h1>Loading</h1> : <h1>Not Loading</h1>
}
<MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justify="flex-start">
                                            <KeyboardDatePicker
                                            // classes={{root:classes.label}}
                                            className="DOB"
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            // label="Date of Birth"
                                            // value={selectedDate}
                                            // onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            />
                                            
                                        </Grid>
                                        </MuiPickersUtilsProvider>
    </div>
    )

}