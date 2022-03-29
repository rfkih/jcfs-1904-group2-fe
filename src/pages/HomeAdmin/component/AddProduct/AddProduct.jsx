import React, {useState, useEffect} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import axios from '../../../../utils/axios'

import CustomTextField from '../../CustomTextField';

function AddProduct() {
    const methods = useForm();
    const [category, setCategory] = useState([]);

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


  return (
    <>
      <Typography variant="h6" gutterBottom> Shipping Address</Typography>
      <FormProvider {...methods}>
        <form > 
            <Grid container spacing={3}>
                <CustomTextField required name='productName' label='Product Name'/>
                <CustomTextField required name='productDetail' label='Product Detail'/>
                <CustomTextField required name='productIMG' label='Product Image'/>
                <CustomTextField required name='Price' label='Price'/>
                <Grid>
                    <InputLabel>Liquid ?</InputLabel>
                    <Select name='isLiquid'>
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} sm={10}>
                    <InputLabel>Category</InputLabel>
                        <Select name="category_id"
                            className="form-control"
                         >
                        <MenuItem value="">Default</MenuItem>
                        {category.map((category) => (
                        <MenuItem  value={category.id}>
                            {category.categoryName}
                            </MenuItem>
                        ))}
            </Select>
          </Grid>
            </Grid>
        </form>
      </FormProvider>    
    </>
  )
}

export default AddProduct