import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    TextField,
    Button,
    Typography,
    Container,
    Box,
    Alert,
    Link
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {registerUser} from "../../API/API.jsx";

const Register = () => {
    const [form, setForm] = useState({
        email: "",
        username: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleRegister = async () => {
        const { email, username, phone, password, confirmPassword } = form;

        if (!email || !username || !phone || !password || !confirmPassword) {
            return setError("All fields are required.");
        }

        if (password !== confirmPassword) {
            return setError("Passwords do not match.");
        }

        try {
            const response = await registerUser(email, username, phone, password);

            if (response.status === 200) {
                // Save form data temporarily for OTP verification
                localStorage.setItem("pendingUser", JSON.stringify(form));
                navigate("/otp-verification", { state: { email } });
            } else {
                // Show error message if OTP sending failed or any other issue occurs
                setError(response.data || "Failed to send OTP. Please try again.");
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data);
            } else {
                setError("Failed to send OTP. Please try again.");
            }
        }
    };


    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Register User
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                margin="normal"
                value={form.email}
                onChange={handleChange}
            />
            <TextField
                label="Username"
                name="username"
                fullWidth
                margin="normal"
                value={form.username}
                onChange={handleChange}
            />
            <TextField
                label="Phone Number"
                name="phone"
                fullWidth
                margin="normal"
                value={form.phone}
                onChange={handleChange}
            />
            <TextField
                type="password"
                label="Password"
                name="password"
                fullWidth
                margin="normal"
                value={form.password}
                onChange={handleChange}
            />
            <TextField
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                fullWidth
                margin="normal"
                value={form.confirmPassword}
                onChange={handleChange}
            />
            <Button variant="contained" fullWidth onClick={handleRegister}>
                Register
            </Button>

            <Box mt={2} textAlign="center">
                <Typography variant="body2">
                    Already have an account?{" "}
                    <Link component={RouterLink} to="/login">
                        Login here
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Register;
