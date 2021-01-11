import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import { TextField, Container, Button, Fab, makeStyles, CircularProgress } from '@material-ui/core';
import CourseList from './CoursesList'
import moment from 'moment'
import { Typography } from '@material-ui/core';
import CourseCart from './CourseCart'
import AddCourseData from './AddCourseData'
import Grid from '@material-ui/core/Grid';
import { StayCurrentLandscape } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    loading: {
      // alignContent: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    },
  }
}));

export default function CoursesComp() {
  const [searchText, setSearchText] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [coursesList, setCoursesList] = useState([]);
  const [resultList, setResultList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  //First render
  useEffect(() => {
    initData();
  }
    , [])

  useEffect(() => {
    setResultList(filteredCourses(searchText, searchDate))
  }
    , [searchText, searchDate])

  // Fetching the data
  async function initData() {
    const courses = await axios.get("/courses", res => {
      if (res.ok) { // 200
        return res.json()
      }
    });

    if (courses.data) {
      setCoursesList(courses.data)
      setResultList(courses.data)
      setIsLoading(false)
    }
  }

  const updateData = (action, course) => {
    if (action == 'add') {
      setCoursesList(...coursesList, course)
    } else {
      setCoursesList(prev => prev.map(current => {
        if (current._id == course._id) {
          current.dates.push(moment(course.date))
        }
        return current;
      }))
    }
  }

  const handleChangeDate = event => {
    setSearchDate(event.target.value)
  }

  // Checking if the received dates list contains the list in the filter
  const isDateFound = (dates) => {
    if (searchDate) {
      const filteredDates = dates.filter(date =>
        moment(searchDate).format('DD/MM/YYYY') === moment(date.substring(0, 10)).format('DD/MM/YYYY'))
      return filteredDates.length > 0;
    }
    return true;
  }

  //When filter changes
  const filteredCourses = (name, date) => {
    const filtered = coursesList.filter(course => {
      return ((course.name.toLowerCase().includes(name) & isDateFound(course.dates)))
    })

    return filtered;
  }

  const clearFilter = () => {
    setSearchDate('')
    setSearchText('')
  }

  function handleErr() {
    return new Response(null)
  }

  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={12}>
          <div className="center">
            <Typography variant="h2" component="h2" gutterBottom>
              רישום קורסים
           </Typography>
          </div>
        </Grid>
        <Grid item xs={8}>
          <div className='searchBar'>
            <form className={classes.root}>
              <TextField
                value={searchText}
                onChange={event => setSearchText(event.target.value)}
                id="standard-basic"
                label=" שם קורס..." />
              <TextField
                id="date"
                label="תאריך..."
                format="DD/MM/YYYY"
                type="date"
                value={searchDate}
                onChange={event => setSearchDate(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="search">
            <CourseCart />
          </div>
        </Grid>
        <Grid item className={classes.loading} xs={7}>
          {
            isLoading
              ?
              <CircularProgress />
              :
              resultList.length === 0
                ?
                <AddCourseData params={{ name: searchText, date: searchDate }}
                  clearFilter={clearFilter}
                  courses={coursesList}
                  setCoursesList={setCoursesList} />
                :
                <CourseList courses={resultList} />
          }
        </Grid>
      </Grid>
    </div>
  );
}
