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
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../../Utils";

const saylaniTheme = createTheme({
    palette: {
        primary: {
            main: "#0D6EFD"
        },
    },
});

const Register = () => {

    let navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [cnic, setCnic] = useState("");
    const [name, setName] = useState("");

    let handalSubmit = async () => {
        try {
            if (!email || !cnic || !name) {
                return alert("Enter all fields");
            }

            let userObj = {
                email, cnic, name
            }
            let result = await axios.post(`${BASE_URL}/auth/register`, userObj)
            console.log(result.data)
            alert(result.data.message)
          
            navigate("/login")

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
                        Register Form
                    </Typography>

                    <Stack spacing={2}>
                        <TextField onChange={(e) => setCnic(e.target.value)} fullWidth label="Enter CNIC" variant="outlined" />
                        <TextField onChange={(e) => setName(e.target.value)} fullWidth label="Enter Name" variant="outlined" />
                        <TextField onChange={(e) => setEmail(e.target.value)} fullWidth label="Enter Email" variant="outlined" />

                        <Button
                            variant="contained"
                            size="large"
                            sx={{ mt: 1, bgcolor: "#90c03c" }}
                            onClick={handalSubmit}
                        >
                            Register
                        </Button>

                        {/* Login Link */}
                        <Typography textAlign="center" variant="body2">
                            Have an account?{" "}
                            <NavLink style={{ textDecoration: "none", color: "#90c03c" }} to="/login">
                                Login
                            </NavLink>
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Register;
