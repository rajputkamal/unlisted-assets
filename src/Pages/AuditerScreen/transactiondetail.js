import React from 'react';
import "./transactiondetails.css"
import Breadcrumbs from '../../Components/Breadcrumbs/index';
import Steper from '../../Components/AuditorTransactionDetails/Steper'
export default function AuditorTransactionDetails(props){

    const [row,setrow]=React.useState({});

    const refreshData = () => {
        props.refreshData()
    }

    React.useEffect(() => {
        // console.log("iu123oo"+props.row.id)
        setrow(props.row)
    }, [props]);

    return(
        <div className="auditortransactiondetails-section container-fluid">
            <div className="stepers mt-5 mb-5 ">
                {row.id != undefined ? <Steper checker={props.checker} row={row} refreshData={refreshData}/> : null}
            </div>
        </div>
    )
}
