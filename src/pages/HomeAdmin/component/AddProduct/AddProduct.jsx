import React, {useState, useEffect} from 'react'
import { TextField, Paper, InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import axios from '../../../../utils/axios'
import useStyles from './styles'
import CustomTextField from '../../CustomTextField';

function AddProduct() {
    const classes = useStyles();
    const methods = useForm();
    const [image, setImage] = useState("https://fakeimg.pl/350x200/");
    const [category, setCategory] = useState([]);
    const [products, setProducts] = useState([]);
    const [formState, setFormState] = useState({
        category_id: 0,
        productName: "",
        productDetails: "",
        productIMG: "",
        isLiquid: "",
        isDeleted: 0,
        price: "",
    });
    const [selectedFile, setSelectedFile] = useState(null);

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
      };
    const fileSelectedHandler = (e) => {
      console.log(e.target.files[0]);
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
        .then((res) => window.location.href = res.data.image)
        .catch((error) => console.log({ error }));
      }

    //   const fd = new FormData();
    //   fd.append('productPhoto', selectedFile, selectedFile.name)
    //  console.log(fd);
    //   axios.post("/products/upload", fd)
    //   .then((res) => {
    //     alert(res.data[0]);
        
    //    })
    //    

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

    const addNewProduct = () => {
        
        const { category_id, productName, productDetails, productIMG, isLiquid, isDeleted, price } =
          formState;

        console.log({price});
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
        console.log({newProduct})

        axios
      .post("/products", newProduct)
      .then((res) => {
       alert(res.data.message);
       console.log(newProduct);
      })
      .catch((error) => console.log({ error }));
  };


  return (
    <>
  
      <div class="w-100 p-3">
      <div
        className="d-flex w-100 justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div className="w-25 mt-5 mx-auto">
          <div>
            <img src={image} className="img-thumbnail" alt="..." />
          </div>
          <div className="my-3">
            <label htmlFor="formFile" className="form-label">
              Upload image here
            </label>
            <input
              onChange={fileSelectedHandler}
              className="form-control"
              type="file"
              id="formFile"
            />
            <button onClick={fileUploadHandler}  className="btn btn-primary mt-2 w-100">
              Save my photo
            </button>
          </div>
        </div>
      </div>
    </div>

     

      <Paper className={classes.paper} >
        <Typography variant="h4" align="center"> Add Product </Typography>
        <Typography variant="h6" gutterBottom> Add New Product</Typography>
        <FormProvider {...methods}>
          <form > 
            <Grid container spacing={3}>
                <TextField fullWidth name='productName' label='Product Name'  onInput={handleChange}/>
                <TextField fullWidth name='productDetails' label='Product Detail'  onInput={handleChange}/>
                {/* <TextField fullWidth name='productIMG' label='Product Image'  onInput={handleChange}/> */}
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
                {/* <Grid item xs={12} sm={6}>
                  <input
                      type="file"
                      name="iphone"
                      onChange={fileSelectedHandler}
                    />  
                        <Button
                          variant="contained"
                          component="label"
                          onClick={fileUploadHandler}
                        >
                          Upload File
                          /Button>  
                    </Grid>
                <Button onClick={addNewProduct} >Add New Product </Button> */}
              </Grid>
            </form>
        
          </FormProvider>           
        </Paper>
    
    
    </>     
    
  )
}

export default AddProduct