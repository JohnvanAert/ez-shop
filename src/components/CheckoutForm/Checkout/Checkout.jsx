import React, { useState, useEffect } from 'react';
import {Paper, Stepper,Step,StepLabel,Typography,CircularProgress,Divider,Button,CssBaseline} from '@material-ui/core';
import useStyles from './style';
import {Link, useHistory} from 'react-router-dom';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import {commerce} from '../../../libs/commerce';
const steps = ['Адрес доставки', 'Детали оплаты'];

const Checkout = ({ cart, order,onCaptureCheckout, error}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const classes = useStyles();
    const [shippingData, setShippingData] = useState({});
    useEffect(() => {
        const generateToken = async () => {
            try{
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});

                setCheckoutToken(token);
            } catch (error) {
                console.log(error)
            }
        }

        generateToken();
    }, [cart]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setShippingData(data);
     
        nextStep();
    }

    let Confirmation = () => order.customer ? (
        <>
        <div>
            <Typography variant="h5">Спасибо за покупку, {order.customer.firstname}{order.customer.lastname}</Typography>
            <Divider className={classes.divider}/>
            <Typography variant="subtitle2"> Чек заказа: {order.customer_reference}</Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">На главную</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    );
    if (error) {
        <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">На главную</Button>
        </>
    }

    const Form = () => activeStep === 0 
    ? <AddressForm checkoutToken={checkoutToken} next={next}/>
    : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} nextStep={nextStep} onCaptureCheckout={onCaptureCheckout}/>
    
    return (
        <>
        <CssBaseline />
         <div className={classes.toolbar}/>   
         <main className={classes.layout}>
             <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Покупка</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
             </Paper>
         </main>
        </>
    )
}

export default Checkout
