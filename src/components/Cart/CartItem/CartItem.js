import React from 'react'
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import useStyles from './styles';

const CartItem = ({ item, handleUpdateCartQuantity, handleRemoveFromCart }) => {

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardMedia image={item.media.source} alt={item.name} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            {/* Functions for editing & removing items */}
            <CardActions className={classes.CardActions}>
                <div className={classes.buttons}>
                    <Button type="button" size="medium"  onClick={() => handleUpdateCartQuantity(item.id, item.quantity-1)}>-</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Typography>{item.quantity}</Typography>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="button" size="medium" onClick={() => handleUpdateCartQuantity(item.id, item.quantity+1)}>+</Button>
                </div>
                <Button variant="contained" type="button" color="secondary" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem
