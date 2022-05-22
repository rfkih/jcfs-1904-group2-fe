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
    const [ courier, setCourier] = useState('')
    const [ costs, setCosts] = useState([])
    const [ courierForm, setCourierForm ] = useState({
      courier: '',
      service: '',
      description: '',
      cost: '',
      etd: ''
    })
    const [formState, setFormState] = useState({
      user_id: 0,
      country: "indonesia",
      province_id: 0,
      province: "",
      city_id: 0,
      city: "",
      district: "",
      zipCode: 0,
      addressDetail: ""
  });




  const addressDetail = () => {
    const selectedAddress = city.find((item) => item.city_id === selectedCityId.city)

    if (selectedAddress) {
      setFormState({...formState, user_id: id, province_id: selectedAddress.province_id, province: selectedAddress.province, city_id: selectedAddress.city_id, city: selectedAddress.city_name   })
    }

  }

  const onAddClick = () => {
    addNewAddress();
    setFormOpen(false);
    fetchAddress();
  }

  const addNewAddress = async () => {

    await axios
      .post("/address", { formState} )
      .then((res) => {
       console.log(res.data);
        
      })
      .catch((error) => console.log({ error }));
  }

 
  useEffect(() => {
    addressDetail();
  },[selectedCityId])

  const handleChange = (e) => {
  setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onAddAddressClick = () => {
    getProvince()
    setOpen(false)
    setFormOpen(true)
  }

  const handleSelectedProvince = (e) => {
    setSelectedProvinceId({[e.target.name]: e.target.value}); 
  }

  const handleSelectedCity = (e) => {
    setSelectedCityId({[e.target.name]: e.target.value}); 
  }
  const handleSelectedCourier = (e) => {
    setCourier(e.target.value); 
  }

  const handleSelectedService = (e) => {
    const selectedService = costs.find((cost) => cost.service === e.target.value)
    console.log(selectedService);
    if (selectedService) {
      setCourierForm({...courierForm, courier: courier, service: selectedService.service,
      description: selectedService.description,
      cost: selectedService.cost[0].value,
      etd: selectedService.cost[0].etd   })
    }

  }
  console.log(courierForm);

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

  

  const getCost = async () => {
    try {
      const res = await axios.get(`/rajaongkir/cost/501/${firstAddress.city_id}/1000/${courier}`)
      .then((res=>{
        const { data } = res;
        
        setCosts(data.rajaongkir.results[0].costs)
      
      }));
  } catch (error) {
      console.log(alert(error.message));
  }
  }

  console.log(costs);

  useEffect(() => {
    if( firstAddress.city_id && courier ){
      getCost()
    }
    
  },[firstAddress, courier])


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
       
    },[formOpen]);

    // console.log(courierForm)
    const inputAddress = async () => {
      console.log('disini jalan');
      await axios
      .put(`/transaction/${params.transactionId}`, { courierForm, firstAddress ,  params: { id: params.transactioniId } } )
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
        fetchAddress();
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
            <Dialog fullWidth onClose={handleClose} open={open}>
                 <DialogTitle>Select other Address</DialogTitle>
                  
                    <List className={classes.paper} >
                     {addresses.map((address) => {
                        return <ListItem  button onClick={() => handleListItemClick(address.id)} key={address.id} >
                           <ListItemText primary={address.addressDetail}/>
                         </ListItem>
                     })}
                    </List> 
                    <Container>
                      <Button className={classes.paper} color="primary" variant="outlined" onClick={onAddAddressClick} >Add Other Address</Button> 
                    </Container>    
            </Dialog>
        )
        

    }

  return (
    <Paper className={classes.paper} elevation={0}>
        <Typography className={classes.paper} variant="h6" >Address</Typography>
        <Divider/>
        {addresses[0] ? <Typography className={classes.paper} >{firstAddress.addressDetail}</Typography> : <Typography className={classes.paper} >No Address Available</Typography> }    
        <Divider/>
          <div style={{display: 'flex', justifyContent: 'flex-start'}} >
            <div style={{margin: '1em'}}>
              <FormControl fullWidth sx={{ m: 1, minWidth: 420 }}>
                <InputLabel id="courier-select">Courier</InputLabel>
                  <Select
                    displayEmpty
                    labelId="courier-select"
                    id="1"
                    defaultValue=""
                    name="courrier"
                    label="Select Corier"
                    onChange={handleSelectedCourier}
                  >
                    <MenuItem key={1} value="">
                      Courier
                    </MenuItem> 
                    <MenuItem key={2} value={'jne'}>
                      JNE
                    </MenuItem>
                    <MenuItem key={3} value={'pos'}>
                      POS
                    </MenuItem>
                    <MenuItem key={4} value={'tiki'}>
                      Tiki
                    </MenuItem>               
                  </Select>
              </FormControl>
            </div>
            <div style={{margin: '1em'}} >
              <FormControl fullWidth sx={{ m: 1, minWidth: 420 }}>
                <InputLabel id="Service-select">Service</InputLabel>
                  <Select
                    displayEmpty
                    labelId="Service-select"
                    id="1"
                    defaultValue=""
                    name=""
                    label="Service"
                    onChange={handleSelectedService}
                  >
                    <MenuItem key={1} value="">
                    Service
                    </MenuItem>
                    {costs?.map((cost) => (
                    <MenuItem key={cost.service}  value={cost.service}>
                      {cost.service} | Rp.{cost.cost[0].value} 
                    </MenuItem>
                    ))}
                  </Select>
              </FormControl>
            </div>     
          </div>
          {courier && 
          <div style={{display: 'flex', justifyContent: 'space-between', margin: '1em'}}>
            { courierForm.courier === 'pos' ? 
            <div style={{display: 'column', justifyContent: 'space-between', marginLeft: '1em'}}> 
              <Typography>{courierForm.description}</Typography> 
              <Typography>Estimated Arrived : {courierForm.etd}</Typography> 
            </div> : 
            <div style={{display: 'column', justifyContent: 'space-between', marginLeft: '1em'}}> 
              <Typography>{courierForm.description}</Typography> 
              <Typography>Estimated Arrived : {courierForm.etd} day</Typography> 
            </div>
            }  
          </div> }
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
              <Grid item xs={6}>
              <FormControl fullWidth sx={{ m: 1, minWidth: 420 }}>
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
              <Grid item xs={6}>
              <FormControl fullWidth sx={{ m: 1, minWidth: 420 }}>
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
              <Grid item xs={6}>
              <TextField className={classes.content} fullWidth  name='district' onInput={handleChange} label='District' />
              </Grid>
              <Grid item xs={6}>
              <TextField className={classes.content} fullWidth  name='zipCode' onInput={handleChange} label='zipCode' />
              </Grid>
              <Grid item xs={12}>
              <TextField className={classes.content} fullWidth multiline name='addressDetail' onInput={handleChange} label='Address Detail' />
              </Grid>
              <Grid className={classes.buttons} item xs={12}>
                      <Button variant="contained" color="primary" onClick={onAddClick} >Add Address</Button>
                      <Button variant="contained" color="primary" onClick={()=>{setFormOpen(false)}} >Close</Button>
              </Grid>

            </Grid>
            
              
          </DialogContent>

        </Dialog>

      </div>
    </Paper>
  )
}

export default Address