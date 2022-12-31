import React, { useState } from 'react';
import './InvestingPlatform.css';
import Buttons from '../../../Components/Buttons';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import { isLoggedIn,imgurl } from "../../../Utils/Network";
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@material-ui/core/Dialog';



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function InvestingPlatform() {

    const [openModal, setOpenModal] = useState(false);
    const [isLogedIn, setisLogedIn] = useState(isLoggedIn());
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
        setInterval(() => AutoplayAnimations(), 7000);
    }, []);

    const AutoplayAnimations = (value) => {
        
        if (value == 0) {
            console.log("value 0",value)
            setValue(value+1)
        } else if (value == 1) {
            setValue(value+1)
            console.log("value 1",value)
        } else if (value == 2){
            setValue(value-2)
            console.log("value 2",value)
        } 
    }

    console.log("value" , value );

    const handleClickOpen = () => {
        { isLogedIn ? setOpenModal(false) : setOpenModal(true) }
    };
    const handleClose = () => {
        setOpenModal(false)
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="default-bg-color">
            <div className="container">
                <div className="InvestingPlatform-main" >
                    <div className="row pb-4">
                        <div className="col-md-8 col-12 ">

                            <div className='CompaniesListed-heading '>
                                <h3 className='ws_default_heading'
                                    >Explore Our Investing Platform</h3>
                            </div>


                            <div className='dbmn'>
                                <Box sx={{ width: '100%' }}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                            <Tab label="Explore" {...a11yProps(0)} />
                                            <Tab label="Negotiate" {...a11yProps(1)} />
                                            <Tab label="Escrow" {...a11yProps(2)} />
                                        </Tabs>
                                    </Box>
                                    <TabPanel value={value} index={0}>
                                        <p className='InvestingPlatform-para text-start'>Clients can explore and  select  the unlisted share of their choice  and make a successful Transact.</p>
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        <p className='InvestingPlatform-para'>Negotiate directly with potential  buyers and sellers</p>
                                    </TabPanel>
                                    <TabPanel value={value} index={2}>
                                        <p className='InvestingPlatform-para'>It helps  you secure your transactional funds unless unlisted shares are transferred to buyers Demat account.</p>
                                    </TabPanel>
                                </Box>
                                <div className='my-5 d-flex justify-content-satrt w-100'>
                                    <Buttons.PrimaryButton value="Know More" onClick={handleClickOpen} />
                                </div>
                            </div>


                        </div>
                        <div className="col-md-4 col-12 mb-5 InvestingPlatform-for-mobileview">
                            <div className='InvestingPlatform-img d-flex justify-content-center align-items-center'>
                                <img src={imgurl("GroupImg.353472c3.png")} className="InvestingPlatform-GroupImg" alt="company-logo" />

                            </div>
                        </div>

                        <div className='container dnmb InvestingPlatform-tab-mobileview'>
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab label="Explore" {...a11yProps(0)} />
                                        <Tab label="Negotiate" {...a11yProps(1)} />
                                        <Tab label="Escrow" {...a11yProps(2)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={value} index={0}>
                                    <p className='InvestingPlatform-para text-start'>Clients can explore and  select  the unlisted share of their choice  and make a successful Transact.</p>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <p className='InvestingPlatform-para'>Negotiate directly with potential  buyers and sellers</p>
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <p className='InvestingPlatform-para'>It helps  you secure your transactional funds unless unlisted shares are transferred to buyers Demat account.</p>
                                </TabPanel>
                            </Box>
                            <div className='my-5 d-flex justify-content-center w-100'>
                                <Buttons.PrimaryButton value="Know More" onClick={handleClickOpen} />
                            </div>
                        </div>

                        <Dialog
                            open={openModal}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description" >

                            <div className='allcompany-modal-closeIcon text-right'>
                                <CloseIcon onClick={handleClose} />
                            </div>
                            <div className="addcompanyrequest px-5 pb-5">
                                <div className="">
                                    <div className="text-center">

                                        <h5><b>Explore Our Investing Platform</b></h5>
                                        <p className="m-0 text-small">Please log in to Explore Our Investing Platform right away!</p>

                                    </div>
                                    <div className="d-flex justify-content-center text-center mt-4">
                                        <Link to="/login" ><Buttons.PrimaryButton value="Login / Sign Up " />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Dialog>




                    </div>
                </div>
            </div>
        </div>
    )
}