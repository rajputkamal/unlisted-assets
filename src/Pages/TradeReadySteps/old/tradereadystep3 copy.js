import React,{useState, useEffect} from "react";
import "./tradereadystep3.css"
import Demat from "./Demat.png"
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import Buttons from "../../Components/Buttons"
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import { apiCall } from "../../Utils/Network";
import {
    successToast,errorToast
  } from "../../../src/Components/Toast/index";
import { Link, useHistory } from "react-router-dom";
import Loadbutton from '../../Components/Loadbutton/LoadbuttonSmall';

const useStyles = makeStyles((theme)=>({
    FormControl:{
        marginLeft:"7px",
        justifyContent:"space-between",
        paddingLeft:"10px"
    },
    label:{
        fontWeight: "500",
        fontSize: 14,
        color: "#2E384D",
        marginLeft: "7px",
        
    },
    droplabel:{
        fontWeight: "500",
        fontSize: 14,
        color: "#2E384D",
        marginLeft: "-2px",
        
    }
}))

let AddDematAccount =(props)=>{
    const classes = useStyles()
    let history = useHistory();
    const [depositoryName,setDepositoryname]=useState('')
    const [brokerName,setBrokerName]=useState('')
    const [ dematid, setDematid] = useState('')
    const [ confirmdematid, setConfirmDematid]= useState('')
    const [dpid , setDpId]= useState('')
    const [boid , setBoId]= useState('')
    const [dmatcall,setDmatcall]= useState('')
    const [isLoadingbtn, setLoadingbtn] = useState(false);


    const [depository, setDepository] = useState(false);
    const [showDPID, setshowDPID] = useState(false);
    const [showBOID, setshowBOID] = useState(true);


    //console.log(depository.value)



    // const handleChange =(event)=>{
    //     setValue(event.target.value)
    // }

    // const editOffer = () =>{
    //     props.setGetfunction(dpid)
    // }


    useEffect(()=>{
        callDmat()
    },[])
    const callDmat = async function () {
        let response = await apiCall("useronboarding/dmat",'GET','', history)
        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        let responseJSON = await response.json()
        setDmatcall(responseJSON)
        setDematid(responseJSON.dmatId)
        setDpId(responseJSON.dpId)
        setBoId(responseJSON.boId)
        setBrokerName(responseJSON.brokerName)
        setDepositoryname(responseJSON.depositoryName)
    }

    const validate = async (field, errorMessage) => {
        //console.log("hihhihihihihihihihihihihihihihihihiiiiiii"+field, errorMessage)

        switch (field) {
            case 'accountNumber':
                //console.log("hooooooooooooooooo1"+errorMessage)
                errorToast("Invalid", errorMessage);

                break;

            default:
                // console.log("")
        }
    }

  const saveContinue = async function () {
    props.setGetfunctiondpid(!dpid)
    props.setGetfunctionboid(!boid)

    props.setGetfunctionCDSL(depository)


        // let response = await fetch('getholding').toJson()
        // setRowInformation(response)
        let requestBody ={

            "dmatId": dematid,
            "dpId": dpid,
            "boId": boid ,
            "depositoryName": depositoryName,
            "brokerName": brokerName
        }
       
        let response = await apiCall("useronboarding/dmat", 'POST',requestBody, history)
      if(response.status == undefined) {
          // errorToast("Invalid", "Invalid User ID or password");
          return
      }
        //console.log("api called ",response)

        let responseJSON = await response.json()
        
        //console.log("responseJson", responseJSON)

      if(response.status == 400) {
          let i = 0;
          const arrayerrormessages = responseJSON.details1;
          //console.log(arrayerrormessages)
          const listItems = arrayerrormessages.map((errorResponse) =>
              validate(errorResponse.field,errorResponse.errorMessage)
          );

      }else if (response.status !== 200) {
          errorToast("Invalid", "Demat Account Not Updated...");
          return;
      }else if (response.status === 200){
          successToast("Success","Demat Account Updated")
          props.nextPage()
      }
     
        
    }
    const handleChange = (e) => {
        setDepository({ value: e.target.value });

         if(depository.value == "CDSL"){
            setshowBOID(true)
            setshowDPID(false)
        }
        else{
            setshowBOID(false)
            setshowDPID(true)

        }


      }

    return(
    <div className="row mt-4">
        <div className="col-md-6 col-12">
            <div>
                <h6 style={{fontFamily: "Montserrat"}}><b>Add Your Demat account</b></h6>
                {/* <p className="text-small">Please ensure the Demat ID & Client ID is correct  and for self. Third party Demat A/c details  are not allowed  and  will be rejected. Please select the Depository name from the drop down and Broker name  carefully  before  you proceed to the next step.</p> */}
                <form className="w-100">    
                    {/* <label className="Trade_ready_step_3_Label my-2 text-small">Demat ID*</label>
                    <input type="text" className="p-2 text-small"
                    name="dematid" onChange={(e) => setDematid(e.target.value)} value={dematid}
                    /> */}
                    {/* <label className="my-2 text-small">Confirm Demat ID*</label>
                    <input type="text" className="p-2 text-small"
                    name="confirmdematid" onChange={(e) => setConfirmDematid(e.target.value)} value={confirmdematid}
                    /> */}
                    <label className="Trade_ready_step_3_Label my-2 text-small">Depository  Name</label>
                    <select class="form-select p-2 text-small shadow-none Trade_ready_step_3_selectbox" aria-label="Default select example" onChange={handleChange}
                     >
                    <option selected value="NSDL">NSDL </option>
                    <option value="CDSL">CDSL</option>                    
                    </select>
                    <label className="my-2 text-small">Broker Name</label>
                    <input type="text" className="p-2 text-small w-100"
                        name="brokername" onChange={(e) => setBrokerName(e.target.value)} value={brokerName}
                        />
                    <label className="my-2 text-small">DP ID*</label>
                    <input disabled={showDPID} type="text" className={showDPID?"p-2 text-small disabled-field":"p-2 text-small "}
                    name="dpid" maxlength="8" onChange={(e) => {setDpId(e.target.value) }} value={dpid}
                    />
                    <label className="my-2 text-small">Client ID*</label>
                    <input disabled={showDPID} type="text" className={showDPID?"p-2 text-small disabled-field":"p-2 text-small"}
                    name="dpid" maxlength="8" 
                    />
                    <label className="my-2 text-small">BO ID*</label>
                    <input disabled={showBOID} type="text" className={showBOID?"p-2 text-small disabled-field ":"p-2 text-small "}
                    name="boid" maxlength="16"  onChange={(e) => setBoId(e.target.value)} value={boid}
                    />
                    {/* <label className="my-2 text-small">Depository Name</label>
                    <input type="text" className="p-2 text-small"
                    name="boid" onChange={(e) => setDepositoryname(e.target.value)} value={depositoryName}
                    /> */}
                    
                </form>
                {/* <div>
                    <form className="w-100">
                        
                    </form>
                </div> */}


                  {/* <div className="Trade_ready_step_3_save_button mt-3 dbmn">
                    <div className="mt-2 d-flex align-items-center justify-content-end w-100">
                        <Buttons.PrimaryButton value="Save" onClick={saveContinue} />
                    </div>
                </div>  */}
            </div>
        </div>
        <div className="col-md-6 col-12">
            <div className="my-card my-4">
                <div className="my-2">
                    <img src={Demat} width="150"/>
                </div>
                <div className="my-2">
                    {/* <a href="#" className="tradeready_question"><b><p className="mb-1">Why Bank Account Details ?</p></b></a> */}
                    <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">What is the difference between broker and DP ?</p></b></a>
                    <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">What is the Client Master Report or CMR or Client Master List ?</p></b></a>
                    <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">What is intra and inter-depository transfer ?</p></b></a>       
                    <p className="text-small mb-1">Please ensure the Demat ID & Client ID is correct  and for self. Third party Demat A/c details  are not allowed  and  will be rejected. Please select the Depository name from the drop down and Broker name  carefully  before  you proceed to the next step.</p>
                </div>                       
            </div>
        </div>
        <div className="tradeready-save-mobilebutton px-3">
                {!isLoadingbtn && (
                    <Buttons.PrimaryButton value="Save & continue" onClick={saveContinue} />
                )}
                {isLoadingbtn && (
                    <Loadbutton />
                )}
        </div>
                  
        </div>
    )
}
export default AddDematAccount