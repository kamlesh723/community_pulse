import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid } from '@mui/material';

const AddEventPage = ({ setAllEvents, closeModal }) => {
    const [form, setForm] = useState({
        name: '',
        date: '',
        city: '',
        venue: '',
        price: '',
        description: '',
        image: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add new event to the parent (Home) state
        setAllEvents((prevEvents) => [
            ...prevEvents,
            { ...form, id: prevEvents.length + 1 }
        ]);
        alert('Event added!');
        closeModal(); // Close modal after adding the event
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Add Event</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}><TextField fullWidth label="Event Name" name="name" value={form.name} onChange={handleChange} required /></Grid>
                    <Grid item xs={12}><TextField fullWidth type="date" label="Date" name="date" InputLabelProps={{ shrink: true }} value={form.date} onChange={handleChange} required /></Grid>
                    <Grid item xs={12}><TextField fullWidth label="City" name="city" value={form.city} onChange={handleChange} required /></Grid>
                    <Grid item xs={12}><TextField fullWidth label="Venue" name="venue" value={form.venue} onChange={handleChange} required /></Grid>
                    <Grid item xs={12}><TextField fullWidth type="number" label="Price (₹)" name="price" value={form.price} onChange={handleChange} required /></Grid>
                    <Grid item xs={12}><TextField fullWidth label="Image URL" name="image" value={form.image} onChange={handleChange} required /></Grid>
                    <Grid item xs={12}><TextField fullWidth multiline rows={3} label="Description" name="description" value={form.description} onChange={handleChange} required /></Grid>
                    <Grid item xs={12}><Button type="submit" variant="contained">Add Event</Button></Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default AddEventPage;
