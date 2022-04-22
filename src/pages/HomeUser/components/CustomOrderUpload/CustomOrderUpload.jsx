import React,{useState, useEffect} from 'react'
import useStyles from './styles.js'
import { Grid, Box, Container, Typography, Paper, Card, CardActions, Button, Input, TextField, CardMedia, CardContent, CircularProgress} from '@material-ui/core';
import axios from '../../../../utils/axios'


function CustomOrderUpload() {
    const classes = useStyles();
    const [ image, setImage ] = useState('https://image.shutterstock.com/image-vector/various-meds-pills-capsules-blisters-600w-1409823341.jpg')
    const [ selectedFile, setSelectedFile] = useState(null)

    console.log(image);

   
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
            console.log(res.data.image);
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
                            <TextField fullWidth multiline name='notes' label='Type Notes Here' />
                        </CardContent>
                        <CardActions>
                            <Input
                                id="upload-file"
                                type="file"
                                onChange={fileSelectedHandler} 
                            /> 
                            <label htmlFor='upload-file'>
                                <Button variant="contained" component="span" >                  
                                    Upload Image
                                </Button>  
                      </label> 
                            <Button>Send</Button>
                        </CardActions>

                    </Card>

                </Grid>

            </Grid>

        </Paper>

    </Container>
  )
}

export default CustomOrderUpload