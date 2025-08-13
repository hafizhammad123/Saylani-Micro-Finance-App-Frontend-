import React, { useState } from "react";
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    createTheme,
    ThemeProvider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import LockResetIcon from "@mui/icons-material/LockReset";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const drawerWidth = 240;

const theme = createTheme({
    palette: {
        primary: {
            main: "#1a7cbb",
        },
        secondary: {
            main: "#a9d469",
        },
    },
});

const menuItems = [
    { text: "Home", url: "/", icon: <HomeIcon /> },
    { text: "Loan Request", url: "/calculate", icon: <RequestQuoteIcon /> },
    { text: "Change Password", url: "/newPassword", icon: <LockResetIcon /> },
    { text: "View Appointment Slip", url: "/appointmentSlip", icon: <EventNoteIcon /> },
    { text: "View Your Loan Request", url: "/UserloanReq", icon: <ReceiptLongIcon /> },

];

export default function UserDashboardLayout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    let navigate = useNavigate()

    let currentUser = JSON.parse((localStorage.getItem("currentUser")))

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    let logout = () => {
        localStorage.removeItem("currentUser")
        navigate("/")
        Cookies.remove("token")
    }

    const drawer = (
        <div>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    p: 2,
                }}
            >
                <img
                    src="https://saylani-welfare-uk.netlify.app/jhdjh.png"
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                />
                <Typography variant="h6" sx={{ color: '#91c841', mt: 1, textAlign: "center", fontWeight: "bold" }}>
                    User Dashboard
                </Typography>
            </Box>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton onClick={() => navigate(item.url)}>
                            <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disablePadding>
                    <ListItemButton onClick={logout}>
                        <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                            <LockResetIcon />
                        </ListItemIcon>
                        <ListItemText>Log out</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: "none" } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Welcome, {currentUser.name}
                        </Typography>
                    </Toolbar>
                </AppBar>
                {/* Drawer for Mobile */}
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                >
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: "block", sm: "none" },
                            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    {/* Drawer for Desktop */}
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: "none", sm: "block" },
                            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                {/* Main Content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                    }}
                >
                    <Toolbar />
                    {children || <Typography>Page Content Goes Here</Typography>}
                </Box>
            </Box>
        </ThemeProvider>
    );
}
