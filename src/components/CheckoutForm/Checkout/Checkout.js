import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import { Link, useHistory } from 'react-router-dom';

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    
    const classes = useStyles();
    const history = useHistory();
    const steps = ['Shipping address', 'Payment details'];
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});

    //Checkout token generated & passed to AddressForm when checkout started
    //async can only be used in useEffect with separate function
    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                setCheckoutToken(token);
            } catch (error) {
                //Go back gome if error occurs on checkout
                // history.pushState('/');
            }
        }
        generateToken();
        //When cart changes, recall for new token
    }, [cart]);


    //While order confirmation is loading, show spinner
    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant="h5">Thank you for your order, {order.customer.firstname} {order.customer.lastname}!</Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Go back Home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    )

    if(error) {
        <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">Go back Home</Button>
        </>
    }


    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    
    //Pass function to Address Form
    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    const Form = () => activeStep === 0 
    ? <AddressForm checkoutToken={checkoutToken} next={next} />
    : <PaymentForm 
        shippingData={shippingData} 
        checkoutToken={checkoutToken} 
        nextStep={nextStep}
        backStep={backStep} 
        onCaptureCheckout={onCaptureCheckout}
    />
    
    return (
        <>
        {/* Mobile styles fix */}
        <CssBaseline />
        <div className={classes.toolbar} />
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Checkout</Typography>
                {/* Checkout steps using steps array & useState hook*/}
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {/* Check if on last step, else render Address or Payment created above */}
                {/* Only render Form if we have the checkout token */}
                {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
            </Paper>
        </main>
        </>
    )
}

export default Checkout

