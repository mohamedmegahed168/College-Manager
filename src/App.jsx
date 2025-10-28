import { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  Box,
  Typography,
  AppBar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Button,
} from '@mui/material';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

const theme = createTheme({
  palette: { mode: 'light' },
});

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  function handleDrawerToggle() {
    setMobileOpen((prev) => !prev);
  }
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        College Manager
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Box sx={{ display: 'flex' }}>
          <AppBar component="nav" sx={{ backgroundColor: ' #6b5bb3' }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', sm: 'block' },
                  fontWeight: 'bold',
                }}
              >
                College Manager
              </Typography>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {navItems.map((item) => (
                  <Button key={item} sx={{ color: '#fff' }}>
                    {item}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </AppBar>
          <nav>
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
          </nav>
          <Box
            component="main"
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              minHeight: '100vh',
              width: '100vw',
              color: 'white',
            }}
          >
            <Toolbar />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 'calc(100vh - 100px)',
                textAlign: 'center',
                gap: 3,
              }}
            >
              <Typography
                variant="h2"
                component="h1"
                sx={{ fontWeight: 'bold' }}
              >
                Welcome to College Manager
              </Typography>

              <Typography variant="h5" sx={{ maxWidth: '600px', opacity: 0.9 }}>
                Your First Partner to Success
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Link to="/signUp">
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: '#764ba2',
                      '&:hover': { backgroundColor: '#653a8a' },
                      px: 4,
                      py: 1.5,
                    }}
                  >
                    Sign Up
                  </Button>
                </Link>
                <Link to="/signIn">
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      },
                      px: 4,
                      py: 1.5,
                    }}
                  >
                    Sign In
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default App;
