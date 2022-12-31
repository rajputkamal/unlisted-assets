import React from 'react'
import Buttons from "../../Buttons"
import BotIcon from './bot.svg';
import GreenCheck from '../Green-chek.svg'
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import PersonIcon from '@material-ui/icons/Person';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Portal from '@material-ui/core/Portal';
import {Link} from 'react-router-dom';
import './Profile.css'
const QontoConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: '#784af4',
        },
    },
    completed: {
        '& $line': {
            borderColor: '#784af4',
        },
    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color:'#721B65',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color:'#2E384D',
        zIndex: 1,
        fontSize: 18,
    },
});

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 25,
    },
    active: {
        '& $line': {
            background: '#2E384D ',
            boxShadow: '0px 0px 1px 0px #ccc',
            color:'#721B65',
        },
    },
    completed: {
        '& $line': {
            background: '#2E384D ',
            boxShadow: '0px 0px 1px 0px #ccc',
            color:'#721B65',
        },
    },
    line: {
        height: 1,
        border: 0,
        backgroundColor: '#ccc',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#fff',
        zIndex: 1,
        color: '#787878',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#fff ',
        boxShadow: '0px 4px 15px rgba(46, 56, 77, 0.2)',
        cursor:'pointer'
    },
    active: {
        background: '#fff ',
        boxShadow: '0px 4px 15px rgba(114, 27, 101, 0.2)',
        color:'#721B65',
    },
    completed: {
        background: '#fff ',
        boxShadow: '0px 4px 15px rgba(46, 56, 77, 0.2)',
        color:'#2E384D',
    },
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <PersonIcon />,
        2: <AccountBalanceIcon />,
        3: <AccountBalanceWalletIcon />,
        4: <RecentActorsIcon />,

    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Person Detail', 'Bank Account', 'Wallet Creation'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Person Detail';
        case 1:
            return 'Bank Account';
        case 2:
            return 'Wallet Creation';
        default:
            return 'Unknown step';
    }
}

