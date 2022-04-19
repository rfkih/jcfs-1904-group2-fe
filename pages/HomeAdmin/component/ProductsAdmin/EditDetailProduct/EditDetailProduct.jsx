import React, { useState, useEffect } from "react";
import {Card, Paper, CardMedia, Button,CardActionArea, Grid, Box, Input, Container, CardContent, CardActions, Typography, TextField, Select, MenuItem} from '@material-ui/core';
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
    const [isEditStock, setIsEditStock] = useState(false)
    const [isSave, setIsSave] = useState(false)
    const [stocks, setStocks] = useState({
        product_id: null,
        qtyBoxAvailable: null,
        qtyBoxTotal: null,
        qtyBottleAvailable: null,
        qtyBottleTotal: null,
        qtyMlAvailable: null,
        qtyMlTotal: null,
        qtyStripsavailable: null,
        qtyStripsTotal: null,
        qtyMgAvailable: null,
        qtyMgTotal: null
    })
    const [onCancelData, setOnCancelData] = useState([])
    const [onCancelStock, setOnCancelStock] = useState([])
    const [calculatedStock, setCalculatedStock] = useState({})
    const { product_id, qtyBoxAvailable, qtyBoxTotal, qtyBottleAvailable, qtyBottleTotal, qtyMlAvailable, qtyMlTotal, qtyStripsavailable,qtyStripsTotal, qtyMgAvailable, qtyMgTotal } = stocks
    
    console.log(onCancelStock);


    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
        if ([e.target.name] == "isLiquid" || [e.target.name] == "category_id") {
            setIsSave(false)
            if ([e.target.name] == "isLiquid") {
                setIsEditStock(false)
            }          
        }
    };

    const stockHandleChange = (e) => {
        setStocks({ ...stocks, [e.target.name]: e.target.value });
        
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
    const productNameCancelHandle = () => {
        if(isEditProductName) {
            setProduct({ ...product, productName: onCancelData.productName})
            setIsEditProductName(false)
        }
        setIsEditProductName(!isEditProductName)
    }

    const buttonHandleChange = () =>{
        if (isEditStock === true) {
            setIsEditStock(false)
        }
        updateProduct();
        setIsSave(true)
    }
    const productDetailHandleChange = () => {
        if (isEditProductDetail) {
            updateProduct();
        }
        setIsEditProductDetail(!isEditProductDetail)
    }
    const productDetailCancelHandle = () => {
        if (isEditProductDetail) {
            setProduct({ ...product, productDetails: onCancelData.productDetails})
            setIsEditProductDetail(false)
        }
        setIsEditProductDetail(!isEditProductDetail)

    }

    const productPriceHandleChange = () => {
        if (isEditProductPrice) {
            updateProduct();
            
        }
        setIsEditProductPrice(!isEditProductPrice)
    }

    const productPriceCancelHandle = () => {
        if (isEditProductPrice) {
            setProduct({ ...product, price: onCancelData.price})
            setIsEditProductPrice(false) 
        }
        setIsEditProductPrice(!isEditProductPrice)
    }

    const editStockHandleChange = () => {
        if (isEditStock) {
            updateStocks();
        }  
        setIsEditStock(!isEditStock)
    }

    const editStockCancelHandle = () => {
        if (isEditStock) {
            setStocks({ ...stocks, 
                qtyBoxAvailable: onCancelStock.qtyBoxAvailable,
                qtyBoxTotal: onCancelStock.qtyBoxTotal,
                qtyBottleAvailable: onCancelStock.qtyBottleAvailable,
                qtyBottleTotal: onCancelStock.qtyBottleTotal,
                qtyStripsavailable: onCancelStock.qtyStripsavailable,
                qtyStripsTotal: onCancelStock.qtyStripsTotal,
                qtyMgAvailable: onCancelStock.qtyMgAvailable,
                qtyMgTotal: onCancelStock.qtyMgTotal,
                qtyMlAvailable: onCancelStock.qtyMlAvailable,
                qtyMlTotal: onCancelStock.qtyMlTotal  });
            setIsEditStock(false)
        }  
        setIsEditStock(!isEditStock)
    }

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


    const fetchProducts = async () => {

        try {
            const res = await axios.get(`/products/${params.productId}`,{ params: { id: params.productId } } )
            const {data} = res
            setProduct(data.result[0]);
            setOnCancelData(data.result[0])
            
        } catch (err) {
        console.log({ err });
            
        }
    }

    useEffect(() => {
        fetchProducts();
    },[])



      const fileSelectedHandler = (e) => {
        let uploaded = e.target.files[0]
        setImage(URL.createObjectURL(uploaded))
        setSelectedFile(uploaded)
      }

      useEffect(() => {
        if (selectedFile) {
          fileUploadHandler();
        }
      },[selectedFile])

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
            setIsSave(false)
            alert("image uploaded")
            })
          .catch((error) => console.log({ error }));
        } 
      };


    

    const fetchStocks = async () => {
        try {
            const res = await axios.get(`/stocks/${params.productId}`,{ params: { id: params.productId } } );
            const { data } = res;
            setStocks(data.result[0]);
            setCalculatedStock(data.calculatedStock);
            setOnCancelStock(data.result[0])
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    useState(() => {
        fetchStocks();
    }, [] )

   

    const updateProduct = async () => {
        
        const updatedProduct = {
          id,
          category_id,
          productName,
          productDetails,
          productIMG,
          isLiquid,
          price,
        };

       
      await axios
      .put(`/products/${params.productId}`, {updatedProduct, params: { id: params.productId } } )
      .then((res) => {
        fetchProducts();
        alert(res.data.message);
      })
      .catch((error) => console.log({ error }));
  };

  const updateStocks = async () => {
    
    let updatedStocks = {
        qtyBoxAvailable, qtyBoxTotal, qtyBottleAvailable, qtyBottleTotal, qtyMlAvailable, qtyMlTotal, qtyStripsavailable,qtyStripsTotal, qtyMgAvailable, qtyMgTotal
    };

    if (isLiquid) {
        updatedStocks = {
            qtyBoxAvailable, qtyBoxTotal, qtyBottleAvailable, qtyBottleTotal, qtyMlAvailable, qtyMlTotal, qtyStripsavailable: null, qtyStripsTotal: null, qtyMgAvailable: null, qtyMgTotal: null
        };
        
    } else {
        updatedStocks = {
            qtyBoxAvailable, qtyBoxTotal, qtyBottleAvailable: null, qtyBottleTotal: null, qtyMlAvailable: null, qtyMlTotal: null, qtyStripsavailable,qtyStripsTotal, qtyMgAvailable, qtyMgTotal
        };
        
    }

    const stockLiquidNew = parseInt(qtyBottleAvailable)  + parseInt(qtyBoxAvailable * 10)
    const stockNonLiquidNew = parseInt(qtyStripsavailable) + parseInt(qtyBoxAvailable * 10)

    const newCalculatedStock = {stockLiquidNew , stockNonLiquidNew}
  await axios
  .put(`/stocks/${params.productId}`, {updatedStocks, isLiquid, newCalculatedStock,  prevStock: calculatedStock, params: { id: params.productId } } )
  .then((res) => {
   alert(res.data.message);
   fetchStocks();
   console.log(res.data); 
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
            <Container>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
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
                                            
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Input
                                            className={classes.input}
                                            id="upload-file"
                                            type="file"
                                            onChange={fileSelectedHandler} 
                                        /> 
                                        <label htmlFor='upload-file'>
                                            <Button variant="contained" component="span" >                  
                                                Upload Image
                                            </Button>  
                                        </label>                                        
                                    </CardActions>                                    
                                </Card> 
                            }   
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
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
                                            <TextField  fullWidth  placeholder={productName} name='productName' label='New Product Name' onInput={handleChange}  />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Button onClick={productNameHandleChange} size="small">Save</Button>
                                            <Button onClick={productNameCancelHandle} size="small"> Cancel </Button>
                                        </Grid>
                                    </Grid>
                                }
                                {isEditProductDetail === false ? 
                                    <Grid container spacing={2} >
                                        <Grid item xs={8}>
                                            <Typography>Product Detail: {productDetails}</Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Button size="small" onClick={productDetailHandleChange}>Edit</Button>
                                            
                                        </Grid>
                                    </Grid> : 
                                    <Grid container spacing={2} >
                                        <Grid item xs={8}>
                                            <TextField  fullWidth multiline name='productDetails' label='New Product Detail' onInput={handleChange}  />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Button size="small" onClick={productDetailHandleChange} >Save</Button>
                                            <Button size="small" onClick={productDetailCancelHandle}> Cancel </Button>
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
                                            <TextField  fullWidth name='price' placeholder={price} label='New Product Price' onInput={handleChange}  />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Button size="small" onClick={productPriceHandleChange}>Save</Button>
                                            <Button size="small" onClick={productPriceCancelHandle}> Cancel </Button>
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
                    {isEditStock === false ? 
                        <Button onClick={editStockHandleChange} size="medium" color="primary"> Edit Stock </Button>
                        :
                        <Grid container spacing={2}>
                            <Grid  xs={5}>
                                <TextField id="outlined-textarea" name='qtyBoxAvailable'  label="Box Available"  placeholder={qtyBoxAvailable} onInput={stockHandleChange} />
                            </Grid>
                            <Grid  xs={5}>
                                <TextField id="outlined-textarea" name='qtyBoxTotal'  label="Box Total"  placeholder={qtyBoxTotal} onInput={stockHandleChange} />
                            </Grid>
                        {isLiquid === 1 ?
                         <>
                            <Grid xs={5}>
                                <TextField id="outlined-textarea" name='qtyBottleAvailable'  label="Bottle Available"  placeholder={`${qtyBottleAvailable}`} onInput={stockHandleChange} />
                            </Grid>
                            <Grid xs={5}>
                                <TextField id="outlined-textarea" name='qtyBottleTotal'  label="Bottle Total"  placeholder={`${qtyBottleTotal}`} onInput={stockHandleChange} />
                            </Grid>
                            <Grid xs={5}>
                                <TextField id="outlined-textarea" name='qtyMlAvailable'  label="Ml Available"  placeholder={`${qtyMlAvailable}`} onInput={stockHandleChange} />
                            </Grid>
                            <Grid xs={5}>
                                <TextField id="outlined-textarea" name='qtyMlTotal'  label="Ml Total"  placeholder={`${qtyMlTotal}`} onInput={stockHandleChange} />
                            </Grid>
                            <Grid xs={2}d>
                                <Button onClick={editStockHandleChange} size="medium" color="primary"> Save </Button>
                                <Button onClick={editStockCancelHandle} size="medium" color="secondary"> Cancel </Button>
                            </Grid>
                         </> : 
                         <>
                            <Grid xs={5}>
                                <TextField id="outlined-textarea" name='qtyStripsavailable'  label="Strips Available"  placeholder={qtyStripsavailable} onInput={stockHandleChange} />
                            </Grid>
                            <Grid xs={5}>
                                <TextField id="outlined-textarea" name='qtyStripsTotal'  label="Strips Total"  placeholder={qtyStripsTotal} onInput={stockHandleChange} />
                            </Grid>
                            <Grid xs={5}>
                                <TextField id="outlined-textarea" name='qtyMgAvailable'  label="Mg Available"  placeholder={qtyMgAvailable} onInput={stockHandleChange} />
                            </Grid>
                            <Grid xs={5}>
                                <TextField id="outlined-textarea" name='qtyMgTotal'  label="Mg Total"  placeholder={qtyMgTotal} onInput={stockHandleChange} />
                            </Grid>
                            <Grid xs={2}d>
                                <Button onClick={editStockHandleChange} size="medium" color="primary"> Save </Button>
                                <Button onClick={editStockCancelHandle} size="medium" color="secondary"> Cancel </Button>
                            </Grid>
                            
                            
                            </>
                            }  
                            </Grid>   
                            }
                        </Paper>
                    </Grid>
                </Grid>     
            </Container>
    </>
  )
}

export default EditDetailProduct