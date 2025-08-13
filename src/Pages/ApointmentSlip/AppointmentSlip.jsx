// AppointmentSlip.jsx
import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Box, Divider } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { jsPDF } from "jspdf";
import axios from "axios";
import { BASE_URL } from "../../../Utils";
import UserDashboardLayout from "../../Components/UserDashboardLayout/UserDashboardLayout";

const AppointmentSlip = () => {

    const [appointment, setAppointment] = useState([])

    useEffect(() => {
        GetSLip()
    }, [])

    let user = JSON.parse((localStorage.getItem("currentUser")))



    let GetSLip = async () => {
        try {


            let result = await axios.get(`${BASE_URL}/appointment/${user.cnic}`)
            console.log(result.data)
            alert(result.data.message)
            setAppointment(result.data.result)
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message)
            } else {
                alert(error.message)
            }
        }
    }

    const handleDownload = (appointment) => {
        const doc = new jsPDF();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("Appointment Slip", 20, 20);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Token ID: ${appointment.tokenID}`, 20, 40);
        doc.text(`Date: ${new Date(appointment.appointmentDate).toLocaleDateString()}`, 20, 50);
        doc.text(`Time: ${appointment.appointmentTime}`, 20, 60);
        doc.text(`Location: ${appointment.appointmentLocation}`, 20, 70);
        doc.text(`Status: ${appointment.isPending ? "Pending" : "Confirmed"}`, 20, 80);

        doc.save(`appointment-slip-${appointment.tokenID}.pdf`);
    };

    return (
        <UserDashboardLayout>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>

                {appointment.map((appointment) => {
                    return <>
                        <Card
                            sx={{
                                width: 350,
                                borderRadius: 3,
                                boxShadow: 5,
                                bgcolor: "#e3f2fd",
                                border: "2px solid #1976d2",
                            }}
                        >


                            <CardContent>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        color: "#1976d2",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        mb: 2,
                                    }}
                                >
                                    Appointment Slip
                                </Typography>

                                <Divider sx={{ mb: 2 }} />

                                <Typography variant="body1">
                                    <strong>Token ID:</strong> {appointment.tokenID}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Date:</strong>{" "}
                                    {new Date(appointment.appointmentDate).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Time:</strong> {appointment.appointmentTime}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Location:</strong> {appointment.appointmentLocation}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: appointment.isPending ? "orange" : "green",
                                        fontWeight: "bold",
                                        mt: 1,
                                    }}
                                >
                                    Status: {appointment.isPending ? "Pending" : "Confirmed"}
                                </Typography>

                                <Box sx={{ textAlign: "center", mt: 3 }}>
                                    <Button
                                        variant="contained"
                                        startIcon={<DownloadIcon />}
                                        sx={{
                                            backgroundColor: "#1976d2",
                                            "&:hover": { backgroundColor: "#115293" },
                                        }}
                                        onClick={() => handleDownload(appointment)}
                                    >
                                        Download
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card >

                    </>
                })}
            </Box>
        </UserDashboardLayout>

    );
};

export default AppointmentSlip;
