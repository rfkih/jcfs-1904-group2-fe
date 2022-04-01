import React, {useState, useEffect} from 'react'
import { TextField, Paper, InputLabel, Select, MenuItem, Button, Grid, CardMedia, CardContent, CardActions, Card, Typography, Input} from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form';
import axios from '../../../../utils/axios'
import useStyles from './styles'

function AddProduct() {
    const classes = useStyles();
    const methods = useForm();
    const [image, setImage] = useState("https://fakeimg.pl/350x200/");
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState('Choose State');
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
      product_id: null,
      qtyBoxAvailable: null,
      qtyBoxTotal: null,
      qtyBottleAvailable:null,
      qtyBottleTotal: null,
      qtyStripsavailable: null,
      qtyStripsTotal: null,
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
      setSelectedFile(uploaded)
    }


    const fileUploadHandler = () => {
      if(!selectedFile){
        alert("upload image first")
      }else{
        const fd = new FormData();
        fd.append("productPhoto", selectedFile)

        axios.post("/products/upload", fd)
        .then((res) => {
          const productIMG = res.data.image  
          setFormState({ ...formState, productIMG })
          })
        .catch((error) => console.log({ error }));
      } 
    }
    
    
    const fetchCategories = async () => {
        try {
            const res = await axios.get("/categories");
            const  categories = res
            const category = categories.data
            setCategory(category)
        } catch (error) {
            // console.log(alert(error.message));
        }
    };

    useEffect(() => {
      fetchCategories();
    }, []);

    const addNewProduct = async () => {
        
        const { category_id, productName, productDetails, productIMG, isLiquid, isDeleted, price } =
          formState;
        const { product_id, qtyBoxAvailable, qtyBoxTotal, qtyBottleAvailable, qtyBottleTotal, qtyStripsavailable, qtyStripsTotal} = stockFormState
        

        parseInt(isLiquid)
        
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
          qtyBoxTotal,
          qtyBottleAvailable,
          qtyBottleTotal,
          qtyStripsavailable,
          qtyStripsTotal
        }

        
        

      await axios
      .post("/products", {newProduct, newStock} )
      .then((res) => {
       alert(res.data);
       console.log( res );
      //  setStockFormState({ ...stockFormState, product_id: res.data.productId });
       
      })
      .catch((error) => console.log({ error }));
  };

    

      
  // const addNewStock = () => {
  //   const { product_id, qtyBoxAvailable, qtyBoxTotal, qtyBottleAvailable, qtyBottleTotal, qtyStripsavailable, qtyStripsTotal} = stockFormState
  //   parseInt(product_id, 10)
  //   product_id ++
  //   const newStock = {
  //     product_id,
  //     qtyBoxAvailable,
  //     qtyBoxTotal,
  //     qtyBottleAvailable,
  //     qtyBottleTotal,
  //     qtyStripsavailable,
  //     qtyStripsTotal
  //   }
  //   console.log(product_id);
  //   axios
  //   .post("/stocks", newStock)
  //   .then((res) => {
  //     alert(res.data.message);
  //    })
  //    .catch((error) => console.log({ error }));
  // }
     

  
  return (
      <>
        {/* <h1>{stockFormState.product_id}</h1> */}
       <Paper className={classes.paper} >
        <Typography variant="h4" align="center"> Upload image here </Typography>
          <form > 
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={image}
                    alt="..."
                  />
                  <CardContent>
                      <Input
                        type="file"
                        onChange={fileSelectedHandler}
                      />
                     <Typography gutterBottom variant="h5" component="div">
                          Product Image
                     </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={fileUploadHandler} >Upload Image </Button>
                  </CardActions>
                </Card>
            </form>          
        </Paper>

      <Paper className={classes.paper} >
        <Typography variant="h4" align="center"> Add Product </Typography>
        <Typography variant="h6" gutterBottom> Add New Product</Typography>
        
          <form > 
            <Grid container spacing={3}>
                <TextField  fullWidth name='productName' label='Product Name'  onInput={handleChange}/>
                <TextField fullWidth name='productDetails' label='Product Detail'  onInput={handleChange}/>
                <TextField fullWidth name='price' label='Price'  onInput={handleChange}/>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Liquid ?</InputLabel>
                    <Select defaultValue="" name='isLiquid' onChange={handleChange} >
                    <MenuItem value='1'>Yes</MenuItem>
                    <MenuItem value='0'>No</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Category</InputLabel>
                        <Select
                            defaultValue=""
                            name="category_id"
                            onChange={handleChange}
                         >
                        <MenuItem value="">Default</MenuItem>
                        {category.map((category) => (
                        <MenuItem  key={category.id} value={category.id}>
                            {category.categoryName}
                            </MenuItem>
                        ))}
                        </Select>
                </Grid>
              </Grid>
                <Typography   variant="h6" gutterBottom> Input Stocks</Typography>
                {formState.isLiquid == 1
    ? 
        <Grid container spacing={3}>
          <TextField type='number' fullWidth name='qtyBoxTotal' label='Input Box' onInput={stockHandleChange}/>
          <TextField type='number' fullWidth name='qtyBoxAvailable' label='Input Total Box' onChange={stockHandleChange}/>
          <TextField type='number' fullWidth name='qtyBottleTotal' label='Input Total Bottle per Box'onInput={stockHandleChange}/>
          <TextField type='number' fullWidth name='qtyBottleAvailable' label='Input Bottle'onInput={stockHandleChange}/>
        </Grid>
    : 
        <Grid container spacing={3}>
          <TextField type='number' fullWidth name='qtyBoxTotal' label='Input Box'onInput={stockHandleChange}/>
          <TextField type='number' fullWidth name='qtyBoxAvailable' label='Input Total Box'onInput={stockHandleChange}/>
          <TextField type='number' fullWidth name='qtyStripsTotal' label='Input Total Strip per Box'onInput={stockHandleChange}/>
          <TextField type='number' fullWidth name='qtyStripsavailable' label='Input Strip'onInput={stockHandleChange}/>
        </Grid>}
                          
              <br/>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button  variant="contained" color="primary" onClick={addNewProduct} >Add New Product </Button>
              </div>
             
            </form>    
        </Paper>
    
        </>
       
    
  )
}

export default AddProduct