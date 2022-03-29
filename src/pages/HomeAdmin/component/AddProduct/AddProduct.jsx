import React, {useState, useEffect} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import axios from '../../../../utils/axios'

import CustomTextField from '../../CustomTextField';

function AddProduct() {
    const methods = useForm();
    const [category, setCategory] = useState([]);
    const [products, setProducts] = useState([]);
    const [formState, setFormState] = useState({
        category_id: 0,
        productName: "",
        productDetails: "",
        productIMG: "",
        isLiquidString: "",
        isDeleted: 0,
        price: "",
    });

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
        console.log(e);
      };

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
        
        const { category_id, productName, productDetails, productIMG, isLiquidString, isDeleted, priceString } =
          formState;
          
        const isLiquid = parseInt(isLiquidString)
        const price = parseInt(priceString)

        const newProduct = {
          category_id,
          productName,
          productDetails,
          productIMG,
          isLiquid,
          isDeleted,
          price,
        };

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
      <Typography variant="h6" gutterBottom> Add New Product</Typography>
      <FormProvider {...methods}>
        <form > 
            <Grid container spacing={3}>
                <CustomTextField required name='productName' label='Product Name' onChange={handleChange} />
                <CustomTextField required name='productDetail' label='Product Detail ' onChange={handleChange}/>
                <CustomTextField required name='productIMG' label='Product Image' onChange={handleChange}/>
                <CustomTextField required name='Price' label='Price' onChange={handleChange}/>
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
            <Button onClick={addNewProduct} >Add New Product </Button>
        </Grid>
        </form>
        
      </FormProvider>    
    </>
  )
}

export default AddProduct