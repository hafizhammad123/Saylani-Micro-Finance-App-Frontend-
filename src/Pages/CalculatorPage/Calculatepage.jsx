import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
    createTheme,
    ThemeProvider,
    Paper,
} from "@mui/material";
import UserLayout from "../../Components/UserLayout/UserLayout";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const saylaniTheme = createTheme({
    palette: {
        primary: {
            main: "#0D6EFD", // Saylani Blue
        },
        secondary: {
            main: "#28A745", // Saylani Green
        },
    },
});

const categories = {
    "Wedding Loans": {
        sub: ["Valima", "Furniture", "Valima Food", "Jahez"],
        maxLoan: 500000,
        period: 3,
    },
    "Home Construction Loans": {
        sub: ["Structure", "Finishing", "Loan"],
        maxLoan: 1000000,
        period: 5,
    },
    "Business Startup Loans": {
        sub: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
        maxLoan: 1000000,
        period: 5,
    },
    "Education Loans": {
        sub: ["University Fees", "Child Fees Loan"],
        maxLoan: "Based on requirement",
        period: 4,
    },
};

export default function Calculatepage() {
    const [mainCat, setMainCat] = useState("");
    const [subCat, setSubCat] = useState("");
    const [initialDeposit, setInitialDeposit] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [loanPeriod, setLoanPeriod] = useState("");
    const [result, setResult] = useState(null);

    let navigate = useNavigate()

    const handleCalculate = () => {
        if (!mainCat || !subCat || !initialDeposit || !loanAmount || !loanPeriod) {
            return alert('enter all valid field..')
        }
        const initAmt = (loanAmount * (initialDeposit / 100)).toFixed(2);
        const remaining = (loanAmount - initAmt).toFixed(2);
        const months = loanPeriod * 12;
        const monthlyInstallment = (remaining / months).toFixed(2);


        setResult({
            total: loanAmount,
            initAmt,
            remaining,
            monthlyInstallment,
            loanPeriod
        });



    };

    let redirect = () => {
        let token = Cookies.get("token")
        localStorage.setItem('estimate', JSON.stringify(result))

        if (token) {
            navigate("/loanRequest")
        } else {
            navigate("/login")
        }
    }
    return (
        <UserLayout>
            <ThemeProvider theme={saylaniTheme}>
                <Container maxWidth="sm" sx={{ py: 4 }}>
                    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                        <Typography variant="h5" color="primary" gutterBottom>
                            Loan Calculator Form
                        </Typography>

                        <Stack spacing={2}>
                            {/* Main Category */}
                            <Select
                                value={mainCat}
                                displayEmpty
                                onChange={(e) => {
                                    setMainCat(e.target.value);
                                    setSubCat("");
                                }}
                            >
                                <MenuItem value="">Select Main Category</MenuItem>
                                {Object.keys(categories).map((cat) => (
                                    <MenuItem key={cat} value={cat}>
                                        {cat}
                                    </MenuItem>
                                ))}
                            </Select>

                            {/* Sub Category */}
                            <Select
                                value={subCat}
                                displayEmpty
                                onChange={(e) => setSubCat(e.target.value)}
                                disabled={!mainCat}
                            >
                                <MenuItem value="">Select Sub Category</MenuItem>
                                {mainCat &&
                                    categories[mainCat].sub.map((sub) => (
                                        <MenuItem key={sub} value={sub}>
                                            {sub}
                                        </MenuItem>
                                    ))}
                            </Select>

                            {/* Loan Info */}
                            {mainCat && (
                                <Box>
                                    <Typography variant="body2">
                                        Max Loan Amount:{" "}
                                        <strong>{categories[mainCat].maxLoan} PKR</strong>
                                    </Typography>
                                    <Typography variant="body2">
                                        Max Loan Period: <strong>{categories[mainCat].period} years</strong>
                                    </Typography>
                                    <Typography variant="body2">
                                        Max Initial Deposit: <strong>10% to 50%</strong>
                                    </Typography>
                                </Box>
                            )}

                            {/* Inputs */}
                            <TextField
                                label="Initial Deposit (%)"
                                type="number"
                                inputProps={{ min: 10, max: 50 }}
                                fullWidth
                                value={initialDeposit}
                                onChange={(e) => setInitialDeposit(e.target.value)}
                            />
                            <TextField
                                label="Loan Amount (PKR)"
                                type="number"
                                fullWidth
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(e.target.value)}
                            />
                            <Select
                                value={loanPeriod}
                                displayEmpty
                                onChange={(e) => setLoanPeriod(e.target.value)}
                            >
                                <MenuItem value="">Select Loan Period</MenuItem>
                                {[1, 2, 3].map((yr) => (
                                    <MenuItem key={yr} value={yr}>
                                        {yr} Year{yr > 1 ? "s" : ""}
                                    </MenuItem>
                                ))}
                            </Select>

                            {/* Calculate Button */}
                            <Button variant="contained" color="primary" onClick={handleCalculate}>
                                Calculate Estimate
                            </Button>

                            {/* Result Slip */}
                            {result && (
                                <Paper sx={{ p: 2, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
                                    <Typography variant="subtitle1">Loan Estimate</Typography>
                                    <Typography>Total Amount Required: {result.total} PKR</Typography>
                                    <Typography>Initial Deposit: {result.initAmt} PKR</Typography>
                                    <Typography>Remaining Amount: {result.remaining} PKR</Typography>
                                    <Typography>Loan Period: {result.loanPeriod} Year</Typography>
                                    <Typography>
                                        Monthly Installment: {result.monthlyInstallment} PKR
                                    </Typography>
                                    <Button
                                        sx={{ mt: 2 }}
                                        variant="contained"
                                        color="secondary"
                                        fullWidth
                                        onClick={redirect}
                                    >
                                        Proceed
                                    </Button>
                                </Paper>
                            )}
                        </Stack>
                    </Paper>
                </Container>
            </ThemeProvider>
        </UserLayout>

    );
}
