import React, { useState } from 'react';
import {
    Container, TextField, Button, Typography, Box, Grid, Link
} from '@mui/material';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const validate = () => {
        let tempErrors = {};

        if (!formData.username) tempErrors.username = "Username is required.";
        if (!formData.password) tempErrors.password = "Password is required.";

        setErrors(tempErrors);

        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Login submitted:', formData);
            alert('Logged in successfully!');
            // Handle login logic here (e.g. API call)
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5 }}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth label="Username" name="username"
                                value={formData.username} onChange={handleChange}
                                error={!!errors.username} helperText={errors.username}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth label="Password" name="password" type="password"
                                value={formData.password} onChange={handleChange}
                                error={!!errors.password} helperText={errors.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth type="submit" variant="contained" color="primary">
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>

                {/* Register Now Link */}
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="body2">
                        <span>Don't have an account? </span>
                        <Link href="/register" variant="body2" underline="hover">
                            Register Now
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
