import React from 'react';
import { AppBar,Container,Toolbar,Typography } from '@material-ui/core';
import useStyles from './style';
const Footer = () => {
    return (

        <AppBar position="static" color="primary">
          <Container>
            <Toolbar>
              <Typography variant="body1" color="inherit">
                © 2021 Все права защищены EZ-shop
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>

    )
}

export default Footer
