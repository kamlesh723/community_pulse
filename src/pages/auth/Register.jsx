import React, { useState } from 'react';
import {
    Container, TextField, Button, Typography, Box, Grid
} from '@mui/material';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const validate = () => {
        let tempErrors = {};

        if (!formData.username) tempErrors.username = "Username is required.";
        if (!formData.email) tempErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is not valid.";

        if (!formData.phone) tempErrors.phone = "Phone number is required.";
        else if (!/^\d{10}$/.test(formData.phone)) tempErrors.phone = "Phone number must be 10 digits.";

        if (!formData.password) tempErrors.password = "Password is required.";
        else if (formData.password.length < 6) tempErrors.password = "Password must be at least 6 characters.";

        if (formData.password !== formData.confirmPassword) {
            tempErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(tempErrors);

        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form submitted:', formData);
            alert('Registered successfully!');
            // You can now send formData to an API or backend here
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5 }}>
                <Typography variant="h4" gutterBottom>
                    Register
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
                                fullWidth label="Email" name="email"
                                value={formData.email} onChange={handleChange}
                                error={!!errors.email} helperText={errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth label="Phone Number" name="phone"
                                value={formData.phone} onChange={handleChange}
                                error={!!errors.phone} helperText={errors.phone}
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
                            <TextField
                                fullWidth label="Confirm Password" name="confirmPassword" type="password"
                                value={formData.confirmPassword} onChange={handleChange}
                                error={!!errors.confirmPassword} helperText={errors.confirmPassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth type="submit" variant="contained" color="primary">
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default Register;
