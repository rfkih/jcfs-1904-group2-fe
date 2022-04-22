import React, {useState, useEffect} from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, Button, useTheme} from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from '@mui/material'
import { Link } from 'react-router-dom'
import axios from '../../../../../utils/axios'
import useStyles from './styles.js'


function ProductAdmin({product, deletedProducts, deleteState, setDeleteState}) {
  const classes = useStyles();
  const [image ,setImage] = useState('https://pharmanewsintel.com/images/site/article_headers/_normal/Medicine.png')
  const [open, setOpen] = useState(false)


    useEffect(() => {
        if (product.productIMG) {
            setImage(product.productIMG)
        }
    },[])

  
    const handleClickOpen = () => {
      setOpen(true);
    }
  
    const handleClose = () => {
      setOpen(false)
    }
    

    
  const id = {id: product.id}
 
  const deleteProduct = () => {
    axios
    .put("/products", id)
    .then((res) => {
      setDeleteState(!deleteState)
      setOpen(false)
     })
     .catch((error) => console.log({ error }));
  }

  const undeleteProduct = () => {
    console.log(id)
    axios
    .put("/products/undelete", id)
    .then((res) => {
      alert(res.data.message);
      setDeleteState(!deleteState)
     })
     .catch((error) => console.log({ error }));
  }


  return (

    <>
      <Card sx={{ maxWidth: 300 }}>
        <CardMedia component="img"  height="140" image={image} alt="product Image"/>
          <CardContent>
            <Typography variant="body2">
                  Rp.{product.price}
            </Typography>
            <Typography className={classes.link} component={Link} to={`/products/${product.id}`} variant="subtitle2" gutterBottom>
                {product.productName}
            </Typography>
        </CardContent>
        <CardActions >
          <Button component={Link} to={`/editproducts/${product.id}`} variant='contained' color='primary' size="small">Edit</Button>
            {deletedProducts === false ? 
          <Button onClick={handleClickOpen} size="small" variant='contained' color="secondary">Delete</Button> :
          <Button onClick={undeleteProduct} size="small" variant='outlined' color="primary">Un-Delete</Button> }
        </CardActions>
      </Card>
      <div>
        <Dialog
         open={open}
         keepMounted
         onClose={handleClose}
         aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{`Do you want to delete ${product.productName}`}</DialogTitle>
          <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Deleting {product.productName} Means user cannot see or buy this product anymore!
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={deleteProduct}>Confirm</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions> 
        </Dialog>
      </div>
    </>
      
  )
}

export default ProductAdmin