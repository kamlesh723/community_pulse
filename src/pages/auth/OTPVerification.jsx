import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography, Container, Alert, Button } from "@mui/material";
import { verifyOtp } from "../../API/API.jsx"; // Implement this API call

const OTPVerification = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || localStorage.getItem("pendingEmail");

    const handleChange = (index, value) => {
        if (/^\d?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move focus to the next box
            if (value && index < otp.length - 1) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const handleVerify = async () => {
        const otpValue = otp.join("");
        if (otpValue.length !== 6) {
            return setError("Please enter the 6-digit OTP.");
        }
        try {
            const response = await verifyOtp(email, otpValue);
            if (response.status === 200) {
                localStorage.removeItem("pendingEmail");
                navigate("/login");
            }
        } catch (err) {
            setError("Invalid or expired OTP.");
        }
    };

    // Inline styles with white background and black text
    const styles = {
        container: {
            maxWidth: "350px",
            margin: "auto",
            backgroundColor: "#fff",
            color: "#000",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            fontFamily: "'Comic Sans MS', cursive, sans-serif",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        },
        title: {
            marginBottom: "10px"
        },
        otpInputs: {
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            margin: "20px 0"
        },
        otpBox: {
            width: "40px",
            height: "40px",
            textAlign: "center",
            fontSize: "20px",
            border: "2px solid #000",
            borderRadius: "8px",
            backgroundColor: "#fff",
            color: "#000",
            outline: "none",
            fontFamily: "'Comic Sans MS', cursive, sans-serif"
        },
        otpResend: {
            marginBottom: "20px"
        },
        verifyButton: {
            backgroundColor: "#007bff", // Blue
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "8px",
            fontFamily: "'Comic Sans MS', cursive, sans-serif"
        }
    };

    return (
        <Container style={styles.container}>
            <Typography variant="h5" gutterBottom style={styles.title}>
                OTP Verification
            </Typography>
            <Typography variant="body2" gutterBottom>
                We have sent a verification code to your email:{" "}
                <strong>{email}</strong>
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <div style={styles.otpInputs}>
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        id={`otp-input-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        style={styles.otpBox}
                    />
                ))}
            </div>
            <Typography variant="body2" style={styles.otpResend}>
                Didn’t receive the code? <a href="#">Try again</a>
            </Typography>
            <Button
                variant="contained"
                fullWidth
                onClick={handleVerify}
                style={styles.verifyButton}
            >
                Verify & continue
            </Button>
        </Container>
    );
};

export default OTPVerification;
