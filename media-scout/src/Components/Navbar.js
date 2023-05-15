import * as React from 'react';
import { styled, alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useState, useEffect } from 'react';
import { resetUserSession } from '../service/AuthService';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
// eslint-disable-next-line no-unused-vars
import { spacing } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
const theme = createTheme({
  spacing: 8,
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2'
    }
  }
});
// Search icon
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}));

export default function PrimarySearchAppBar () {
  const navigate = useNavigate();
  //  const user = getUser();
  //  const name = user !== 'undefined' && user ? user.name : '';
  const logoutHandler = () => {
    resetUserSession();
    navigate('/login');
  };
  // eslint-disable-next-line no-unused-vars
  const [searchText, setSearchText] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [movies, setMovies] = useState([]);
  const fetchMovies = async (searchText) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchText}`;
    const response = await fetch(url);
    const resJson = await response.json();

    if (resJson.Search) {
      setMovies(resJson.Search);
    }
  };
  useEffect(() => {
    fetchMovies(searchText);
  }, [searchText]);

  // const searchMovie = async (ev) => {
  //   if (ev) {
  //     ev.preventDefault();
  //   }
  //   const { data } = await axios.get((`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchText}`));
  //   console.log(data.results[0]);
  //   setMovies(data.results);
  //   if (data.results.length) {
  //     await searchMovie(data.results[0].id);
  //   };
  // };
  // useEffect(() => {
  //   searchMovie();
  // }, []);

  // const getMovieSearch = (e) => {
  //   e.preventDefault();
  //   setSearchText(e.target.value);

  //   fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${e.target.value}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (!data.errors) {
  //         setResults(data.results);
  //       } else {
  //         setResults([]);
  //       }
  //     });
  // };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const isHamburgerOpen = Boolean(anchorEl2);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleHamburgerMenuOpen = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleHamburgerMenuClose = () => {
    setAnchorEl2(null);
  };
  const menuId = 'primary-search-account-menu';
  const hamburgerMenuId = 'primary-search-hamburger-menu';

  const renderHamburgerMenu = (
    <Menu
      anchorEl={anchorEl2}
      id={hamburgerMenuId}
      keepMounted
      open={isHamburgerOpen}
      onClose={handleHamburgerMenuClose}
    >
      <MenuItem onClick={handleHamburgerMenuClose}><Link to="/moviesGenre/Fantasy" style={{ color: 'white', textDecoration: 'none' }}>Fantasy</Link></MenuItem>
      <MenuItem onClick={handleHamburgerMenuClose}><Link to="/moviesGenre/Crime" style={{ color: 'white', textDecoration: 'none' }}>Crime</Link></MenuItem>
      <MenuItem onClick={handleHamburgerMenuClose}><Link to="/moviesGenre/Drama" style={{ color: 'white', textDecoration: 'none' }}>Drama</Link></MenuItem>
      <MenuItem onClick={handleHamburgerMenuClose}><Link to="/moviesGenre/Adventure" style={{ color: 'white', textDecoration: 'none' }}>Adventure</Link></MenuItem>
      <MenuItem onClick={handleHamburgerMenuClose}><Link to="/moviesGenre/Horror" style={{ color: 'white', textDecoration: 'none' }}>Horror</Link></MenuItem>
      <MenuItem onClick={handleHamburgerMenuClose}><Link to="/moviesGenre/Action" style={{ color: 'white', textDecoration: 'none' }}>Action</Link></MenuItem>
    </Menu>
  );
  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}><Link to="./profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link></MenuItem>
      <MenuItem onClick={handleMenuClose}><Link to="./register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link></MenuItem>
      <MenuItem onClick={handleMenuClose}><Link to="./login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link></MenuItem>
      <MenuItem onClick={handleMenuClose}><Link to="./myaccount" style={{ color: 'white', textDecoration: 'none' }}>MyAccount</Link></MenuItem>
      {/* <input type='button' value="Logout" onClick={logoutHandler} /> */}
      <MenuItem onClick={logoutHandler}><Link to="./logout" style={{ color: 'white', textDecoration: 'none' }}>Logout</Link></MenuItem>
    </Menu>
  );
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'grid' }}>
        <AppBar position="static">
          <Toolbar>
            {anchorEl !== 'profile'
              ? (
                <IconButton
                  onClick={handleHamburgerMenuOpen}
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              )
              : null}
            <Button
              href='/'
              variant='text'
              disableElevation
              disableRipple
              color='inherit'
              style={{ backgroundColor: 'transparent' }}
            >
              Media Scout
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderHamburgerMenu}
        {renderProfileMenu}
      </Box>
    </ThemeProvider>
  );
}
