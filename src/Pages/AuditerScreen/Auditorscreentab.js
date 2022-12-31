import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AuditorTransactionsForApproval from "./index"
import './AuditorTabs.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Popover from '@material-ui/core/Popover';
import AuditorTransactionDetails from "../../Pages/AuditerScreen/transactiondetail";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    // width: "100%",
  },
  tab: {
      // borderLeft:"1px solid #CFCBCF",
      // backgroundColor:"white"
  }
}));

export default function AuditerScreenTransactionTabs(props) { 
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const date = new Date()

  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  // Datepicker
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  // filter toast
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div className="container-fluid mt-4">
      <h5 className='main-heading'><b>Auditer Screen Transaction Tabs</b></h5>

      <div className={classes.root}>
        <div className="row">
          <div className="col-md-6 col-12">
            <AppBar position="static" color="default" >
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab className={classes.tab} label="All Transactions" {...a11yProps(0)} />
                <Tab className={classes.tab} label="Auditing Queue" {...a11yProps(1)} />
                <Tab className={classes.tab} label="Completed Audits" {...a11yProps(2)} />
                <Tab className={classes.tab} label="Rejected Audits" {...a11yProps(3)} />
              </Tabs>
            </AppBar>
          </div>
          {/*<div className="col-md-6 col-12 top_right_sec d-flex align-items-center justify-content-end">*/}
          {/*    <div className="datepicker">*/}
          {/*      <MuiPickersUtilsProvider utils={DateFnsUtils}>*/}
          {/*          <KeyboardDatePicker*/}
          {/*            disableToolbar*/}
          {/*            variant="inline"*/}
          {/*            format="MM/dd/yyyy"*/}
          {/*            margin="normal"*/}
          {/*            id="date-picker-inline"*/}
          {/*            value={selectedDate}*/}
          {/*            onChange={handleDateChange}*/}
          {/*            KeyboardButtonProps={{*/}
          {/*              'aria-label': 'change date',*/}
          {/*            }}*/}
          {/*            minDate = {new Date(date.setTime( date.getTime() - 30 * 86400000 ))}*/}
          {/*            maxDate = {new Date()}*/}
          {/*          />*/}
          {/*      </MuiPickersUtilsProvider>*/}
          {/*      */}
          {/*    </div>*/}
              {/*<div className="d-flex align-items-center justify-content-center mr-3 ml-3">*/}
              {/*   <FontAwesomeIcon className="filterIcon" icon={faFilter} onClick={handleClick} />*/}
              {/*   <Popover*/}
              {/*      id={id}*/}
              {/*      open={open}*/}
              {/*      anchorEl={anchorEl}*/}
              {/*      onClose={handleClose}*/}
              {/*      anchorOrigin={{*/}
              {/*        vertical: 'bottom',*/}
              {/*        horizontal: 'center',*/}
              {/*      }}*/}
              {/*      transformOrigin={{*/}
              {/*        vertical: 'top',*/}
              {/*        horizontal: 'center',*/}
              {/*      }}*/}
              {/*      className="mt-3"*/}
              {/*    >*/}
              {/*      <Typography className="p-2">*/}
              {/*      <div className="form-group d-flex align-items-center m-0">*/}
              {/*        <label className="text-small m-0 mr-3 w-100"> By Name :</label>*/}
              {/*        <input type="checkbox" value="Filter" className="m-0"/>*/}
              {/*      </div>*/}
              {/*      <div className="form-group d-flex align-items-center m-0">*/}
              {/*        <label className="text-small m-0 mr-3 w-100"> By Alphabets :</label>*/}
              {/*        <input type="checkbox" value="Filter" className="m-0"/>*/}
              {/*      </div>*/}
              {/*      <div className="form-group d-flex align-items-center m-0">*/}
              {/*        <label className="text-small m-0 mr-3 w-100"> By Date :</label>*/}
              {/*        <input type="checkbox" value="Filter" className="m-0"/>*/}
              {/*      </div>*/}
              {/*      </Typography>*/}
              {/*    </Popover>*/}
              {/*</div>*/}
              {/*<div className="d-flex align-items-center justify-content-end">*/}
              {/*/!*  Actual search box *!/*/}
              {/*  <div class="form-group m-0  has-search d-flex align-items-center mt-2">*/}
              {/*    <span class="fa fa-search form-control-feedback"> <FontAwesomeIcon icon={faSearch} /></span>*/}
              {/*    <input type="text" class="form-control" placeholder="Search Here .." />*/}
              {/*  </div>*/}
              {/*</div>*/}
          {/*</div>*/}
        </div>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <AuditorTransactionsForApproval checker={props.checker} selectedDate={selectedDate} display={"allrecords"}/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <AuditorTransactionsForApproval  checker={props.checker} selectedDate={selectedDate} display={"inprogress"}/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <AuditorTransactionsForApproval  checker={props.checker} selectedDate={selectedDate} display={"approved"}/>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
        <AuditorTransactionsForApproval  checker={props.checker} selectedDate={selectedDate} display={"notapproved"}/>
        </TabPanel>

      </SwipeableViews>
      </div>

    </div>
  );
}
