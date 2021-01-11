import React, { useState, useContext, useEffect } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import HistoryIcon from '@material-ui/icons/History';
import moment from 'moment'
import axios from 'axios'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import UpdateIcon from '@material-ui/icons/Update';
import SwipeableViews from 'react-swipeable-views';
import CoursesDisplay from './CoursesDisplay'
import Profile from './Profile'
import { Grid, Tab, Tabs, AppBar, makeStyles, Box, Typography, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    tabs: {
        paddingRight: '9vh'
    },
    center: {
        direction: 'rtl',
    },
    card: {
        paddingLeft: '30vh'
    }
}));

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
                <Box p={2}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function ProfileComp() {
    const [navValue, setNavValue] = useState(1)
    const [futureCourses, setFutureCourses] = useState([])
    const [pastCourses, setPastCourses] = useState([])
    const [currUser, setCurrUser] = useState()
    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        loadUserData()
    }, [])

    async function loadUserData() {
        const users = await (await fetch("https://api.mocki.io/v1/c3b8d833")).json();
        if (users) {
            setCurrUser(users.filter(user => user.personalNum === '8456304'))
        }

        const data = await axios.get('/soldierCourses/8456304', res => {
            if (res.ok) {
                return res.json()
            }
        })

        if (data) {
            let a = [];
            let b = [];
            data.data.forEach(element => {
                const course = {
                    name: element.ownCourses[0].name,
                    gmush: element.ownCourses[0].gmush,
                    description: element.ownCourses[0].description,
                    date: element.date
                }
                if (moment().isAfter(element.date)) {
                    // setPastCourses([...pastCourses,course])
                    a.push(course)
                } else {
                    // setFutureCourses([...futureCourses, course])
                    b.push(course)
                }

            });

            setPastCourses(a)
            setFutureCourses(b)
        }
    }

    const handleChange = (event, newValue) => {
        setNavValue(newValue)
    }

    const handleChangeIndex = (index) => {
        setNavValue(index);
    };

    return (
        <Grid container justify="center">
            <Grid item xs={6}>
                <div className={classes.root}>
                    <AppBar className={classes.tabs} position="static" color="default">
                        <Tabs
                            value={navValue}
                            className={classes.tabs}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary" >
                            <Tab label="קורסים עתיידים" icon={<UpdateIcon />}{...a11yProps(0)} />
                            <Tab label="זוט עני" icon={<AssignmentIndIcon />} {...a11yProps(1)} />
                            <Tab label="היסטוריית קורסים" icon={<HistoryIcon />} {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        // axis={theme.direction === 'ltr' ? 'x-reverse' : 'x'}
                        index={navValue}
                        onChangeIndex={handleChangeIndex}>
                        <TabPanel className={classes.center} value={navValue} index={0}>
                            <CoursesDisplay courses={futureCourses} />
                        </TabPanel>
                        <TabPanel className={classes.card} value={navValue} index={1}>
                            <Profile user={currUser} />
                        </TabPanel>
                        <TabPanel className={classes.center} value={navValue} index={2}>
                            <CoursesDisplay courses={pastCourses} />
                        </TabPanel>
                    </SwipeableViews>
                </div>
            </Grid>
        </Grid>
    )
} 