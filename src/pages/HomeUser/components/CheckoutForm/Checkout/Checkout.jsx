import React, {useState, useEffect} from 'react'
import { Grid, Box, Container, Step, Stepper, Paper, Input, Card, CardMedia, CardContent, CardActions, Button, StepLabel, Typography } from "@material-ui/core";
import axios from '../../../../../utils/axios';
import useStyles from './styles.js'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import Address from '../Address'
import Payment from '../Payment'
import {Link} from 'react-router-dom'

function Checkout() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Shipping address', 'Payment details']
    const {id, role} = useSelector((state) => {
      return state.auth;
    });
    const params = useParams();
    const [selected, setSelected] = useState('')
    const [bank, setBank] = useState({})
    const [ image, setImage ] = useState('https://image.shutterstock.com/image-vector/various-meds-pills-capsules-blisters-600w-1409823341.jpg')
    const [ selectedFile, setSelectedFile] = useState(null)
    const [formState, setFormState] = useState({ 
      paymentPhoto: "", 
  });
    const [subTotal, setSubtotal] = useState(0)

  console.log(subTotal);


    const fileSelectedHandler = (e) => {
      let uploaded = e.target.files[0]
      setImage(URL.createObjectURL(uploaded))
      setSelectedFile(uploaded);
    }

    
    const handleChange = (e) => {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    };


    const fileUploadHandler = () => {
      if(!selectedFile){
        alert("Upload Image First")
      }else{
        const fd = new FormData();
        fd.append("paymentProof", selectedFile)
        axios.post("/payment/upload", fd)
        .then((res) => {
          const paymentPhoto = res.data.image;
          setFormState({ ...formState, paymentPhoto })
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
   
   
    const completeClick = () => {
      postPaymentPhoto();
      putTransactionStatus();
    }
 

    const Confirmation = () => (
      <Container>
        <Card>
          <CardContent>
          <Typography>Please Make Payment To: {bank.bank} </Typography>
          <Typography>Account Number: {bank.account_number}</Typography>
          <Typography>Transfer Amount: {subTotal}</Typography>
          </CardContent>
          <CardMedia
            component="img"
            height="270"
            image={image}
            alt="..."
          />
          <CardActions>   
              <Input
                className={classes.input}
                id="upload-file"
                type="file"
                onChange={fileSelectedHandler} 
              /> 
              <label htmlFor='upload-file'>
                <Button variant="contained" component="span" >                  
                  Upload Payment Proof
                </Button>  
              </label>                         
          </CardActions>
        </Card>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button onClick={backStep}> back</Button>
          <Button onClick={completeClick} component={Link} to={`/usertransactions`}  > Complete</Button>
        </div>
          
      </Container>
    );

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)


    const Form = () => activeStep === 0 
    ? <Address nextStep={nextStep} />
    : <Payment setSubtotal={setSubtotal} setSelected={setSelected} nextStep={nextStep} backStep={backStep}  />


    const fetchSelectedPayment = async () => {
    
      try {
          const res = await axios.get(`/payment/selected`,  { params: { selected } } );
          const  {data} = res
        
          setBank(data[0])
          
      } catch (error) {
          console.log(alert(error.message));
      }
    };


    const putTransactionStatus = async () => {
    
      try {
          const res = await axios.put(`/transaction/status/${params.transactionId}`,{ params: { status: 'paid', id: params.transactionId } } );
          const  {data} = res
          console.log(data);
       
          
      } catch (error) {
          console.log(alert(error.message));
      }
    };

    const postPaymentPhoto = async () => {
      await axios
      .post("/payment", { formState , transactionId: params.transactionId} )
      .then((res) => {
       alert("Transaction Completed");
       
      })
      .catch((error) => console.log({ error }));
    }
    
  
  
    useEffect(() => {
      fetchSelectedPayment();
    }, [selected]);
  




  return (
    <Container> 
        <div className={classes.toolbar}/>
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center"> Checkout </Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation/> : <Form/>}
                
            </Paper>
        </main>
            

    </Container>
  )
}

export default Checkout