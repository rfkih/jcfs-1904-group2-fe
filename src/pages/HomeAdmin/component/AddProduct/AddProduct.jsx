import React, {useState, useEffect} from 'react'
import { TextField, Paper, InputLabel, Select, MenuItem, Button, OutlinedInput, styled,  Grid, CardMedia, CardContent, CardActions, Card, Typography, Input, Container, FormControl} from '@material-ui/core'
import InputAdornment from '@mui/material/InputAdornment';
import axios from '../../../../utils/axios'
import { makeStyles } from "@material-ui/core/styles";
import {useSelector} from 'react-redux'
import useStyles from './styles.js'


function AddProduct() {
    const classes = useStyles();
    const data = useSelector((state) => {
      return state.auth;
    });  

    
    const [image, setImage] = useState("https://fakeimg.pl/350x200/");
    const [category, setCategory] = useState([]);
    const [formState, setFormState] = useState({
        category_id: 0,
        productName: "",
        productDetails: "",
        productIMG: "",
        isLiquid: false,
        isDeleted: 0,
        price: "",
    });
    const [stockFormState, setStockFormState] = useState({
      product_id: 0,
      qtyBoxAvailable: 0,
      qtyBoxTotal: 0,
      qtyBottleAvailable: 0,
      qtyBottleTotal: 0,
      qtyStripsavailable: 0,
      qtyStripsTotal: 0,
    })
    const [selectedFile, setSelectedFile] = useState(null);

    const stockHandleChange = (e) => {
      
      setStockFormState({ ...stockFormState, [e.target.name]: e.target.value });
    };

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
      };

    const fileSelectedHandler = (e) => {
      let uploaded = e.target.files[0]
      setImage(URL.createObjectURL(uploaded))
      setSelectedFile(uploaded);
    }


    const fileUploadHandler = () => {
      if(!selectedFile){
        alert("Upload Image First")
      }else{
        const fd = new FormData();
        fd.append("productPhoto", selectedFile)
        axios.post("/products/upload", fd)
        .then((res) => {
          const productIMG = res.data.image  
          setFormState({ ...formState, productIMG })
          alert("Image Uploaded")
          })
        .catch((error) => console.log({ error }));
      } 
    }
    useEffect(() => {
      if (selectedFile) {
        fileUploadHandler();
      }
    },[selectedFile])
  
    
    
    const fetchCategories = async () => {
        try {
            const res = await axios.get("/categories");
            const  categories = res
            const category = categories.data
            setCategory(category)
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    useEffect(() => {
      fetchCategories();
    }, []);

    const addNewProduct = async () => {
        
        const { category_id, productName, productDetails, productIMG, isLiquid, isDeleted, price } =
          formState;
        const { product_id, qtyBoxAvailable, qtyBoxTotal, qtyBottleAvailable, qtyBottleTotal, qtyStripsavailable, qtyStripsTotal} = stockFormState
        
        const newProduct = {
          category_id,
          productName,
          productDetails,
          productIMG,
          isLiquid,
          isDeleted,
          price,
        };

        const newStock = {
          product_id,
          qtyBoxAvailable,
          qtyBoxTotal:  qtyBoxAvailable,
          qtyBottleAvailable,
          qtyBottleTotal: qtyBottleAvailable,
          qtyStripsavailable,
          qtyStripsTotal: qtyStripsavailable
        }
        
      await axios
      .post("/products", { userId: data.id , username: data.username, newProduct, newStock} )
      .then((res) => {
       alert(res.data);
        window.location.reload()
      })
      .catch((error) => console.log({ error }));
  };
  
  
  return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper >
              <Typography variant="h4" align="center"> Upload image here </Typography>
              <form > 
                <Card className={classes.upload}>
                  <CardMedia
                    component="img"
                    height="270"
                    image={image}
                    alt="..."
                  />
                  <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                          Product Image
                      </Typography>
                      
                  </CardContent>
                  
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
              </form>          
            </Paper>
          </Grid>
          <Grid item xs={6}>
          <Paper className={formState.isLiquid ? classes.textActive : classes.text} >
            <Container>
              
            
            <Typography variant="h4" align="center"> Add Product </Typography>
            <Typography variant="h6" gutterBottom> Add New Product</Typography>
        
            <form > 
              <Grid container spacing={2}>
                <Grid container direction="column" justifyContent='space-between' alignItems='stretch' item xs={9}>
                  <TextField className={classes.content} fullWidth  name='productName' label='Product Name'  onInput={handleChange}/>
                  <TextField className={classes.content} fullWidth multiline name='productDetails' label='Product Detail'  onInput={handleChange}/>
                  <FormControl className={classes.content} >
                  <InputLabel  htmlFor="price">Price</InputLabel>
                  <Input   
                  id="price"
                  size='small'
                  name='price' 
                  label='Price' 
                  startAdornment={<InputAdornment position="start" >Rp.</InputAdornment>}
                  onInput={handleChange}/>
                </FormControl>
                </Grid>
                    <Grid item xs={6} sm={6}>
                        <InputLabel>Liquid ?</InputLabel>
                        <Select 
                        displayEmpty
                        defaultValue="" name='isLiquid' onChange={handleChange} >
                        <MenuItem value="">Choose</MenuItem>
                        <MenuItem value='1'>Yes</MenuItem>
                        <MenuItem value='0'>No</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <InputLabel>Category</InputLabel>
                            <Select
                              displayEmpty
                              defaultValue=""
                              name="category_id"
                              onChange={handleChange}
                            >
                            <MenuItem value="">Choose</MenuItem>
                            {category.map((category) => (
                            <MenuItem  key={category.id} value={category.id}>
                            {category.categoryName}
                            </MenuItem>
                        ))}
                        </Select>
                    </Grid>
                </Grid>
                  <Typography   variant="h6" gutterBottom> Input Stocks</Typography>
                    {formState.isLiquid && 
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <TextField size='small' variant="outlined" name='qtyBoxAvailable' label='Input Box' onChange={stockHandleChange}/>
                      </Grid>
                    {formState.isLiquid == 1 ? <>
                      <Grid item xs={6}>  
                        <TextField size='small' variant="outlined" name='qtyBottleAvailable' label='Input Bottle'onInput={stockHandleChange}/>
                      </Grid> 
                    </> : <>
                      <Grid item xs={6}>
                        <TextField size='small' variant="outlined"  name='qtyStripsavailable' label='Input Strip'onInput={stockHandleChange}/>
                      </Grid>
                    </>             
                    }  
                  </Grid>}
                    <br/>
                  <CardActions>
                    <Button  variant="contained" color="primary" onClick={addNewProduct} >Add New Product </Button>
                  </CardActions>
                </form>  
              </Container>  
            </Paper>
          </Grid>
        </Grid>  
    </Container>
       
    
  )
}

export default AddProduct