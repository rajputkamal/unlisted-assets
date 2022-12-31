import React from "react";
import "./Tab6.css";
import { apiCall, apiCall1, downloadurl, setAccessToken } from "../../../Utils/Network"

let AdditionalInfo = (props) => {
    const [companyId, setCompanyId] = React.useState(props.companyId);


  return (
    <div className="text-center mt-4">
      <h6 className="text-primary-default">Additional Information Content</h6>
    </div>
  );
};
export default AdditionalInfo;
