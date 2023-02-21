import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import TextField from '@mui/material/TextField';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { useContext } from 'react';

import { ColorModeContext } from '../context/ColorModeContext';
import { Typography } from '@mui/material';
import { useTheme } from '@emotion/react';

export const Navbar = () => {
  const user = false;

  // const [query, setQuery] = useState('')

  
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const theme = useTheme();

  const handleLogout = () => {
    axios.get('http://localhost:3000/api/logout')
    .then((res)=> {
      console.log("Logged out...")
    }, (err) => {
      console.log("Can't log out...")
    }) 
  }

  return (
    <Box
      bgcolor="background.default"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p="7px 30px"
    >
      <Box>
        <Link
          to="/"
          component={RouterLink}
          display="flex"
          alignItems="baseline"
          sx={{ textDecoration: 'none' }}
        >
          <img
            src="https://i.ibb.co/Q8Z8Vy4/Screenshot-2023-02-20-234556.png"
            alt="logo"
            height="50px"
            border="0"
          />
          <Typography variant="h5" ml={1}>
            Shinx
          </Typography>
        </Link>
      </Box>

      <Box width="50%">
        <TextField /*onChange={(e) => setQuery(e.target.value)}*/
          variant="outlined"
          placeholder="Search post title ..."
          fullWidth
          InputProps={{
            style: {
              fontWeight: 'normal',
              height: '40px',
            },
          }}
        />
      </Box>
      <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} disableRipple>
        {mode === 'dark' ? (
          <Brightness4Icon color="primary" />
        ) : (
          <Brightness7Icon color="primary" />
        )}
        <Typography ml={1} color="text.primary">
          {mode} mode
        </Typography>
      </IconButton>

      <Box display="flex" justifyContent="space-between" width="22%">
        {user ? (
          <Button sx={{ borderColor: 'common.white' }}>
            <ExitToAppIcon sx={{ mr: '0.5rem' }} />
          </Button>
        ) : (
          <>
            <Button sx={{ p: '0' }}>
              <PersonOutlineIcon fontSize="large" />
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};
