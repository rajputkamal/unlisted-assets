import React from "react";
import "./Tab2.css"
import Graph from "./ownershipGraph.tsx"
import { apiCall, apiCall1, downloadurl, setAccessToken } from "../../../Utils/Network"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory
} from "react-router-dom";
// import useSWR from "swr";
// const fetcher = (...args) => fetch(...args).then((response) => response.json());
let Ownership =(props)=>{
    let history = useHistory();

    const [companyId, setCompanyId] = React.useState(props.companyId);

    const [companydetail,setCompanydetail]=React.useState([]);
    const [shareholders,setshareholders]=React.useState([]);
    // const apiEndpoint = downloadurl("company/shareholders/"+props.companyId);
    // const { shareholders, error} = useSWR(apiEndpoint, fetcher, {refreshInterval:2000000});
    //
    React.useEffect(() => {
        // getcompanydetail()
        getshareholders()
    }, []);
    // const getcompanydetail = async function (){
    //     let response1 = await apiCall("company/companydetailbyid/"+props.companyId,'GET','', history)
    //     // console.log(response1)
    //     let responseJSON1 = await response1.json();
    //     // console.log(responseJSON1)
    //     setCompanydetail(responseJSON1)
    // }

    const getshareholders = async function (){
        let response1 = await apiCall("company/shareholders/"+props.companyId,'GET','', history)
        // // console.log(response1)
        let responseJSON1 = await response1.json();
        // // console.log(responseJSON1)
        setshareholders(responseJSON1)

    }
    // // console.log('hihihihi'+companydetail)

    const student = "IT-student11" ;
    return(
    <div className="ownership-tab-section mt-4">
        <div className="row">
            <div className="col-md-12 col-12">
                <div className="tab-desc">
                    <h6 className="text-primary-default">Ownership Summary</h6>
                    <p>Shareholding Summary as of <span>31 March, 2021</span></p>
                </div>
            </div>
            <div className="col-md-12 col-12">
                <div className="graph-section">
                   <Graph shareholders ={shareholders} studentname={student}/>

                </div>
            </div> 
            

                {/*<div className="ownership-table mt-4">*/}
                {/*    <h6 className="text-primary-default">Public Shareholders</h6>*/}
                {/*    <table>*/}
                {/*            <tr>*/}
                {/*                <th>Shareholder Name</th>*/}
                {/*                <th>% Ownership</th>*/}
                {/*            </tr>*/}
                {/*        {shareholders.map((shareholder,index) => (*/}
                {/*                <tr>*/}
                {/*                    <td>{shareholder.name}</td>*/}
                {/*                    <td>{shareholder.percentageOwnership} % </td>*/}
                {/*                </tr>*/}
                {/*            )*/}

                {/*        )}*/}
                {/*    </table>*/}
                {/*</div>*/}
           
        </div>
        <hr />
        <div className="row">
            <div className="col-md-6 col-12">
                <div className="ownership-table">
                    <h6 className="text-primary-default">Promoters</h6>
                    <table>
                            <tr>
                                <th>Shareholder Name</th>
                                <th>% Ownership</th>
                            </tr>

                        {shareholders.map((shareholder,index) => (
                                <tr key={index}>
                                <td>{shareholder.name}</td>
                                <td>{shareholder.percentageOwnership} % </td>
                            </tr>
                            )

                        )}
                            

                    </table>
                </div>
            </div>
            
            {/*<div className="col-md-6 col-12">*/}
            {/*    <h6 className="text-primary-default">Select Key Investors</h6>*/}

            {/*    <div className="selectkeyinvestors mt-3">*/}
            {/*        <ul>*/}
            {/*            {shareholders.map((shareholder,index) => (*/}

            {/*                <li>  {shareholder.name}, </li>*/}
            {/*                )*/}

            {/*            )}*/}

            {/*        </ul>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="col-md-5 col-12">*/}
            {/*    <div className="selectkeyinvestors mt-3">*/}
            {/*        <ul>*/}
            {/*            {shareholders.map((shareholder,index) => (*/}

            {/*                    <li> {shareholder.name}  (Founder Zomato), </li>*/}
            {/*                )*/}

            {/*            )}*/}
            {/*        </ul>*/}
            {/*    </div>*/}
            {/*</div>*/}
         
        </div>
    </div>

    )
}
export default Ownership