import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Menu, MenuItem, Typograpy, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import useStyles from './styles';

const Navbar = ({ totalItems }) => {

    const classes = useStyles();
    const location = useLocation();

    return (
        <div>
            <AppBar className={classes.appBar} position="fixed" color="inherit">
                <Toolbar>
                    {/* Add homepage link to logo*/}
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit"> 
                        <img src={logo} alt="Commerce.js" height="25px" className={classes.image}/>
                        <span className={classes.name}>Commerce</span>
                    </Typography>
                    <div className={classes.grow}></div>
                    <div className={classes.button}>
                        {/* Hide cart button on cart page */}
                        {location.pathname === '/' && (
                        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit"> 
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton> )}
                    </div> 
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
