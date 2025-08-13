import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Divider,
    Button,
    Grid,
} from "@mui/material";
import AdminLayout from "../../Components/AdminLayout/adminLayout";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../../../Utils";
import AppointmentModal from "./AppointmentModal";

const AllRequestDetail = () => {

    let { id } = useParams()

    const [data, setData] = useState([])
    const [loder, setLoder] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        getSingleData()
    }, [])

    const getSingleData = async () => {
        try {

            let result = await axios.get(`${BASE_URL}/request/getloanRequets/${id}`, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            })

            console.log(result.data)
            setData(result.data.result)
            setLoder(true)
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message)
            } else {
                alert(error.message)
            }
        }
    }

    let OpenModal = () => {
        setOpen(true)
    }

    if (!loder) return <Typography>Loading...</Typography>;

    return (
        <AdminLayout>
            <Box sx={{ p: 3, bgcolor: "#f5f6fa", minHeight: "100vh" }}>
                {/* Heading */}
                <Typography variant="h4" sx={{ mb: 3, color: "#0D6EFD", fontWeight: "bold" }}>
                    Loan Request Details
                </Typography>

                {/* User Info */}
                <Paper sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h6" sx={{ color: "#0D6EFD", mb: 1 }}>User Information</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid sx={{ fontFamily: "sans-serif" }} container spacing={2}>
                        <Grid item xs={6}><b>Name:</b> {data.userInfo.name}</Grid>
                        <Grid item xs={6}><b>Email:</b> {data.userInfo.email}</Grid>
                        <Grid item xs={6}><b>CNIC:</b> {data.userInfo.cnic}</Grid>
                    </Grid>
                </Paper>

                {/* Estimate */}
                <Paper sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h6" sx={{ color: "#0D6EFD", mb: 1 }}>Loan Estimate</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid sx={{ fontFamily: "sans-serif" }} container spacing={2}>
                        <Grid item xs={4}><b>Initial Amount:</b> {data.estimate.initAmt}</Grid>
                        <Grid item xs={4}><b>Loan Period:</b> {data.estimate.loanPeriod} months</Grid>
                        <Grid item xs={4}><b>Monthly Installment:</b> {data.estimate.monthlyInstallment}</Grid>
                        <Grid item xs={4}><b>Remaining:</b> {data.estimate.remaining}</Grid>
                        <Grid item xs={4}><b>Total:</b> {data.estimate.total}</Grid>
                    </Grid>
                </Paper>

                {/* Guarantor 1 */}
                <Paper sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h6" sx={{ color: "#0D6EFD", mb: 1 }}>Guarantor 1</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid sx={{ fontFamily: "sans-serif" }} container spacing={2}>
                        <Grid item xs={6}><b>Name:</b> {data.loanRequest.guarantor1.Name}</Grid>
                        <Grid item xs={6}><b>Email:</b> {data.loanRequest.guarantor1.Email}</Grid>
                        <Grid item xs={6}><b>CNIC:</b> {data.loanRequest.guarantor1.Cnic}</Grid>
                        <Grid item xs={6}><b>Location:</b> {data.loanRequest.guarantor1.location}</Grid>
                    </Grid>
                </Paper>

                {/* Guarantor 2 */}
                <Paper sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h6" sx={{ color: "#0D6EFD", mb: 1 }}>Guarantor 2</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid sx={{ fontFamily: "sans-serif" }} container spacing={2}>
                        <Grid item xs={6}><b>Name:</b> {data.loanRequest.guarantor2.Name2}</Grid>
                        <Grid item xs={6}><b>Email:</b> {data.loanRequest.guarantor2.Email2}</Grid>
                        <Grid item xs={6}><b>CNIC:</b> {data.loanRequest.guarantor2.Cnic2}</Grid>
                        <Grid item xs={6}><b>Location:</b> {data.loanRequest.guarantor2.location2}</Grid>
                    </Grid>
                </Paper>

                {/* Personal Info */}
                <Paper sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h6" sx={{ color: "#0D6EFD", mb: 1 }}>Personal Info</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid sx={{ fontFamily: "sans-serif" }} container spacing={2}>
                        <Grid item xs={6}><b>Phone:</b> {data.loanRequest.personalInfo.phoneNumber}</Grid>
                        <Grid item xs={6}><b>Address:</b> {data.loanRequest.personalInfo.address}</Grid>
                        <Grid item xs={6}><b>Salary Slip:</b> {data.loanRequest.personalInfo.salarySlip}</Grid>
                        <Grid item xs={6}><b>Bank Slip:</b> {data.loanRequest.personalInfo.bankSlip}</Grid>
                    </Grid>
                </Paper>

                <AppointmentModal data={data} open={open} setOpen={setOpen} />
                {/* Button */}
                <Box sx={{ textAlign: "right" }}>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: "#28a745",
                            "&:hover": { bgcolor: "#218838" },
                            px: 3,
                            py: 1
                        }}
                        onClick={OpenModal}
                    >
                        Create Slip
                    </Button>
                </Box>
            </Box>
        </AdminLayout>

    );
};

export default AllRequestDetail;
