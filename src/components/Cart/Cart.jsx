import React, {useState} from 'react';
import {Container, Typography, Button, Grid} from '@material-ui/core';
import {  Link  } from 'react-router-dom';
import useStyles from './style';
import CartItem from './CartItem/CartItem';

const Cart = ({cart,handleRemoveFromCart,handleUpdateCartQty,handleEmptyCart}) => {
    const classes = useStyles();
    const EmptyCart = () => (
        <Typography variant="subtitle1">
            <Link to="/" className={classes.link}>выбрать что-то</Link>
        </Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                    <Typography variant="h4">Общяя сумма: {cart.subtotal.formatted_with_symbol}</Typography>
                    <div>
                        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Очистить корзину</Button>
                        <Button component={Link} to="./checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Потвердить покупку</Button>
                    </div>
            </div>
        </>
    )

    if(!cart.line_items) return 'Загрузка...';

    return (
       <Container>

        <div className={classes.toolbar}/>
        <Typography className={classes.title} variant="h3" gutterBottom>Твоя корзина</Typography>
       {  !cart.line_items.length ? <EmptyCart />: <FilledCart /> }
       </Container> 
        
            
    )
}

export default Cart
