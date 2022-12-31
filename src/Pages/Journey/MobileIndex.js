import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import JorneySteps from '../../Pages/Journey/Index';
import ClearIcon from '@material-ui/icons/Clear';
import Buttons from "../../Components/Buttons"

// For Loader  Journey Progess
function CircularProgressWithLabel(props) {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="determinate" {...props} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  
  CircularProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
  };

// for modal
const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(0),
      margin: '0px 8px',
      borderRadius: "10px"
    },
  }));
  ///
function MobileIndex() {
    // for progress
    const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);
  ////////
  //for modal 
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  ///////////
    return (
        <div className="OnboardingJourneyMobile">
            <div className="OnboardingJourneyMobile-Card">
            <div className="d-flex align-items-start mt-4 ">
                    <div className="OnboardingJourneyMobile-progress mr-3">
                        <CircularProgressWithLabel value={progress} />
                    </div>
                    <div>
                        <h6 className=" text-white"><b>Your onboarding journey</b></h6>
                        <p className="text-small text-white mb-1">Continue completeing your<br/>profile to start trading</p>
                        <p className="text-right m-0">
                            <Link onClick={handleOpen} className="text-small fw-400 text-white" style={{borderBottom:"1px solid #fff"}}>Lets Complete Your Profile</Link>
                        </p>
                    </div>
                </div>
            </div>
            <div className="OnboardingJourneyMobile-modal">
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={open}>
                    <div className={classes.paper}>
                        <div className="border-bottom d-flex align-items-center justify-content-between px-3 py-2 mb-2">
                            <div className="text-left">
                                <h6 className="m-0 text-default-secoundary"><b>Complete Steps</b></h6>
                            </div>
                            <div className="text-right">
                                <ClearIcon onClick={handleClose}/>
                            </div>
                        </div>
                        <JorneySteps/>
                        <div className="need-help-card px-3 py-2">
                            <div>
                                <h6><b>Need help?</b></h6>
                                <p className="mb-1 text-normal">How to buy unlisted shares?</p>
                                <p className="mb-1 text-normal">How to sell unlisted shares?</p>
                                <p className="mb-1 text-normal">How to check the credit of shares?</p>
                                <div className="d-flex justify-content-center mt-4">
                                    <Buttons.PrimaryButton value="View Demo" />
                                </div>
                            </div>
                        </div>
                    </div>
                    </Fade>
                </Modal>
                </div>
        </div>
    )
}

export default MobileIndex
