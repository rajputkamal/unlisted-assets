import React, {useState} from "react";
import "./editholdings.css";
import { makeStyles} from "@material-ui/core/styles";
import { apiCall1, apiCall, apiCall26, downloadurl, setAccessToken } from "../../Utils/Network";
import { useHistory, Link } from "react-router-dom";
import EditHoldingForm from "./editHoldingForm";
import VideoPreviewAddholding from "../../assets/video_preview_addholding.png";
import { successToast, errorToast } from "../../../src/Components/Toast/index";
import Select from "react-select";
import "./style.css";
import UploadIcon from "../../assets/upload_icon.svg";
import Buttons from "../../Components/Buttons";
import vector from "./Vector.png"
import PlayIcon from './play.svg';
import DownloadLink from "react-download-link";
import GetAppIcon from '@material-ui/icons/GetApp';
import Loadbutton from '../../Components/Loadbutton/Index';
import MinusIcon from './minus.svg';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@material-ui/core/Dialog';

let EditHoldings = () => {
  let history = useHistory();

  //const [imageObj1, setimageObj1] = React.useState([])
  const [previewimageArray1, setpreviewimageArray1] = React.useState([])
  const [previewimageArray, setpreviewimageArray] = React.useState([])
  const [oldProof, setoldProof] = React.useState([])

  let selectedHolding = history.location.state.holding;
  //console.log(selectedHolding, "selectedHolding");
  const [value, setValue] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [yourPrice, setYourPrice] = React.useState("");

  const [editedData, setEditedData] = React.useState(selectedHolding || {});
  const [
    additionalConditionForTransfer,
    setAdditionalConditionForTransfer,
  ] = React.useState("");


  const [selectedCompany, setSelectedCompany] = React.useState('')
  const [selectedCompanyError, setSelectedCompanyError] = React.useState('')
  const [showSelectedCompanyError, setShowSelectedCompanyError] = React.useState(false)
  const [selectedCommodity, setSelectedCommodity] = React.useState('')
  const [selectedCommodityError, setSelectedCommodityError] = React.useState('')
  const [showSelectedCommodityError, setShowSelectedCommodityError] = React.useState(false)

  const [shareType, setShareType] = React.useState(
      selectedHolding.isVested ? "yes" : "no"
  );

  const [qtyHeld, setQtyHeld] = React.useState('')
  const [qtyHeldError, setQtyHeldError] = React.useState('')
  const [showQtyHeldError, setShowQtyHeldError] = React.useState(false)

  const [demated, setDemated] = React.useState(
      selectedHolding.isDemated ? "yes" : "no"
  );

  const [dematedError, setDematedError] = React.useState('')
  const [showDematedError, setShowDematedError] = React.useState('')
  const [vested, setVested] = React.useState('')
  const [vestedError, setVestedError] = React.useState('')
  const [showVestedError, setshowVestedError] = React.useState('')
  const [holding,setHolding] = React.useState({})


  const [proofDocument, setproofDocument] = React.useState('')

  const [allCompany, setAllCompany] = React.useState([])
  const [allCommodity, setAllCommodity] = React.useState([])

  const [showExistingHoldingInlineValidation, setShowExistingHoldingInlineValidation] = React.useState(false)
  const [open, setOpen] = React.useState(false);
  const [acceptTerms,setacceptTerms] = React.useState(false)
  const [isLoadingbtn, setLoadingbtn] = useState(false);

  React.useEffect(() => {
    GetAllCommodity()
    //console.log('iihjihihihihih1111')
    GetAllProofs(true)
  }, []);

  const GetAllCommodity = async () => {
    let response = await apiCall("commodity/", "GET");
    let responseJSON = await response.json();
    //console.log(responseJSON, "responsejson");
    if (response.status === 200) {
      setAllCommodity(
          responseJSON.map((item) => {
            return {
              ...item,
              value: item.id,
              label: item.name,
            };
          })
      );
    }
    setShareType(selectedHolding.commodityId);
    //setSelectedFile(editedData.proofDocument);


  };

  const GetAllProofs = async (duringUseEffect) => {
    //console.log('aaaatyiu6'+selectedHolding.id)
    let response = await apiCall("myholding/holdingproofs/"+selectedHolding.id, "GET");
    //console.log("aaaatyiu8");
    let responseJSON = await response.json();
    //console.log("aaaatyiu9");
    if (response.status === 200) {
      //console.log('aaaatyiu22'+selectedHolding.id)

      setpreviewimageArray(responseJSON)

      if(duringUseEffect) {
        setoldProof(responseJSON.map(a=>a.id))
        // oldProof.map(a=>console.log(a+"pppp"))
        setpreviewimageArray([])
        setpreviewimageArray1(responseJSON)
      } else {
        setpreviewimageArray(responseJSON.filter((record) => oldProof.indexOf(record.id) == -1))
      }
    } else {
      //console.log('aaaatyiu11')
    }


    //setShareType(selectedHolding.commodityId);
    //setSelectedFile(editedData.proofDocument);
  };

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

  let InlineValidationBoxExistingQtyheldError = () => {
    return (
        <div className="inline-validation-box">
          <p>
            {qtyHeldError}
          </p>
        </div>
    )
  }

  let InlineValidationBoxExistingSelectedCommodityError = () => {
    return (
        <div className="inline-validation-box">
          <p>
            {selectedCommodityError}
          </p>
        </div>
    )
  }

  let InlineValidationBoxExistingSelectedCompanyError = () => {
    return (
        <div className="inline-validation-box">
          <p>
            {selectedCompanyError}
          </p>

        </div>
    )
  }

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false)
  };

  const handleChange = (field, val) => {
    editedData[field] = val;
    setEditedData({ ...editedData });
  };
  const handleEditConfirmation = async (event) => {
    event.preventDefault();

    if(acceptTerms == false) {
      errorToast("Invalid", "Please accept Negotiations Terms and Conditions...");
      setacceptTerms(false)
      setLoadingbtn(false);
      return
    }

    if(previewimageArray.length < 1 ) {
      errorToast("Invalid", "Please add atleast one proof...");
      setLoadingbtn(false);
      return
    }

    setOpenModal(true)
  }
  const handleEdit = async (event) => {
    event.preventDefault();

    setOpenModal(false)

    setLoadingbtn(true);

    //console.log(editedData, "editedData");

    //console.log("sdsdsds"+acceptTerms)

    let stringifiedRequestBody = JSON.stringify(editedData);

    let response = await apiCall(
        `myholding/${selectedHolding.id}`,
        "PUT",
        editedData
    );

    if (response.status === 200) {
      successToast("Success", "Holdings successfully edited")
      await clearErrorMessages();
      setLoadingbtn(false);

      const holdingProofFormData = new FormData();

      previewimageArray.map(record => holdingProofFormData.append(
          "file",
          record
      ))

      let response1 = await apiCall1("myholding/holdingproofs11/"+selectedHolding.id, 'POST', holdingProofFormData)

      if (response1.status === 200) {
        // setOpen(true);
        // setTimeout(()=>{
        history.push("/holdings")
        // },3000)
      } else {
        // setShowUserAlreadyExistsError(true);
        errorToast("Not SuccessFul", "some problem occured, contact the admin...")
      }

      //   setTimeout(()=>{
      //   setLoadingbtn(false);
      //   history.push("/holdings")
      // },3000)
    } else if (response.status === 409) {
      errorToast("Not SuccessFul", "Contact Admin...")
      setLoadingbtn(false);
      return
    } else if (response.status === 400) {
      let responseJSON = await response.json()
      let i = 0;
      const arrayerrormessages = responseJSON.details1;
      //console.log(arrayerrormessages)
      const listItems = arrayerrormessages.map((errorResponse) =>

          validate(errorResponse.field,errorResponse.errorMessage)
      );
      setLoadingbtn(false);

    }  else {
      setLoadingbtn(false);
      await setShowQtyHeldError(false);
      await setQtyHeldError("some problem occured, contact the admin...");
    }

  };

  const clearErrorMessages = async () => {
    await setShowSelectedCompanyError(false);
    await setSelectedCompanyError('');
    await setShowSelectedCommodityError(false);
    await setSelectedCommodityError('');
    await setShowQtyHeldError(false);
    await setQtyHeldError('');
    await setShowDematedError(false);
    await setDematedError('');
    await setshowVestedError(false);
    await setVestedError('');
  }

  const validate = async (field, errorMessage) => {
    //console.log("hihhihihihihihihihihihihihihihihihiiiiiii"+field, errorMessage)
    await clearErrorMessages();
    switch (field) {
      case 'companyName':
        //console.log("hooooooooooooooooo1"+errorMessage)
        await setShowSelectedCompanyError(true);
        await setSelectedCompanyError(errorMessage);
        break;


      case 'commodityName':

        //console.log("hooooooooooooooooo11"+errorMessage)
        await setShowSelectedCommodityError(true);
        await setSelectedCommodityError(errorMessage);
        break;


      case 'qtyTotal':

        //console.log("hooooooooooooooooo111"+errorMessage)
        await setShowQtyHeldError(true);
        setQtyHeldError(errorMessage);

        break;

      case 'isDemated':
        //console.log("hooooooooooooooooo1111"+errorMessage)
        setShowDematedError(true);
        setDematedError(errorMessage);
        break;


      case 'isVested':
        //console.log("hooooooooooooooooo11111"+errorMessage)
        setshowVestedError(true);
        setVestedError(errorMessage);
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


  // async function onFileSelect(file) {
  //     console.log("in the on File..........")
  //     const img = await convertImgTOBase64(file);
  //     console.log("in the on File..........")
  //     //setproofDocument(img);
  //
  //     //imageArray = previewimageArray
  //     previewimageArray.push(img)
  //
  //     console.log(previewimageArray.length+"kjojfiohasifhaiohfiohsdfiohiu")
  //
  //
  //
  //     //setdbimageArray.push(img)
  //     setpreviewimageArray([...previewimageArray])
  //     //call api to dump dbimageArray into the db
  //
  //     //in th edit screens just assign all img objects from db directly with previewimageArray
  // }


  async function onFileSelect(file) {
    //console.log("in the on File..........")
    // const img = await convertImgTOBase64(file);
    const img = file;
    //console.log("in the on File..........")
    //setproofDocument(img);

    //imageArray = previewimageArray
    previewimageArray.push(img)

    //console.log(previewimageArray.length+"kjojfiohasifhaiohfiohsdfiohiu")



    //setdbimageArray.push(img)
    setpreviewimageArray([...previewimageArray])
    //call api to dump dbimageArray into the db

    //in th edit screens just assign all img objects from db directly with previewimageArray
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

  const removeProof = (record) => {

    setpreviewimageArray(previewimageArray.filter(value => value != record))
    //console.log("hihihihhihhihihihihihihihihihihihihihihihihihihi")
  }

  // const removeProof = async (record) => {
  //     console.log("hihihihhihhihihihihihihihihihihihihihihihihihihi"+record.id)
  //
  //      let response1 = await apiCall("myholding/holdingproofs11/"+selectedHolding.id+"/"+record.id, 'DELETE')
  //
  //     if (response1.status === 200) {
  //         //setOpen(true);
  //         GetAllProofs(false)
  //     } else {
  //         //await setShowQtyHeldError(false);
  //         //await setQtyHeldError("some problem occured, contact the admin...");
  //     }
  // }
  // const addProof = async (img) => {
  //     //console.log("hihihihhihhihihihihihihihihihihihihihihihihihihi"+record.id)
  //
  //     let reqdata1 = {
  //         "image": img
  //     }
  //
  //     let response1 = await apiCall("myholding/holdingproofs11/"+selectedHolding.id, 'POST', reqdata1)
  //
  //     if (response1.status === 200) {
  //         //setOpen(true);
  //         GetAllProofs(false)
  //     } else {
  //         //await setShowQtyHeldError(false);
  //         //await setQtyHeldError("some problem occured, contact the admin...");
  //     }
  // }

  // doc upload validation start

  const isValidFileUploaded=(file)=>{
    const validExtensions = ['png','jpeg','jpg','pdf']
    const fileExtension = file.type.split('/')[1]
    return validExtensions.includes(fileExtension)
  }
  const fileChange = e => {
    if(e.target.files.length < 1){
      return;
    }
    const file = e.target.files[0];
    const fsize = file.size;
    const file2 = Math.round((fsize / 1024));

    if(isValidFileUploaded(file) && (file2 <= 1024)){
      previewimageArray.push(file)
      setpreviewimageArray([...previewimageArray])
      console.log("file2",file2)
      console.log("file is valid")
    }else{
      errorToast("Invalid", "Please Upload valid file You Can Only Upload less then 1Mb and PNG, JPG and PDF format...");
      console.log("file is invalid")
    }
  }

  // doc upload validation end


  return (
      <div className="container EditHolding-Section">
        {/*<a href={editedData.proofDocument} download>download document </a>*/}
        <div className="my-card mt-5 mb-5">
          <div className="row">
            <div className="col-md-7">
              <div className="">
                <div>
                  <div className="addholding-form_Title">
                    <h3 className="pb-2">Edit Holding</h3>
                    <hr/>
                  </div>
                  <div className="mt-3">
                    <h6 className="m-0 text-dark"><b>{selectedHolding.companyName}</b></h6>
                    <p className="m-0">Holding ID : {selectedHolding.id}</p>
                  </div>
                </div>
                <div className="editholding_form_container">
                  <div>
                    <form className="editholding-form">
                      <div className="editholding-form_field addholding-form_field-2">
                        <div>
                          <label className="m-0">Share Type*</label>
                          <input
                              className="editholding-form_qty"
                              value={editedData.commodityName}
                              disabled
                              style={{height:"40px"}}
                          />
                        </div>
                        {showSelectedCommodityError ? <InlineValidationBoxExistingSelectedCommodityError/> : null}
                        <div>
                          <label className="m-0">Quantity*</label>
                          <input
                              className="editholding-form_qty"
                              value={editedData.qtyTotal}
                              onChange={(e) => handleChange("qtyTotal", e.target.value)}
                              style={{height:"40px"}}
                          />
                        </div>
                        {showQtyHeldError ? <InlineValidationBoxExistingQtyheldError/> : null}
                      </div>
                      {/*<div className="mt-2 heading">*/}
                      {/*  <p className="text-small m-0">Vested *</p>*/}
                      {/*  <form className="w-100">*/}
                      {/*    <div className="profile-form_field-container">*/}
                      {/*      <div className="profile-form_field-radio ">*/}
                      {/*        <div className="customRadio w-100">*/}
                      {/*          <input type="radio" className="radio-control" id="drone_yes" name="drone" value="YES" checked={editedData.isVested}*/}
                      {/*                  onChange={() => handleChange("isVested", true)}/>*/}
                      {/*          <label className="m-0" for="drone_yes">YES<span className="checkmark" />*/}
                      {/*          </label>*/}
                      {/*        </div>*/}
                      {/*      </div>*/}
                      {/*      <div className="profile-form_field-radio ">*/}
                      {/*        <div className="customRadio w-100">*/}
                      {/*          <input type="radio" className="radio-control" id="drone_no" name="drone" value="NO" checked={!editedData.isVested} onChange={() => handleChange("isVested", false)}/>*/}
                      {/*          <label className="m-0" for="drone_no">NO<span className="checkmark" />*/}
                      {/*          </label>*/}
                      {/*        </div>*/}
                      {/*      </div>*/}
                      {/*    </div>*/}
                      {/*  {showVestedError ? <InlineValidationBoxExistingVestedError/> : null}*/}
                      {/*  </form>*/}
                      {/*</div>*/}

                      {/*<div className="mt-2 heading">*/}
                      {/*  <p className="text-small m-0">Demated *</p>*/}
                      {/*  <form className="w-100">*/}
                      {/*    <div className="profile-form_field-container">*/}
                      {/*      <div className="profile-form_field-radio ">*/}
                      {/*        <div className="customRadio w-100">*/}
                      {/*          <input type="radio" className="radio-control" id="demated_yes" name="demated" value="YES" checked={editedData.isDemated} onChange={() => handleChange("isDemated", true)}/>*/}
                      {/*          <label className="m-0" for="demated_yes">YES<span className="checkmark" />*/}
                      {/*          </label>*/}
                      {/*        </div>*/}
                      {/*      </div>*/}
                      {/*      <div className="profile-form_field-radio ">*/}
                      {/*        <div className="customRadio w-100">*/}
                      {/*          <input type="radio" className="radio-control" id="demated_no" name="demated" value="NO" checked={!editedData.isDemated} onChange={() => handleChange("isDemated", false)}/>*/}
                      {/*          <label className="m-0" for="demated_no">NO<span className="checkmark" />*/}
                      {/*          </label>*/}
                      {/*        </div>*/}
                      {/*      </div>*/}
                      {/*    </div>*/}
                      {/*    {showDematedError ? <InlineValidationBoxExistingDematedError/> : null}*/}
                      {/*  </form>*/}
                      {/*</div>*/}

                      <div className="editholding-form_field "></div>
                      {/*<div className="editholding-form_field ">*/}
                      {/*    <label className="m-0">Special conditions for transfer*</label>*/}
                      {/*    <Select*/}
                      {/*        isMulti*/}
                      {/*        options={editedData.specialConditionTransfer}*/}

                      {/*        onChange={(e) => handleChange("specialConditionTransfer", e.value)}*/}
                      {/*    />*/}
                      {/*</div>*/}


                      <div className="editholding-form_field addholding-form_upload-photo d-flex align-items-center p-3">
                        <div className="custom-file-upload">
                          <input type="file" className="form-control fileupload-input" onChange={fileChange} ></input>

                          {/* <input type="file" className="form-control fileupload-input" onChange={(e) => onFileSelect(e.target.files[0])}></input>  */}

                          <img src={UploadIcon} width='100' classNames="mr-3"/>
                          {/*<img src={editedData.proofDocument} width='100' className="mr-3"/>*/}

                          <p style={{color: "#2e384d", fontSize:"13px"}}>
                            Upload your proof of holding. You can upload the screenshot (share certificate/demat holding)
                            as proof or  as proof or{" "}
                            <span style={{color:"#721b65",cursor:"pointer",fontWeight: "700"}}>browse</span>
                          </p>
                        </div>

                        {/*{previewimageArray.map((url, index) => (*/}
                        {/*    <div>*/}
                        {/*        <a href={url} download> proof {index}</a>*/}
                        {/*        <img src={MinusIcon} onClick={removeProof}/>*/}
                        {/*    </div>*/}
                        {/*))}*/}

                        {/*{previewimageArray.map(url => (*/}
                        {/*    <img src={url} alt="..." width={50} height={50}/>*/}
                        {/*))}*/}

                        {/*{selectedFile && <img src={selectedFile} width="100"/> }*/}

                        {/*{editedData.proofDocument && <img src={editedData.proofDocument} width="100"/> }*/}

                      </div>
                      <div >
                        <div>
                          <br/>
                          {previewimageArray1.length != 0 ?
                              <p style={{color: "#2e384d", fontSize:"13px"}}>
                                All Old Proofs Submitted by you
                              </p> : null }


                          {previewimageArray1.map((url, index) => (
                              <div>
                                <a href={downloadurl("myholding/downloadproof/"+url.id)}><b className="m-0 text-small">{url.name}</b></a>


                                {/*<a href={url.id} download>  {url.name}.{url.type}</a>*/}
                                {/*<img src={MinusIcon} onClick={(e)=>removeProof(url)}/>*/}
                              </div>
                          ))}
                        </div>

                        <div>
                          <br/>
                          {previewimageArray.length != 0 ?
                              <p style={{color: "#2e384d", fontSize:"13px"}}>
                                All new Proofs Submitted by you
                              </p> : null }

                          {previewimageArray.map((url, index) => {

                            return (
                                <div>
                                  <span>{url.name}</span>
                                  {/*<a href={convertImgTOBase64(url)} download> {url.name}</a>*/}
                                  <img src={MinusIcon} onClick={(e)=>removeProof(url)}/>
                                </div>
                            )})}
                        </div>

                        {/*<GetAppIcon className="mr-3 text-white" style={{width:"20px", height:"20px"}} width="100" />*/}
                        {/*    /!*<a download="holdingproof" href={selectedFile}>Download Proof</a>*!/*/}
                      </div>
                      <div className="addholding-form_note mt-3 mb-3">
                        <div>
                          <img src={vector} style={{margin: "10px"}}/>
                        </div>
                        <div className="p-2">
                          <p className="m-0 text-small"> <b>Note:</b> Uploading a fake or an outdated inventory is punishable by law. Please verify your inventory thoroughly to avoid any Infringement. This will lead to permanent blocking of your credentials from our platform.
                            <br/><a href={downloadurl("myholding/downloaddisclaimeragreement/guidelines")}><b className="m-0 text-small">Click here to read guideleines.</b></a>
                          </p>
                        </div>
                      </div>
                      <div className="AddListing_Disclaimer text-small">
                        <input class="styled-checkbox2" id="styled-checkbox-2" type="checkbox" value="value1" onChange={(e)=>{
                          //console.log("123232323232323232"+e.target.checked)
                          setacceptTerms(e.target.checked)
                        }}/>
                        <label for="styled-checkbox-2">By submiting this holding for sale, I undertake that I am eligible to sell the above mentioned shares Read the <span style={{color:"#721B65"}}><a href={downloadurl("myholding/downloaddisclaimeragreement/agreementtermsconditions")}><b>disclaimer agreement</b></a></span></label>
                      </div>
                      <div className="editholding-form_button_container mt-3 mb-3">
                        <Buttons.SecondaryButton style={{width:"100%", margin:"0px 5px"}} onClick={handleCreate1} value="Discard"/>

                        {!isLoadingbtn && (
                            <Buttons.PrimaryButton style={{width:"100%", margin:"0px 5px"}} onClick={handleEditConfirmation} value="Submit"/>
                        )}

                        {isLoadingbtn && (
                            <Loadbutton />
                        )}

                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="">
                {/*<div>*/}
                {/*  <Link to={{pathname: '/create_inventory', state: { selectedHolding } }}><p className="add-lisiting-link">+ Add listing</p></Link>*/}
                {/*</div>*/}
                <div className="my-card py-5 px-5">
                  <div className="holding-play">
                    <img src={VideoPreviewAddholding} />
                    <img src={PlayIcon} className="playvideo"/>
                  </div>
                  <div className="mt-5">
                    <p className="m-0"><b>Holding</b></p>
                    <p className="text-small">
                      Lorem Ipsum is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard dummy
                      text ever since the 1500s, when an unknown printer took a galley
                      of type and scrambled it to make a type specimen book.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <Dialog
              open={openModal}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description" >

            <div className='allcompany-modal-closeIcon text-right'>
              <CloseIcon onClick={handleClose} />
            </div>
            <div className="addcompanyrequest px-5 pb-5">
              <div className="">
                <div className="text-center">

                  <h5><b>Edit Quantity</b></h5>
                  <p className="m-0 text-small">Changing holding's <br />quantity may impact negotiations!</p>

                </div>
                <div className="d-flex justify-content-center  mt-4">
                  <Buttons.SecondaryButton value="Cancel " onClick={handleClose} style={{ marginRight: "5px" }} />
                  <Buttons.PrimaryButton value="Confirm" onClick={handleEdit} style={{ marginLeft: "5px" }} />

                </div>
              </div>
            </div>
          </Dialog>

        </div>
      </div>
  );
};

export default EditHoldings;
