import React, {useEffect, useState} from 'react'
import axios from '../../../../utils/axios';
import {useSelector} from 'react-redux'
import { Grid, Box, Container, Typography, Paper, Dialog, List, DialogContent, FormControl, InputLabel, Select, MenuItem, Avatar, ListItemAvatar, ListItemText, ListItem, Card, DialogTitle, CardActions, Divider, Button, Input, TextField, CardMedia, CardContent, CircularProgress} from '@material-ui/core';
import useStyles from './styles.js'
import { useParams } from 'react-router-dom'



function Address({nextStep}) {
    const params = useParams();
    const classes = useStyles();
    const {id, role} = useSelector((state) => {
        return state.auth;
      });
    const [firstAddress, setFirstAddress] = useState([])
    const [addresses, setAddresses] = useState([])
    const [open, setOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState("")
    const [province , setProvince] = useState([])
    const [city, setCity] = useState([])
    const [formOpen, setFormOpen] = useState(false)
    const [selectedProvinceId, setSelectedProvinceId] = useState({})
    const [selectedCityId, setSelectedCityId] = useState({})
console.log(selectedCityId);

  const onAddAddressClick = () => {
    getProvince()
    setFormOpen(true)
  }

  const handleSelectedProvince = (e) => {
    setSelectedProvinceId({[e.target.name]: e.target.value}); 
  }

  const handleSelectedCity = (e) => {
    setSelectedCityId({[e.target.name]: e.target.value}); 
  }

  const getProvince = async () => {

    try {
      const res = await axios.get(`/rajaongkir/province`)
      .then((res=>{
        const { data } = res;
        setProvince(data.rajaongkir.results); 
      }));
  } catch (error) {
      console.log(alert(error.message));
  }
  }

  const getCity = async () => {

    try {
      const res = await axios.get(`/rajaongkir/city/${selectedProvinceId.province}`)
      .then((res=>{
        const { data } = res;
        console.log(data);
        setCity(data.rajaongkir.results); 
      }));
  } catch (error) {
      console.log(alert(error.message));
  }
  }

  useEffect(() => {
    if (selectedProvinceId.province) {
      getCity()
    }
    
  },[selectedProvinceId])


    const fetchAddress = async () => {
        try {
            const res = await axios.get(`/address/${id}`, {params: { id }})
            .then((res=>{
              const { data } = res;
              if (data[0]) {
                setFirstAddress(data[0])
                setAddresses(data)  
              }
            
            }));
        } catch (error) {
            console.log(alert(error.message));
        }
    };


    const fetchSelectedAddress = async (value) => {
        try {
            const res = await axios.get(`/address/selected`, {params: { selectedValue, id, value }})
            .then((res=>{
              const { data } = res;
              setFirstAddress(data[0])
                console.log(data);
            }));
        } catch (error) {
            console.log(alert(error.message));
        }

    }
    
    useEffect(() => {
        fetchAddress();
       
    },[]);


    const inputAddress = async () => {
      await axios
      .put(`/transaction/${params.transactionId}`, {firstAddress, params: { id: params.transactioniId } } )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log({ error }));
  };

  const nextClick = () => {
    inputAddress();
    nextStep();
  }


  
    const formClose = () => {
      setFormOpen(false)
    }

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
        if (value) {
            fetchSelectedAddress(value);
        }
        
      };
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    function SelectAddress (props) {
        const {onClose, selectedValue, open, addresses} = props

        const handleClose = () => {
            onClose(selectedValue);
        };

        const handleListItemClick = (value) => {
                onClose(value)
           
          };


        return (
            <Dialog onClose={handleClose} open={open}>
                 <DialogTitle>Select other Address</DialogTitle>
                    <List className={classes.paper} >
                     {addresses.map((address) => {
                        return <ListItem button onClick={() => handleListItemClick(address.id)} key={address.id} >
                           <ListItemText primary={address.addressDetail}/>
                         </ListItem>
                     })}
                    </List>     
            </Dialog>
        )
        

    }

  return (
    <Paper className={classes.paper} elevation={0}>
        <Typography className={classes.paper} variant="h6" >Address</Typography>
        <Divider/>
        {addresses[0] ? <Typography className={classes.paper} >{firstAddress.addressDetail}</Typography> : <Typography className={classes.paper} >No Address Available</Typography> }    
        <Divider/>
            
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              {addresses[0] ? <Button  className={classes.paper} variant="outlined" onClick={handleClickOpen} >Other Address</Button> : <Button className={classes.paper} variant="outlined" onClick={onAddAddressClick} >Add Address</Button> }             
              {addresses[0] ? <Button className={classes.paper} type="submit" variant="contained" color="primary" onClick={nextClick}> Next </Button> : <Button disabled className={classes.paper} type="submit" variant="contained" color="primary" > Next </Button> }
            </div> 
        <SelectAddress addresses={addresses} selectedValue={selectedValue} open={open} onClose={handleClose}/>
      <div>
        <Dialog open={formOpen} onClose={formClose}>
          <DialogTitle>Input Address Detail</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <FormControl sx={{ m: 1, minWidth: 420 }}>
                <InputLabel id="category-select">Select Province</InputLabel>
                  <Select
                    displayEmpty
                    labelId="category-select"
                    id="1"
                    defaultValue=""
                    name="province"
                    label="Province"
                    onChange={handleSelectedProvince}
                  >
                    <MenuItem key={1} value="">
                      Select Province
                    </MenuItem>
                    {province.map((province) => (
                    <MenuItem key={province.province_id}  value={province.province_id}>
                      {province.province}
                    </MenuItem>
                    ))}
                  </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12}>
              <FormControl sx={{ m: 1, minWidth: 420 }}>
                <InputLabel id="city-select">Select City</InputLabel>
                  <Select
                    displayEmpty
                    labelId="city-select"
                    id="1"
                    defaultValue=""
                    name="city"
                    label="Select City"
                    onChange={handleSelectedCity}
                  >
                    <MenuItem key={1} value="">
                      Select City
                    </MenuItem>
                    {city?.map((city) => (
                    <MenuItem key={city.city_id}  value={city.city_id}>
                      {city.city_name}
                    </MenuItem>
                    ))}
                  </Select>
              </FormControl>

              </Grid>

            </Grid>
            
              
          </DialogContent>

        </Dialog>

      </div>
    </Paper>
  )
}

export default Address