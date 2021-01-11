import React, { useState, m } from 'react'
import { TextField,makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

export default function SearchBar(props) {
    const [name, setName] = useState('');
    const [dateField, setDateField] = useState('');
    const classes = useStyles();
    return (
        <form className={classes.root}>
            <TextField value={name} onChange={event => setName(event.target.value)} id="standard-basic" label=" שם קורס..." />
            <TextField
                id="date"
                label="תאריך..."
                type="date"
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </form>
    )
}