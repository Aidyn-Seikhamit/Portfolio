import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Emoji Hub
                </Typography>

                <Button color="inherit" component={RouterLink} to="/">
                    Home
                </Button>
                <Button color="inherit" component={RouterLink} to="/list">
                    Emoji List
                </Button>
                <Button color="inherit" component={RouterLink} to="/emojis">
                    Catalog
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
