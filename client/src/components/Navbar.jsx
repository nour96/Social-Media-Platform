import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColorModeContext } from '../context/ColorModeContext';
import { Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const { userInfo, logout } = useAuth();

  const logo =
    mode === 'dark'
      ? 'https://www.slazzer.com/downloads/de7f7d50-b4b7-11ed-bef4-42010a80000a/download_prev_ui.png'
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
          alignItems="center"
          sx={{ textDecoration: 'none' }}
        >
          <img src={logo} alt="logo" height="50px" border="0" />

          <Typography variant="h5" ml={1}>
            Shinx
          </Typography>
        </Link>
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
        {userInfo ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button sx={{ p: 0 }} onClick={logout}>
              <ExitToAppIcon fontSize="medium" />
            </Button>
            <Link href={`/user/${userInfo?._id}`}>
              <Button sx={{ p: 0 }}>
                <PersonOutlineIcon fontSize="large" />
              </Button>
            </Link>
            <Typography color="secondary" variant="subtitle1">
              {userInfo.firstName} {userInfo.lastName}
            </Typography>
          </Box>
        ) : (
          <>
            <Link href="/login">
              <Button sx={{ p: '0' }}>
                {/* <PersonOutlineIcon fontSize="large" /> */}
                login
              </Button>
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
};
