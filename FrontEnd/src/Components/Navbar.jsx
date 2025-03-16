import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';


const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  // Function to handle menu opening
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle menu closing
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => { handleMenuClose(); navigate('/'); }}>Home</MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); navigate('/about'); }}>About</MenuItem>
        </Menu>
        <Typography  onClick={() => navigate("/")} variant="h6" component="div" sx={{ flexGrow: 1 ,  cursor: 'pointer'}}>
          Photo Gal
        </Typography>
        <Button sx={{ cursor: 'pointer'}} color="inherit" onClick={() => navigate("/")}>Home</Button>
        <Button sx={{ cursor: 'pointer'}} color="inherit" onClick={() => navigate("/about")}>About</Button>
        <span style={{ cursor: 'pointer'}} onClick={() => navigate("/login")}><PersonIcon /></span>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
