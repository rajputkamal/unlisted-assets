import React, { useEffect } from "react";
import img1 from "./CompanyAboutImages/img1.jpg";
import img2 from "./CompanyAboutImages/img2.jpg";
import img3 from "./CompanyAboutImages/img3.jpg";
import img4 from "./CompanyAboutImages/img4.jpg";
import img5 from "./CompanyAboutImages/img5.jpg";
import key1 from "./CompanyAboutImages/key1.jpg";
import key2 from "./CompanyAboutImages/key2.jpg";
import key3 from "./CompanyAboutImages/key3.jpg";
import key4 from "./CompanyAboutImages/key4.jpg";
import "./Tab1.css";
import { apiCall, apiCall1, downloadurl, setAccessToken } from "../../../Utils/Network"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,useHistory
} from "react-router-dom";

let CompanyAboutTab = (props) => {
  let history = useHistory();
  const [companydetail,setCompanydetail]=React.useState(props.companydetail);
  const [milestones,setmilestones]=React.useState([]);
  const [competitors,setcompetitors]=React.useState([]);
  const [images,setimages]=React.useState([]);
  const [management,setmanagement]=React.useState([]);
  const [sectors,setsectors]=React.useState([]);
  const [keyProducts,setkeyProducts]=React.useState([]);

  React.useEffect(() => {
    // getcompanydetail()
    getkeyProducts()
    // getmilestones()
    // getcompetitors()
    // getimages()
    getmanagement()
    // getsectors()

  }, []);
  // const getcompanydetail = async function (){
  //   let response1 = await apiCall("company/companydetailbyid/"+props.companyId,'GET','', history)
  //   console.log(response1)
  //   let responseJSON1 = await response1.json();
  //   console.log(responseJSON1)
  //   setCompanydetail(responseJSON1)
  //
  // }
  // const getsectors = async function (){
  //   let response1 = await apiCall("company/sector/findAll",'GET','', history)
  //   console.log(response1)
  //   let responseJSON1 = await response1.json();
  //   console.log(responseJSON1)
  //   setsectors(responseJSON1)
  //
  // }

  const getkeyProducts = async function (){
    let response1 = await apiCall("company/summaryrisk/"+props.companyId+"/"+"keyProducts",'GET', '',history)
    // console.log(response1)
    let responseJSON1 = await response1.json();
    // console.log(responseJSON1)
    // setkeyProducts(responseJSON1.filter(sr => (sr.type == "keyProducts")))
    setkeyProducts(responseJSON1)
  }

  // const getmilestones = async function (){
  //   let response1 = await apiCall("company/milestone/"+props.companyId,'GET','', history)
  //   console.log(response1)
  //   let responseJSON1 = await response1.json();
  //   console.log(responseJSON1)
  //   setmilestones(responseJSON1)
  //
  // }
  // const getcompetitors = async function (){
  //   let response1 = await apiCall("company/competitors/"+props.companyId,'GET','', history)
  //   console.log(response1)
  //   let responseJSON1 = await response1.json();
  //   console.log(responseJSON1)
  //   setcompetitors(responseJSON1)
  //
  // }
  // const getimages = async function (){
  //   let response1 = await apiCall("company/keyproductsimages/"+props.companyId,'GET','', history)
  //   console.log(response1)
  //   let responseJSON1 = await response1.json();
  //   console.log(responseJSON1)
  //   setimages(responseJSON1)
  //
  // }
  const getmanagement = async function (){
    let response1 = await apiCall("company/management/"+props.companyId,'GET','', history)
    // console.log(response1)
    let responseJSON1 = await response1.json();
    // console.log(responseJSON1)
    setmanagement(responseJSON1)
  }

  // console.log('hihihihi'+companydetail)
  // const { competitorsdetail, error2} = useSWR(apiEndpoint2, fetcher, {refreshInterval:2});
  // const { financialsdetail, error3} = useSWR(apiEndpoint3, fetcher, {refreshInterval:2});
  // const { keyproductsimagesdetail, error4} = useSWR(apiEndpoint4, fetcher, {refreshInterval:2});
  // const { managementdetail, error5} = useSWR(apiEndpoint5, fetcher, {refreshInterval:2});
  // const { milestonedetail, error6} = useSWR(apiEndpoint6, fetcher, {refreshInterval:2});
  // const { recentnewsdetail, error7} = useSWR(apiEndpoint7, fetcher, {refreshInterval:2});
  // const { shareholdersdetail, error8} = useSWR(apiEndpoint8, fetcher, {refreshInterval:2});
  // const { summaryriskdetail, error9} = useSWR(apiEndpoint9, fetcher, {refreshInterval:2});


  return (
      <div className="AboutTab-section about-tab-section mt-4">
        <div className="row">
          <div className="col-md-12 col-12">
            <div className="about-tab-section">
              <h5 className="text-primary-default">About the Company</h5>
              <p>
                {companydetail.description}
                <br />
                {/*<br />*/}
                {/* {companydetail.description}*/}
              </p>
              <hr className="w-100" />
              <h5 className="text-primary-default">Key Products and Business Segments</h5>
              <div className="summary-list mt-3">
                {/*<h6 className="text-primary-default">Key Products and Business Segments</h6>*/}
                <ul className="mt-4">
                  {keyProducts.map((keyProductPoint,index) => (

                          <li>{keyProductPoint.description}</li>

                      )

                  )}
                </ul>
              </div>
              {/*<ul>*/}
              {/*  <li><p>{companydetail.keyProductsSegmentsDescription}*/}

              {/*        <span className="text-primary-default"> <b>*/}
              {/*        /!*{sectors.map((sector,index) => (*!/*/}
              {/*        /!*    sector.label*!/*/}
              {/*        /!*    )*!/*/}

              {/*        /!*)}*!/*/}
              {/*        /!*  {companydetail.sector}*!/*/}

              {/*        </b></span>*/}
              {/*        </p></li>*/}
              {/*</ul>*/}

            </div>
          </div>
        </div>
        {/*<div className="product-image-grid ">*/}
        {/*  {images.map((image,index) => (*/}
        {/*            <div className="product-images w-100">*/}
        {/*              <img src={image.image}/>*/}
        {/*            </div>*/}
        {/*  )*/}

        {/*  )}*/}
        {/*</div>*/}
        <hr className="w-100 m-2" />
        {/*/!****************************  End Row *********************************!/*/}
        {/*<div className="Key-milestones row">*/}

        {/*  {milestones.map((milestone,index) => (*/}
        {/*      <div className="col-md-6 col-12">*/}
        {/*        <div className="p-2">*/}
        {/*          <h5>{milestone.year}</h5>*/}
        {/*          <p>{milestone.milestone}</p>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      )*/}

        {/*  )}*/}
        {/*  <hr className="w-100" />*/}
        {/*</div>*/}
        {/*/!****************************  End Row *********************************!/*/}
        {/*<div className="Key-milestones">*/}
        {/*  <h6 className="text-primary-default ml-1"><b>Select Key Competitors </b></h6>*/}
        {/*  <div className="product-image-grid ">*/}
        {/*  {competitors.map((competitor,index) => (*/}
        {/*            <div className="product-images w-100">*/}
        {/*              <img src={competitor.logo}/>*/}
        {/*            </div>*/}
        {/*  )*/}

        {/*  )}*/}
        {/*</div>*/}
        {/* */}

        {/*  <hr className="w-100" />*/}
        {/*</div>*/}
        {/****************************  End Row *********************************/}
        <div className="CorporateInformation row">
          <div className="col-md-12">
            <div>
              <h5 className="text-primary-default">Corporate Information </h5>
              {/* <h6 className="text-primary-default ml-1"><b>Corporate Information </b></h6> */}
            </div>
          </div>
          <div className="col-md-6 col-12 mt-3">
            <div className="CorporateInformation-text p-2">
              <div className="d-flex">
                <p className=" w-50 ">CIN</p>
                <p className="text-left w-50  mobi-right-text"><span> {companydetail.cin}</span></p>
              </div>
              <div className="d-flex">
                <p className=" w-50 ">ISIN Registration</p>
                <p className="text-left w-50  mobi-right-text"> <span>{companydetail.isin}  </span></p>
              </div>
              <div className="d-flex">
                <p className=" w-50 ">Type</p>
                <p className="text-left w-50  mobi-right-text"> <span>{companydetail.type}</span></p>
              </div>
              <div className="d-flex">
                <p className=" w-50 ">Address</p>
                <p className="text-left w-50  mobi-right-text"> <span>{companydetail.address}  </span></p>
              </div>

            </div>
          </div>
          <div className="col-md-6 col-12 mt-3">
            <div className="CorporateInformation-text border-left pl-3 p-2">
              {/*<div className="d-flex">*/}
              {/*  <p className=" w-50 ">Incorporation Date</p>*/}
              {/*  <p className="text-left w-50 mobi-right-text "><span> {companydetail.incorporationDate}</span></p>*/}
              {/*</div>*/}

              <div className="d-flex">
                <p className=" w-50 ">Series of Funding</p>
                <p className="text-left w-50  mobi-right-text"> <span>{companydetail.series_of_funding}</span></p>
              </div>

              <div className="d-flex">
                <p className=" w-50 ">Last fund raise valuation</p>
                <p className="text-left w-50  mobi-right-text"> <span>{companydetail.lastFundRaisingValuation}</span></p>

                {/*{*/}
                {/*  (companydetail.lastFundRaisingValuation =="Unknown" ||*/}
                {/*      companydetail.lastFundRaisingValuation == undefined) ? "" : "M"*/}

                {/*}*/}

              </div>
            </div>
          </div>
          <hr className="w-100" />
        </div>
        {/****************************  End Row *********************************/}
        <div className="CorporateInformation row">
          <div className="col-md-12">
            <div>
              <h5 className="text-primary-default">Directors & Management </h5>
              {/* <h6 className="text-primary-default ml-1"><b>Directors & Management</b></h6> */}
            </div>
          </div>
          <div className="col-md-6 col-12 mt-3">

            <div className="CorporateInformation-text p-2">
              {management.map((managmt,index) => (
                      <div className="d-flex">
                        <p className=" w-50 ">{managmt.name}</p>
                        <p className="text-left w-50  mobi-right-text"><span>{managmt.din}</span></p>
                      </div>
                  )
              )}

            </div>
          </div>
          {/*<div className="col-md-6 col-12 mt-3">*/}
          {/*  <div className="CorporateInformation-text border-left pl-3 p-2">*/}
          {/*    {management.map((managmt,index) => (*/}
          {/*            <div className="d-flex">*/}
          {/*              <p className=" w-50 ">{managmt.noOfDirectorShips}</p>*/}
          {/*              <p className="text-left w-50  mobi-right-text"><span>Number of Directorship</span></p>*/}
          {/*            </div>*/}
          {/*        )*/}

          {/*    )}*/}

          {/*  </div>*/}
          {/*</div>*/}
          <hr className="w-100" />
        </div>
        {/****************************  End Row *********************************/}
        {/*<div className="CorporateInformation row">*/}
        {/*  <div className="col-md-12">*/}
        {/*    <div>*/}
        {/*      <h6 className="text-primary-default ml-1"><b>Key Management</b></h6>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="col-md-6 col-12 mt-3">*/}
        {/*    <div className="CorporateInformation-text p-2">*/}
        {/*      {management.map((managmt,index) => (*/}
        {/*          <div className="d-flex">*/}
        {/*            <p className=" w-50 ">{managmt.name}</p>*/}
        {/*            <p className="text-left w-50  mobi-right-text"><span></span></p>*/}
        {/*          </div>*/}
        {/*          )*/}

        {/*      )}*/}

        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="col-md-6 col-12 mt-3">*/}
        {/*    <div className="CorporateInformation-text border-left pl-3 p-2">*/}
        {/*      {management.map((managmt,index) => (*/}
        {/*          <div className="d-flex">*/}
        {/*            <p className=" w-50 ">{managmt.noOfDirectorShips}</p>*/}
        {/*            <p className="text-left w-50  mobi-right-text">Number of Directorship <br /> -</p>*/}
        {/*          </div>*/}
        {/*          )*/}

        {/*      )}*/}

        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/****************************  End Row *********************************/}

      </div>
  );
};
export default CompanyAboutTab;