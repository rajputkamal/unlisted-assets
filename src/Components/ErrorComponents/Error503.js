import React from 'react';
import "./Error.css";
import Error503img from './assets/Error503.svg'
import { imgurl } from '../../Utils/Network';

export default function Error503() {
    return (
    <>
    <div className='container error_container mt-5'>
        <div className='row d-flex justify-content-center align-items-center'>
            <div className='col-md-4 col-12 error-div mb-4'>
                <div>
                    <h1>SERVICE UNAVAILABLE !</h1>
                    <h6>Something went wrong. Please try again in sometime. </h6>
                </div>
            </div>
            <div className='col-md-8 col-12'>
                <img src={imgurl("Error503.svg")} className='error-img'/>
            </div>
        </div>
    </div>
</>
)
}