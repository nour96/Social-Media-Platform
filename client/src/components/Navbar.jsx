import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { useContext } from 'react';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { ColorModeContext } from '../context/ColorModeContext';
import { Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#3949ab' : '#fbc02d',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export const Navbar = () => {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const { userInfo, logout } = useAuth();

  const logo =
    mode === 'dark'
      ? 'https://i.ibb.co/sJ5XkGm/download-prev-ui.png'
      : 'https://i.ibb.co/Q8Z8Vy4/Screenshot-2023-02-20-234556.png';

  return (
    <Box
      bgcolor="background.paper"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={1}
    >
      <Box>
        <Link
          to="/"
          component={RouterLink}
          display="flex"
          alignItems="end"
          sx={{ textDecoration: 'none' }}
        >
          <img src={logo} alt="logo" height="50px" border="0" />

          <Typography variant="h5" ml={1} fontFamily="fantasy">
            Shinx
          </Typography>
        </Link>
      </Box>

      <Box display="flex" justifyContent="space-between" width="22%">
        {userInfo ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="subtitle1">
              Welcome, {userInfo.firstName}!
            </Typography>
            <Link href={`/user/${userInfo?._id}`}>
              <Button sx={{ p: 0 }}>
                <AccountCircleIcon fontSize="large" />
              </Button>
            </Link>
            <MaterialUISwitch onClick={toggleColorMode} />
            <Button sx={{ p: 0 }} onClick={logout}>
              <ExitToAppIcon fontSize="medium" />
            </Button>
          </Box>
        ) : (
          <>
            <Link href="/login">
              <MaterialUISwitch onClick={toggleColorMode} />
              <Button sx={{ p: '0' }}>login</Button>
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
};
