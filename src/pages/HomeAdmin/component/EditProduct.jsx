import React from 'react'
import { Paper, Typography, Button} from '@material-ui/core'
import useStyles from './styles'
import AddProduct from './AddProduct/AddProduct'


function EditProduct() {
    const classes = useStyles();
  return (
    <>
        <div className={classes.toolbar}/>
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center"> AddProduct </Typography>
                <AddProduct/>
            </Paper>
        </main>
    </>
  )
}

export default EditProduct