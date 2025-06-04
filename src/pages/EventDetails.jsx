import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Container, 
    Card, 
    CardMedia, 
    Typography, 
    Button, 
    Box, 
    Chip,
    Grid,
    Paper
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Same events data as Home.jsx
const allEvents = [
    {
        id: 1,
        name: "Tech Fest",
        category: "Technology",
        city: "Bangalore",
        venue: "City Convention Center",
        description: "3-day tech fest with latest technology trends, workshops, and networking opportunities. Join us for an amazing experience with industry experts and cutting-edge innovations.",
        price: 499,
        date: "2025-06-03",
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
        description: "Explore global cuisine with amazing food stalls from around the world. Taste authentic dishes, enjoy live cooking demonstrations, and meet renowned chefs.",
        price: 299,
        date: "2025-06-03",
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
        description: "Live music & art showcase featuring local artists and musicians. Experience creativity at its finest with interactive art installations and live performances.",
        price: 150,
        date: "2025-06-01",
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
        description: "Networking event for entrepreneurs and startup enthusiasts. Connect with investors, mentors, and fellow entrepreneurs. Learn about latest trends in startup ecosystem.",
        price: 250,
        date: "2025-06-02",
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
        description: "Mindfulness retreat with meditation sessions, yoga classes, and wellness workshops. Rejuvenate your mind and body in a peaceful natural environment.",
        price: 350,
        date: "2025-06-03",
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
        description: "Thousands of books from various genres and authors. Meet your favorite authors, participate in book reading sessions, and discover new literary treasures.",
        price: 50,
        date: "2025-06-05",
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
        description: "Premieres and awards ceremony featuring independent films and documentaries. Red carpet event with celebrity appearances and exclusive screenings.",
        price: 399,
        date: "2025-06-06",
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
        description: "Live concert with famous bands and solo artists. Experience electrifying performances, amazing sound quality, and unforgettable musical moments.",
        price: 499,
        date: "2025-06-07",
        organizer: "Music Lovers",
        seats: 200,
        image:"https://images.unsplash.com/photo-1472653431158-6364773b2a56?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];

// Status function
const getEventStatus = (eventDate) => {
    const currentDate = new Date('2025-06-04');
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

function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const event = allEvents.find(e => e.id === parseInt(id));
    
    if (!event) {
        return (
            <Container sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h4">Event Not Found</Typography>
                <Button 
                    variant="contained" 
                    onClick={() => navigate('/')}
                    sx={{ mt: 2 }}
                >
                    Go Back Home
                </Button>
            </Container>
        );
    }

    const eventStatus = getEventStatus(event.date);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Back Button */}
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/')}
                sx={{ mb: 3 }}
            >
                Back to Events
            </Button>

            <Grid container spacing={4}>
                {/* Event Image */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="400"
                            image={event.image}
                            alt={event.name}
                        />
                    </Card>
                </Grid>

                {/* Event Details */}
                <Grid item xs={12} md={6}>
                    <Box>
                        {/* Title and Status */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h3" component="h1" gutterBottom>
                                {event.name}
                            </Typography>
                            <Chip
                                label={eventStatus.status}
                                color={eventStatus.color}
                                size="large"
                                sx={{ fontWeight: 'bold' }}
                            />
                        </Box>

                        {/* Price */}
                        <Typography variant="h4" color="primary" sx={{ mb: 3, fontWeight: 'bold' }}>
                            ₹{event.price}
                        </Typography>

                        {/* Event Info Cards */}
                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid item xs={6}>
                                <Paper sx={{ p: 2, textAlign: 'center' }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        📅 Date
                                    </Typography>
                                    <Typography variant="h6">
                                        {event.date}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper sx={{ p: 2, textAlign: 'center' }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        🎫 Seats Left
                                    </Typography>
                                    <Typography variant="h6">
                                        {event.seats > 0 ? event.seats : "Sold Out"}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper sx={{ p: 2, textAlign: 'center' }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        📍 City
                                    </Typography>
                                    <Typography variant="h6">
                                        {event.city}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper sx={{ p: 2, textAlign: 'center' }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        🏢 Category
                                    </Typography>
                                    <Typography variant="h6">
                                        {event.category}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>

                        {/* Book Now Button */}
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            disabled={event.seats === 0}
                            sx={{ mb: 2, py: 1.5, fontSize: '1.1rem', fontWeight: 'bold' }}
                        >
                            {event.seats === 0 ? "Sold Out" : "Book Now"}
                        </Button>
                    </Box>
                </Grid>

                {/* Full Description */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 3, mt: 2 }}>
                        <Typography variant="h5" gutterBottom>
                            About This Event
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {event.description}
                        </Typography>
                        
                        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                            Event Details
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography><strong>Venue:</strong> {event.venue}</Typography>
                            <Typography><strong>Organizer:</strong> {event.organizer}</Typography>
                            <Typography><strong>Category:</strong> {event.category}</Typography>
                            <Typography><strong>Location:</strong> {event.city}</Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default EventDetails;
