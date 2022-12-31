import React from "react";
import "./Tab5.css";
import NewsImage1 from "./News-assets/news1.jpg";
import NewsImage2 from "./News-assets/news2.jpg";
import NewsImage3 from "./News-assets/news3.jpg";
import NewsImage4 from "./News-assets/news4.jpg";
import { apiCall, apiCall1, downloadurl, setAccessToken } from "../../../Utils/Network"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory
} from "react-router-dom";

let RecentNews = (props) => {
    let history = useHistory();
    const [companyId, setCompanyId] = React.useState(props.companyId);

    //const [companydetail,setCompanydetail]=React.useState([]);
    const [recentnews,setrecentnews]=React.useState([]);
//shareholders

    React.useEffect(() => {

            getrecentnews()

    }, []);
    // const getcompanydetail = async function (){
    //     let response1 = await apiCall("company/companydetailbyid/"+props.companyId,'GET','', history)
    //     // console.log(response1)
    //     let responseJSON1 = await response1.json();
    //     // console.log(responseJSON1)
    //     setCompanydetail(responseJSON1)
    //
    // }

    const getrecentnews = async function (){
        let response1 = await apiCall("company/recentnews/"+props.companyId,'GET','', history)
        // // console.log(response1)
        let responseJSON1 = await response1.json();
        // // console.log(responseJSON1)
        setrecentnews(responseJSON1)

    }

    //// // console.log('hihihihi'+companydetail)
  return (
          <div className=" summary-tab-section mt-4">
            <div className="tab-desc ">
              <h6 className="text-primary-default">News</h6>
            </div>
              {recentnews.map((recentnez,index) => (

                  <div className="row mt-5">
                      {/* <div className="col-md-4 col-12">
                          <div className="news-img">
                              <a href={recentnez.associatedLink} target="_blank"><img src={recentnez.image} width={60} height={100} className="w-100"/></a>
                          </div>
                      </div> */}
                      <div className="col-md-8 col-12">
                          <div className="news-title">
                              <a href={recentnez.associatedLink} target="_blank"><h6>{recentnez.title}</h6></a>
                              <p className="m-0 text-small">{recentnez.description}</p>
                              <hr className="m-2"/>
                              <p className="m-0 News-date"><b>{recentnez.associated_date}   | {recentnez.associatedSource}</b></p>
                          </div>
                      </div>
                  </div>
                  )

              )}

          </div>
  );
};
export default RecentNews;
