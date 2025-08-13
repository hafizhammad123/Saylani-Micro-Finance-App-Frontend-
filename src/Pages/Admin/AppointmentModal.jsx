import React, { useState } from "react";
import { Box, Modal, Typography, TextField, Button, Stack } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../../Utils";
import Cookies from "js-cookie";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "white",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
    width: 400
};

export default function AppointmentModal({ data, open, setOpen }) {
    
    const [formData, setFormData] = useState({
        tokenID: data.userInfo.cnic,
        appointmentDate: "",
        appointmentTime: "",
        appointmentLocation: ""
    });

    let handleClose = () => {
        setOpen(false)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            let result = await axios.post(`${BASE_URL}/appointment`, formData, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            })

            console.log(result.data)
            alert(result.data.message)
            handleClose();
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message)
            } else {
                alert(error.message)
            }
        }
    }


    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography
                    variant="h6"
                    sx={{ color: "green", fontWeight: "bold", mb: 2 }}
                >
                    Appointment Details
                </Typography>
                <Stack spacing={2}>
                    <TextField
                        label="Token ID"
                        name="tokenID"
                        value={formData.tokenID}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Appointment Date"
                        type="date"
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Appointment Time"
                        type="time"
                        name="appointmentTime"
                        value={formData.appointmentTime}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Appointment Location"
                        name="appointmentLocation"
                        value={formData.appointmentLocation}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: "blue",
                            "&:hover": { bgcolor: "darkblue" }
                        }}
                        onClick={handleSubmit}
                    >
                        Save Appointment
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}
