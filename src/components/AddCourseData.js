import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment'
import axios from 'axios'
import { Add } from '@material-ui/icons'
import Alert from '@material-ui/lab/Alert';
import MomentUtils from '@date-io/moment';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    TextField,
    Button,
    Grid
} from '@material-ui/core';

export default function AddCourseData(props) {
    const [newDate, setDate] = useState(new Date())
    const [courseName, setName] = useState('')
    const [gmush, setGmush] = useState(0)
    const [desc, setDesc] = useState('')
    const [isDone, setDone] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const course = props.courses.filter(course => course.name.toLowerCase() === courseName.toLowerCase())
        if (course.length) {
            setGmush(course[0].gmush)
            setDesc(course[0].description)
        }
    }
        , [courseName])

    const handleOnCreate = () => {
        setIsOpen(true)

        //Initializing data
        setDate(props.params.date)
        setName(props.params.name)
    }

    const handleSubmit = () => {
        const course = props.courses.filter(course => course.name.toLowerCase() === courseName.toLowerCase())
        if (course[0]) {
            axios.patch(`/courses/${course[0]._id}`, { date: newDate }).then(res => {
                if (res.status === 200) {
                    props.setCoursesList(props.courses.map(current => {
                        if (current._id == course[0]._id) {
                            current.dates.push(newDate)
                        }
                        return current;
                    }))
                    handleClose()
                }
            })

        } else {
            const newCourse = {
                name: courseName,
                description: desc,
                gmush: gmush,
                dates: [moment(newDate)]
            }

            axios.post('/courses', newCourse).then(res => {
                if (res.status === 200) {
                    let courses = props.courses;
                    courses.push(res.data)
                    props.setCoursesList(courses)
                    // props.setCoursesList([...courses, res.data])
                    handleClose()
                }
            })
        }
    }

    const doesCourseExsist = () => {
        console.log(props.courses)
        return (props.courses.filter(
            course => course.name.toLowerCase() === courseName.toLowerCase())).length;

    }

    const disableDate = (date) => {
        const dateForamted = moment(date._d).format('DD/MM/YYYY')
        const answer = (doesCourseExsist ?
            props.courses.filter(course =>
                (course.name.toLowerCase() === courseName.toLowerCase() &
                    doesDateExist(dateForamted, course.dates))).length : false)

        return answer;
    }

    const doesDateExist = (dateForamatted, dates) => {
        return (dates.filter(date => moment(date).format('DD/MM/YYYY') == dateForamatted).length)
    }

    const handleClose = () => {
        props.clearFilter()
        setIsOpen(false)
    }

    const handleChange = (event) => {
        setDate(event._d)
    }

    return (
        <div>
            <div style={{ textAlign: 'center' }}><p style={{ color: 'grey', fontSize: '7w' }}>סליחה לא מצאנו...</p>
                <div style={{ color: 'grey' }}>רוצה להוסיף?</div>
                <Fab onClick={handleOnCreate} color="primary" aria-label="add">
                    <Add />
                </Fab></div>

            <Dialog fullWidth={true} open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">הוסף מידע</DialogTitle>
                <DialogContent>
                    <Grid container alignItems='center'>
                        <Grid item xs={12}>
                            <DialogContentText>
                                באפשרותך להוסיף קורס חדש או תאריך לקורס קיים
                            </DialogContentText>
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="שם קורס"
                                value={courseName}
                                onChange={event => setName(event.target.value)}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                value={desc}
                                onChange={event => setDesc(event.target.value)}
                                id="standard-basic"
                                label="תיאור"
                                disabled={doesCourseExsist()} />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField type='number'
                                value={gmush}
                                onChange={event => setGmush(event.target.value)}
                                disabled={doesCourseExsist()} />
                        </Grid>
                        <Grid item xs={12}>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DatePicker
                                    orientation="landscape"
                                    variant="static"
                                    openTo="date"
                                    format="YYYY-MM-DD"
                                    value={newDate}
                                    disablePast={true}
                                    shouldDisableDate={disableDate}
                                    onChange={event => handleChange(event)}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        אחורה פנה
          </Button>
                    <Button onClick={handleSubmit} color="primary">
                        הוסף
          </Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}