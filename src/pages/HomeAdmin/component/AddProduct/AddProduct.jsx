import React, {useState, useEffect} from 'react'
import { TextField, Paper, InputLabel, Select, MenuItem, Button, styled,  Grid, CardMedia, CardContent, CardActions, Card, Typography, Input, Container} from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form';
import axios from '../../../../utils/axios'


function AddProduct() {
    
    
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
      setSelectedFile(uploaded);
      fileUploadHandler();
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
        // parseInt(isLiquid)
        
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
       window.location.reload(); 
     
       
      })
      .catch((error) => console.log({ error }));
  };
  const Input = styled('input')({
    display: 'none',
  });
  
  return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper >
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
                  <Typography gutterBottom variant="h5" component="div">
                          Product Image
                  </Typography>
                      
                  </CardContent>
                  <CardActions>
                    <label htmlFor="contained-button-file" >
                      <Input
                        type="file"
                        id="contained-button-file"
                        onChange={fileSelectedHandler}
                      />
                      <Button variant="contained" component="span"  >Upload Image </Button>
                    </label>
                  </CardActions>
                </Card>
              </form>          
            </Paper>
          </Grid>
          <Grid item xs={6}>
          <Paper >
            <Container>
              
            
            <Typography variant="h4" align="center"> Add Product </Typography>
            <Typography variant="h6" gutterBottom> Add New Product</Typography>
        
            <form > 
              <Grid container spacing={2}>
                <Grid item xs={9}>
                  <TextField  fullWidth name='productName' label='Product Name'  onInput={handleChange}/>
                  <TextField fullWidth multiline name='productDetails' label='Product Detail'  onInput={handleChange}/>
                  <TextField fullWidth name='price' label='Price'  onInput={handleChange}/>

                </Grid>
                    <Grid item xs={6} sm={6}>
                        <InputLabel>Liquid ?</InputLabel>
                        <Select defaultValue="" name='isLiquid' onChange={handleChange} >
                        <MenuItem value='1'>Yes</MenuItem>
                        <MenuItem value='0'>No</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6} sm={6}>
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
                  {formState.isLiquid && 
                  <Grid container spacing={3}>
                  <TextField type='number' fullWidth name='qtyBoxTotal' label='Input Box' onInput={stockHandleChange}/>
                  <TextField type='number' fullWidth name='qtyBoxAvailable' label='Input Total Box' onChange={stockHandleChange}/>
                  {formState.isLiquid == 1 ? <>
                    <TextField type='number' fullWidth name='qtyBottleTotal' label='Input Total Bottle per Box'onInput={stockHandleChange}/>
                    <TextField type='number' fullWidth name='qtyBottleAvailable' label='Input Bottle'onInput={stockHandleChange}/>
                  </> : <>
                    <TextField type='number' fullWidth name='qtyStripsTotal' label='Input Total Strip per Box'onInput={stockHandleChange}/>
                    <TextField type='number' fullWidth name='qtyStripsavailable' label='Input Strip'onInput={stockHandleChange}/>
                  </>             
                  }  
                </Grid>}
  
                    

                  <br/>
              <div >
                    <Button  variant="contained" color="primary" onClick={addNewProduct} >Add New Product </Button>
              </div>
            </form>  
            </Container>  
      </Paper>

          </Grid>
        </Grid>
        
    
    </Container>
       
    
  )
}

export default AddProduct