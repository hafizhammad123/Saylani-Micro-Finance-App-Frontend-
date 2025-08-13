import React from "react";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    createTheme,
    ThemeProvider,
    Paper,
    Stack,
} from "@mui/material";
import UserLayout from "../../Components/UserLayout/UserLayout";

const saylaniTheme = createTheme({
    palette: {
        primary: { main: "#0D6EFD" }, // Saylani blue
        secondary: { main: "#28a745" }, // Saylani green
    },
});

export default function ContactPage() {
    return (
        <UserLayout>
            <ThemeProvider theme={saylaniTheme}>
                <Container sx={{ py: 5 }}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 4,
                            borderRadius: 3,
                            backgroundColor: "#f8f9fa",
                            maxWidth: 600,
                            mx: "auto",
                        }}
                    >
                        <Typography
                            variant="h4"
                            gutterBottom
                            textAlign="center"
                            fontWeight="bold"
                            color="primary"
                        >
                            Contact Us
                        </Typography>
                        <Typography
                            variant="body1"
                            textAlign="center"
                            color="text.secondary"
                            mb={4}
                        >
                            We’re here to help. Please fill out the form below and we’ll get
                            back to you shortly.
                        </Typography>

                        <Box component="form">
                            <Stack spacing={2}>
                                <TextField label="Full Name" variant="outlined" fullWidth required />
                                <TextField label="Email" type="email" variant="outlined" fullWidth required />
                                <TextField label="Phone Number" type="tel" variant="outlined" fullWidth />
                                <TextField label="Subject" variant="outlined" fullWidth />
                                <TextField
                                    label="Your Message"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    required
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        borderRadius: 2,
                                        fontWeight: "bold",
                                    }}
                                    color="primary"
                                    fullWidth
                                >
                                    Send Message
                                </Button>
                            </Stack>
                        </Box>
                    </Paper>
                </Container>
            </ThemeProvider>
        </UserLayout>
    );
}
