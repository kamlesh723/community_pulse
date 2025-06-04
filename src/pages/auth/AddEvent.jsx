import {
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Typography,
    Box,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = ["Technology", "Food", "Art", "Business", "Health", "Education", "Entertainment", "Music"];
const cities = ["Bangalore", "Delhi", "Hyderabad", "Pune", "Mumbai", "Chennai"];
const organizers = ["IIT Tech Club", "Foodies United", "Creative House", "Startup India", "Wellness Org", "ReadIndia", "Movie Buffs", "Music Lovers"];

function AddEvent({ addEvent }) {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        category: "",
        city: "",
        venue: "",
        description: "",
        price: "",
        date: "",
        organizer: "",
        seats: "",
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (
            !form.name ||
            !form.category ||
            !form.city ||
            !form.venue ||
            !form.description ||
            !form.price ||
            !form.date ||
            !form.organizer ||
            !form.seats ||
            !form.image
        ) {
            alert("Please fill all fields");
            return;
        }

        const newEvent = {
            ...form,
            id: Date.now(), // simple unique id
            price: Number(form.price),
            seats: Number(form.seats),
        };

        addEvent(newEvent);
        navigate("/"); // Redirect back to home page after submit
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}
        >
            <Typography variant="h5" mb={3} textAlign="center">
                Add New Event
            </Typography>

            <TextField
                fullWidth
                label="Event Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                margin="normal"
            />

            <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select name="category" value={form.category} onChange={handleChange} label="Category">
                    {categories.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                            {cat}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel>City</InputLabel>
                <Select name="city" value={form.city} onChange={handleChange} label="City">
                    {cities.map((city) => (
                        <MenuItem key={city} value={city}>
                            {city}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                fullWidth
                label="Venue"
                name="venue"
                value={form.venue}
                onChange={handleChange}
                margin="normal"
            />

            <TextField
                fullWidth
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                multiline
                rows={3}
                margin="normal"
            />

            <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                margin="normal"
            />

            <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                margin="normal"
            />

            <FormControl fullWidth margin="normal">
                <InputLabel>Organizer</InputLabel>
                <Select name="organizer" value={form.organizer} onChange={handleChange} label="Organizer">
                    {organizers.map((org) => (
                        <MenuItem key={org} value={org}>
                            {org}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                fullWidth
                label="Seats"
                name="seats"
                type="number"
                value={form.seats}
                onChange={handleChange}
                margin="normal"
            />

            <TextField
                fullWidth
                label="Image URL"
                name="image"
                value={form.image}
                onChange={handleChange}
                margin="normal"
            />

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                Add Event
            </Button>
        </Box>
    );
}

export default AddEvent;
