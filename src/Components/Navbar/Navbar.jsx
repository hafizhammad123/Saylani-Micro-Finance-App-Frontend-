import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
} from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import LockIcon from '@mui/icons-material/Lock';
const saylaniTheme = createTheme({
    palette: {
        primary: {
            main: "#ffffffff", // Saylani Blue
        },
        secondary: {
            main: "#87be41",
        },
    },
});

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width: 900px)");

    let naviagate = useNavigate()

    const menuItems = [{
        pageName: "Home",
        pageUrl: "/"
    },

    {
        pageName: "Contact",
        pageUrl: "/contact"
    }
    ];

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    let logout = () => {
        localStorage.removeItem("currentUser")
        naviagate("/")
        Cookies.remove("token")
    }


    let currentUser = JSON.parse((localStorage.getItem("currentUser")))
    let token = Cookies.get("token")
    return (
        <ThemeProvider theme={saylaniTheme}>
            <AppBar position="sticky" color="primary" elevation={3}>
                <Toolbar>
                    {/* Logo */}
                    <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                        <img
                            src="https://saylani-welfare-uk.netlify.app/jhdjh.png"
                            alt="Saylani Logo"
                            style={{ height: "50px", marginRight: "10px" }}
                        />
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0570b4", fontFamily: "sans-serif" }}>
                            Saylani Micro Finance
                        </Typography>
                    </Box>

                    {/* Desktop Menu */}
                    {!isMobile && (
                        <>
                            {menuItems.map((item) => (
                                <Button onClick={() => naviagate(item.pageUrl)} key={item} sx={{ color: "black", textTransform: "none" }}>
                                    {item.pageName}
                                </Button>
                            ))}

                            {token ? (
                                <>
                                    <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "black", ml: "40px", mr: "10px" }}>
                                        Welcome, {currentUser.name}</Typography>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        sx={{
                                            ml: 1,
                                            textTransform: "none",
                                            borderRadius: "20px",
                                            color: "white",
                                        }}
                                        onClick={logout}
                                    >
                                        <LockIcon />
                                        Logout
                                    </Button>
                                </>
                            )


                                : (
                                    <>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            sx={{ ml: 2, textTransform: "none", borderRadius: "20px" }}
                                            onClick={() => naviagate('/login')}
                                        >
                                            <LockOpenIcon />
                                            Login
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            sx={{
                                                ml: 1,
                                                textTransform: "none",
                                                borderRadius: "20px",
                                                color: "white",
                                            }}
                                            onClick={() => naviagate("/register")}
                                        >
                                            <ExitToAppIcon />
                                            Register
                                        </Button>

                                    </>
                                )}

                        </>
                    )}

                    {/* Mobile Menu Icon */}
                    {isMobile && (
                        <IconButton color="inherit" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                    <List>
                        {menuItems.map((text) => (
                            <ListItem button key={text}>
                                <ListItemText onClick={() => naviagate(text.pageUrl)} primary={text.pageName} />
                            </ListItem>
                        ))}
                        {token ?
                            <>
                                <ListItem button>
                                    <ListItemText primary="logout" />
                                </ListItem>

                                <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "black", ml: "20px", mr: "10px" }}>
                                    Welcome, {currentUser.name}</Typography>
                            </>

                            :
                            <>
                                <ListItem button>
                                    <ListItemText primary="Login" />
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="Register" />
                                </ListItem>
                            </>
                        }

                    </List>
                </Box>
            </Drawer>
        </ThemeProvider>
    );
};

export default Navbar;
