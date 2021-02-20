import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';


const Cart = ({ cart, handleUpdateCartQuantity, handleRemoveFromCart, handleEmptyCart }) => {

    const classes = useStyles();

    const EmptyCart = () => (
        <Typography variant="subtitle1">You don't have any items in your cart. 
            <Link to="/" className={classes.link}> Add some items</Link>!
        </Typography>
    )
    const FilledCart = () => (
        <>
            <Grid container spacing={2}>
                {cart.line_items.map((item) => (
                    <Grid item key={item.id} xs={12} sm={12} md={6}>
                        {/* Cart items */}
                        <CartItem item={item} handleUpdateCartQuantity={handleUpdateCartQuantity} handleRemoveFromCart={handleRemoveFromCart}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography className={classes.subtotalText} variant="h4">Subtotal: <span style={{color:'#47824a'}}>{cart.subtotal.formatted_with_symbol}</span></Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                    <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>
    )
    
    //Handle cart items not being fetched
    if(!cart.line_items) {
        return 'loading';
    }

    //Conditional rendering for cart
    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>Your Cart</Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart
