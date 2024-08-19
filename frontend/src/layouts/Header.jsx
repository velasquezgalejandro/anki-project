import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { PrincipalButton, StyledButton } from '../utils';

const Header = () => {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderNavigate = (link) => () => {
    navigate(link);
  };

  return (
    <AppBar
      position="static"
      sx={{
        '&.MuiPaper-root': { bgcolor: 'layout.main' },
      }}
    >
      <Toolbar>
        <Box
          onClick={() => {
            navigate('/');
          }}
          sx={{
            flexGrow: 1,
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: 'text.white' }}
          >
            Nombre
          </Typography>
        </Box>
        <Stack direction="row" columnGap={2} sx={{ width: 0.5 }}>
          <StyledButton
            label={'Crear Decks'}
            action={renderNavigate('/create-decks')}
            styles={{
              bgcolor: 'buttons.secondary',
              color: 'text.white',
            }}
          />
          <PrincipalButton
            label={'Descargar decks'}
            action={renderNavigate('/download-decks')}
          />
        </Stack>
        {auth && (
          <Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              keepMounted
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
