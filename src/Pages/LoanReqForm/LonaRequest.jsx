import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
  Grid,
  CircularProgress,
} from "@mui/material";
import UserDashboardLayout from "../../Components/UserDashboardLayout/UserDashboardLayout";
import axios from "axios";
import { BASE_URL } from "../../../Utils";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


const theme = createTheme({
  palette: {
    primary: { main: "#1a7cbb" },
    secondary: { main: "#a9d469" },
  },
});

export default function LonaRequest() {

  let estimateData = JSON.parse((localStorage.getItem("estimate")))
  let user = JSON.parse((localStorage.getItem("currentUser")))

  const [loder, setLoder] = useState(false)
  const navigate = useNavigate()
  // User Info
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [cnic, setCnic] = useState(user.cnic);


  // Estimate
  const [initAmt, setInitAmt] = useState(estimateData.initAmt);
  const [loanPeriod, setLoanPeriod] = useState(estimateData.loanPeriod);
  const [monthlyInstallment, setMonthlyInstallment] = useState(estimateData.monthlyInstallment);
  const [remaining, setRemaining] = useState(estimateData.remaining);
  const [total, setTotal] = useState(estimateData.total);

  // Guarantor 1
  const [Name, setGuarantor1Name] = useState("");
  const [Email, setGuarantor1Email] = useState("");
  const [Cnic, setGuarantor1Cnic] = useState("");
  const [location, setGuarantor1Location] = useState("");

  // Guarantor 2
  const [Name2, setGuarantor2Name] = useState("");
  const [Email2, setGuarantor2Email] = useState("");
  const [Cnic2, setGuarantor2Cnic] = useState("");
  const [location2, setGuarantor2Location] = useState("");

  // Personal Info
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  // const [salarySlip, setSalarySlip] = useState("");
  // const [bankSlip, setBankSlip] = useState("");

  let userPayload = {
    userInfo: {
      name,
      email,
      cnic,
    },
    estimate: {
      initAmt,
      loanPeriod,
      remaining,
      total,
      monthlyInstallment
    },
    loanRequest: {
      guarantor1: {
        Name,
        Email,
        Cnic,
        location
      },
      guarantor2: {
        Name2,
        Email2,
        Cnic2,
        location2
      },
      personalInfo: {
        phoneNumber,
        address
      }
    }
  }

  const sentData = async () => {
    try {
      if (!name || !email || !cnic || !phoneNumber || !address || !Name || !Name2 || !Email || !Email2 || !Cnic || !Cnic2 || !location || !location2 || !initAmt || !total || !monthlyInstallment || !remaining || !loanPeriod) {
        return alert("Enter All field.")
      }
      setLoder(true)
      let result = await axios.post(`${BASE_URL}/request/sendLoanRequest`, userPayload, {
        headers: {
          "Authorization": `Bearer ${Cookies.get("token")}`
        }
      })

      console.log(result.data)
      alert(result.data.message)
      localStorage.removeItem("estimate")
      navigate("/UserDashboard")
    } catch (error) {
      setLoder(false)
      console.error(error)
      if (error.response && error.response.data) {
        alert(error.response.data.message)
      } else {
        alert(error.message)
      }
    }
  }
  return (
    <>
      <UserDashboardLayout>
        <ThemeProvider theme={theme}>
          <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
            <Typography variant="h4" color="#91c841" gutterBottom>
              Loan Request
            </Typography>

            {/* Estimate Data */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Estimate Data
                </Typography>
                <Grid container spacing={2}>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={"total Amount"}
                      value={estimateData.total}
                      onChange={(e) => setTotal(e.target.value)}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={"Loan Period"}
                      value={estimateData.loanPeriod}
                      onChange={(e) => setTotal(e.target.value)}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={"Monthly Installment"}
                      value={estimateData.monthlyInstallment}
                      onChange={(e) => setTotal(e.target.value)}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={"Remaining Amount"}
                      value={estimateData.remaining}
                      onChange={(e) => setTotal(e.target.value)}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={"Intial Amount"}
                      value={estimateData.initAmt}
                      onChange={(e) => setTotal(e.target.value)}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>

                </Grid>
              </CardContent>
            </Card>

            {/* Guarantor 1 */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Guarantor 1 Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField onChange={(e) => setGuarantor1Name(e.target.value)} label="Name" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField onChange={(e) => setGuarantor1Email(e.target.value)} label="Email" type="email" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField onChange={(e) => setGuarantor1Cnic(e.target.value)} label="CNIC" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField onChange={(e) => setGuarantor1Location(e.target.value)} label="Location" fullWidth />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Guarantor 2 */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Guarantor 2 Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField onChange={(e) => setGuarantor2Name(e.target.value)} label="Name" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField onChange={(e) => setGuarantor2Email(e.target.value)} label="Email" type="email" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField onChange={(e) => setGuarantor2Cnic(e.target.value)} label="CNIC" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField onChange={(e) => setGuarantor2Location(e.target.value)} label="Location" fullWidth />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Personal Info */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Your Personal Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField onChange={(e) => setPhoneNumber(e.target.value)} label="Phone Number" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField onChange={(e) => setAddress(e.target.value)} label="Address" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      color="secondary"
                    >
                      Upload Salary or bank Slip
                      <input type="file" hidden />
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Submit */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ py: 1.5, bgcolor: "#91c841" }}
              onClick={sentData}
            >
              {loder ? <CircularProgress color="success" /> : " Submit Request"}
            </Button>
          </Box>
        </ThemeProvider>
      </UserDashboardLayout>
    </>

  );
}
