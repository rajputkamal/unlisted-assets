import React from 'react'
import MyHoldingsTableContent from './myholdingstablecontent';
import Breadcrumb from '../../Components/Breadcrumbs';

function Index() {
    return (
        <div className="container mt-3">
            <Breadcrumb />
            <MyHoldingsTableContent />
        </div>
    )
}

export default Index
