import React from 'react';
import {Loader, TailSpin} from 'react-loader-spinner';
import { Grid, Paper, Box, Container, Typography } from "@material-ui/core";

import useStyles from './styles'

 

function Spinner({message}) {
    const classes = useStyles();
  return (

    <Container className={classes.layout}>
        <div className={classes.toolbar}/>
        <Grid 
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <div className='flex flex-col justify-center items-center w-full h-full'>
            <TailSpin
                type="Circles"
                color="#00BFFF"
                height={50}
                width={200}
                className="m-5 "
            />
            <p className='text-lg text-center px-2'>{message}</p>
            </div>

        </Grid>
        
    </Container>
  )
}

export default Spinner