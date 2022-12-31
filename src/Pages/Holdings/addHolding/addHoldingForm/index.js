import React, {useState, useEffect} from "react";
import Select from "react-select";
import "./style.css";
import UploadIcon from "../../../../assets/upload_icon.svg";
import vector from "./Vector.png"
import Greenright from "./Groupgreen right.png"
import { apiCall1, apiCall, apiCall26, downloadurl, setAccessToken } from "../../../../Utils/Network"
import { Link, useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Buttons from "../../../../../src/Components/Buttons/index"
import { successToast, errorToast } from "../../../../Components/Toast/index";
import Loadbutton from '../../../../Components/Loadbutton/Index';
import MinusIcon from './minus.svg';
import Loader from "../../../../Components/Loader/loader";
import loadingImg from './loading.gif'
import { components } from 'react-select';
import AddCompanyRequest from '../../../../Components/AddCompanyRequest';


const options = [
    { value: "ROFR", label: "ROFR" },
    { value: "HR approval", label: "HR approval" },
];

function AddHoldingsForm() {
    let history = useHistory();

    //const [imageObj1, setimageObj1] = React.useState([])
    const [previewimageArray, setpreviewimageArray] = React.useState([])

    const [selectedCompany, setSelectedCompany] = React.useState('')
    const [selectedCompanyError, setSelectedCompanyError] = React.useState('')
    const [showSelectedCompanyError, setShowSelectedCompanyError] = React.useState(false)
    const [selectedCommodity, setSelectedCommodity] = React.useState('')
    const [selectedCommodityError, setSelectedCommodityError] = React.useState('')
    const [showSelectedCommodityError, setShowSelectedCommodityError] = React.useState(false)
    const [shareType, setShareType] = React.useState('')
    const [qtyHeld, setQtyHeld] = React.useState('')
    const [qtyHeldError, setQtyHeldError] = React.useState('')
    const [showQtyHeldError, setShowQtyHeldError] = React.useState(false)
    const [demated, setDemated] = React.useState('')
    const [dematedError, setDematedError] = React.useState('')
    const [showDematedError, setShowDematedError] = React.useState('')
    const [vested, setVested] = React.useState(true)
    const [vestedError, setVestedError] = React.useState('')
    const [showVestedError, setshowVestedError] = React.useState('')
    const [holding,setHolding] = React.useState({})
    const [userAlreadyExistsError,setUserAlreadyExistsError] = React.useState('')
    const [showUserAlreadyExistsError,setShowUserAlreadyExistsError] = React.useState('')

    const [proofDocument, setproofDocument] = React.useState('')

    const [allCompany, setAllCompany] = React.useState([])
    const [allCommodity, setAllCommodity] = React.useState([])

    const [showExistingHoldingInlineValidation, setShowExistingHoldingInlineValidation] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const [addCompanyRequest, setAddCompanyRequest] = React.useState(false);

    const [specialConditionForTransfer, setspecialConditionForTransfer] = React.useState('')
    const [acceptTerms,setacceptTerms] = React.useState(false)
    const [isLoadingbtn, setLoadingbtn] = useState(false);

    const [isLoading, setisLoading] = React.useState(false)


    React.useEffect(() => {

        GetAllcompany();

    } , [])

    // const showCompany = () =>{
    //     console.log("show company ")
    //     isLoading?setisLoading(true):setisLoading(false);    
    //     setTimeout(() => {
    //         console.log('This will run after 1 second!')
    //         GetAllcompany();
    //         // isLoading?setisLoading(true):setisLoading(false);
    //         setisLoading(false)
    //       }, 1500)
    // } 

    // const loader = () =>{
    //     return(
    //         <>
    //          <div className="negotiation-loader text-center mt-auto"><img src={loadingImg} alt=""/></div> 
    //         </>
    //     )
    // }

    const AddtoWatchList = async () => {

        let response = await apiCall("company/usercompanywatchlist", "PUT", {
            "id" : selectedCompany.value, "addedWatchList": true
        })
        //console.log("apicalled",response.status)
        if (response.status !== 200) {
            //errorToast("Invalid", "Mobile Number Does not exists");
            return;
        } else if (response.status === 200) {
            //console.log(trade.addedWatchList+"kokokokokoko")
        }
    };

    const GetAllcompany = async () => {
        let response = await apiCall("company/allcompaniesnames", 'GET')
        let responseJSON = await response.json()
        let companies = responseJSON.map((company) => {return {value: company.id , label: company.name}})
        setAllCompany(companies)
        //console.log('selectlist', allCompany);
    }

    React.useEffect(() => GetAllCommodity(), [])

    const GetAllCommodity = async () => {
        let response = await apiCall("commodity/", 'GET')
        let responseJSON = await response.json()
        let commodity = responseJSON.map((item) => {return {value: item.id, label: item.name }})
        setAllCommodity(commodity)
    }

    // let InlineValidationBoxUserAlreadyExists = () => {
    //     return (
    //         <div className="inline-validation-box bg-warning">
    //             <p>
    //                 Note: Holding already exists for this company’s Share type. You can continue to create a “New Holding” for another share type or add edit your existing holding.
    //             </p>
    //             <Link to="/holdings">Go to my existing Holdings</Link>
    //         </div>
    //     )
    // }

    let InlineValidationBoxUserAlreadyExists = () => {
        return (
            <div className="inline-validation-box bg-warning">
                <p>
                    Note: Holding already exists for this company’s Share type. You can continue to create a “New Holding” for another share type or add edit your existing holding.
                </p>

                <Link to="/holdings">Go to my existing Holdings</Link>
            </div>
        )
    }

    let InlineValidationBoxExistingVestedError = () => {
        return (
            <div className="inline-validation-box ">
                <p>
                    {vestedError}
                </p>
            </div>
        )
    }

    let InlineValidationBoxExistingDematedError = () => {
        return (
            <div className="inline-validation-box ">
                <p>
                    {dematedError}
                </p>
            </div>
        )
    }

    let InlineValidationBoxExistingQtyheldError = () => {
        return (
            <div className="inline-validation-box ">
                <p>
                    {qtyHeldError}
                </p>
            </div>
        )
    }

    let InlineValidationBoxExistingSelectedCommodityError = () => {
        return (
            <div className="inline-validation-box ">
                <p>
                    {selectedCommodityError}
                </p>
            </div>
        )
    }

    let InlineValidationBoxExistingSelectedCompanyError = () => {
        return (
            <div className="inline-validation-box test">
                <p>
                    {selectedCompanyError}
                </p>

            </div>
        )
    }


    const handleCreate = async (event) => {

        setLoadingbtn(true);

        event.preventDefault()

        //console.log("sdsdsds"+acceptTerms)

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

        clearErrorMessages();

        let dematBoolean, vestedBoolean
        if (demated === "yes") {
            dematBoolean = true
        } else if (demated === "no") {
            dematBoolean = false
        }

        if (vested === "yes") {
            vestedBoolean = true
        } else if (demated === "no") {
            vestedBoolean = false
        }

        //console.log("selected company ", selectedCompany)
        let requestBody = {
            "companyName": selectedCompany.label,
            "companyId": selectedCompany.value,
            "commodityId": allCommodity[0].value,
            "commodityName": allCommodity[0].label,
            "qtyTotal": qtyHeld,

            "isDemated": dematBoolean,
            "isVested": vestedBoolean,
            "specialConditionTransfer": specialConditionForTransfer,
        }

        //console.log("request body", requestBody)

        let stringifiedRequestBody = JSON.stringify(requestBody)

        //console.log("request body stringified", stringifiedRequestBody)

        // let response = await fetch("http://api1.unlistedassets.com/myholding/?access_token=b175ef54-e6af-41c3-ba0b-a5bbad752b9d",
        //     {method: "POST", body: stringifiedRequestBody, headers: {"content-type": "application/json"}}
        //     )
        //console.log("hihihihihhuhugyfdtxtdudffvubgihijnoknig"+requestBody.qtyTotal+requestBody.companyName+requestBody.commodityName+requestBody.isVested)
        let response = await apiCall("myholding/", 'POST', requestBody)

        if (response.status === 409) {
            setShowUserAlreadyExistsError(true);

            setUserAlreadyExistsError("some problem occured, contact the admin...");
            setLoadingbtn(false);

        } else if (response.status === 400) {
            setLoadingbtn(false);
            let responseJSON = await response.json()
            let i = 0;
            const arrayerrormessages = responseJSON.details1;
            //console.log(arrayerrormessages)
            const listItems = arrayerrormessages.map((errorResponse) =>
                validate(errorResponse.field,errorResponse.errorMessage)
            );
            setLoadingbtn(false);
        }
        else if(response.status === 200){
            successToast("Success", "Holding created successfully. The same will get approved within 24 Hours!!")

            await clearErrorMessages();
            let responseJSON = await response.json()
            setHolding(responseJSON)

            //console.log("response ", response)

            //console.log("responseJson", responseJSON)

            const holdingProofFormData = new FormData();

            previewimageArray.map(record => holdingProofFormData.append(
                "file",
                record
            ))


            let response1 = await apiCall1("myholding/holdingproofs11/"+responseJSON.id, 'POST', holdingProofFormData)

            if (response1.status === 200) {
                // setOpen(true);
                // setTimeout(()=>{
                    history.push("/holdings")
                // },3000)
                AddtoWatchList()
            } else {
                setShowUserAlreadyExistsError(true);
                setUserAlreadyExistsError("some problem occured, contact the admin...");
            }
            setLoadingbtn(false);
        } else {
            setShowUserAlreadyExistsError(true);
            setUserAlreadyExistsError("some problem occured, contact the admin...");
            setLoadingbtn(false);
        }
    }

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
                await setQtyHeldError(errorMessage);

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
        setLoadingbtn(true);

        // setTimeout(() => {
            history.push("/holdings");
            setLoadingbtn(false);

        // }, 0);
    };

    const removeProof = (record) => {

        setpreviewimageArray(previewimageArray.filter(value => value != record))
        //console.log("hihihihhihhihihihihihihihihihihihihihihihihihihi")
    }

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
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    // create a preview as a side effect, whenever selected file is changed
    // useEffect(() => {
    //     if (!selectedFile) {
    //         setPreview(undefined)
    //         return
    //     }
    //
    //     console.log("in the use effect..........")
    //     const objectUrl = URL.createObjectURL(selectedFile)
    //     setPreview(objectUrl)
    //
    //     // free memory when ever this component is unmounted
    //     return () => URL.revokeObjectURL(objectUrl)
    // }, [selectedFile])

    // const onSelectFile = async e => {
    //     if (!e.target.files || e.target.files.length === 0) {
    //         setSelectedFile(undefined)
    //         return
    //     }
    //
    //     console.log("in the Select File..........")
    //
    //     // I've kept this example simple by using the first image instead of multiple
    //     //setSelectedFile(e.target.files[0])
    //
    //
    //
    //     const img = await convertImgTOBase64(e.target.files[0]);
    //     console.log("in the on File..........")
    //     uploadMultipleFiles(e, img)
    //     //setproofDocument(img);
    // }

    const UpdateUser = () => {
        setLoadingbtn(true);

        fetch("https://jsonplaceholder.typicode.com/todos/1")
            .then((response) => response.json())
            .then((json) => {
                //console.log('test', json);
                setLoadingbtn(false);
            });
    };

    const SelectMenuButton = (props) => {
        return (
            <components.MenuList  {...props}>
                {props.children}
                <div className="addholding-form_field-select d-flex justify-content-between align-items-center">
                    <p className="mb-0">Can not find your company ?</p>
                    <Link onClick={()=>{setAddCompanyRequest(true)}}>Add company Request</Link>                   
                </div>                
            </components.MenuList >
        ) }
    

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
        <div className="addholding-form">
            <div className="addholding-form_Title">     
            {/* <h3 className="pb-2">Create Holding</h3> <hr/>  */}
                <div className=" d-flex justify-content-between align-item-center">
                    <div><h3 className="pb-2">Create Holding</h3> <hr/></div>                    
                </div>           
                
                
            </div>
            <div className="addholding-form_field ">
                <label className="m-0">Company Name*</label>
                {isLoading?<div className="negotiation-loader text-center mt-auto "><img src={loadingImg} alt="" /></div> :<>

                    <Select options={allCompany}  onChange={selectedOption=>setSelectedCompany(selectedOption)} value={selectedCompany} components={{ MenuList: SelectMenuButton }} />

                    <Dialog open={addCompanyRequest} onClose={()=>{setAddCompanyRequest(false)}} >
                        <AddCompanyRequest onClose={()=>{setAddCompanyRequest(false)}}/>
                    </Dialog>                    
                    </>

                }
                {showSelectedCompanyError ?
                    <InlineValidationBoxExistingSelectedCompanyError />: null} { showUserAlreadyExistsError ?
                <InlineValidationBoxUserAlreadyExists/>: null}
                    {/* <SelectMenuButton/> */}
                    

            </div>
            <div className="addholding-form_field addholding-form_field-2 mt-0">
                <div>
                    <label className="m-0">Share Type*</label>
                    {/*/!*<Select options={allCommodity} onChange={selectedOption=>setSelectedCommodity(selectedOption)} value={selectedCommodity}/> {showSelectedCommodityError ?*!/*/}
                    {/*<Select disabled="disabled" options={allCommodity} onChange={selectedOption=>setSelectedCommodity(selectedOption)} value={allCommodity[0]}/> {showSelectedCommodityError ?*/}
                    {/*<InlineValidationBoxExistingSelectedCommodityError />: null}*/}
                    <input className="form-control text-small" disabled="disabled" value={(allCommodity[0] == undefined) ? "" :allCommodity[0].label} style={{height:"45px"}}/>

                </div>
                <div className="addholding-form_field ">
                    <label className="m-0">Quantity*</label>
                    <input className="form-control text-small" placeholder='Quantity' value={qtyHeld} onChange={(e)=>setQtyHeld(e.target.value)} style={{height:"45px"}}/> {showQtyHeldError ?
                    <InlineValidationBoxExistingQtyheldError/>: null }
                </div>
            </div>
            {/*<div className="mt-2">*/}
            {/*    <p className="text-small m-0">Vested *</p>*/}
            {/*    <div className="profile-form_field-container">*/}
            {/*        <div className="profile-form_field-radio ">*/}
            {/*            <div className="customRadio w-100">*/}
            {/*                <input type="radio" className="radio-control" id="vested_yes" name="vested" value="YES" checked={vested==="yes" ? true : false} onChange={(e)=>{setVested("yes")}}/>*/}
            {/*                <label className="m-0" for="vested_yes">YES<span className="checkmark" />*/}
            {/*                </label>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="profile-form_field-radio ">*/}
            {/*            <div className="customRadio w-100">*/}
            {/*                <input type="radio" className="radio-control" id="vested_no" name="vested" value="NO" checked={vested==="no" ? true : false} onChange={(e)=>setVested("no")}/>*/}
            {/*                <label className="m-0" for="vested_no">NO<span className="checkmark" />*/}
            {/*                </label>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    {showVestedError ?*/}
            {/*        <InlineValidationBoxExistingVestedError />: null}*/}
            {/*</div>*/}

            {/*<div className="mt-2">*/}
            {/*    <p className="text-small m-0">Demated *</p>*/}
            {/*    <div className="profile-form_field-container">*/}
            {/*        <div className="profile-form_field-radio ">*/}
            {/*            <div className="customRadio w-100">*/}
            {/*                <input type="radio" className="radio-control" id="demated_yes" name="demated" value="YES" checked={demated==="yes" ? true : false} onChange={(e)=>{setDemated("yes")}}/>*/}
            {/*                <label className="m-0" for="demated_yes">YES<span className="checkmark" />*/}
            {/*                </label>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="profile-form_field-radio ">*/}
            {/*            <div className="customRadio w-100">*/}
            {/*                <input type="radio" className="radio-control" id="demated_no" name="demated" value="NO" checked={demated==="no" ? true : false} onChange={(e)=>{setDemated("no")}}/>*/}
            {/*                <label className="m-0" for="demated_no">NO<span className="checkmark" />*/}
            {/*                </label>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    {showDematedError ?*/}
            {/*        <InlineValidationBoxExistingDematedError />: null}*/}
            {/*</div>*/}

            <div className="addholding-form_field "></div>
            {/*<div className="addholding-form_field ">*/}
            {/*  <label>Special conditions for transfer*</label>*/}
            {/*  <Select isMulti options={options} onChange={a11 =>{console.log(a11)}}/>*/}
            {/*</div>*/}
            <div className="addinventory-form_field addinventory-form_upload-photo">
                <div className="custom-file-upload">
                    <input type="file" className="form-control fileupload-input" onChange={fileChange}></input>

                    {/* <input type="file" className="form-control fileupload-input" onChange={(e) => onFileSelect(e.target.files[0])}></input> */}
                    <img src={UploadIcon} width='100' className="mr-3"/>
                    {/* <img src={proofDocument} width='100' className="mr-3"/> */}
                    <p style={{color: "#2E384D", fontSize:"13px"}}>
                        * Upload proof of shares such as CML copy , <br /> Screenshot of   Holdings from NSDL/CDSL <br /> with timestamp.  <br /> You can upload as PDF/JPEG/PNG. <br/>
                        <span style={{color:"#721B65",cursor:"pointer",fontWeight: "700"}}> Browse</span>
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

                {/*{<img src={preview} width="100"/> }*/}
            </div>
            <div >

                {previewimageArray.map((url, index) => (
                    <div className="proof_link">
                        <span>{url.name}</span>
                        {/*<a href={url} download> {url.name} </a>*/}
                        <img src={MinusIcon} onClick={(e)=>removeProof(url)}/>
                    </div>
                ))}

                {/*<GetAppIcon className="mr-3 text-white" style={{width:"20px", height:"20px"}} width="100" />*/}
                {/*    /!*<a download="holdingproof" href={selectedFile}>Download Proof</a>*!/*/}
            </div>
            <div className="addholding-form_note mt-3 mb-3">
                <div>
                    <img src={vector} style={{margin: "10px"}}/>
                </div>
                <div className="p-2">              
	
                    <p className="m-0 text-small"> <b>Note:</b> Uploading outdated or fake proof of inventory or holding is not accepted. Please ensure the holding proof is not older than 24 hrs. Click here to 
                        <br/><a href={downloadurl("myholding/downloaddisclaimeragreement/guidelines")}><b className="m-0 text-small">Read Guidelines</b></a>
                    </p>
                </div>
            </div>
            <div className="AddListing_Disclaimer text-small">
                <input class="styled-checkbox2" id="styled-checkbox-2" type="checkbox" value="value1" onChange={(e)=>{

                    setacceptTerms(e.target.checked)
                }}/>
                <label for="styled-checkbox-2">By submiting this holding for sale, I undertake that I am eligible to sell the above mentioned shares Read the Disclaimer Agreement <span style={{color:"#721B65"}}><a href={downloadurl("myholding/downloaddisclaimeragreement/agreementtermsconditions")}><b>Click here...</b></a></span></label>
            </div>
            <div className="addholding-form_button_container">
                <Buttons.SecondaryButton value="Discard" onClick={handleCreate1} style1={{cursor: "pointer"}} style={{width:"100%",margin:"0px 5px"}}/>
                {!isLoadingbtn && (
                    //    <Buttons.PrimaryButton value="Submit" onClick={handleCreate} style1={{cursor: "pointer"}} style={{width:"100%",margin:"0px 5px"}}/>
                    <Buttons.PrimaryButton value="Submit" onClick={handleCreate} style1={{cursor: "pointer"}} style={{width:"100%",margin:"0px 5px"}}/>
                )}
                {isLoadingbtn && (
                    <Loadbutton />
                )}
                <Dialog style={{display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "center"}} open={open} onClose={()=>{ setOpen(false) }} >
                    {/*
                    <DialogTitle id="alert-dialog-title">{"Your Holdings Created Successfully!"}</DialogTitle>*/}
                    <img style={{height: "100px" ,width: "100px", paddingLeft: "180px",marginTop: "10px"}} src={Greenright}/>
                    <h2 style={{paddingLeft: "40px"}}>Holdings Successfully Created!</h2>
                    <p style={{paddingLeft: "5px"}}>Continue to add listing to start selling on our marketplace.</p>
                    <DialogActions>
                        <Buttons.SecondaryButton value="Skip For Now" onClick={()=>{setOpen(false);history.push("/holdings")}}/>
                        <Buttons.PrimaryButton value="Continue" onClick={()=>{ history.push({ pathname: "/create_inventory", state: { selectedHolding: holding} }) } }/></DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default AddHoldingsForm;
