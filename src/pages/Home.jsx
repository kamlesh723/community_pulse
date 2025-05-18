import {
    Card, CardContent, Typography, Grid, CardActions, Button,
    Dialog, DialogTitle, DialogContent, DialogActions,
    Select, MenuItem, FormControl, InputLabel, Pagination,
    TextField, Slider, Box
} from "@mui/material";
import { useState } from "react";

// Sample events
const allEvents = [
    {
        id: 1,
        name: "Tech Fest",
        category: "Technology",
        city: "Bangalore",
        venue: "City Convention Center",
        description: "3-day tech fest",
        price: 499,
        date: "2025-06-21",
        organizer: "IIT Tech Club",
        seats: 120,
        image: "https://plus.unsplash.com/premium_photo-1664474653221-8412b8dfca3e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXZlbnR8ZW58MHx8MHx8fDA%3D"
    },
    {
        id: 2,
        name: "Food Carnival",
        category: "Food",
        city: "Delhi",
        venue: "Central Park",
        description: "Explore global cuisine",
        price: 299,
        date: "2025-07-05",
        organizer: "Foodies United",
        seats: 0,
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D"
    },
    {
        id: 3,
        name: "Art Night",
        category: "Art",
        city: "Bangalore",
        venue: "Amphitheatre",
        description: "Live music & art",
        price: 150,
        date: "2025-06-25",
        organizer: "Creative House",
        seats: 25,
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZXZlbnR8ZW58MHx8MHx8fDA%3D"
    },
    {
        id: 4,
        name: "Startup Meetup",
        category: "Business",
        city: "Hyderabad",
        venue: "Tech Hub",
        description: "Networking event",
        price: 250,
        date: "2025-08-01",
        organizer: "Startup India",
        seats: 60,
        image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGV2ZW50fGVufDB8fDB8fHww"
    },
    {
        id: 5,
        name: "Yoga Retreat",
        category: "Health",
        city: "Pune",
        venue: "Green Valley",
        description: "Mindfulness retreat",
        price: 350,
        date: "2025-06-30",
        organizer: "Wellness Org",
        seats: 15,
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGV2ZW50fGVufDB8fDB8fHww"
    },
    {
        id: 6,
        name: "Book Fair",
        category: "Education",
        city: "Delhi",
        venue: "Expo Hall",
        description: "Thousands of books",
        price: 50,
        date: "2025-07-10",
        organizer: "ReadIndia",
        seats: 100,
        image: "https://plus.unsplash.com/premium_photo-1672354234377-38ef695dd2ed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGV2ZW50fGVufDB8fDB8fHww"
    },
    {
        id: 7,
        name: "Film Festival",
        category: "Entertainment",
        city: "Mumbai",
        venue: "Grand Cinema",
        description: "Premieres and awards",
        price: 399,
        date: "2025-06-22",
        organizer: "Movie Buffs",
        seats: 5,
        image: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGV2ZW50fGVufDB8fDB8fHww"
    },
    {
        id: 8,
        name: "Music Concert",
        category: "Music",
        city: "Chennai",
        venue: "Stadium Arena",
        description: "Live concert with famous bands",
        price: 499,
        date: "2025-07-15",
        organizer: "Music Lovers",
        seats: 200,
        image:"https://images.unsplash.com/photo-1472653431158-6364773b2a56?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];

const categories = ["All", ...new Set(allEvents.map(e => e.category))];
const cities = ["All", ...new Set(allEvents.map(e => e.city))];
const organizers = ["All", ...new Set(allEvents.map(e => e.organizer))];

function Home() {
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [cityFilter, setCityFilter] = useState("All");
    const [organizerFilter, setOrganizerFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [eventDate, setEventDate] = useState("");
    const [onlyAvailableSeats, setOnlyAvailableSeats] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [page, setPage] = useState(1);
    const eventsPerPage = 12;

    const handleOpenModal = (event) => {
        setSelectedEvent(event);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedEvent(null);
    };

    const filteredEvents = allEvents.filter(event => {
        const matchesCategory = categoryFilter === "All" || event.category === categoryFilter;
        const matchesCity = cityFilter === "All" || event.city === cityFilter;
        const matchesOrganizer = organizerFilter === "All" || event.organizer === organizerFilter;
        const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = event.price >= priceRange[0] && event.price <= priceRange[1];
        const matchesDate = eventDate ? event.date === eventDate : true;
        const matchesSeats = !onlyAvailableSeats || event.seats > 0;

        return matchesCategory && matchesSearch && matchesPrice && matchesDate && matchesCity && matchesOrganizer && matchesSeats;
    });

    const paginatedEvents = filteredEvents.slice((page - 1) * eventsPerPage, page * eventsPerPage);
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

    return (
        <>
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    mt: 4, // Adds margin-top to give some space above the title
                    mb: 2, // Adds margin-bottom to give space below the title
                    padding: '0 16px', // Adds horizontal padding (left and right)
                    fontWeight: 600, // Optional: You can make the text bold
                    color: '#333', // Optional: You can set the text color (default is black)
                }}
            >
                Events in Your City
            </Typography>


            {/* Filters */}
            <Grid container spacing={5} sx={{ mb: 3 }}>
                {/* Category Filter */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}>
                            {categories.map((cat, i) => (
                                <MenuItem value={cat} key={i}>{cat}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* City Filter */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                        <InputLabel>City</InputLabel>
                        <Select value={cityFilter} onChange={(e) => { setCityFilter(e.target.value); setPage(1); }}>
                            {cities.map((city, i) => (
                                <MenuItem value={city} key={i}>{city}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Organizer Filter */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                        <InputLabel>Organizer</InputLabel>
                        <Select value={organizerFilter} onChange={(e) => { setOrganizerFilter(e.target.value); setPage(1); }}>
                            {organizers.map((org, i) => (
                                <MenuItem value={org} key={i}>{org}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Search Field */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        label="Search"
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                        sx={{
                            width: "100%", // Ensures the TextField takes up the full width of its container
                            '& .MuiInputBase-root': {
                                padding: '8px 14px', // Padding inside the text field
                                height: '40px', // Set a normal height for the input field
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '1rem', // Adjust the font size of the label if necessary
                            },
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '4px', // Optional: to adjust the border radius if needed
                            },
                        }}
                    />
                </Grid>


                {/* Price Range */}


                {/* Event Date */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        type="date"
                        label="Event Date"
                        InputLabelProps={{ shrink: true }}
                        value={eventDate}
                        onChange={(e) => { setEventDate(e.target.value); setPage(1); }}
                        fullWidth
                        sx={{
                            width: "100%", // Ensures the text field takes up the full width of the container
                            '& .MuiInputBase-root': {
                                padding: '8px 14px', // Padding inside text field
                                height: '40px', // Set the height for a consistent input field size
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '1rem', // Adjust the font size of the label
                            },
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '4px', // Optional: to adjust the border radius if needed
                            },
                        }}
                    />
                </Grid>


                {/* Seats Filter */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                        <InputLabel>Seats Filter</InputLabel>
                        <Select
                            value={onlyAvailableSeats ? "Available" : "All"}
                            onChange={(e) => {
                                setOnlyAvailableSeats(e.target.value === "Available");
                                setPage(1);
                            }}
                            sx={{
                                width: "100%", // Ensures the Select takes up the full width of the container
                                '& .MuiSelect-select': {
                                    padding: '8px 14px', // Padding inside the select input field
                                    height: '40px', // Set the height to match the Search field (40px)
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: '1rem', // Adjust the font size of the label
                                },
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '4px', // Optional: adjust the border radius if needed
                                },
                                '& .MuiSelect-icon': {
                                    top: 'calc(50% - 12px)', // Adjust the position of the dropdown icon vertically if necessary
                                },
                            }}
                        >
                            <MenuItem value="All">All Events</MenuItem>
                            <MenuItem value="Available">With Seats Left</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

            </Grid>



            {/* Event Cards */}
            <Grid container spacing={3} sx={{ mt: 1 }}>
                {paginatedEvents.map(event => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box
                                component="img"
                                src={event.image}
                                alt={event.name}
                                sx={{
                                    width: '100%',
                                    height: 180,
                                    objectFit: 'cover',
                                    borderTopLeftRadius: 4,
                                    borderTopRightRadius: 4,
                                }}
                            />
                            <CardContent>
                                <Typography variant="h6" gutterBottom>{event.name}</Typography>
                                <Typography variant="body2" color="text.secondary">📍 {event.city} – {event.venue}</Typography>
                                <Typography variant="body2" color="text.secondary">📅 {event.date}</Typography>
                                <Typography variant="body2">🎫 Seats: {event.seats}</Typography>
                                <Typography variant="body1" sx={{ mt: 1 }}>{event.description}</Typography>
                                <Typography variant="subtitle1" sx={{ mt: 1 }}><strong>₹{event.price}</strong></Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
                                <Button variant="outlined" size="small" onClick={() => handleOpenModal(event)}>
                                    View Details
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Pagination */}
            <Pagination
                count={totalPages}
                page={page}
                onChange={(_, val) => setPage(val)}
                color="primary"
                sx={{ mt: 4 }}
            />

            {/* Modal */}
            <Dialog open={openModal} onClose={handleCloseModal} fullWidth>
                {selectedEvent && (
                    <>
                        <DialogTitle>{selectedEvent.name}</DialogTitle>
                        <DialogContent dividers>
                            <Typography><strong>Venue:</strong> {selectedEvent.venue}, {selectedEvent.city}</Typography>
                            <Typography><strong>Organizer:</strong> {selectedEvent.organizer}</Typography>
                            <Typography><strong>Category:</strong> {selectedEvent.category}</Typography>
                            <Typography><strong>Date:</strong> {selectedEvent.date}</Typography>
                            <Typography><strong>Seats Left:</strong> {selectedEvent.seats}</Typography>
                            <Typography sx={{ my: 2 }}>{selectedEvent.description}</Typography>
                            <Typography><strong>Price:</strong> ₹{selectedEvent.price}</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseModal}>Close</Button>
                            <Button variant="contained" color="primary">Book Now</Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </>
    );
}

export default Home;
