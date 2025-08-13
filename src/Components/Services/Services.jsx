import React from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button, Stack } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: { main: '#0D6EFD' },
        secondary: { main: '#87be41' },
    },
});

const services = [
    {
        title: "Wedding Loans",
        subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
        maxLoan: "PKR 5 Lakh",
        period: "3 years",
        img: "https://cashmax.com.sg/wp-content/uploads/2024/01/CM-WL-IMG-1.jpg",
    },
    {
        title: "Home Construction Loans",
        subcategories: ["Structure", "Finishing", "Loan"],
        maxLoan: "PKR 10 Lakh",
        period: "5 years",
        img: "https://media.licdn.com/dms/image/C5112AQGwzjInNts_Mw/article-cover_image-shrink_720_1280/0/1578723579961?e=2147483647&v=beta&t=JUGPOjy2HMAPx1jKu9u59kj9gFKIP82HQYk1Xw-JIl8",
    },
    {
        title: "Business Startup Loans",
        subcategories: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
        maxLoan: "PKR 10 Lakh",
        period: "5 years",
        img: "https://cloudvisor.co/wp-content/uploads/2024/07/Finding-the-Best-Business-Loans-for-Startups-01.png",
    },
    {
        title: "Education Loans",
        subcategories: ["University Fees", "Child Fees Loan"],
        maxLoan: "Based on requirement",
        period: "4 years",
        img: "https://www.properties.market/ae/blog/wp-content/uploads/2023/09/How-to-apply-for-Student-Loans-in-the-UAE.png",
    },
];

const Services = () => {
    const navigate = useNavigate()
    return (
        <ThemeProvider theme={theme}>

            <Typography
                variant="h4"
                sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    mb: 4,
                    color: theme.palette.secondary.main,
                    mt: "50px"
                }}
            >
                Our Loans Services
            </Typography>

            <Stack
                flexDirection={"row"}
                justifyContent={"center"} 
                alignItems={"center"}
                sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, backgroundColor: "#f9f9f9" }}
            >
                <Grid
                    container
                    spacing={3}
                    alignItems="stretch"
                    justifyContent={{ xs: 'center', md: 'center' }}
                >
                    {services.map((service, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index} display="flex" justifyContent="center">
                            <Card
                                sx={{
                                    height: "100%",
                                    width: "320px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    borderRadius: 3,
                                    boxShadow: 3,
                                    transition: "0.3s",
                                    "&:hover": { boxShadow: 6, transform: "translateY(-5px)" },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="180"
                                    width={"100%"}
                                    image={service.img}
                                    alt={service.title}
                                />
                                <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <Typography variant="h6" sx={{ color: theme.palette.secondary.main, fontWeight: "bold", textAlign: "center" }}>
                                        {service.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1, color: "#555", textAlign: "center" }}>
                                        <strong>Subcategories:</strong> {service.subcategories.join(", ")}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1, color: "#555", textAlign: "center" }}>
                                        <strong>Max Loan:</strong> {service.maxLoan}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1, color: "#555", textAlign: "center" }}>
                                        <strong>Loan Period:</strong> {service.period}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ textAlign: "center", pb: 2 }}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            bgcolor: theme.palette.primary.main,
                                            color: "white",
                                            borderRadius: 20,
                                            px: 3,
                                            "&:hover": { bgcolor: "#0b5ed7" },
                                        }}
                                        onClick={() => navigate("/calculate")}
                                    >
                                        View Details
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </ThemeProvider>
    );
};

export default Services;
