import React from 'react';
import Breadcrumb from '../../Components/Breadcrumbs';
import OngoingTransactionTableContent from './ongoingtransactiontablecontent'
function Index() {
    return (
        <div className="container mt-3">
            <Breadcrumb />
            <OngoingTransactionTableContent />
        </div>
    )
}

export default Index
