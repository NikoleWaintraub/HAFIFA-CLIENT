import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, List, Paper, Grid, Fab } from '@material-ui/core'
import Course from './Course'
import shadows from '@material-ui/core/styles/shadows';
import { findByLabelText } from '@testing-library/react';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        boxShadow: "25px 25px 1px black",
        // backgroundColor: "#fafafa",
        cursor: "pointer",
    },
    list: {
        width: '100%',
        height: 400,
        overflow: 'auto',
        backgroundColor: 'ingerit',
    },
}));

export default function CourseList(props) {
    const classes = useStyles();

    return (
        <List className={classes.list}>
            {props.courses.map(course => <Course displayMode={props.displayMode} key={course._id} course={course} />)}
        </List>
    )
}