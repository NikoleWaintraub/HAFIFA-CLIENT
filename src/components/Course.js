import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import moment from 'moment'
import { useAddItem } from '../context/CartContext'
import { useCart } from '../context/CartContext'
import { ListItem, Tooltip, Grid, Checkbox, InputLabel, Select, MenuItem } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info';

export default function Course(props) {
    const [isChecked, setChecked] = useState(false);
    const [courseDate, setCourseDate] = useState(new Date())
    const coursesCart = useCart()
    const addToCart = useAddItem()

    useEffect(() => {
        if (coursesCart.filter(course => course.name === props.course.name).length > 0)
            setChecked(true)
        else
            setChecked(false)
    },
        [coursesCart])

    //Adding to cart and disabling course checkbox
    const handleChosenCourse = (event) => {
        setChecked(event.target.checked)
        if (event.target.checked) {
            addToCart({
                name: props.course.name,
                courseId: props.course._id,
                description: props.course.description,
                gmush: props.course.gmush,
                date: courseDate
            })
        }
    }

    return (
        <div className="listItem">
            <ListItem style={{ backgroundColor: "white" }}>
                <Grid container>
                    <Grid item xs={1}>
                        <Checkbox
                            checked={isChecked}
                            disabled={courseDate | isChecked}
                            onChange={event => handleChosenCourse(event)}
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            style={{ paddingTop: 20 }}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <h3 style={{ textAlign: "right" }}>
                            {props.course.name}
                        </h3>
                        <div style={{ textAlign: "right" }}>
                            <InputLabel id="demo-simple-select-label">
                                מתי?
                        </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={courseDate}
                                disabled={isChecked}
                                onChange={event => setCourseDate(event.target.value)}>
                                {props.course.dates.map(date => {
                                    const formated = moment(date.substring(0, 10)).format('DD/MM/YYYY')
                                    return <MenuItem value={date}>{formated}</MenuItem>
                                })}
                            </Select>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className="gmush" style={{
                            textAlign: "right",
                            paddingTop: 45
                        }}>
                            {props.course.gmush} שעות
                        </div>
                    </Grid>
                    <Grid item xs={1}>
                        <Tooltip title={props.course.description}>
                            <InfoIcon color="primary" style={{ paddingTop: 45 }} />
                        </Tooltip>
                    </Grid>
                </Grid>
            </ListItem>
        </div >
    )
}