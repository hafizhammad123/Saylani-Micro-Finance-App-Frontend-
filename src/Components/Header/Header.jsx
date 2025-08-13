import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: { primary: { main: '#0D6EFD' }, secondary: { main: '#fff' } },
});

const Header = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    position: 'relative',
                    height: { xs: '60vh', md: '80vh' },
                    background: 'url(https://dezerv-strapi-test.s3.ap-south-1.amazonaws.com/front_view_finance_business_elements_assortment_4a5903ab2d.jpg) center/cover no-repeat',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textAlign: 'center',
                    px: 2,
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        bgcolor: 'rgba(0, 0, 0, 0.4)',
                    },
                }}
            >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography
                        variant="h3"
                        component="h1"
                        sx={{
                            fontWeight: 'bold',
                            mb: 2,
                            color: "#87be41",
                            textTransform: "capitalize",
                            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" }, // responsive
                        }}
                    >
                        Saylani ke Khidmat mein Aapka Bhrosa, Humari Zimmedari
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            mb: 3,
                            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" }, // responsive
                        }}
                    >
                        Humari financial services, aap ki growth aur behtari ke liye.
                    </Typography>

                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            borderRadius: 20,
                            px: { xs: 3, sm: 4 },
                            py: { xs: 1, sm: 1.2 },
                            bgcolor: '#0D6EFD',
                            color: "white",
                            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                        }}
                    >
                        View Details
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Header;
