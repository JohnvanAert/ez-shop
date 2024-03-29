import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../img/logo.png';
import useStyles from './style';
import { Link,useLocation } from 'react-router-dom';

const Navbar = ( {totalItems} ) => {
    const classes = useStyles();
    const location = useLocation();

    return ( 
        <>
            <AppBar position="fixed" className={classes.appBar} color="primary">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="EZ-shop" height="25px" className={classes.image} />
                        EZ-shop
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname === '/' && (
                    <div className={classes.button}>
                    <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                    <Badge badgeContent={totalItems} color="secondary">
                        <ShoppingCart />
                    </Badge>

                    </IconButton>
                </div>
                    )}

                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