const TradeReady0 = (props) => {
    const [completeTradeReadyStartedStstus, setcompleteTradeReadyStartedStstus] = React.useState(false);

    const [bankAccountCompletionStstus, setbankAccountCompletionStstus] = React.useState(false);
    const [dmatAccountCompletionStstus, setdmatAccountCompletionStstus] = React.useState(false);
    const [nsdlActiveAccountCompletionStstus, setnsdlActiveAccountCompletionStstus] = React.useState(false);
    const [panCardCompletionStstus, setpanCardCompletionStstus] = React.useState(false);
    const [aadharMobileLinkageVerificationStstus, setaadharMobileLinkageVerificationStstus] = React.useState(false);

    React.useEffect(() => {
        setbankAccountCompletionStstus(props.rowInformation.bankAccountCompletionStstus)
        setcompleteTradeReadyStartedStstus(props.rowInformation.completeTradeReadyStartedStstus)
        setdmatAccountCompletionStstus(props.rowInformation.dmatAccountCompletionStstus)
        setnsdlActiveAccountCompletionStstus(props.rowInformation.nsdlActiveAccountCompletionStstus)
        setpanCardCompletionStstus(props.rowInformation.panCardCompletionStstus)
        setaadharMobileLinkageVerificationStstus(props.rowInformation.aadharMobileLinkageVerificationStstus)
    }, [props]);
    const [show1, setShow1] = React.useState(true);
    const [show2, setShow2] = React.useState(false);
    const [show3, setShow3] = React.useState(false);
    const [show4, setShow4] = React.useState(false);

    const container = React.useRef(null);
    
    const handleClick1 = () => {
      setShow1(true);
      setShow2(false);
      setShow3(false);
      setShow4(false);
    };
    const handleClick2 = () => {
        setShow2(true);
        setShow1(false);
        setShow3(false);
        setShow4(false);
    };
    const handleClick3 = () => {
        setShow3(true);
        setShow1(false);
        setShow2(false);
        setShow4(false);
    };
    const handleClick4 = () => {
        setShow4(true);
        setShow1(false);
        setShow2(false);
        setShow3(false);
    };
    return (
        <>
            {/* {completeTradeReadyStartedStstus ?
                <div className="profile-first-sec w-100">
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="w-75 text-center">
                            <img src={BotIcon}/>
                            <p className="text-small"><b>“Hi. I am Unlisted Bot, <br/>
                                Lets get your journey of unlisted stocks started” </b></p>
                            <Buttons.SecondaryButton style={{margin: "auto"}} value="Lets Complete Your Profile"/>
                            <div className="d-flex justify-content-center">
                                <a className="text-small m-2 text-dark useful-link">Useful link 1</a>
                                <a className="text-small m-2 text-dark useful-link">Useful link 2</a>
                                <a className="text-small m-2 text-dark useful-link">Useful link 3</a>
                            </div>
                        </div>
                    </div>
                </div> :null
            } */}

            {<Stepper alternativeLabel activeStep={0} connector={<ColorlibConnector />}>


                {

                    bankAccountCompletionStstus ?
                        <Step key={"label"} onClick={handleClick1} > 
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{"Bank Details"}
                            <img className="GreenCheck-icon" src={GreenCheck}/></StepLabel>
                        </Step>

                        :
                        <Step key={"label"} onClick={handleClick1}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{"Bank Details"}</StepLabel>
                        </Step>

                }

                {
                    dmatAccountCompletionStstus ?
                        <Step key={"label"} onClick={handleClick2}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{"Dmat Details"}
                            <img className="GreenCheck-icon" src={GreenCheck}/></StepLabel>
                        </Step>

                        :
                        <Step key={"label"} onClick={handleClick2}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{"Dmat Details"}</StepLabel>
                        </Step>
                }

                {
                    panCardCompletionStstus ?
                        <Step key={"label"} onClick={handleClick3}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{"Pan Verification"}
                             <img className="GreenCheck-icon" src={GreenCheck}/></StepLabel>
                        </Step>

                        :
                        <Step key={"label"} onClick={handleClick3}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{"Pan Verification"}</StepLabel>
                        </Step>
                }
                {
                    aadharMobileLinkageVerificationStstus ?
                        <Step key={"label"} onClick={handleClick4}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{"Aadhar Verification"}
                            <img className="GreenCheck-icon" src={GreenCheck}/></StepLabel>
                        </Step>

                        :
                        <Step key={"label"} onClick={handleClick4}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{"Aadhar Verification"}</StepLabel>
                        </Step>
                }

            </Stepper>
            }
            <div className="px-3 mt-4 mb-2">
                {
                    bankAccountCompletionStstus ?
                        <>
                        <Box >
                            {show1 ? (
                            <Portal container={container.current}>
                                <div className="d-flex align-items-center justify-content-center ">
                                    <img src={BotIcon} width="50"/>
                                    <p className='m-0 text-small-profile ml-1 text-left'> <b className='text-small-profile'>“Congratulations. <br />
                                        Your Bank details has been verified.” </b></p>
                                </div>
                            </Portal>
                            ) : null}
                        </Box>
                        </>
                        :
                        <>
                         <Box >
                            {show1 ? (
                            <Portal container={container.current}>
                                <div className="d-flex align-items-center justify-content-between ">
                                    <img src={BotIcon} width="50"/>
                                    <p className='m-0 text-small-profile ml-1 text-left'> <b className='text-small-profile'>You will need to fill in your bank details. We make sure that your information is safely processed</b></p>
                                        <Link to="/profilewig/1">
                                            <Buttons.SecondaryButton  value="Lets Verify Bank Details" />
                                        </Link>
                                </div>
                            </Portal>
                            ) : null}
                            </Box>
                        </>
                }
                {
                    dmatAccountCompletionStstus ?
                        <>
                        <Box >
                            {show2 ? (
                            <Portal container={container.current}>
                                <div className="d-flex align-items-center justify-content-center ">
                                    <img src={BotIcon} width="50"/>
                                    <p className='m-0 text-small-profile ml-1 text-left'> <b className='text-small-profile'>“Congratulations. <br />
                                        Your Dmat details has been verified.” </b></p>
                                </div>
                            </Portal>
                            ) : null}
                        </Box>
                        </>
                        :
                        <>
                         <Box >
                            {show2 ? (
                            <Portal container={container.current}>
                                <div className="d-flex align-items-center justify-content-between ">
                                    <img src={BotIcon} width="50"/>
                                    <p className='m-0 text-small-profile ml-1 text-left'> <b className='text-small-profile'>You will need to fill in your Dmat details. We make sure that your information is safely processed</b></p>
                                        <Link to="/profilewig/2">
                                            <Buttons.SecondaryButton  value="Lets Verify Dmat Details" />
                                        </Link>
                                </div>
                            </Portal>
                            ) : null}
                        </Box>
                        </>
                }
                {
                    panCardCompletionStstus ?
                        <>
                        <Box >
                            {show3 ? (
                            <Portal container={container.current}>
                                <div className="d-flex align-items-center justify-content-center ">
                                    <img src={BotIcon} width="50"/>
                                    <p className='m-0 text-small-profile ml-1 text-left'> <b className='text-small-profile'>“Congratulations. <br />
                                        Your PAN details has been verified.” </b></p>
                                </div>
                            </Portal>
                            ) : null}
                        </Box>
                        </>
                        :
                        <>
                         <Box >
                            {show3 ? (
                            <Portal container={container.current}>
                                <div className="d-flex align-items-center justify-content-between ">
                                    <img src={BotIcon} width="50"/>
                                    <p className='m-0 text-small-profile ml-1 text-left'> <b className='text-small-profile'>You will need to fill in your PAN details. We make sure that your information is safely processed</b></p>
                                        <Link to="/profilewig/4">
                                            <Buttons.SecondaryButton  value="Lets Verify PAN Details" />
                                        </Link>
                                </div>
                            </Portal>
                            ) : null}
                        </Box>
                        </>
                }
                {
                    aadharMobileLinkageVerificationStstus ?
                        <>
                        <Box >
                            {show4 ? (
                            <Portal container={container.current}>
                                <div className="d-flex align-items-center justify-content-center ">
                                    <img src={BotIcon} width="50"/>
                                    <p className='m-0 text-small-profile ml-1 text-left'> <b className='text-small-profile'>“Congratulations. <br />
                                        Your Aadhar details has been verified.” </b></p>
                                </div>
                            </Portal>
                            ) : null}
                        </Box>
                        </>
                        :
                        <>
                         <Box >
                            {show4 ? (
                            <Portal container={container.current}>
                                <div className="d-flex align-items-center justify-content-between ">
                                    <img src={BotIcon} width="50"/>
                                    <p className='m-0 text-small-profile ml-1 text-left'> <b className='text-small-profile'>You will need to fill in your Aadhar details. We make sure that your information is safely processed</b></p>
                                        <Link to="/profilewig/5">
                                            <Buttons.SecondaryButton  value="Lets Verify Aadhar Details" />
                                        </Link>
                                </div>
                            </Portal>
                            ) : null}
                        </Box>
                        </>
                }
               
                <Box ref={container} />
            </div>

        </>
    )
}
export default TradeReady0;