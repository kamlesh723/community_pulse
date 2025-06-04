import {
    Card, CardContent, Typography, Grid, CardActions, Button,
    Select, MenuItem, FormControl, InputLabel, Pagination,
    TextField, Box, Chip
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

// Sample events with updated dates based on current date (June 4, 2025)
const allEvents = [
    {
        id: 1,
        name: "Tech Fest",
        category: "Technology",
        city: "Bangalore",
        venue: "City Convention Center",
        description: "3-day tech fest",
        price: 499,
        date: "2025-06-03", // Yesterday - Ended
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
        date: "2025-06-03", // Yesterday - Ended
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
        date: "2025-06-01", // 3 days ago - Ended
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
        date: "2025-06-02", // 2 days ago - Ended
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
        date: "2025-06-03", // Yesterday - Ended
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
        date: "2025-06-05", // Tomorrow - Starting Soon
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
        date: "2025-06-06", // 2 days later - Starting Soon
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
        date: "2025-06-07", // 3 days later - Starting Soon
        organizer: "Music Lovers",
        seats: 200,
        image:"https://images.unsplash.com/photo-1472653431158-6364773b2a56?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];

const categories = ["All", ...new Set(allEvents.map(e => e.category))];
const cities = ["All", ...new Set(allEvents.map(e => e.city))];
const organizers = ["All", ...new Set(allEvents.map(e => e.organizer))];

// Function to get event status based on current date (June 4, 2025)
const getEventStatus = (eventDate) => {
    const currentDate = new Date('2025-06-04'); // Current date
    const eventDateObj = new Date(eventDate);
    const timeDiff = eventDateObj.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < 0) {
        return { status: "Ended", color: "error" };
    } else if (daysDiff === 0) {
        return { status: "Ongoing", color: "success" };
    } else if (daysDiff <= 7) {
        return { status: "Starting Soon", color: "warning" };
    } else {
        return { status: "Upcoming", color: "primary" };
    }
};

function Home() {
    const navigate = useNavigate();
    
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [cityFilter, setCityFilter] = useState("All");
    const [organizerFilter, setOrganizerFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [eventDate, setEventDate] = useState("");
    const [onlyAvailableSeats, setOnlyAvailableSeats] = useState(false);
    const [page, setPage] = useState(1);
    const eventsPerPage = 12;

    const handleViewDetails = (eventId) => {
        navigate(`/event/${eventId}`);
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
    const totalPages = 2;

    return (
        <>
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    mt: 4,
                    mb: 2,
                    padding: '0 16px',
                    fontWeight: 600,
                    color: '#333',
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
                            width: "100%",
                            '& .MuiInputBase-root': {
                                padding: '8px 14px',
                                height: '40px',
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '1rem',
                            },
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '4px',
                            },
                        }}
                    />
                </Grid>

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
                            width: "100%",
                            '& .MuiInputBase-root': {
                                padding: '8px 14px',
                                height: '40px',
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '1rem',
                            },
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '4px',
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
                                width: "100%",
                                '& .MuiSelect-select': {
                                    padding: '8px 14px',
                                    height: '40px',
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: '1rem',
                                },
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '4px',
                                },
                                '& .MuiSelect-icon': {
                                    top: 'calc(50% - 12px)',
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
                {paginatedEvents.map(event => {
                    const eventStatus = getEventStatus(event.date);
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    position: 'relative',
                                }}
                            >
                                {/* Status Tag */}
                                <Chip
                                    label={eventStatus.status}
                                    color={eventStatus.color}
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        zIndex: 1,
                                        fontWeight: 'bold',
                                    }}
                                />
                                
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
                                    <Button variant="outlined" size="small" onClick={() => handleViewDetails(event.id)}>
                                        View Details
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Pagination */}
            <Pagination
                count={totalPages}
                page={page}
                onChange={(_, val) => setPage(val)}
                color="primary"
                sx={{ mt: 4 }}
            />
        </>
    );
}

export default Home;
