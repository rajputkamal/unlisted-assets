import React from "react";
import "./Tab4.css";
import { apiCall, apiCall1, downloadurl, setAccessToken } from "../../../Utils/Network"
import {useHistory} from "react-router-dom";

let SummaryRisks =(props)=>{
    let history = useHistory()

    const [companyId, setCompanyId] = React.useState(props.companyId);

    const [companydetail,setCompanydetail]=React.useState([]);
    // const [summaryrisk,setsummaryrisk]=React.useState([]);
    const [summary,setsummary]=React.useState([]);
    const [risk,setrisk]=React.useState([]);
//shareholders

    React.useEffect(() => {
        // getcompanydetail()
        getsummary()
        getrisk()
    }, []);

    // const getcompanydetail = async function (){
    //     let response1 = await apiCall("company/companydetailbyid/"+props.companyId,'GET', '',history)
    //     console.log(response1)
    //     let responseJSON1 = await response1.json();
    //     console.log(responseJSON1)
    //     setCompanydetail(responseJSON1)
    //
    // }

    const getsummary= async function (){
        let response1 = await apiCall("company/summaryrisk/"+props.companyId+"/"+"Summary",'GET', '',history)
        // console.log(response1)
        let responseJSON1 = await response1.json();
        // console.log(responseJSON1)
        // setsummaryrisk(responseJSON1)

        setsummary(responseJSON1.filter(sr => (sr.type == "Summary")))

    }

    const getrisk = async function (){
        let response1 = await apiCall("company/summaryrisk/"+props.companyId+"/"+"Risk",'GET', '',history)
        // console.log(response1)
        let responseJSON1 = await response1.json();
        // console.log(responseJSON1)
        // setsummaryrisk(responseJSON1)

        setrisk(responseJSON1.filter(sr => (sr.type == "Risk")))
    }

    // console.log('hihihihi'+companydetail)
    return(
        <div className=" summary-tab-section mt-4">
            <div className="row">
                <div className="col-md-12 col-12">
                    <div className="tab-desc">
                        <h6 className="text-primary-default">Summary</h6>
                    </div>
                    <div className="summary-list mt-4">
                        <ul>
                            {summary.map((summaryrsk,index) => (

                                <li>{summaryrsk.description}</li>

                                )

                            )}
                        </ul>
                    </div>
                    <hr />
                    <div className="summary-list mt-3">
                      <h6 className="text-primary-default">Key Risks</h6>
                        <ul className="mt-4">
                            {risk.map((summaryrsk,index) => (

                                    <li>{summaryrsk.description}</li>

                                )

                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SummaryRisks