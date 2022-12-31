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
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Profile.css'
import Box from '@material-ui/core/Box';
import Portal from '@material-ui/core/Portal';


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
        cursor:'pointer',
        boxShadow: '0px 4px 15px rgba(46, 56, 77, 0.2)',
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

const Profile_1 = (props) => {

    const [completed, setcompleted] = React.useState(false);
    const [profilecompleted, setprofilecompleted] = React.useState(false);
    const [mobileverificationcompleted, setmobileverificationcompleted] = React.useState(false);
    const [started, setstarted] = React.useState(false);
    const steps = getStepContent();
    React.useEffect(() => {
        setprofilecompleted(props.rowInformation.profileCompletionStstus)
        setmobileverificationcompleted(props.rowInformation.mobileVerificationCompletionStstus)
        setstarted(props.rowInformation.completeProfileStartedStstus)
    }, []);

    const [show1, setShow1] = React.useState(true);
    const [show2, setShow2] = React.useState(false);

    const container = React.useRef(null);
    
    const handleClick1 = () => {
      setShow1(true);
      setShow2(false);

    };
    const handleClick2 = () => {
        setShow2(true);
        setShow1(false);
      };
    return (
        <>
        <div className="profile-active-content ">
            {/* {started ?
                <div className="profile-first-sec w-100">
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="w-75 text-center">
                            <img src={BotIcon}/>
                            <p className="text-small"><b>“Hi. I am Unlisted Bot, <br/>
                                Lets get your journey of unlisted stocks started” </b></p>
                            <Buttons.SecondaryButton style={{margin: "auto"}} value="Lets Complete Your Profile"/>
                          
                        </div>
                    </div>
                </div> :null
            } */}

            {<Stepper alternativeLabel activeStep={0} connector={<ColorlibConnector />}>

                {
                    mobileverificationcompleted ?
                        <Step key={"label"} onClick={handleClick1} >
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{"Mobile Verification"}
                            <img className="GreenCheck-icon" src={GreenCheck}/></StepLabel>
                            
                        </Step>
                        :
                        <Step key={"label"} onClick={handleClick1} >
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{"Mobile Verification"}
                            </StepLabel>
                        </Step>
                }

                {
                    profilecompleted ?
                        <Step key={"label"}  onClick={handleClick2} >
                            <StepLabel StepIconComponent={ColorlibStepIcon} className="cursor-pointer">{"Personal Details"}
                            <img className="GreenCheck-icon" src={GreenCheck}/>
                            </StepLabel>
                        </Step>

                        :
                        <Step key={"label"}  onClick={handleClick2}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{"Personal Details"}
                            </StepLabel>
                        </Step>
                }

            </Stepper>
            }
            <div className="px-3 mt-2">
                <Box >
                    {show1 ? (
                    <Portal container={container.current}>
                        <div className="d-flex align-items-center justify-content-center ">
                            <img src={BotIcon} />
                            <p className='m-0 text-small-profile ml-1 text-left'> <b className='text-small-profile'>“Hi. <br />
                                Your recently unfinished stock negotiation is still available.”</b></p>
                        </div>
                    </Portal>
                    ) : null}
                    {show2 ? (
                    <Portal container={container.current}>
                        <div className="d-flex align-items-center justify-content-center ">
                            <img src={BotIcon} />
                            <p className='m-0 text-small-profile ml-1 text-left'> <b className='text-small-profile'>“Congratulations. <br />
                                Your Bank account has been verified.” </b></p>
                        </div>
                    </Portal>
                    ) : null}
                </Box>
                <Box ref={container} />
            </div>
            </div>
        </>
    )
}
export default Profile_1;