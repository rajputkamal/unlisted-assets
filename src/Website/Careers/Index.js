import React, { useState } from 'react';
import './careers.css';
// import MobilePng from './Mobile.png';
// import { ReactComponent as Downicon } from './down.svg';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

import Buttons from '../../Components/Buttons';
// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MinimizeIcon from '@mui/icons-material/Minimize';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { isLoggedIn, apiCall } from "../../Utils/Network";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@material-ui/core/Dialog";


function Careers() {

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const [openModal, setOpenModal] = useState(false);
    const [isLogedIn, setisLogedIn] = useState(isLoggedIn());
    const handleClickOpen = () => {
        { isLogedIn ? setOpenModal(false) : setOpenModal(true) }
    };
    const handleClose = () => {
        setOpenModal(false)
    };


    const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        // border: `1px solid ${theme.palette.divider}`,
        // '&:not(:last-child)': {
        //     borderBottom: 0,
        // },
        // '&:before': {
        //     display: 'none',
        // },
    }));

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            expandIcon={expanded === 'panel1' ? <MinimizeIcon sx={{ fontSize: '0.9rem' }} className='accordion-MinimizeIcon '

            /> : <AddIcon />}
            {...props}
        />
    ))(({ theme }) => ({
        // backgroundColor:
        //   theme.palette.mode === 'dark'
        //     ? 'rgba(255, 255, 255, .05)'
        //     : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: "rotate(180deg)"
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
    }));

    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        padding: theme.spacing(1),
        // borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));


    return (
        <>
            <div className="careers-main default-bg-secondary mb-3">
                <div className="container">
                    <div className="row d-flex align-items-center justify-content-center overflow-hidden">
                        <div className="col-md-12 col-12 d-flex align-items-center justify-content-center">
                            <div className="careers-left text-white text-center">
                                <h1>Discover 23 Exciting Opportunities!</h1>
                            </div>
                        </div>
                        <div className="col-md-7 col-12 d-flex align-items-center justify-content-center">
                            <div className="careers-left text-white text-center">
                                <p>We’re looking for people to join the team who are as excited as we are to help build the platform that changes the future of unlisted trading!</p>
                            </div>
                        </div>
                        <div className='col-md-8 col-12 py-5'>
                            <div className="careers-left d-flex align-items-center justify-content-between w-100 mb-3">
                                <div class="careers-search-input form-group has-search w-100 mb-0">
                                    <span class="fa fa-search form-control-feedback"><SearchIcon /> </span>
                                    <input type="text" class="form-control mr-4" placeholder="Search jobs by keyword" />
                                </div>
                                <button className="mt-0 Search"  >Search</button>
                            </div>
                        </div>
                    </div>



                </div>
            </div>

            {/* section 2 */}

            <div>
                <div className="careers-main-section2 default-bg-color py-5">
                    <div className="QuestionsForUs-main container" >
                        <div className="row">
                            <div className="col-md-12 col-12">
                                <div className='QuestionsForUs-accordion'>
                                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
                                        <AccordionSummary
                                            expandIcon={expanded === 'panel1' ? <MinimizeIcon /> : <AddIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header" sx={{ width: '100%' }}
                                        >
                                            <Typography sx={{ width: '85%' }}><h5> Business</h5> </Typography>
                                            <Typography sx={{ color: 'text.secondary' }}><p>3 Open Roles</p></Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                <div className='row my-3'>
                                                    <div className='col-md-6 col-12 p-2'>
                                                        <div className='careers-accordion-card' onClick={handleClickOpen} >
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <h5>HR Generalist</h5>
                                                                    <p className=''>Department/Location/Work Type</p>
                                                                </div>
                                                                <div>
                                                                    <ArrowForwardIosIcon />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6 col-12 p-2'>
                                                        <div className='careers-accordion-card'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <h5>Research/ Equity Research</h5>
                                                                    <p className=''>Department/Location/Work Type</p>
                                                                </div>
                                                                <div>
                                                                    <ArrowForwardIosIcon />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6 col-12 p-2'>
                                                        <div className='careers-accordion-card'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <h5>Junior Associate Operations</h5>
                                                                    <p className=''>Department/Location/Work Type</p>
                                                                </div>
                                                                <div>
                                                                    <ArrowForwardIosIcon />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className='col-md-6 col-12 p-2'>
                                                        <div className='careers-accordion-card'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <h5>Job Title</h5>
                                                                    <p className=''>Department/Location/Work Type</p>
                                                                </div>
                                                                <div>
                                                                    <ArrowForwardIosIcon/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}

                                                </div>

                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    {/* <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                        <AccordionSummary
                                            expandIcon={expanded === 'panel2' ? <MinimizeIcon /> : <AddIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header" sx={{ width: '100%'}}

                                        >
                                             <Typography sx={{ width: '85%'}}><h5>Design </h5> </Typography>
                                            <Typography sx={{ color: 'text.secondary' }}><p>3 Open Roles</p></Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                            <div className='row my-3'>
                                                    <div className='col-md-6 col-12 p-2'>
                                                        <div className='careers-accordion-card'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <h5>Job Title</h5>
                                                                    <p className=''>Department/Location/Work Type</p>
                                                                </div>
                                                                <div>
                                                                    <ArrowForwardIosIcon/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6 col-12 p-2'>
                                                        <div className='careers-accordion-card'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <h5>Job Title</h5>
                                                                    <p className=''>Department/Location/Work Type</p>
                                                                </div>
                                                                <div>
                                                                    <ArrowForwardIosIcon/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6 col-12 p-2'>
                                                        <div className='careers-accordion-card'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <h5>Job Title</h5>
                                                                    <p className=''>Department/Location/Work Type</p>
                                                                </div>
                                                                <div>
                                                                    <ArrowForwardIosIcon/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6 col-12 p-2'>
                                                        <div className='careers-accordion-card'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <h5>Job Title</h5>
                                                                    <p className=''>Department/Location/Work Type</p>
                                                                </div>
                                                                <div>
                                                                    <ArrowForwardIosIcon/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion> */}
                                    {/* <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                        <AccordionSummary
                                            expandIcon={expanded === 'panel3' ? <MinimizeIcon /> : <AddIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header" sx={{ width: '100%'}}

                                        >
                                            <Typography sx={{ width: '85%'}}><h5> Engineering</h5> </Typography>
                                            <Typography sx={{ color: 'text.secondary' }}><p>3 Open Roles</p></Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                            <div className='row my-3'>
                                                    <div className='col-md-6 col-12 p-2'>
                                                        <div className='careers-accordion-card'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <h5>Job Title</h5>
                                                                    <p className=''>Department/Location/Work Type</p>
                                                                </div>
                                                                <div>
                                                                    <ArrowForwardIosIcon/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6 col-12 p-2'>
                                                        <div className='careers-accordion-card'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <h5>Job Title</h5>
                                                                    <p className=''>Department/Location/Work Type</p>
                                                                </div>
                                                                <div>
                                                                    <ArrowForwardIosIcon/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6 col-12 p-2'>
                                                        <div className='careers-accordion-card'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <h5>Job Title</h5>
                                                                    <p className=''>Department/Location/Work Type</p>
                                                                </div>
                                                                <div>
                                                                    <ArrowForwardIosIcon/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6 col-12 p-2'>
                                                        <div className='careers-accordion-card'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <h5>Job Title</h5>
                                                                    <p className=''>Department/Location/Work Type</p>
                                                                </div>
                                                                <div>
                                                                    <ArrowForwardIosIcon/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion> */}
                                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                                        <AccordionSummary
                                            expandIcon={expanded === 'panel4' ? <MinimizeIcon /> : <AddIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header" sx={{ width: '100%' }}

                                        >
                                            <Typography sx={{ width: '85%' }}><h5> Marketing</h5> </Typography>
                                            <Typography sx={{ color: 'text.secondary' }}><p>1 Open Roles</p></Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                <div className='row my-3'>
                                                    <div className='col-md-6 col-12 p-2'>
                                                        <div className='careers-accordion-card'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <h5>Marketing Executive</h5>
                                                                    <p className=''>Department/Location/Work Type</p>
                                                                </div>
                                                                <div>
                                                                    <ArrowForwardIosIcon />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className='col-md-6 col-12 p-2'>
                                                        <div className='careers-accordion-card'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <h5>Job Title</h5>
                                                                    <p className=''>Department/Location/Work Type</p>
                                                                </div>
                                                                <div>
                                                                    <ArrowForwardIosIcon/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6 col-12 p-2'>
                                                        <div className='careers-accordion-card'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <h5>Job Title</h5>
                                                                    <p className=''>Department/Location/Work Type</p>
                                                                </div>
                                                                <div>
                                                                    <ArrowForwardIosIcon/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6 col-12 p-2'>
                                                        <div className='careers-accordion-card'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <h5>Job Title</h5>
                                                                    <p className=''>Department/Location/Work Type</p>
                                                                </div>
                                                                <div>
                                                                    <ArrowForwardIosIcon/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}

                                                </div>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    {/* <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                                        <AccordionSummary
                                            expandIcon={expanded === 'panel5' ? <MinimizeIcon /> : <AddIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header" sx={{ width: '100%'}}

                                        >
                                            <Typography sx={{ width: '85%'}}><h5> Engineering</h5> </Typography>
                                            <Typography sx={{ color: 'text.secondary' }}><p>3 Open Roles</p></Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                            <div className='row my-3'>
                                                    <div className='col-md-6 col-12 p-2'>
                                                        <div className='careers-accordion-card'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <h5>Job Title</h5>
                                                                    <p className=''>Department/Location/Work Type</p>
                                                                </div>
                                                                <div>
                                                                    <ArrowForwardIosIcon/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6 col-12 p-2'>
                                                        <div className='careers-accordion-card'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <h5>Job Title</h5>
                                                                    <p className=''>Department/Location/Work Type</p>
                                                                </div>
                                                                <div>
                                                                    <ArrowForwardIosIcon/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6 col-12 p-2'>
                                                        <div className='careers-accordion-card'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <h5>Job Title</h5>
                                                                    <p className=''>Department/Location/Work Type</p>
                                                                </div>
                                                                <div>
                                                                    <ArrowForwardIosIcon/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6 col-12 p-2'>
                                                        <div className='careers-accordion-card'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <h5>Job Title</h5>
                                                                    <p className=''>Department/Location/Work Type</p>
                                                                </div>
                                                                <div>
                                                                    <ArrowForwardIosIcon/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion> */}
                                    {/* <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                                        <AccordionSummary
                                            expandIcon={expanded === 'panel6' ? <MinimizeIcon /> : <AddIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header" sx={{ width: '100%'}}

                                        >
                                            <Typography sx={{ width: '85%'}}><h5> Engineering</h5> </Typography>
                                            <Typography sx={{ color: 'text.secondary' }}><p>3 Open Roles</p></Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                            <div className='row my-3'>
                                                    <div className='col-md-6 col-12 p-2'>
                                                        <div className='careers-accordion-card'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <h5>Job Title</h5>
                                                                    <p className=''>Department/Location/Work Type</p>
                                                                </div>
                                                                <div>
                                                                    <ArrowForwardIosIcon/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6 col-12 p-2'>
                                                        <div className='careers-accordion-card'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <h5>Job Title</h5>
                                                                    <p className=''>Department/Location/Work Type</p>
                                                                </div>
                                                                <div>
                                                                    <ArrowForwardIosIcon/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6 col-12 p-2'>
                                                        <div className='careers-accordion-card'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <h5>Job Title</h5>
                                                                    <p className=''>Department/Location/Work Type</p>
                                                                </div>
                                                                <div>
                                                                    <ArrowForwardIosIcon/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6 col-12 p-2'>
                                                        <div className='careers-accordion-card'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <h5>Job Title</h5>
                                                                    <p className=''>Department/Location/Work Type</p>
                                                                </div>
                                                                <div>
                                                                    <ArrowForwardIosIcon/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion> */}


                                </div>
                            </div>
                        </div>
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
                    <div className="career-job-modal px-5 pb-5">
                        <div className="">
                            <div className="">
                                <h6><b>Role: Junior Associate Operations</b></h6>
                                <h6>Date of joining: 1st April</h6>
                                <h6>CTC: 3.2-4 LPA</h6>
                                <p className="m-0 text-small"><b>Responsibilities: </b></p>
                                <ul>
                                    <li>Resolve customer tickets over Freshdesk, call, live chat, and social media</li>
                                    <li>Quick turnaround time to answer customer queries and maintain the right categorization of tickets
                                    </li>
                                    <li>Identify and assess customers’ needs to achieve customer satisfaction and deliver quality responses
                                    </li>
                                    <li>Follow communication procedures and guidelines
                                    </li>
                                    <li>Go the extra mile to engage customers and keep them happy
                                    </li>
                                    <li>Collect and pass feedback to the respective stakeholders bring in impactful solutions
                                    </li>
                                </ul>

                                <p className="m-0 text-small"><b>Responsibilities: </b></p>
                                <ul>
                                    <li>Experience of 1 to 2 years in related field is a plus </li>
                                    <li>Knowledge about a customer support app or CRM, such as Freshdesk
                                    </li>
                                    <li>Interpersonal skills - Friendly and pleasant demeanour over phone and email
                                    </li>
                                    <li>Communication skills - Exceptional verbal and written communication
                                    </li>
                                    <li>Listening skills - Understand, anticipate and resolve customer inquiries and issues in a friendly, helpful manner
                                    </li>
                                    <li>Attention to detail and accuracy - Excellent organizational skills and multitasking skills
                                    </li>
                                    <li>Customer service orientation - Passionate about customers.
                                    </li>
                                    <li>Cares as much about the customer as the organization.
                                    </li>
                                    <li>Strong affinity for people and the ability to get along with everyone
                                    </li>
                                    <li>Take initiatives - Quickly and thoroughly solve customer problems when deliveries, transactions or experience do not go 100% as planned.
                                    </li>
                                    <li>Flexible to work in shifts and on weekends
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Dialog>

            </div>
        </>
    )
}

export default Careers