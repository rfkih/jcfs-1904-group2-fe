import React,{useState, useEffect} from 'react'
import { Paper, Typography, Button, Container} from '@material-ui/core'
import useStyles from './style'
import axios from '../../../../utils/axios'

function Stocks() {
const classes = useStyles();
const [ sort, setSort ] = useState('')
const [ keyword, setKeyword] = useState('')
const [ products, setProducts] = useState([])
const [selectedCategory, setSelectedCategory] = useState ({ category_id: ''})



const fetchProducts = async () => {     
  try {
      const res = await axios.get("/products", {params: { pages:(``), keyword, sort, category: selectedCategory.category_id}})
      .then((res=>{
        const { data } = res;
        setProducts(data.result);
        
      }));
      
  } catch (error) {
      console.log(alert(error.message));
  }
};


useEffect(() => {
  fetchProducts()
},[])

  console.log(products);
  return (
    <Container>
        <div className={classes.toolbar}/>
        <Typography>Wooow</Typography>
    </Container>
  )
}

export default Stocks