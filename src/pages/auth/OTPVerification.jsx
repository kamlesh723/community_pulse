
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, Button, Typography, Container, Alert } from "@mui/material";
import { verifyOtp } from "../../API/API.jsx"; // You'll implement this API call

const OTPVerification = () => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    // Get email from location state or localStorage
    const email = location.state?.email || localStorage.getItem("pendingEmail");

    const handleVerify = async () => {
        if (!otp) return setError("Please enter the OTP.");
        try {
            const response = await verifyOtp(email, otp);
            if (response.status === 200) {
                localStorage.removeItem("pendingEmail");
                navigate("/login");
            }
        } catch (err) {
            setError("Invalid or expired OTP.");
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h5" gutterBottom>
                Verify OTP
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
                label="Enter OTP"
                fullWidth
                margin="normal"
                value={otp}
                onChange={e => setOtp(e.target.value)}
            />
            <Button variant="contained" fullWidth onClick={handleVerify}>
                Verify
            </Button>
        </Container>
    );
};

export default OTPVerification;
