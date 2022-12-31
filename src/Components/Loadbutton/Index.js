import React from 'react';
import Buttons from "../../Components/Buttons";

import CircularProgress from '@material-ui/core/CircularProgress';
import './Index.css'
export default function CircularUnderLoad() {
  return <>
                <div className="custom-load-btn">
                    <Buttons.PrimaryButton value="Loading ..."
                    disabled /> 
                    <CircularProgress disableShrink />
                </div>
  </>;
}