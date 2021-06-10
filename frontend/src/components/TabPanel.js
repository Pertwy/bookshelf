import React from 'react';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Box from '@material-ui/core/Box';
import DisplayBooks from "./DisplayBooks"
import DisplayAllLists from "./DisplayAllLists"
import Following from "../components/Following"
import { AutoComplete } from 'material-ui';
import Reviews from './Reviews';


const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',

  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    margin: "auto",
    minWidth: 22,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(3),
    fontSize: "13px",
    color: '#e4e5e6',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width:"100%",
  },
  padding: {
    padding: theme.spacing(1),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
}));

export default function CustomizedTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const theme = useTheme();


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };




  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
         aria-labelledby={`scrollable-auto-tab-${index}`}
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


  return (
    <div className={classes.root, "pb-4"}>
      <div>
        <AntTabs variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          aria-label="scrollable auto tabs example" 
          value={value} onChange={handleChange} 

         >
          {/* <AntTab label="Profile" {...a11yProps(0)} /> */}
          <AntTab label="Bookshelf" {...a11yProps(0)}/>
          <AntTab label="Read list" {...a11yProps(1)}/>
          <AntTab label="Read" {...a11yProps(2)}/>
          <AntTab label="Favorites" {...a11yProps(3)} />
          <AntTab label="Follow" {...a11yProps(4)}/>
          <AntTab label="Reviews" {...a11yProps(5)}/>
          <AntTab label="Lists" {...a11yProps(6)}/>
          {/* <AntTab label="Reviews" {...a11yProps(7)}/>
          <AntTab label="Dairy" {...a11yProps(8)}/> */}
        </AntTabs>
        <Typography className={classes.padding} />
        <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >

        {/* <TabPanel value={value} index={0} dir={theme.direction}>
          <div className="row book-row">
            <h1 className="all-text" >Profile</h1>
          </div>
        </TabPanel> */}

        <TabPanel value={value} index={0} dir={theme.direction}>
          <div className=" center-all">
            <h4 className="all-text profile-title-text">Let People know what's on your bookshelf!</h4>
          </div>
          <div className="row book-row">
            <DisplayBooks owner={props.owner} books={props.userData.bookshelf} type="bookshelf" userData={props.userData} />
          </div>
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          <div className=" center-all">
            <h4 className="all-text profile-title-text">What have you always wanted to read?</h4>
          </div>
          <div className="row book-row">
            <DisplayBooks owner={props.owner} books={props.userData.readList} type="readingList" userData={props.userData}/>
          </div>
        </TabPanel>


        <TabPanel value={value} index={2} dir={theme.direction}>
          <div className=" center-all">
            <h4 className="all-text profile-title-text">Share every book you've ever read!</h4>
          </div>
          <div className="row book-row">
            <DisplayBooks owner={props.owner} books={props.userData.books} type="read" userData={props.userData}/>
          </div>
        </TabPanel>

        <TabPanel value={value} index={3} dir={theme.direction}>
          <div className=" center-all">
            <h4 className="all-text profile-title-text">Desert island books</h4>
          </div>

          <div className="row book-row">
            <DisplayBooks owner={props.owner} books={props.userData.favorites} type="favorites" userData={props.userData}/>
          </div>
        </TabPanel>
        

        <TabPanel value={value} index={4} dir={theme.direction}>
          <div className=" center-all">
            <h4 className="all-text profile-title-text">Follow other Bookshelf users to get inspiration</h4>
          </div>
          <Following userData={props.userData} owner={props.owner}/>
        </TabPanel>

        <TabPanel value={value} index={5} dir={theme.direction}>
          <div className=" center-all">
            <h4 className="all-text profile-title-text">Everyone's a critic...</h4>
          </div>
          <Reviews userData={props.userData} owner={props.owner}/>
        </TabPanel> 


        <TabPanel value={value} index={6} dir={theme.direction}>
          <div className=" center-all">
            <h4 className="all-text profile-title-text">Create lists to share with your friends</h4>
          </div>
          <div className="row book-row">
            <DisplayAllLists lists={props.userData.lists}/>
          </div>
        </TabPanel>


        {/* <TabPanel value={value} index={7} dir={theme.direction}>
          Item Five
        </TabPanel> 

    
         <TabPanel value={value} index={8} dir={theme.direction}>
          Diary
        </TabPanel> */}
      </SwipeableViews>
      </div>
    </div>
  );
}
