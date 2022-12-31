import React from 'react';
import "./Error.css";
import Error401img from './assets/Error401.svg'
import { imgurl } from '../../Utils/Network';

export default function Error401() {
    return (
    <>
    <div className='container error_container mt-5'>
        <div className='row d-flex justify-content-center align-items-center'>
            <div className='col-md-4 col-12 error-div mb-4'>
                <div>
                    <h1>ERROR 401</h1>
                    <h6>Authentication Required</h6>
                    <a href="#">Try logging in to continue</a>
                </div>
            </div>
            <div className='col-md-8 col-12'>
                <img src={imgurl("Error401.svg")} className='error-img'/>
            </div>
        </div>
    </div>
</>
)
}
