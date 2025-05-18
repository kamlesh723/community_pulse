import React, {useState} from "react";
import {
    Button,
    TextField,
    Typography,
    Container,
    Alert,
    Box,
    Link
} from "@mui/material";
import {useNavigate, Link as RouterLink} from "react-router-dom";
import {loginUser} from "../../API/API.jsx";

const Login = () => {
    const [form, setForm] = useState({email: "", password: ""});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleLogin = async () => {
        const {email, password} = form;

        if (!email || !password) {
            return setError("Both email and password are required.");
        }

        try {
            const response = await loginUser(email, password);

            console.log(response)

            // Extract token and save to localStorage
            const {token} = response.data;
            localStorage.setItem("token", token);

            // Redirect to home/dashboard
            navigate("/dashboard");
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError("Invalid credentials.");
            } else {
                setError("Login failed. Please try again.");
            }
        }
        window.location.reload();
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>User Login</Typography>
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
                type="password"
                label="Password"
                name="password"
                fullWidth
                margin="normal"
                value={form.password}
                onChange={handleChange}
            />
            <Button variant="contained" fullWidth onClick={handleLogin}>
                Login
            </Button>

            <Box mt={2} textAlign="center">
                <Typography variant="body2">
                    Don't have an account?{" "}
                    <Link component={RouterLink} to="/register">
                        Register here
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;
