import React from 'react';
import "./Error.css";
import Error403img from './assets/Error403.svg'
import { imgurl } from '../../Utils/Network';

export default function Error403() {
    return (
        <>
    <div className='container error_container mt-5'>
        <div className='row d-flex justify-content-center align-items-center'>
            <div className='col-md-5 col-12 error-div'>
                <div>
                    <h1>ERROR 403</h1>
                    <h6>You are not authorized for this action.</h6>
                    {/* <a href="#">Try logging in to continue</a> */}
                </div>
            </div>
            <div className='col-md-7 col-12 error-403'>
                <img src={imgurl("Error403.svg")} className='error-img'/>
            </div>
        </div>
    </div>
</>
    )
}
