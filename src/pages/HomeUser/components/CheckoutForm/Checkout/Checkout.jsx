import React, {useState, useEffect} from 'react'
import { Grid, Box, Container, Step, Stepper, Paper, Button, StepLabel, Typography } from "@material-ui/core";
import useStyles from './styles.js'
import {useSelector} from 'react-redux'
import Address from '../Address'
import Payment from '../Payment'
import {Link} from 'react-router-dom'

function Checkout() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Shipping address', 'Payment details']
    const {id, role} = useSelector((state) => {
      return state.auth;
    });

    console.log("active", activeStep);
    console.log("length", steps.length);

    const Confirmation = () => (
      <div>
          Confirmation
      </div>
    );

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)


    const Form = () => activeStep === 0 
    ? <Address />
    : <Payment />


  return (
    <Container> 
        <div className={classes.toolbar}/>
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center"> Checkout </Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation/> : <Form/>}
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <Button variant="outlined" onClick={backStep}> Back to Cart </Button>
                    <Button type="submit" variant="contained" color="primary" onClick={nextStep}> Next </Button>
                </div>
            </Paper>
        </main>
            

    </Container>
  )
}

export default Checkout