import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import './Index.css';
const FullPageLoader = () => {
    return (
        <div className="fullscreen-loader" >
              <CircularProgress />
        </div>
    );
};

export default FullPageLoader;
