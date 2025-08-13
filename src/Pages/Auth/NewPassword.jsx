import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
    createTheme,
    ThemeProvider
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../../Utils";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const saylaniTheme = createTheme({
    palette: {
        primary: { main: "#0D6EFD" },
        secondary: { main: "#198754" }
    }
});

const NewPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            if (!password || !confirmPassword) {
                setError("Please fill both fields.");
            } else if (password !== confirmPassword) {
                setError("Passwords do not match.");
            } else {
                setError("");
                let data = localStorage.getItem("currentUser")
                let cnic;
                if (data) {
                    let userData = JSON.parse(data)
                    cnic = userData.cnic
                }

                let result = await axios.patch(`${BASE_URL}/auth/newPassword/${cnic}`, { password }, {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("token")}`
                    }
                })

                let localData = JSON.parse((localStorage.getItem("estimate")))

                if(localData){
                    navigate("/loanRequest")
                }else{
                    navigate("/UserDashboard")
                }

                console.log(result.data)
                alert(result.data.message)

            };
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message)
            } else {
                alert(error.message)
            }
        }

    }

    return (
        <ThemeProvider theme={saylaniTheme}>
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ p: 4, mt: 6, borderRadius: 3 }}>
                    <Typography
                        variant="h5"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: "bold", color: "#0D6EFD" }}
                    >
                        Create New Password
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="New Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        {error && (
                            <Typography
                                color="error"
                                sx={{ mt: 1, fontWeight: "bold" }}
                            >
                                {error}
                            </Typography>
                        )}

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            sx={{ mt: 3, py: 1.3, fontSize: "1rem" }}
                        >
                            Update Password
                        </Button>
                    </form>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default NewPassword;
