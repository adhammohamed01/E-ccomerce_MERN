import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useAuth } from '../contex/Auth/AuthContext';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const {username,isAuthenticated,logout}=useAuth();
  
  
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

 const Navigate=useNavigate();
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogin=()=>{
    Navigate('/login')
  }
   const handleLogout=()=>{
     logout();
     Navigate('/');
     handleCloseUserMenu()
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
         <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Box sx={{ display:"flex",flexDirection:"row",justifyContent:"space-between",width:"100%"}}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MEN Hub
          </Typography>
          </Box>

    <Box sx={{ display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"100%"}}>
        
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MEN Hub
          </Typography>
          </Box>
          <Box>
          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated?<>
             <Tooltip title="Open settings">
              <Box display="flex" alignItems="center" gap={2}>
              <Typography>{username}</Typography>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={username || ""} src="/static/images/avatar/2.jpg" />
              </IconButton>
              </Box>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>My orders</Typography>
                </MenuItem>
                 <MenuItem  onClick={handleLogout}>
                  <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                </MenuItem>
              
            </Menu>
            </>:<Button variant='contained' color='success' onClick={handleLogin}>Login</Button>}
           
          </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
