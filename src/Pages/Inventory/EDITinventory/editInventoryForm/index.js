import React, { useState } from "react";
import Select from "react-select";
import "./style.scoped.css";
import UploadIcon from "../../../../assets/upload_icon.svg";
import { apiCall, downloadurl, setAccessToken } from "../../../../Utils/Network";
import { Link, useHistory, useLocation } from "react-router-dom";
import not from "./not.svg";
import {
  successToast, errorToast
} from "../../../../Components/Toast/index";
import Buttons from "../../../../Components/Buttons";
import BankImage from "../../../../assets/hdfc.png";
import Loadbutton from '../../../../Components/Loadbutton/Index';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { alertTitleClasses } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@material-ui/core/Dialog';


const options = [
  { value: "ROFR", label: "ROFR" },
  { value: "HR approval", label: "HR approval" },
];

function EditInventoryForm(editedData, handleChange) {
  let history = useHistory();
  let location = useLocation();
  let selectedHolding = location.state.selectedHolding;
  const [isLoadingbtn, setLoadingbtn] = useState(false);

  // console.log("selectedHolding in add inventory", selectedHolding);

  const [selectedCompany, setSelectedCompany] = React.useState("");
  // const [selectedCommodity, setSelectedCommodity] = React.useState("");

  const [qtySold, setQtySold] = React.useState('')
  const [qtySoldError, setqtySoldError] = React.useState('')
  const [qtyHeld, setQtyHeld] = React.useState('')
  const [qtyHeldError, setQtyHeldError] = React.useState('')
  const [showQtyHeldError, setShowQtyHeldError] = React.useState(false)

  const [showqtySoldError, setshowqtySoldError] = React.useState('')
  const [ListId, setListId] = React.useState('')
  const [listingFreezed, setlistingFreezed] = React.useState('')
  const [minbid, setMinbid] = React.useState('')
  const [minbiderror, setMinbiderror] = React.useState('')
  const [showminBidError, setShowminBidError] = React.useState('')
  const [buyprice, setBuyprice] = React.useState('')
  const [buypriceerror, setBuyPriceError] = React.useState('')
  const [showBuyPriceError, setShowBuyPriceError] = React.useState('')

  const [minqty, setminqty] = React.useState('')
  const [minqtyerror, setminqtyerror] = React.useState('')
  const [showminqtyerror, setshowminqtyerror] = React.useState('')

  const [negotiable, setNegotiable] = React.useState(false);
  const [negotiableError, setNegotiableError] = React.useState('')
  const [showNegotiableError, setShowNegotiableError] = React.useState('')
  const [proofDocument, setproofDocument] = React.useState("");
  const [specialConditionTransfer, setspecialConditionTransfer] = React.useState("ROFR");
  const [acceptTerms, setacceptTerms] = React.useState(false)
  const [newPrice, setNewPrice] = React.useState(false)
  const [openModal, setOpenModal] = useState(false);

  const [
    showExistingHoldingInlineValidation, setShowExistingHoldingInlineValidation,] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    callTrade();
  }, []);
  const callTrade = async function () {
    let response = await apiCall("trade/" + selectedHolding.tradeId, "GET");
    let responseJSON = await response.json();
    await setListId(responseJSON.id)
    await setlistingFreezed(responseJSON.qtyFreezed)
    await setQtySold(responseJSON.qty);
    await setMinbid(responseJSON.minBidPriceAccepted);
    await setBuyprice(responseJSON.price);
    await setminqty(responseJSON.minQtyAccepted);
    await setNegotiable(responseJSON.isNegotiable);
    await setproofDocument(responseJSON.proofDocument)
    await setspecialConditionTransfer(JSON.parse(responseJSON.specialConditionTransfer));
  };

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





  const handleCreate = async (event) => {
    event.preventDefault();
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

    // console.log("sdsdsds"+acceptTerms)

    if (acceptTerms == false) {
      errorToast("Invalid", "Please accept Terms and Conditions...");
      setacceptTerms(false)
      setLoadingbtn(false);
      return
    }

    // console.log("selected company ", selectedCompany);
    let requestBody = {
      "price": buyprice,
      "minBidPriceAccepted": minbid,
      "qty": qtySold,
      "minQtyAccepted": minqty,
      "isNegotiable": negotiable,
      "myHoldingId": selectedHolding.id,
      "proofDocument": proofDocument,
      "specialConditionTransfer": JSON.stringify(specialConditionTransfer)
    };
    // console.log("request body", requestBody);

    let stringifiedRequestBody = JSON.stringify(requestBody);

    // console.log("request body stringified", stringifiedRequestBody);

    let response = await apiCall(
        "trade/" + selectedHolding.tradeId,
        "PUT",
        requestBody
    );
    // if (response.status === 409) {
    //   return;
    // } else {
    //   let responseJSON = await response.json();
    //   successToast("Success", "Listing successfully edited");
    //   setTimeout(() => {
    //     history.push("/holdings");
    //   }, 3000);
    // }

    setLoadingbtn(false);

    if (response.status === 409) {

      return
    } else if (response.status === 400) {
      let responseJSON = await response.json()
      let i = 0;
      const arrayerrormessages = responseJSON.details1;
      // console.log(arrayerrormessages)
      const listItems = arrayerrormessages.map((errorResponse) =>

          validate(errorResponse.field, errorResponse.errorMessage)
      );
    }
    else if (response.status === 200) {
      await clearErrorMessages()
      // console.log("aaaaaaaaaaaaaaa")
      let responseJSON = await response.json()
      successToast("Success", "Listing successfully edited")
      setLoadingbtn(false);
      // setTimeout(()=>{
      history.push("/holdings")
      // },3000)

    } else {
      await setshowqtySoldError(true);
      await setqtySoldError('some problem occured, contact the admin...');
    }






    //else {
    //
    //     let responseJSON = await response.json()
    //     //setHolding(responseJSON)
    //
    //     // console.log("response ", response)
    //
    //     // console.log("responseJson", responseJSON)
    //
    //     setOpen(true);
    //   }
  };

  const clearErrorMessages = async () => {
    await setShowNegotiableError(false);
    await setNegotiableError('');
    await setShowBuyPriceError(false);
    await setBuyPriceError('');
    await setShowQtyHeldError(false);
    await setQtyHeldError('');
    await setshowminqtyerror(false);
    await setminqtyerror('');
    await setShowminBidError(false);
    await setMinbiderror('');
    await setshowqtySoldError(false);
    await setqtySoldError('');


  }


  const validate = async (field, errorMessage) => {
    // console.log("hihhihihihihihihihihihihihihihihihiiiiiii"+editedData.isDemated+"yoyo"+selectedHolding.isVested)
    await clearErrorMessages();

    switch (field) {
      case 'isNegotiable':
        // console.log("hooooooooooooooooo1"+errorMessage)
        await setShowNegotiableError(true);
        await setNegotiableError(errorMessage);
        break;

      case 'price':

        // console.log("hooooooooooooooooo11"+errorMessage)
        await setShowBuyPriceError(true);
        await setBuyPriceError(errorMessage);
        break;



      case 'qtyTotal':

        // console.log("hooooooooooooooooo111"+errorMessage)
        await setShowQtyHeldError(true);
        await setQtyHeldError(errorMessage);

        break;

      case 'minQtyAccepted':

        // console.log("hooooooooooooooooo111"+errorMessage)
        await setshowminqtyerror(true);
        await setminqtyerror(errorMessage);

        break;

      case 'minBidPriceAccepted':
        // console.log("hooooooooooooooooo1111"+errorMessage)
        await setShowminBidError(true);
        await setMinbiderror(errorMessage);
        break;


      case 'qty':
        // console.log("hooooooooooooooooo11111"+errorMessage)
        await setshowqtySoldError(true);
        await setqtySoldError(errorMessage);
        break;


      default:
        // console.log("hooooooooooooooooonijhibibibibib")

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

  const EditListing = (e) => {
    setNewPrice(e.target.value)
    console.log("minbid", minbid)
    if (minbid !== newPrice) {
      console.log("change value")
      alert("are sure to change value")
    } else {
      console.log("change value 22")
    }
  }

  const handleChange3 = (e) => {
    setMinbid(e.target.value)
    if (minbid !== setMinbid) {
      console.log("change value")
      handleClickOpen()
    } else {
      console.log("value")
    }
  }

  const handleClickOpen = () => {
    setOpenModal(true)
  };
  const handleClose = () => {
    setOpenModal(false)
  };


  return (
      <div className="p-2">
        <form className="editinventory-form">
          <div className="addlist-title m-0">
            <h4>Edit Lisiting</h4>
            <hr />
          </div>

          <div className=" mt-2">
            <div className="listing-img">
              <img src={selectedHolding.companyLogo} />
            </div>
            <div>
              <h6 className="m-0 "><strong> {selectedHolding.companyName} </strong></h6>
              <p className="m-0 text-small">Listing ID         : LIST{selectedHolding.id}</p>
              <p className="m-0 text-small">Frozen Listing Qty : {selectedHolding.qtyFreezed}</p>
              <p className="m-0 text-small">Holding ID         : HOLD{selectedHolding.id}</p>
              {/* <p className="m-0 text-small">Frozen Holding Qty : {listingFreezed}</p> */}
            </div>
          </div>

          <div className="editinventory-form_field editinventory-form_field-2">
            <div>
              <label className="mt-1 text-small">Quantity*
                <Tooltip title={<><p className="mb-0">Your total verified shares for this company</p></>}
                         placement="right" arrow enterTouchDelay={0}>
                  <InfoOutlinedIcon className="marketplace-infoicon" />
                </Tooltip>

              </label>
              <input value={selectedHolding.qtyTotal} disabled />
              {showQtyHeldError ? <InlineValidationBoxExistingQtyheldError /> : null}
            </div>

            <div>
              <label className="mt-1 text-small">Quantity to be sold*
                <Tooltip title={<><p className="mb-0">No. of shares out of your total holdings, you want to list for sale in our marketplace</p></>}
                         placement="right" arrow enterTouchDelay={0}>
                  <InfoOutlinedIcon className="marketplace-infoicon" />
                </Tooltip>
              </label>
              <input value={qtySold} onChange={(e) => setQtySold(e.target.value)} />
              {showqtySoldError ? <InlineValidationBoxExistingQtySold /> : null}
            </div>

          </div>

          <div className="editinventory-form_field editinventory-form_field-2">
            {/*<div>*/}
            {/*  <label className="text-small mt-1">Minimum Bid Price accepted* <Tooltip title={<><p className="mb-0">Minimum bid that you would like to receive from the buyer in the marketplace. We suggest you to make it competitve to attract more buyers</p></>}*/}
            {/*    placement="right" arrow enterTouchDelay={0}>*/}
            {/*    <InfoOutlinedIcon className="marketplace-infoicon" />*/}
            {/*  </Tooltip>*/}
            {/*  </label>*/}
            {/*  <input value={minbid} onChange={handleChange3} />*/}
            {/*  {showminBidError ? <InlineValidationBoxExistingminbidError /> : null}*/}
            {/*</div>*/}

            <div>
              <label className="text-small mt-1">Buy it now price*</label>
              <input
                  value={buyprice}
                  onChange={(e) => setBuyprice(e.target.value)}
              />
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
          {/*<div className="mt-2">*/}
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
          {/*<div className="mt-2">*/}
          {/*  <p className="text-small m-0">Demated *</p>*/}
          {/*  <div className="profile-form_field-container">*/}
          {/*    <div className="profile-form_field-radio ">*/}
          {/*      <div className="customRadio w-100">*/}
          {/*        <input type="radio" className="radio-control" id="yes" name="demated" value="YES" checked={selectedHolding.isDemated}/>*/}
          {/*        <label className="m-0" for="yes">YES<span className="checkmark" />*/}
          {/*        </label>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    <div className="profile-form_field-radio ">*/}
          {/*      <div className="customRadio w-100">*/}
          {/*        <input type="radio" className="radio-control" id="no" name="demated" value="NO" checked={!selectedHolding.isDemated}/>*/}
          {/*        <label className="m-0" for="no">NO<span className="checkmark" />*/}
          {/*        </label>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/*<div className="mt-2">*/}
          {/*  <p className="text-small m-0">Negotiable *</p>*/}
          {/*  <div className="profile-form_field-container">*/}
          {/*    <div className="profile-form_field-radio ">*/}
          {/*      <div className="customRadio w-100">*/}
          {/*        <input type="radio" className="radio-control" id="negotiable_yes" name="negotiable"*/}
          {/*               checked={negotiable} value="YES" onChange={(e) => {*/}
          {/*                   setNegotiable(true);*/}
          {/*      }}/>*/}
          {/*        <label className="m-0" for="negotiable_yes">YES<span className="checkmark" />*/}
          {/*        </label>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    <div className="profile-form_field-radio ">*/}
          {/*      <div className="customRadio w-100">*/}
          {/*          {// console.log('aaaaaaabbb'+negotiable)}*/}
          {/*        <input type="radio" className="radio-control" id="negotiable_no" name="negotiable"*/}
          {/*               checked={!negotiable} value="NO" onChange={(e) => {*/}
          {/*                   setNegotiable(false);*/}
          {/*         }}/>*/}
          {/*        <label className="m-0" for="negotiable_no">NO<span className="checkmark" />*/}
          {/*        </label>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  {showNegotiableError ? <InlineValidationBoxExistingSelectedNegotiableError/> : null}*/}
          {/*</div>*/}



          {/* <div className="editinventory-form_field ">
          <label className="mt-1 text-small">Special conditions for transfer*</label>
          <Select isMulti options={options} value={specialConditionTransfer} onChange={a11 => {
            setspecialConditionTransfer(a11)
          }} />
        </div> */}
          {/*<div className="addinventory-form_field addinventory-form_upload-photo">*/}
          {/*    <div className="custom-file-upload">*/}
          {/*        <input type="file" className="form-control fileupload-input" onFileSelect={onFileSelect} ></input>*/}
          {/*        <img src={UploadIcon} width='100' className="mr-3"/>*/}
          {/*        <img src={proofDocument} width='100' className="mr-3"/>*/}

          {/*        <p style={{color: "#2E384D", fontSize:"13px"}}>*/}
          {/*          Upload your proof of holding. You can upload the screenshot (share certificate/demat holding) */}
          {/*              as proof or  as proof or{" "} */}
          {/*          <span style={{color:"#721B65",cursor:"pointer",fontWeight: "700"}}>browse</span>*/}
          {/*        </p>*/}
          {/*    </div>*/}
          {/*</div>*/}
          {/*<div className="editinventory-form_note mt-2 mb-2">*/}
          {/*  <img src={not} style={{ margin: "5px" }} />*/}
          {/*  <p className="m-0 text-small p-2">*/}
          {/*    <b>Note:</b> You cannot add inventory without verifying it. Here is the*/}
          {/*    guideline for uploading documents.<br/>*/}
          {/*    <b>Click here</b>*/}
          {/*  </p>*/}
          {/*</div >*/}

          {/* <div className="addholding-form_field ">-</div> */}
          <div className="AddListing_Disclaimer text-small mb-3">
            <input class="styled-checkbox2" id="styled-checkbox-2" type="checkbox" value="value1" onChange={(e) => {
              setacceptTerms(e.target.checked)
            }} />
            <label for="styled-checkbox-2" style={{ fontSize: "13px" }}>By submiting this holding for sale, I undertake that I am eligible to sell the following shares Read the <span style={{ color: "#721B65" }}><a href={downloadurl("myholding/downloaddisclaimeragreement/agreementtermsconditions")}><b>disclaimer agreement</b></a></span></label>
          </div>
          <div className="border rounded p-3">
            {/*<div style={{ display: "flex", justifyContent: "space-between" }}>*/}
            {/*  <h5 style={{ color: "#2E384D" }}>*/}
            {/*    <b>Total value of Listing :</b>*/}
            {/*  </h5>*/}
            {/*  <p className="m-0" style={{ color: "#721B65", fontSize: "24px", fontWeight: "600", }}>*/}
            {/*    {" "}*/}
            {/*    ₹ {qtySold * buyprice}*/}
            {/*  </p>*/}
            {/*</div>*/}
            <div className="d-flex mt-3">
              <Buttons.SecondaryButton style={{ width: "100%", margin: "0px 5px" }} onClick={handleCreate1} value="Discard" />
              {!isLoadingbtn && (
                  <Buttons.PrimaryButton onClick={handleCreate} value="Submit" style={{ width: "100%", margin: "0px 5px" }}
                  />
              )}

              {isLoadingbtn && (
                  <Loadbutton />
              )}
            </div>
          </div>
        </form>
        {/*<Dialog open={openModal} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >*/}
        {/*  <div className='allcompany-modal-closeIcon text-right'>*/}
        {/*    <CloseIcon onClick={handleClose} />*/}
        {/*  </div>*/}
        {/*  <div className="addcompanyrequest px-5 pb-5">*/}
        {/*    <div className="">*/}
        {/*      <div className="text-center">*/}
        {/*        <h5><b>Are you sure you want to <br />Edit your listing ?</b></h5>*/}
        {/*        /!* <p className="m-0 text-small">Please log in for Add watchlist to company!</p> *!/*/}
        {/*      </div>*/}
        {/*      <div className="d-flex justify-content-center text-center mt-4">*/}
        {/*        <Buttons.PrimaryButton value="No" onClick={handleClose} style={{ width: "50%", margin: "0px 5px" }} />*/}
        {/*        <Buttons.PrimaryButton value="Yes" style={{ width: "50%", margin: "0px 5px" }} />*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</Dialog>*/}
      </div>

  );
}

export default EditInventoryForm;