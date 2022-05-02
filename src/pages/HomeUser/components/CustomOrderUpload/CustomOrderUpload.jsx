import React,{useState, useEffect} from 'react'
import useStyles from './styles.js'
import { Grid, Box, Container, Typography, Paper, Card, CardActions, Button, Input, TextField, CardMedia, CardContent, CircularProgress} from '@material-ui/core';
import axios from '../../../../utils/axios'
import {useSelector} from 'react-redux'
import {Link, Navigate} from 'react-router-dom'


function CustomOrderUpload() {
    const {id, role} = useSelector((state) => {
        return state.auth;
      });
    const classes = useStyles();
    const [ image, setImage ] = useState('https://image.shutterstock.com/image-vector/various-meds-pills-capsules-blisters-600w-1409823341.jpg')
    const [ selectedFile, setSelectedFile] = useState(null)
    const [ formState, setFormState] = useState({
        user_id: 0,
        image: "",
        status: "waiting",
        notes: "",
    });
    
    console.log(formState);

    useEffect(() => {
        setFormState({ ...formState, user_id: id });
    },[id])


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
          fd.append("prescription", selectedFile)
          axios.post("/customorders/upload", fd)
          .then((res) => {
            const image = res.data.image;
            setFormState({ ...formState, image })
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


      const onSendClick = () => {
          addNewCustomOrder();
         
      }


      const addNewCustomOrder = async () => {
    
      await axios
      .post("/customorders", {formState})
      .then((res) => {
          console.log(res.data);
       alert(res.data.message); 
       return <Navigate to="/customorders" replace />   
      })
      .catch((error) => console.log({ error }));
  };
  


  return (
    <Container>
        <div className={classes.toolbar}/>
        <Paper className={classes.paper}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            alt="doctors-prescription"
                            height="350"
                            image={image}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Upload Prescription
                            </Typography>          
                            <TextField fullWidth multiline name='notes' label='Type Notes Here' onChange={handleChange} />
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
                            <Button component={Link} to='/customorders' onClick={addNewCustomOrder}>Send</Button>
                        </CardActions>

                    </Card>

                </Grid>

            </Grid>

        </Paper>

    </Container>
  )
}

export default CustomOrderUpload