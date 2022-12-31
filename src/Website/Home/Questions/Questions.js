import React, { useState } from 'react';
import Buttons from '../../../Components/Buttons';
import './Questions.css';
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
import { Link } from "react-router-dom";

import { isLoggedIn } from "../../../Utils/Network";
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@material-ui/core/Dialog';




export default function Questions() {

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
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
            expandIcon={expanded === 'panel1' ? <MinimizeIcon sx={{ fontSize: '0.9rem' }} className='accordion-MinimizeIcon ' /> : <AddIcon />}
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

    const [openModal, setOpenModal] = useState(false);
    const [isLogedIn, setisLogedIn] = useState(isLoggedIn());
    const handleClickOpen = () => {
        { isLogedIn ? setOpenModal(false) : setOpenModal(true) }
    };
    const handleClose = () => {
        setOpenModal(false)
    };


    return (
        <>
            <div className="default-bg-color">
                <div className="QuestionsForUs-main container" >
                    <div className="row">
                        <div className="col-md-12 col-12">
                            <h3 className='default-heading mb-4'
                                >Got More Questions For Us?</h3>
                            
                            <div className='QuestionsForUs-accordion'>          
                                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                    <AccordionSummary
                                        expandIcon={expanded === 'panel1' ? <MinimizeIcon /> : <AddIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"

                                    >
                                        <Typography><h5>What are unlisted companies?</h5> </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            <p className='accordion-para'>An unlisted public company is one which is not listed on any stock exchange but can have an unlimited number of shareholders to raise capital for any commercial venture. A company may not be registered for a number of reasons, such as-. Not large enough to quantify for stock exchange listings.</p>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                    <AccordionSummary
                                        expandIcon={expanded === 'panel2' ? <MinimizeIcon /> : <AddIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"

                                    >
                                        <Typography><h5> Can I buy and sell unlisted shares?</h5> </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            <p className='accordion-para'>There is no restriction on buying Unlisted shares if the client is resident of India. Unlisted shares can be bought through intermediaries and platforms who specialize in sourcing and placement of unlisted shares and can facilitate the trade. Intermediaries and platforms buy shares from employees i.e., employee stock options (ESOP), existing investors and offers new investors who are keen to invest.</p>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                    <AccordionSummary
                                        expandIcon={expanded === 'panel3' ? <MinimizeIcon /> : <AddIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"

                                    >
                                        <Typography><h5>What is my tax liability If I Transact in Unlisted Shares?</h5> </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            <p className='accordion-para'>Income/loss from Sale of equity shares is covered under the head ‘Capital Gains’<br/>
                                            Under the head ‘Capital Gains’, income is further classified into:<br/>
                                            (i) Long term capital gains, or (ii) Short term capital gains.<br/>
                                            Short-term capital gains (STCG)<br/>
                                            If unlisted equity shares are sold within 24 months of purchase, the seller may make short term capital gain (STCG) or incur a short-term capital loss (STCL). The seller makes short-term capital gain when shares are sold at a price higher than the purchase price.
                                            Short-term capital gains are taxable at Slab rate .<br/>
                                            Calculation of short-term capital gain = Sale price Less Expenses on Sale Less Purchase price</p>

                                            <p className='accordion-para '>Long-term capital gains (LTCG)<br/>
                                            If equity shares listed on a stock exchange are sold after 24 months of purchase, the seller may make a long-term capital gain (LTCG) or incur a long-term capital loss (LTCL).<br/>
                                            Long-term capital gains are taxable at 20% after the benefit of Indexation.</p>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                                    <AccordionSummary
                                        expandIcon={expanded === 'panel4' ? <MinimizeIcon /> : <AddIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"

                                    >
                                        <Typography><h5>What is the minimum investment to buy unlisted shares ?</h5> </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            <p className='accordion-para'>To invest into Unlisted shares, there is no minimum or maximum amount.  You may invest in unlisted companies from as low as INR 1000 /- </p>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion> 
                            </div>


                            <div className='my-4 d-flex justify-content-center w-100'
                                ><a href="http://faq.unlistedassets.com/support/home" target="_blank"> <Buttons.PrimaryButton value="View All Questions" /></a>
                                   
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

                                        <h5><b>Got More Questions</b></h5>
                                        <p className="m-0 text-small">Please log in to Got More Questions right away!</p>

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
        </>
    )
}