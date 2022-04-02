import React, { useState, useEffect } from "react";
import {Card, Paper, CardMedia, Button,CardActionArea, Grid,Box,Input, CardContent, CardActions, Typography, TextField, InputLabel, Select, MenuItem} from '@material-ui/core';
import axios from '../../../../../utils/axios'
import { useParams } from "react-router-dom";


import useStyles from './styles';

function EditDetailProduct() {
    const classes = useStyles();
    const params = useParams();
    const [product, setProduct] = useState({});
    const [isEditImage, setIsEditImage ] = useState(false);
    const { id, category_id, productName, productDetails, productIMG, isLiquid, price } = product
    const [image, setImage] = useState(productIMG);
    const [selectedFile, setSelectedFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [isEditProductName, setIsEditProductName] = useState(false)
    const [isEditProductDetail, setIsEditProductDetail] = useState(false)
    const [isEditProductPrice, setIsEditProductPrice] = useState(false)
    const [isSave, setIsSave] = useState(false)
    

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
        if ([e.target.name] == "isLiquid" || [e.target.name] == "category_id") {
            setIsSave(false)
        }
    };


    const imageHandleChange = () => {
        setIsEditImage(!isEditImage)
    }
    const productNameHandleChange = () => {
        if (isEditProductName) {
            updateProduct();
        }
        setIsEditProductName(!isEditProductName)
        
    }
    const buttonHandleChange = () =>{
        updateProduct();
        setIsSave(true)
    }
    const productDetailHandleChange = () => {
        setIsEditProductDetail(!isEditProductDetail)
    }
    const productPriceHandleChange = () => {
        setIsEditProductPrice(!isEditProductPrice)
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
      };

      const fetchCategories = async () => {
        try {
            const res = await axios.get("/categories");
            const  categories = res
            const category = categories.data
            setCategories(category)
            
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    useState(() => {
        fetchCategories();
    },[]);

    

    const updateProduct = async () => {
        // parseInt(isLiquid)
        const updatedProduct = {
          id,
          category_id,
          productName,
          productDetails,
          productIMG,
          isLiquid,
          price,
        };

        console.log(updatedProduct);
      await axios
      .put(`/products/${params.productId}`, {updatedProduct, params: { id: params.productId } } )
      .then((res) => {
       alert(res.data.message);
       console.log( res.data ); 
      })
      .catch((error) => console.log({ error }));
  };

  
       



let choosenCategory = categories.filter(function (category) {
    return category.id === category_id
}).map(function(category) {
    return category.categoryName
})








 


  
      
  

    

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
                        <TextField  fullWidth name='productName' label='New Product Name' onInput={handleChange}  />
                        </Grid>
                        <Grid item xs={2}>
                            <Button onClick={productNameHandleChange} size="small">Save</Button>
                        </Grid>
                    </Grid>
                    }
                    {isEditProductDetail === false ? 
                    <Grid container spacing={2} >
                        <Grid item xs={8}>
                            <Typography>Product Detail: {productDetails}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Button size="small" onClick={productDetailHandleChange}>Edit</Button>
                        </Grid>
                    </Grid> : 
                    <Grid container spacing={2} >
                        <Grid item xs={8}>
                            <TextField  fullWidth multiline name='productDetails' label='New Product Detail' onInput={handleChange}  />
                        </Grid>
                        <Grid item xs={2}>
                            <Button size="small" onClick={productDetailHandleChange} >Save</Button>
                        </Grid>
                    </Grid>
                    }
                    {isEditProductPrice === false  ? 
                    <Grid container spacing={2} >
                        <Grid item xs={8}>
                            <Typography>Product Price: Rp.{price}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Button size="small" onClick={productPriceHandleChange}>Edit</Button>
                        </Grid>
                    </Grid> : 
                    <Grid container spacing={2} >
                        <Grid item xs={8}>
                        <TextField  fullWidth name='price' label='New Product Price' onInput={handleChange}  />
                        </Grid>
                        <Grid item xs={2}>
                            <Button size="small" onClick={productPriceHandleChange}>Save</Button>
                        </Grid>
                    </Grid>
                    }
                    
                    <Paper className={classes.paper} >
                        <Grid container spacing={2} >
                            <Grid item xs={8}>
                                <Typography>isLiquid ? : {isLiquid}  </Typography>   
                            </Grid>
                            <Grid item xs={2}>
                            <Select defaultValue="" name='isLiquid' onChange={handleChange} >
                                <MenuItem value='1'>Yes</MenuItem>
                                <MenuItem value='0'>No</MenuItem>
                            </Select>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Typography>Category : {choosenCategory[0]}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Select
                                defaultValue=""
                                name="category_id"
                                onChange={handleChange}
                            >
                        <MenuItem value="">Default</MenuItem>
                            {categories.map((category) => (
                                <MenuItem  key={category.id} value={category.id}>
                            {category.categoryName}
                            </MenuItem>
                        ))}
                        </Select>
                    </Grid>  
                    </Grid>
                    {isSave === false ?
                    <Button onClick={buttonHandleChange} size="small" color="primary">
                        Save
                    </Button> : 
                    <Button onClick={buttonHandleChange} size="small" color="primary">
                        Saved
                    </Button> }
                    
                    </Paper>
                   
                    

                      
                    
                    
                        
                    
                </Box>

             </Paper>
            </main>
        

    </>
  )
}

export default EditDetailProduct