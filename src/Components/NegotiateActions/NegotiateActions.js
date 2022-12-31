import React,{useState,useRef} from "react";
import { useEffect } from "react";
import { apiCall, apiCall12 } from "../../Utils/Network";
import Buttons from "../Buttons";
import Portal from '@material-ui/core/Portal';
import Loadbutton from '../../Components/Loadbutton/Index'
import {useLocation} from "react-router-dom";
import {
    successToast,errorToast
  } from "../Toast/index";
import Negotiations from "../../Pages/Negotiations";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory
} from "react-router-dom";
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded';
import QueryBuilderRoundedIcon from '@material-ui/icons/QueryBuilderRounded'; 
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,s
} from '@material-ui/pickers';
import './buyerform.css';
import Select from "react-select";
import Dialog from '@material-ui/core/Dialog';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDateTimePicker from '@mui/lab/StaticDateTimePicker';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from "./cross.svg"
import { getTransactionFee } from "../../Utils/utils";

export default function BuyerForm(props){
    let history = useHistory();

    const {tradecommunication1, ongoingtxnid1} = props;

    const location = useLocation();
    const selectedTrade = props.selectedTrade
    const [quantity,setQuantity]=React.useState("");
    const [price,setPrice]=React.useState("");
    const [txnAmount,settxnAmount]=React.useState(0);

    const [txnFee,settxnFee]=React.useState(0);

    const [txnTotal,settxnTotal]=React.useState(0);

    const [comment,setComment]=React.useState('This is my best offer');
    const [buyerformdetails,setBuyerformdetails] = React.useState({});
    const [communicationStatus,setCommunicationstatus] = React.useState('newoffer')
    const [tradeOnGoingTranaction,setTradeOnGoingTranaction] = React.useState({});
    const [nonTradeOwnerAccountId,setNonTradeOwnerAccountId] = React.useState('');
    const [quantityError,setQuantityError] = React.useState('')
    const [showQuantityError,setShowQuantityError] = React.useState('')
    const [priceError,setPriceError] = React.useState('')
    const [showPriceError,setShowPriceError] = React.useState('')
    const [commentError,setCommentError] = React.useState('')
    const [showCommentError,setShowCommentError] = React.useState('')
    const [acceptTerms,setacceptTerms] = React.useState(false)

    const [isLoadingbtn, setLoadingbtn] = useState(false);

    const [date1, setDate1] = React.useState(new Date());
    const [datediff, setDatediff] = React.useState(false);

    const date = new Date()

    const [selectedDate, setSelectedDate] = React.useState(date.setTime( date.getTime() + 1 * 86400000 ));
    const [selectedDate1, setSelectedDate1] = React.useState();

    const [minDate, setminDate] = React.useState(new Date(date.setTime( date.getTime() + 1 * 86400000 )));
    const [maxDate, setmaxDate] = React.useState(new Date(date.setTime( date.getTime() + 4 * 86400000 )));
    const [userType, setuserType] = React.useState(props.selectedTrade.isTradeOwner? "seller" : "buyer");
    const [negotiationComments, setnegotiationComments] = React.useState([]);
    const [showDialog,setShowDialog] = React.useState(false);

    const [offerCount, setOfferCount] = React.useState(0);

    const chatEndRef =useRef(null);

        const scrollToBottom2 = () => {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        useEffect(() => {
            scrollToBottom2()


        });

    const getAllComments = async function () {

        let response2 = await apiCall12("negotiationComments/search/findByType?type="+userType,'GET', '', history)
        let responseJSON2 = await response2.json();
        let responseJSON21 = responseJSON2._embedded.negotiationComments
        // console.log(responseJSON21)
        let negotiationComments = responseJSON21.map((negotiationComment) => {return {value: negotiationComment.id , label: negotiationComment.name}})
        await setnegotiationComments(negotiationComments)
    }

    let InlineValidationQuantity = () => {
        return (
            <div className="inline-validation-box error-msg">
                <p className="py-1 mb-1 pl-1">
                    {quantityError}
                </p>
            </div>
        )
    }

    let InlineValidationBoxPrice = () => {
        return (
            <div className="inline-validation-box error-msg">
                <p className="py-1 pl-1">
                    {priceError}
                </p>
             </div>
        )
    }

    let InlineValidationBoxComment = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {commentError}
                </p>
             </div>
        )
    }


    let SetDate = () =>{

        return (
            <div className="negotiation-datepicker">

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDateTimePicker
                    displayStaticWrapperAs="desktop"
                    // inputFormat="dd/MM/yyyy"
                    openTo="day"
                    value={selectedDate}
                    minDate = {minDate}
                    maxDate = {maxDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>

            </div>
        )
    }

    useEffect(()=>{
        GetTradeOnGoingTransaction();
        handleDateChange(selectedDate)
        getAllComments()
    },[])

    console.log("selectedDate" ,selectedDate)

    const reqBody = {

        "communicationStatus": communicationStatus,
        "nonTradeOwnerAccountId": nonTradeOwnerAccountId,
        "tradeOnGoingTransactionId": ongoingtxnid1,
        "message": comment,
        "offeredPrice": price,
        "offeredQuantity": quantity,
        "tradeId": selectedTrade.id,
        "offerValidTime": selectedDate1,
        "lastOfferCommunicationId": props.lastOfferCommunicationId
      }

    const  GetTradeOnGoingTransaction = async function () {

        if(tradecommunication1[0] !== undefined) {
            const response = await apiCall("tradeongoingtranaction/ongoingtransaction/"+tradecommunication1[0].tradeOnGoingTransactionId,"GET", history)
            if(response.status == undefined) {
                // errorToast("Invalid", "Invalid User ID or password");
                return
            }
            const responseJSON = await response.json();
            await setNonTradeOwnerAccountId(responseJSON.onboardingTradeNONOwnerId);
            // console.log("hiiiiiiiiii"+responseJSON.onboardingTradeNONOwnerId+nonTradeOwnerAccountId)
        }
    }

    const clearErrorMessages = async () => {
        await setShowQuantityError(false);
        await setQuantityError('');
        await setShowPriceError(false);
        await setPriceError('');
        await setShowCommentError(false);
        await setCommentError('');
     }

    const validate = async (field, errorMessage) => {
        // console.log("hihhihihihihihihihihihihihihihihihiiiiiii"+field, errorMessage)
        await clearErrorMessages();
          switch (field) {
              case 'offeredQuantity':
                  // console.log("hooooooooooooooooo1"+errorMessage)
                  await setShowQuantityError(true);
                  await setQuantityError(errorMessage);
                  break;

                case 'offeredPrice':
                    // console.log("hooooooooooooooooo1"+errorMessage)
                  await setShowPriceError(true);
                  await setPriceError(errorMessage);
                  break;

                  case 'message':
                    // console.log("hooooooooooooooooo1"+errorMessage)
                  await setShowCommentError(true);
                  await setCommentError(errorMessage);
                  break;

              default:
                  // console.log("hooooooooooooooooonijhibibibibib")

          }
      }

    async function buyerformsend() {

        setLoadingbtn(true);

        await clearErrorMessages();

        if(acceptTerms == false) {
            errorToast("Invalid", "Please accept Negotiations Terms and Conditions...");
            setacceptTerms(false)
            setLoadingbtn(false);

            return
        }

        if((price * quantity) < 200) {
            setShowDialog(true)
            setLoadingbtn(false);
            return
        }
        // setOfferCount(offerCount+1)
        // if ((offerCount+1) <= 1 ) {
        //     successToast("Success","Request Sent Successfully")
        // }
        // else if (offerCount ==2) {
        //     errorToast("Invalid","You have made 2 offers for the same negotiation. This is your last attempt . Please wait for the seller to respond.");
        //     return
        // }
        // else{
        //     errorToast("Invalid","Please note you have reached the maximum threshold of bids to the seller. Please wait for the seller to respond.");
        //     return
        // }

        //alert("hiiiiii"+props.lastOfferCommunicationId)
        reqBody.tradeOnGoingTransactionId= ongoingtxnid1
        const response = await apiCall("tradecommunication/",'POST',reqBody, history)
        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        const responseJSON = await response.json();

        setBuyerformdetails(responseJSON);
        setLoadingbtn(false);
        // console.log(response.status+"kkkkk")
        if (response.status === 200){

            if(responseJSON.noOfOffersMadeConsecutively != undefined
                && responseJSON.noOfOffersMadeConsecutively == 2) {
                errorToast("Invalid","You have made 2 offers for the same negotiation. This is your last attempt . Please wait for the seller to respond.");
            }
            props.setNewoffer(false)
                props.callback();
                props.acceptorreject(reqBody);
                setLoadingbtn(false);
                setShowoffer(!showOffer);
          }
        else if (response.status === 417) {
            errorToast("Invalid","Please note you have reached the maximum threshold of bids to the seller. Please wait for the seller to respond.");
            props.callback()

            return
        }
          else if (response.status === 409) {
            errorToast("Invalid", "Communication has been updated, pl re-do")
            props.callback()

            return
          } else if (response.status === 400) {
              errorToast("Invalid", "Request Not Sent");
              setLoadingbtn(false);

              let i = 0;
              const arrayerrormessages = responseJSON.details1;
              // console.log(arrayerrormessages)
              const listItems = arrayerrormessages.map((errorResponse) =>

                  validate(errorResponse.field,errorResponse.errorMessage)
              );
          }


    }

   
// set date difference 
const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));

