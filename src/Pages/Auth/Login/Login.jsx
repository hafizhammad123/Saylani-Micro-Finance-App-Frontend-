import React, { useState } from "react";
import {
    Box,
    Stack,
    TextField,
    Button,
    Typography,
    createTheme,
    ThemeProvider,
    Link,
} from "@mui/material";
import { Links, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../../Utils";
import Cookies from "js-cookie";

const saylaniTheme = createTheme({
    palette: {
        primary: {
            main: "#0D6EFD"
        },
    },
});

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()


    let handalSubmit = async () => {
        try {
            if (!email || !password) {
                return alert("Enter all fields");
            }
            let loginObj = {
                email, password
            }
            let result = await axios.post(`${BASE_URL}/auth/login`, loginObj)
            console.log(result.data)
            alert(result.data.message)

            Cookies.set("token", result.data.token)
            localStorage.setItem("currentUser", JSON.stringify(result.data.findUser))

            let localData = JSON.parse((localStorage.getItem("estimate")))
            if (result.data.findUser?.type) {
                navigate('/admin')
            }
            else if (!result.data.findUser.isPassword) {
                navigate("/newPassword")
            } else if (localData) {
                navigate("/loanRequest")
            } else {
                navigate("/UserDashboard")
            }

        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message)
            } else {
                alert(error.message)
            }
        }

    };

    return (
        <ThemeProvider theme={saylaniTheme}>
            <Box
                sx={{
                    minHeight: "100vh",
                    backgroundImage:
                        "url('https://d2liqplnt17rh6.cloudfront.net/coverImages/bc033aaf-0f16-4983-a0e9-c94e9b07a3ca-311.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                }}
            >
                {/* White Overlay */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(255, 255, 255, 0.85)",
                        zIndex: 1,
                    }}
                />

                {/* Form Content */}
                <Box
                    sx={{
                        zIndex: 2,
                        width: "90%",
                        maxWidth: 400,
                        backgroundColor: "white",
                        p: 4,
                        borderRadius: 3,
                        boxShadow: 3,
                    }}
                >
                    <Typography
                        variant="h5"
                        textAlign="center"
                        mb={3}
                        fontWeight="bold"
                        color="primary"
                    >
                        Login Form
                    </Typography>

                    <Stack spacing={2}>

                        <TextField onChange={(e) => setEmail(e.target.value)} fullWidth label="Enter Email" variant="outlined" />
                        <TextField onChange={(e) => setPassword(e.target.value)} fullWidth label="Enter Password" variant="outlined" />

                        <Typography textAlign="center" variant="body2">

                            <NavLink style={{ textDecoration: "none", color: "#90c03c" }} to="/newPassword">
                                Forget Password
                            </NavLink>
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{ mt: 1, bgcolor: "#90c03c" }}
                            onClick={handalSubmit}
                        >
                            Login
                        </Button>

                        {/* Login Link */}
                        <Typography textAlign="center" variant="body2">
                            You Don't Have an account?{" "}
                            <NavLink style={{ textDecoration: "none", color: "#90c03c" }} to="/register">
                                Register
                            </NavLink>
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Login;
