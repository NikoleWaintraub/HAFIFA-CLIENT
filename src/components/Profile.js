import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles, Grid } from '@material-ui/core';
import { datePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function Profile(props) {
    const currUser = props.user
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            {
                currUser
                    ?
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image='../static/img/littleMe.jpg'
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {currUser[0].name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {currUser[0].status}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {currUser[0].birthday}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {currUser[0].personalNum}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                    :
                    null
            }
        </Card>
    )
}