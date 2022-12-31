import React,{useState} from "react";
import Select from "react-select";
import "./style.scoped.css";
import UploadIcon from "../../../../assets/upload_icon.svg";
import BankImage from "../../../../assets/hdfc.png";
import { apiCall, downloadurl, setAccessToken } from "../../../../Utils/Network"
import { Link, useHistory, useLocation } from "react-router-dom";
import not from "./not.svg"
import { successToast, errorToast } from "../../../../Components/Toast/index";
import Buttons from "../../../../Components/Buttons";

import '../../../Companies/bootstrap4/css/bootstrap.scoped.css';
import Loadbutton from '../../../../Components/Loadbutton/Index';

const options = [
    { value: "ROFR", label: "ROFR" },
    { value: "HR approval", label: "HR approval" },
];




function AddInventoryForm() {

    let history=useHistory();
    let location = useLocation();
    let selectedHolding = location.state.selectedHolding
    const [isLoadingbtn, setLoadingbtn] = useState(false);

    //console.log("selectedHolding in add inventory", selectedHolding)



    const [shareType, setShareType] = React.useState('')





    const [showExistingHoldingInlineValidation, setShowExistingHoldingInlineValidation] = React.useState(false)
    const [open, setOpen] = React.useState(false);

    const [selectedCompany, setSelectedCompany] = React.useState("");
    const [selectedCommodity, setSelectedCommodity] = React.useState("");

    const [qtySold, setQtySold] = React.useState('')
    const [qtySoldError, setqtySoldError] = React.useState('')
    const [qtyHeld, setQtyHeld] = React.useState('')
    const [qtyHeldError, setQtyHeldError] = React.useState('')
    const [showQtyHeldError, setShowQtyHeldError] = React.useState(false)

    const [showqtySoldError, setshowqtySoldError] = React.useState('')
    const [minbid, setMinbid] = React.useState('')
    const [minbiderror,setMinbiderror] = React.useState('')
    const [showminBidError,setShowminBidError] = React.useState('')
    const [buyprice, setBuyprice]= React.useState('')
    const [buypriceerror,setBuyPriceError] = React.useState('')
    const [showBuyPriceError,setShowBuyPriceError] = React.useState('')

    const [minqty, setminqty] = React.useState(1)
    const [minqtyerror, setminqtyerror] = React.useState('')
    const [showminqtyerror, setshowminqtyerror] = React.useState('')

    const [negotiable,setNegotiable] = React.useState("");
    const [negotiableError,setNegotiableError] = React.useState('')
    const [showNegotiableError,setShowNegotiableError] = React.useState('')
    const [demated, setDemated] = React.useState(
        selectedHolding.isDemated ? "yes" : "no"
    );
    const [dematedError, setDematedError] = React.useState('')
    const [showDematedError, setShowDematedError] = React.useState('')
    const [vested, setVested] = React.useState('')
    const [vestedError, setVestedError] = React.useState('')
    const [showVestedError, setshowVestedError] = React.useState('')

    const [allCompany, setAllCompany] = React.useState([]);
    const [allCommodity, setAllCommodity] = React.useState([]);

    const [proofDocument, setproofDocument] = React.useState("");
    const [specialConditionTransfer, setspecialConditionTransfer] = React.useState("ROFR");
    const [acceptTerms,setacceptTerms] = React.useState(false)

    let InlineValidationBoxExistingQtySold = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {qtySoldError}
                </p>
            </div>
        )
    }

    let InlineValidationBoxExistingminbidError = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {minbiderror}
                </p>
            </div>
        )
    }

    let InlineValidationBoxExistingQtyheldError = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {qtyHeldError}
                </p>
            </div>
        )
    }

    let InlineValidationBoxExistingSelectedBuyPriceError = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {buypriceerror}
                </p>
            </div>
        )
    }

    let InlineValidationBoxExistingSelectedMinQtyError = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {minqtyerror}
                </p>
            </div>
        )
    }

    let InlineValidationBoxExistingSelectedNegotiableError = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {negotiableError}
                </p>

            </div>
        )
    }

    let InlineValidationBoxExistingVestedError = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {vestedError}
                </p>
            </div>
        )
    }

    let InlineValidationBoxExistingDematedError = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {dematedError}
                </p>
            </div>
        )
    }

    const handleCreate = async (event) => {
        event.preventDefault()
        setLoadingbtn(true);

        // let dematBoolean, vestedBoolean
        // if (demated === "yes") {
        //   dematBoolean = true
        // } else {
        //   dematBoolean = false
        // }
        // if (vested === "yes") {
        //   vestedBoolean = true
        // } else {
        //   vestedBoolean = false
        // }
        //console.log("selected company ", selectedCompany)

        //console.log("sdsdsds"+acceptTerms)

        if(acceptTerms == false) {
            errorToast("Invalid", "Please accept Negotiations Terms and Conditions...");
            setacceptTerms(false)
            setLoadingbtn(false);
            return
        }
        if(selectedHolding.uaVerificationStatus != "Approved") {
            errorToast("Invalid", "You cannot create Listing till it is approved...");
            setacceptTerms(false)
            setLoadingbtn(false);
            return
        }

        let requestBody = {
            "price": buyprice,
            "minBidPriceAccepted": minbid,
            "isNegotiable": negotiable,
            "qty": qtySold,
            "minQtyAccepted": minqty,
            "myHoldingId": selectedHolding.id,
            "proofDocument": proofDocument,
            "specialConditionTransfer": JSON.stringify(specialConditionTransfer)
        }
        //console.log("request body", requestBody)

        let stringifiedRequestBody = JSON.stringify(requestBody)

        //console.log("request body stringified", stringifiedRequestBody)


        let response = await apiCall("trade/"+requestBody.myHoldingId, 'POST', requestBody)
        setLoadingbtn(false);
        if (response.status === 409) {

            return
        } else if (response.status === 400) {

            let responseJSON = await response.json()
            let i = 0;
            const arrayerrormessages = responseJSON.details1;
            //console.log(arrayerrormessages)
            const listItems = arrayerrormessages.map((errorResponse) =>

                validate(errorResponse.field,errorResponse.errorMessage)
            );
        } else if(response.status === 200){
            await clearValidationMessages();
            let responseJSON = await response.json()
            successToast("Success", "Listing successfully created")
            setLoadingbtn(false);

            // setTimeout(()=>{
            history.push("/holdings")
            // },3000)

        } else {
            await setShowQtyHeldError(false);
            await setQtyHeldError("some problem occured, contact the admin...");
        }
    }

    const clearValidationMessages = async () => {
        await setShowNegotiableError(false);
        await setNegotiableError('');
        await setShowBuyPriceError(false)
        await setBuyPriceError('');
        await setShowQtyHeldError(false);
        await setQtyHeldError('');
        await setshowminqtyerror(false);
        await setminqtyerror('');
        await setShowminBidError(false);
        await setMinbiderror('');
        await setshowqtySoldError(false);
        await setqtySoldError('');
        await setShowDematedError(false);
        await setDemated('');
        await setshowVestedError(false)
        await setVestedError('');
    }

    const validate = async (field, errorMessage) => {
        //console.log("hihhihihihihihihihihihihihihihihihiiiiiii"+field, errorMessage)
        await clearValidationMessages();

        switch (field) {
            case 'isNegotiable':
                //console.log("hooooooooooooooooo1"+errorMessage)
                await setShowNegotiableError(true);
                await setNegotiableError(errorMessage);
                break;

            case 'price':

                //console.log("hooooooooooooooooo11"+errorMessage)
                await setShowBuyPriceError(true);
                await setBuyPriceError(errorMessage);
                break;

            case 'qtyTotal':

                //console.log("hooooooooooooooooo11"+errorMessage)
                await setShowQtyHeldError(true);
                await setQtyHeldError(errorMessage);
                break;

            case 'minQtyAccepted':

                // console.log("hooooooooooooooooo111"+errorMessage)
                await setshowminqtyerror(true);
                await setminqtyerror(errorMessage);

                break;

            case 'minBidPriceAccepted':
                //console.log("hooooooooooooooooo1111"+errorMessage)
                await setShowminBidError(true);
                await setMinbiderror(errorMessage);
                break;


            case 'qty':
                //console.log("hooooooooooooooooo11111"+errorMessage)
                await setshowqtySoldError(true);
                await setqtySoldError(errorMessage);
                break;

            case 'isDemated':
                //console.log("hooooooooooooooooo1111"+errorMessage)
                await setShowDematedError(true);
                await setDematedError(errorMessage);
                break;


            case 'isVested':
                //console.log("hooooooooooooooooo11111"+errorMessage)
                await setshowVestedError(true);
                await setVestedError(errorMessage);
                break;

            default:
            //console.log("hooooooooooooooooonijhibibibibib")

        }
    }
    const handleCreate1 = async (event) => {
        event.preventDefault();

        // setTimeout(() => {
        history.push("/holdings");
        // }, 0);

    };

    async function onFileSelect(file) {
        const img = await convertImgTOBase64(file);
        setproofDocument(img)
    }

    function convertImgTOBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            if (file) {
                reader.readAsDataURL(file);
                reader.onload = () => {
                    resolve(reader.result);
                };
                reader.onerror = (error) => {
                    reject(error);
                };
            }
        });
    }


    return (
        <form className="addinventory-form">
            <div className="addlist-title">
                <h4>Add Lisiting</h4>
                <hr />
            </div>

            <div className="holder-info mt-2">
                <div className="listing-img">
                    <img src={selectedHolding.companyLogo} />
                </div>
                <div>
                    <h6 className="m-0"><strong> {selectedHolding.companyName} </strong></h6>
                    <p className="m-0">Holding ID : HOLD{selectedHolding.id}</p>
                </div>
            </div>


            <div className="addInventory-form_field addinventory-form_field-2">

                <div>
                    <label className="mt-1 text-small">Quantity*


                    </label>
                    <input value={selectedHolding.qtyTotal} disabled/>
                </div>
                <div>
                    <label className="mt-1 text-small">Quantity to be sold*</label>
                    <input value={qtySold} onChange={(e) => setQtySold(e.target.value)}/>
                </div>
            </div>
            {showqtySoldError ? <InlineValidationBoxExistingQtySold/> : null}

            <div className="addInventory-form_field addinventory-form_field-2">
                {/*<div>*/}
                {/*  <label className="mt-1 text-small">Minimum bid accepted*</label>*/}
                {/*  <input value={minbid} onChange={(e) => setMinbid(e.target.value)}/>*/}
                {/*  {showminBidError ? <InlineValidationBoxExistingminbidError/> : null}*/}
                {/*</div>*/}
                <div >
                    <label className="mt-1 text-small">Buy it now price*</label>
                    <input value={buyprice} onChange={(e) => setBuyprice(e.target.value)}/>
                    {showBuyPriceError ? <InlineValidationBoxExistingSelectedBuyPriceError/> : null}
                </div>

                <div>
                    <label className="text-small mt-1">Min Qty Accepted*</label>
                    <input
                        value={minqty}
                        onChange={(e) => setminqty(e.target.value)}
                    />
                    {showminqtyerror ? <InlineValidationBoxExistingSelectedMinQtyError/> : null}
                </div>

            </div>
            {/*<div className="mt-2 radio-heading">*/}
            {/*  <p className="text-small m-0">Vested *</p>*/}
            {/*  <div className="profile-form_field-container">*/}
            {/*    <div className="profile-form_field-radio ">*/}
            {/*      <div className="customRadio w-100">*/}
            {/*        <input type="radio" className="radio-control" id="vested_yes" name="vested" value="YES" checked={selectedHolding.isVested}/>*/}
            {/*        <label className="m-0" for="vested_yes">YES<span className="checkmark" />*/}
            {/*        </label>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*    <div className="profile-form_field-radio ">*/}
            {/*      <div className="customRadio w-100">*/}
            {/*        <input type="radio" className="radio-control" id="vested_no" name="vested" value="NO" checked={!selectedHolding.isVested}/>*/}
            {/*        <label className="m-0" for="vested_no">NO<span className="checkmark" />*/}
            {/*        </label>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
            {/*<div className="mt-2 radio-heading">*/}
            {/*  <p className="text-small m-0">Demated *</p>*/}
            {/*  <div className="profile-form_field-container">*/}
            {/*    <div className="profile-form_field-radio ">*/}
            {/*      <div className="customRadio w-100">*/}
            {/*        <input type="radio" className="radio-control" id="demated_yes" name="demated" value="YES" checked={selectedHolding.isDemated}/>*/}
            {/*        <label className="m-0" for="demated_yes">YES<span className="checkmark" />*/}
            {/*        </label>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*    <div className="profile-form_field-radio ">*/}
            {/*      <div className="customRadio w-100">*/}
            {/*        <input type="radio" className="radio-control" id="demated_no" name="demated" value="NO" checked={!selectedHolding.isDemated}/>*/}
            {/*        <label className="m-0" for="demated_no">NO<span className="checkmark" />*/}
            {/*        </label>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
            {/*<div className="mt-2">*/}
            {/*  <p className="text-small m-0 mb-1">Negotiable *</p>*/}
            {/*  <div className="profile-form_field-container">*/}
            {/*    <div className="profile-form_field-radio ">*/}
            {/*      <div className="customRadio w-100">*/}
            {/*        <input type="radio" className="radio-control" id="negotiable_yes" name="negotiable" value="YES" onChange={(e) => {*/}
            {/*          setNegotiable("true");*/}
            {/*      }}/>*/}
            {/*        <label className="m-0" for="negotiable_yes">YES<span className="checkmark" />*/}
            {/*        </label>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*    <div className="profile-form_field-radio ">*/}
            {/*      <div className="customRadio w-100">*/}
            {/*        <input type="radio" className="radio-control" id="negotiable_no" name="negotiable" value="NO" onChange={(e) => {*/}
            {/*             setNegotiable("false");*/}
            {/*         }}/>*/}
            {/*        <label className="m-0" for="negotiable_no">NO<span className="checkmark" />*/}
            {/*        </label>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*  {showNegotiableError ? <InlineValidationBoxExistingSelectedNegotiableError/> : null}*/}
            {/*</div>*/}

            {/* <div className="editinventory-form_field ">
            <label className="my-1 text-small">Special conditions for transfer*</label>
            <Select isMulti options={options} value={specialConditionTransfer} onChange={a11 =>{

                setspecialConditionTransfer(a11)
            }} />
        </div> */}

            {/*<div className="addinventory-form_field addinventory-form_upload-photo">*/}
            {/*      <div className="custom-file-upload">*/}
            {/*          <input type="file" className="form-control fileupload-input" onFileSelect={onFileSelect} ></input>*/}
            {/*          <img src={UploadIcon} width='100' className="mr-3"/>*/}
            {/*          <img src={proofDocument} width='100' className="mr-3"/>*/}

            {/*        <p style={{color: "#2E384D", fontSize:"13px"}}>*/}
            {/*          Upload your proof of holding. You can upload the screenshot (share certificate/demat holding) */}
            {/*          as proof or <span style={{color:"#721B65",cursor:"pointer",fontWeight: "700"}}>browse</span>*/}
            {/*        </p>*/}
            {/*      </div>*/}
            {/*</div>*/}
            {/*<div className="addinventory-form_note">*/}
            {/*  <div className="d-flex align-items-center justify-content-center">*/}
            {/*  <img src={not} className="mr-3"/>*/}
            {/*  <p className="m-0">*/}
            {/*    <strong> Note </strong>: You cannot add inventory without verifying it. Here is the guideline for uploading documents.*/}
            {/*    <span> <a href="#" className="text-white">Click here</a></span>*/}
            {/*  </p>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className="AddListing_Disclaimer text-small mb-3">
                <input className="styled-checkbox2" id="styled-checkbox-2" type="checkbox" value="value1" onChange={(e)=>{

                    setacceptTerms(e.target.checked)}}/>
                <label htmlFor="styled-checkbox-2" style={{fontSize:"13px"}}>By submiting this holding for sale, I undertake that I am eligible to sell the following shares Read the <span style={{color:"#721B65"}}><a href={downloadurl("myholding/downloaddisclaimeragreement/agreementtermsconditions")}><b>disclaimer agreement</b></a></span></label>
            </div>

            {/*<div className="AddListing_Disclaimer text-small">*/}
            {/*    <input className="styled-checkbox2" id="styled-checkbox-2" type="checkbox" value="value1" onChange={(e) => {*/}
            {/*        console.log("123232323232323232" + e.target.checked)*/}
            {/*        setacceptTerms(e.target.checked)*/}
            {/*    }}/>*/}
            {/*    <label htmlFor="styled-checkbox-2" >By submiting this holding for sale, I undertake that I am eligible to*/}
            {/*        sell the following shares Read the <span*/}
            {/*            style={{color: "#721B65"}}><b>disclaimer agreement</b></span></label>*/}
            {/*</div>*/}
            <div className="">
                <div className="addinventory-form_button_container">
                    {/*<div style={{display:"flex", justifyContent:"space-between"}}>*/}
                    {/*  <h5 style={{color:"#2E384D"}}><b>Total value of Listing :</b></h5>*/}
                    {/*  <p className="m-0" style={{color:"#721B65",paddingRight:"20px",fontSize: "24px",fontWeight: "600"}}> ₹ {qtySold*buyprice}</p>*/}
                    {/*</div>*/}
                    <div className="d-flex align-items-center justify-content-center">
                        <Buttons.SecondaryButton value="Discard" onClick={handleCreate1} style={{cursor:"pointer", margin: "10px", width: "100%"}}/>
                        {!isLoadingbtn && (
                            <Buttons.PrimaryButton onClick={handleCreate} value="Submit" style={{cursor:"pointer", margin: "10px", width: "100%"}}/>
                        )}

                        {isLoadingbtn && (
                            <Loadbutton />
                        )}

                    </div>
                </div>
            </div>
        </form>
    );
}

export default AddInventoryForm;