const datediff1 = diffDays(date1,selectedDate);

console.log("date1",date1)
console.log("selectedDate",selectedDate)

console.log("diffDays" ,datediff)

    const handleDateChange = (date1) => {
        let d = new Date(date1)
        // console.log("aqaa"+d)
        let dformat = [d.getFullYear(),d.getMonth()+1,d.getDate()].join('-')+' '+
            [d.getHours(),
                d.getMinutes(),
                d.getSeconds()].join(':');

        setSelectedDate1(dformat)

        // console.log("aqaa11"+dformat)

        setSelectedDate(date1);

    };

 const [show, setShow] = React.useState(false);
 const [showOffer, setShowoffer] = React.useState(true);

 const container = React.useRef(null);
 const scrollToBottom = () =>{
    window.scrollTo({
      top: 300,
      behavior: 'smooth'
    });
  };

 const handleOffer = () => {
     props.cancelButton()
    setShowoffer(!showOffer);
    setTimeout(function(){
        scrollToBottom();
      }, 100)
  };


  const data = true;

  const [statemanag,setStatemanag] = React.useState(data);


 const handleDate = () => {
    setShow(!show);
    setDatediff(datediff1)

  };

    return(
        <div className="chat-action position-sticky">
            <div  ref={chatEndRef}/>




            {/* <DialogBpx/> */}

           <div >
               {data ?
               <>


           { show ? (<>

                   <div className="setdate" >
                      <div className="buyerform-section">
                          <SetDate/>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                          <div className="w-100">
                              {/* <button className="btn btn-settimer" onClick={handleDate}><QueryBuilderRoundedIcon className="mr-2"/> {show ? 'Set Time' : 'Set Timer'}</button> */}
                          </div>
                          <div className="d-flex w-100">
                              <Buttons.SecondaryButton value="Cancel" style={{marginRight:"5px",width:"100%"}} onClick={handleDate}/>
                              <Buttons.PrimaryButton value="Set Timer" onClick={handleDate} style={{marginRight:"5px",width:"100%"}}/>
                          </div>
                      </div>
                   </div>
                   </>
                   ) :
                   <div className="buyoffer">
                   <div className="buyerform-section">
                       <div className="row">
                           <div className="col-md-3 col-12">
                               <div className="form-group">
                                   <label className="text-small">Quantity*</label> <br />
                                   <input type="number"
                                   className="text-small form-control border rounded w-100"
                                   value={quantity}
                                   onChange={(e)=>{

                                       setQuantity(e.target.value.replace(/\D/g, ""))
                                       settxnAmount(e.target.value * price)

                                       let totalAmountInvolved = e.target.value * price


                                       let transactionFee = 0

                                       if(selectedTrade.isTradeOwner) {
                                           transactionFee  = getTransactionFee(false, totalAmountInvolved)
                                       } else {
                                           transactionFee  = getTransactionFee(true, totalAmountInvolved)
                                       }

                                       // let total1 = (e.target.value * price)
                                       //     + (.01*txnAmount1)+(.18*(.01*txnAmount1))

                                       // settxnFee((.01*txnAmount1)+(.18*(.01*txnAmount1)))
                                       settxnFee(transactionFee)

                                       let total1 = totalAmountInvolved
                                           + transactionFee+(.18*transactionFee)

                                       settxnTotal(total1)
                                   }


                                   }
                                   />

                               </div>
                               {/* {showQuantityError ? <InlineValidationQuantity/> : null} */}
                           </div>
                           <div className="col-md-3 col-12">
                               <div className="form-group">
                                   <label className="text-small">Price(₹)*</label><br />
                                   <input type="number"
                                    className="text-small form-control w-100 border rounded"
                                   value={price}
                                   onChange={(e)=> {

                                       setPrice(e.target.value)


                                       let totalAmountInvolved = e.target.value * quantity
                                       settxnAmount(totalAmountInvolved)

                                       let transactionFee = 0

                                       if(selectedTrade.isTradeOwner) {
                                           transactionFee  = getTransactionFee(false, totalAmountInvolved)
                                       } else {
                                           transactionFee  = getTransactionFee(true, totalAmountInvolved)
                                       }

                                       // settxnFee((.01*txnAmount1)+(.18*(.01*txnAmount1)))
                                       settxnFee(transactionFee)

                                       // let total1 = txnAmount1
                                       // + (.01*txnAmount1)+(.18*(.01*txnAmount1))

                                       let total1 = totalAmountInvolved
                                           + transactionFee+(.18*transactionFee)

                                       settxnTotal(total1)
                                   }
                                   }
                                   />
                               </div>
                               {/* {showPriceError ? <InlineValidationBoxPrice/> : null} */}
                           </div>
                           <div className="col-md-6 col-12">
                               <div class="form-group">
                                   <label className="text-small" for="Comment">Add A Comment</label>
                                   {/*<Select class="form-control w-100 border rounded text-small custom-select-options" id="Comment"*/}
                                   {/*         options={negotiationComments} onChange={selectedOption=> {*/}

                                   {/*    setComment(selectedOption.label)*/}

                                   {/*}}/>*/}

                                   <select class="form-control w-100 border rounded text-small custom-select-options" id="Comment"
                                           onChange={(e) => {
                                               setComment(e.target.value);
                                           }} value={comment}>
                                       <option>This is my best offer</option>
                                       <option>Can't go below than this</option>
                                       <option>Need on priority</option>
                                       <option>I have higher price offer</option>
                                       <option>I have lower price offer</option>
                                       <option>Are you looking for block deal?</option>
                                       <option>Looking for block deals</option>
                                       <option>Market Price has increased</option>
                                       <option> Rates available only for block deal</option>
                                       <option>Looking for serious buyer</option>
                                       <option>Offer available for today</option>
                                       <option> Price available for limited period</option>
                                       <option>Final Price</option>
                                       <option> Not Interested</option>
                                       <option> Will this price be available tomorrow?</option>
                                       <option>  Market price is lower than your qouted price.</option>
                                       <option> Are these shares vested?</option>
                                       <option> Rofr available?</option>
                                       <option>Market price is higher than your quoted price</option>
                                    </select>
                               </div>
                               {/* <div className="form-group">
                                   <label className="text-small">Comment</label> <br/>
                                   <input type="text" className="w-100 border rounded w-100"
                                   value={comment}
                                   onChange={(e)=>setComment(e.target.value)}
                                   />
                               </div> */}
                               {/* {showCommentError ? <InlineValidationBoxComment/> : null} */}
                           </div>
                           <div className="col-md-12 col-12 my-0 py-0">

                               {showQuantityError ? <InlineValidationQuantity/> : null}
                               {showPriceError ? <InlineValidationBoxPrice/> : null}
                               {showCommentError ? <InlineValidationBoxComment/> : null}



                           </div>
                       </div>
                   </div>
                   <div className="buyerform-total-section create-offer-card p-3 ">
                       <div className="d-flex justify-content-between">
                           <label className="text-size">Qty: {quantity && price !== 0 ? <span>{quantity} x {price}</span> : null}</label>  <span className="text-size"> {txnAmount}</span>
                       </div>
                       <div className="d-flex justify-content-between">
                           <label className="m-0 text-size">Transaction Fees*                          
                            <Tooltip title={<>
                                {/*<p className="mb-0">Transaction Fees (1% of TXN Amount) = ₹ {(txnAmount/100).toFixed(2)}</p>*/}
                                <p className="mb-0">Transaction Fees (flat fee*) = ₹ {(txnFee).toFixed(2)}</p>
                                <p className="mb-0">GST (18% of TXN Fee) = {((txnFee)*.18).toFixed(2)}</p>
                                <p className="mb-0">Total = {txnFee+(txnFee*.18)}</p></>}
                                placement="right" arrow enterTouchDelay={0}>
                                <ErrorOutlineRoundedIcon className="marketplace-infoicon"/>
                            </Tooltip>                                                                             
                        </label><span className="text-size">₹ {txnFee+(txnFee*.18)}</span>
                       </div>
                       <div className="my-0 text-size2">
                           <label className="mb-0 ">Including GST <Tooltip title={<p className="mb-0">GST<br/> (18% of TXN Fee) = {(txnFee)*.18}</p>}
                            placement="right" arrow enterTouchDelay={0}>
                            <ErrorOutlineRoundedIcon className="marketplace-infoicon"/>
                        </Tooltip></label>
                       </div>
                       <div className="d-flex justify-content-between">
                           <label className="m-0" style={{color:"#721B65"}}><b>Total Amount</b> 
                           <Tooltip title={<p className="mb-0">Total Amount = {txnTotal.toFixed(2)}</p>}
                            placement="right" arrow enterTouchDelay={0}>
                            <ErrorOutlineRoundedIcon className="marketplace-infoicon" style={{color:"#721B65"}}/>
                            </Tooltip>
                            </label><span style={{color:"#721B65"}}><b>₹ {txnTotal.toFixed(2)}</b></span>
                       </div>
                       <div className="d-flex align-items-center mt-3">
                           {/* <input type="checkBox" onChange={(e)=>{
                               console.log("123232323232323232"+e.target.checked)
                               setacceptTerms(e.target.checked)
                           }}/>

                           <p className="m-0 ml-2 text-small">I accept negotiation's <b style={{color:"#721B65"}}>Terms & Conditions</b></p> */}
                           <input className="styled-checkbox" id="styled-checkbox-1" value="value1" type="checkBox" onChange={(e)=>{
                               // console.log("123232323232323232"+e.target.checked)
                               setacceptTerms(e.target.checked)
                           }}/>
                           <label className=" text-size" htmlFor="styled-checkbox-1">I accept negotiation's <b style={{color:"#721B65"}}>Terms & Conditions</b></label>

                       </div>
                   </div>

                   <div className="row d-flex justify-content-between align-items-center mt-2 create-offer-card-btns">
                       <div className="col-lg-6 col-md-12 col-6 w-100">
                           <button className="set-timer-btn" onClick={handleDate}><QueryBuilderRoundedIcon className="mr-2"/> {datediff == false ? "Set Timer" : `${datediff} days`} </button>
                       </div>
                       <div className="col-lg-6 col-md-12 col-6 d-flex w-100 justify-content-end">
                           {/* <Buttons.SecondaryButton value="Cancel" style={{marginRight:"5px",width:"100%"}} onClick={()=>{props.setNewoffer(false)}} onClick={handleOffer}/> */}
                           {
                               (props.islastoffermine1 || props.offerrejected)? null : <Buttons.SecondaryButton value="Cancel" style={{marginRight:"5px",width:"100%"}} onClick={handleOffer}/>}

                                {!isLoadingbtn && (
                                       <Buttons.PrimaryButton value="Send Offer" style={{marginRight:"5px",width:"100%"}} onClick={buyerformsend}/>
                                    )}

                                    {isLoadingbtn && (
                                         <Loadbutton />
                                    )}
                       </div>

                   </div>

               </div>
           }
           </>:
           <div className="setdate" >
           <div className="buyerform-section">
               <SetDate/>
           </div>
           <div className="d-flex justify-content-between align-items-center mt-2">
               <div className="w-100">
                   {/* <button className="btn btn-settimer" onClick={handleDate}><QueryBuilderRoundedIcon className="mr-2"/> {show ? 'Set Time' : 'Set Timer'}</button> */}
               </div>
               <div className="d-flex w-100">
                   <Buttons.SecondaryButton value="Cancel" style={{marginRight:"5px",width:"100%"}} onClick={handleDate}/>
                   <Buttons.PrimaryButton value="Set Timer" onClick={handleDate} style={{marginRight:"5px",width:"100%"}}/>
               </div>
           </div>
        </div>
           }
           </div>

            <Dialog
                open={showDialog}
                onClose={()=>{ setShowDialog(false) }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <div className='allcompany-modal-closeIcon text-right'>
                    {/*<CloseIcon onClose={()=>{ setShowDialog(false) }} />*/}
                </div>
                <div className="addcompanyrequest px-5 pb-5">
                    <div className="">
                        <div className="text-center">
                            <h5><b>Warning</b></h5>
                            <p className="m-0 text-small">You can not send offer below ₹ 1000<br/> please increase qty or price.</p>
                        </div>
                        <div className="d-flex justify-content-center text-center mt-4">
                            <Buttons.PrimaryButton value="ok" style={{width:"50%"}} onClick={()=>{

                                setShowDialog(false)

                            }} />
                        </div>
                    </div>
                </div>
            </Dialog>

        </div>
    )
}
