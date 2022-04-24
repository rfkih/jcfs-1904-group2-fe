import React from 'react'
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core'
import useStyles from './styles'

function CartItem({item}) {
    const classes= useStyles();

    console.log(item);
  return (
    <Card>
        <CardMedia image={item.productIMG} alt={item.productName} className={classes.media}/>
        <CardContent className={classes.cardContent}>
            <Typography variant="h6">{item.productName}</Typography>
            <Typography variant="h6">Rp.{item.price}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
            <div className={classes.buttons}> 
                <Button type="button" size="small" >-</Button>
                <Typography>{item.productQuantity}</Typography> 
                <Button type="button" size="small" >+</Button>
            </div>
            <Button variant="contained" type="button" color="secondary">Remove</Button>
        </CardActions>
    </Card>
  )
}

export default CartItem