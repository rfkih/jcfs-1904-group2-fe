import React from 'react'
import { Grid, Box, Container, Typography } from "@material-ui/core";
import useStyles from './styles.js'

function Checkout() {
    const classes = useStyles();
  return (
    <Container>
        <div className={classes.toolbar}/>
        <Typography>Checkout Form</Typography>

    </Container>
  )
}

export default Checkout