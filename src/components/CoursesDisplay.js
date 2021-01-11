import React from 'react'
import { List, Grid, ListItem, Tooltip, IconButton } from '@material-ui/core'
import moment from 'moment'
import InfoIcon from '@material-ui/icons/Info';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    list: {
        height: 'innerHeight',
        overflow: 'auto',
        backgroundColor: 'ingerit',
    },
}));

export default function CoursesDisplay(props) {
    const { courses, handleRemove, ...other } = props;
    const classes = useStyles();
    return (
        // <List className={classes.list} >
        <Grid container>
            {
                courses.map(course => {
                    return (
                        <ListItem key={course._id} style={{ backgroundColor: "white" }}>
                            <Grid item xs={1}>
                                {
                                    handleRemove
                                        ?
                                        <IconButton onClick={() => handleRemove(course._id)} style={{ paddingTop: 20 }}>
                                            <HighlightOffIcon />
                                        </IconButton>
                                        :
                                        null
                                }
                            </Grid>
                            <Grid item xs={5}>
                                <h3 style={{ textAlign: "right" }}>
                                    {course.name}
                                    <div style={{ textAlign: "right", fontSize: 'small', paddingBottom: '15px' }}>
                                        {moment(course.date.substring(0, 10)).format('DD/MM/YYYY')}
                                    </div>
                                </h3>
                            </Grid>
                            <Grid item xs={4}>
                                <div className="gmush" style={{
                                    textAlign: "right",
                                    paddingTop: 20
                                }}>
                                    {course.gmush} שעות
                                </div>
                            </Grid>
                            <Grid item xs={1}>
                                <Tooltip title={course.description}>
                                    <InfoIcon color="primary" style={{ paddingTop: 20 }} />
                                </Tooltip>
                            </Grid>
                        </ListItem>
                    )
                })
            }
        </Grid>
        // </List >
    )
}