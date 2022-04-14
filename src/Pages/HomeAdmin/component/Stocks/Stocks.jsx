import React from 'react'
import { Paper, Typography, Button, Container} from '@material-ui/core'
import useStyles from './style'


function Stocks() {
const classes = useStyles();
  return (
    <Container>
        <div className={classes.toolbar}/>
        <Typography>Wooow</Typography>
    </Container>
  )
}

export default Stocks