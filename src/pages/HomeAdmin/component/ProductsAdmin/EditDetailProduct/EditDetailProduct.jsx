import React, { useState, useEffect } from "react";
import {Card, Paper, CardMedia, Button,CardActionArea, Grid,Box,Input, CardContent, CardActions, Typography, TextField,} from '@material-ui/core';
import axios from '../../../../../utils/axios'
import { useParams } from "react-router-dom";


import useStyles from './styles';

function EditDetailProduct() {
    const classes = useStyles();
    const params = useParams();
    const [product, setProduct] = useState({});
    const [isEditImage, setIsEditImage ] = useState(false);
    const [image, setImage] = useState(product.productIMG);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isEditProductName, setIsEditProductName] = useState(false)

    const { id, category_id, productName, productDetails, productIMG, isLiquid, price } = product


    const imageHandleChange = () => {
        setIsEditImage(!isEditImage)
    }

    const productNameHandleChange = () => {
        setIsEditProductName(!isEditProductName)
    }

    useEffect(() => {
        axios
          .get(`/products/${params.productId}`,{ params: { id: params.productId } } )
          .then((res) => {
            setProduct(res.data[0]);
          })
          .catch((err) => {
            console.log({ err });
          });
      }, []);

      const fileSelectedHandler = (e) => {
        let uploaded = e.target.files[0]
        setImage(URL.createObjectURL(uploaded))
        setSelectedFile(uploaded)
      }

      const fileUploadHandler = () => {
        if(!selectedFile){
          alert("upload image first")
        }else{
            imageHandleChange();
          const fd = new FormData();
          fd.append("productPhoto", selectedFile)
  
          axios.post("/products/upload", fd)
          .then((res) => {
            const productIMG = res.data.image  
            setProduct({ ...product, productIMG })
            })
          .catch((error) => console.log({ error }));
        } 
      }

  return (
    <>
        <div className={classes.toolbar}/>
        <main className={classes.layout}>
                <Paper className={classes.paper} >
                    {isEditImage === false ?
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="200"
                                image={productIMG}
                                alt="product Image"
                            />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Edit Product Image
                            </Typography>
                            <Typography variant="body2">
                                {productName}
                            </Typography>
                        </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button onClick={imageHandleChange} size="small" color="primary">
                                Click to Edit
                            </Button>
                        </CardActions>
                    </Card> : 
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="200"
                                image={productIMG}
                                alt="product Image"
                            />
                        <CardContent>   
                        <Typography variant="body2" >
                            {productName}
                        </Typography>
                        <Input
                        type="file"
                        onChange={fileSelectedHandler}       
                            />
                        </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button onClick={fileUploadHandler} size="small" color="primary">
                                Save
                            </Button>
                        </CardActions>
                    </Card> }   
             </Paper>
             <Paper className={classes.paper} >
                <Typography variant="h4" align="center"> Edit Product </Typography>
                <Box sx={{ flexGrow: 1 }}>
                    {isEditProductName === false ? 
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Typography variant="body1" gutterBottom >Product Name: {productName}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Button onClick={productNameHandleChange} size="small">Edit</Button>
                        </Grid>
                    </Grid> :
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                        <TextField  fullWidth name='productName' label='Product Name'  />
                        </Grid>
                        <Grid item xs={2}>
                            <Button onClick={productNameHandleChange} size="small">Save</Button>
                        </Grid>
                    </Grid>
                    }
                    
                    <Grid container spacing={2} >
                        <Grid item xs={8}>
                            <Typography>Product Detail: {productDetails}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Button size="small">Edit</Button>
                        </Grid>
                    </Grid>
                        
                    
                </Box>

             </Paper>
            </main>
        

    </>
  )
}

export default EditDetailProduct