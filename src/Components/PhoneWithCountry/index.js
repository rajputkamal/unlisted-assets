import React,{useState} from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
 


let PhoneField = ()=>{

    return (
              <PhoneInput
              containerStyle={{
                marginTop:"10px",
                paddingLeft:"5px"
              }}
              inputStyle={{width:"596px"}}
                  country={'IN'}
                  value={"91"}
                  onChange={()=>{} }
              />
            )
    }


export default PhoneField