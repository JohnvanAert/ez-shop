import React from 'react';
import { BottomNavigation } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
const Footer = () => {
    return (
        <BottomNavigation>
            <FacebookIcon /><WhatsAppIcon />
      </BottomNavigation>
    )
}

export default Footer
