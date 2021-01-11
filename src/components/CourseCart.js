import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Alert from '@material-ui/lab/Alert';
import CoursesDisplay from './CoursesDisplay'
import { Button, Fab, Badge, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { useCart, useRemoveItem, usePurchase } from '../context/CartContext'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Collapse
} from '@material-ui/core';
import { MoodBad } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "rgb(195, 195, 236)",
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        // top: '50%',
        // left: '50%',
        // marginTop: -12,
        // marginLeft: -12,
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'center',
    }
}))

export default function CourseCart(props) {
    const coursesCart = useCart()
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false)
    const [cartCount, setCartCount] = useState(0)
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();

    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 3000);
        }
    };

    // Remove and purchase functions
    const removeItem = useRemoveItem()
    const purchase = usePurchase()

    const clearCart = () => {
        coursesCart.forEach(element => {
            removeItem(element._id)
        });
    }

    const handleRemove = (courseId) => {
        removeItem(courseId)
    }

    const purchaseAll = () => {
        const pernum = '8456304'

        purchase(pernum)
        if (coursesCart.length) {
            setSuccess(true)
            // handleButtonClick()
        }
    }

    return (
        <div>
            <IconButton onClick={() => setIsOpen(true)}>
                <Badge badgeContent={coursesCart.length} color="secondary">
                    <Fab color="secondary" aria-label="edit">
                        <AddShoppingCartIcon />
                    </Fab>
                </Badge>
            </IconButton>

            <Dialog fullWidth={true} open={isOpen} onClose={() => setIsOpen(false)} aria-labelledby="form-dialog-title">
                <DialogTitle>סלסלת קורסים</DialogTitle>
                <DialogContent>
                    {
                        coursesCart.length > 0
                            ?
                            <CoursesDisplay courses={coursesCart} handleRemove={handleRemove} />
                            :
                            <div style={{ textAlign: 'center' }}>
                                <h2>הסלסלה ריקה</h2>
                                <MoodBad />
                            </div>
                    }
                </DialogContent>
                <DialogActions style={{ justifyContent: 'space-around' }}>
                    <Button onClick={() => setIsOpen(false)} color="primary">סגור</Button>
                    {
                        coursesCart.length
                            ?
                            <div style={{ justifyContent: 'space-around' }}>
                                <IconButton onClick={purchaseAll}>
                                    <Fab style={{ color: 'green' }} aria-label="add">
                                        <ShoppingCartIcon />
                                    </Fab>
                                </IconButton>
                                <IconButton onClick={clearCart}>
                                    <Fab color="secondary" aria-label="edit">
                                        <DeleteForeverIcon />
                                    </Fab>
                                </IconButton>
                            </div>
                            :
                            null
                    }
                </DialogActions>
                {/* <Collapse in={isPurchased}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setPurchased(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        ווהוווו יש לך עוד קורסים!
                    </Alert>
                </Collapse> */}
            </Dialog>
        </div >
    )
}