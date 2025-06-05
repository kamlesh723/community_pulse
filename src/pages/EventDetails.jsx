import React, { useState } from 'react';
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
    Paper,
    Divider,
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    IconButton
} from '@mui/material';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripePaymentDialog from "./StripePaymentDialog.jsx";

const stripePromise = loadStripe('pk_test_51RWM1KEHxsALlKnCJnAqs7T2YqiIPPIuwHKiJuXYpAJe7tRljvR1W6zLVKdprtFfxhi3ZQY5xBCZ8FAyhFtnzMX600P4L0PhYH');


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
        description: "Explore global cuisine with amazing food stalls from around the world. Taste authentic dishes and enjoy live cooking demonstrations.",
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
        description: "Live music & art showcase featuring local artists and musicians. Experience creativity at its finest with interactive art installations.",
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
        description: "Networking event for entrepreneurs and startup enthusiasts. Connect with investors, mentors, and fellow entrepreneurs.",
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
        description: "Mindfulness retreat with meditation sessions, yoga classes, and wellness workshops. Rejuvenate your mind and body.",
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
        description: "Thousands of books from various genres and authors. Meet your favorite authors and participate in book reading sessions.",
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
        description: "Premieres and awards ceremony featuring independent films and documentaries. Red carpet event with celebrity appearances.",
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
        description: "Live concert with famous bands and solo artists. Experience electrifying performances and amazing sound quality.",
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

    // States for popup and issues
    const [openIssueDialog, setOpenIssueDialog] = useState(false);
    const [issueText, setIssueText] = useState('');
    const [issues, setIssues] = useState([]);

    const [openPaymentDialog, setOpenPaymentDialog] = useState(false);

    const event = allEvents.find(e => e.id === parseInt(id));

    if (!event) {
        return (
            <Container sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h4" color="error" gutterBottom>
                    Event Not Found
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    The event you're looking for doesn't exist or has been removed.
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/')}
                    sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '1.1rem'
                    }}
                >
                    Go Back Home
                </Button>
            </Container>
        );
    }

    const eventStatus = getEventStatus(event.date);

    // Handle issue submission
    const handleSubmitIssue = () => {
        if (issueText.trim()) {
            const newIssue = {
                id: Date.now(),
                text: issueText,
                timestamp: new Date().toLocaleString(),
                upvotes: 0,
                irrelevantVotes: 0,
                userVote: null // null, 'upvote', or 'irrelevant'
            };
            setIssues([...issues, newIssue]);
            setIssueText('');
            setOpenIssueDialog(false);
        }
    };

    // Handle voting on issues
    const handleVote = (issueId, voteType) => {
        setIssues(issues.map(issue => {
            if (issue.id === issueId) {
                const newIssue = { ...issue };

                // Remove previous vote if exists
                if (newIssue.userVote === 'upvote') {
                    newIssue.upvotes -= 1;
                } else if (newIssue.userVote === 'irrelevant') {
                    newIssue.irrelevantVotes -= 1;
                }

                // Add new vote or toggle off
                if (newIssue.userVote === voteType) {
                    // User clicked same button - remove vote
                    newIssue.userVote = null;
                } else {
                    // User clicked different button - add vote
                    if (voteType === 'upvote') {
                        newIssue.upvotes += 1;
                    } else if (voteType === 'irrelevant') {
                        newIssue.irrelevantVotes += 1;
                    }
                    newIssue.userVote = voteType;
                }

                return newIssue;
            }
            return issue;
        }));
    };

    return (
        <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', py: 3 }}>
            <Container maxWidth="md">
                {/* Back Button */}
                <Button
                    onClick={() => navigate('/')}
                    sx={{
                        mb: 2,
                        color: 'primary.main',
                        textTransform: 'none',
                        fontSize: '0.9rem',
                        '&:hover': {
                            bgcolor: 'primary.light',
                            color: 'white'
                        }
                    }}
                >
                    ← Back to Events
                </Button>

                {/* Hero Section */}
                <Card sx={{
                    mb: 3,
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}>
                    <Grid container>
                        {/* Event Image */}
                        <Grid item xs={12} md={6}>
                            <CardMedia
                                component="img"
                                height="350"
                                image={event.image}
                                alt={event.name}
                                sx={{ objectFit: 'cover' }}
                            />
                        </Grid>

                        {/* Event Info */}
                        <Grid item xs={12} md={6}>
                            <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                {/* Status Badge */}
                                <Box sx={{ mb: 1.5 }}>
                                    <Chip
                                        label={eventStatus.status}
                                        color={eventStatus.color}
                                        size="medium"
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: '0.8rem'
                                        }}
                                    />
                                </Box>

                                {/* Event Title */}
                                <Typography
                                    variant="h4"
                                    component="h1"
                                    gutterBottom
                                    sx={{
                                        fontWeight: 700,
                                        color: 'text.primary',
                                        mb: 1
                                    }}
                                >
                                    {event.name}
                                </Typography>

                                {/* Category */}
                                <Typography
                                    variant="subtitle1"
                                    color="primary.main"
                                    sx={{ mb: 2, fontWeight: 600 }}
                                >
                                    {event.category} Event
                                </Typography>

                                {/* Price */}
                                <Typography
                                    variant="h3"
                                    color="primary"
                                    sx={{
                                        mb: 2,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    ₹{event.price}
                                </Typography>

                                {/* Organizer Info */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: 'primary.main',
                                            mr: 1.5,
                                            width: 36,
                                            height: 36
                                        }}
                                    >
                                        {event.organizer.charAt(0)}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Organized by
                                        </Typography>
                                        <Typography variant="subtitle1" fontWeight={600}>
                                            {event.organizer}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Book Now Button */}
                                <Button
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    disabled={event.seats === 0}
                                    onClick={() => setOpenPaymentDialog(true)}
                                    sx={{
                                        py: 1.5,
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        boxShadow: '0 4px 16px rgba(25, 118, 210, 0.3)',
                                        '&:hover': {
                                            boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                                        }
                                    }}
                                >
                                    {event.seats === 0 ? "🎫 Sold Out" : "🎫 Book Now"}
                                </Button>

                            </Box>
                        </Grid>
                    </Grid>
                </Card>

                {/* Event Details Cards */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={6} md={3}>
                        <Paper sx={{
                            p: 2,
                            textAlign: 'center',
                            borderRadius: 2,
                            height: '100%'
                        }}>
                            <Typography variant="h5" sx={{ mb: 0.5 }}>📅</Typography>
                            <Typography variant="caption" color="text.secondary" gutterBottom>
                                Event Date
                            </Typography>
                            <Typography variant="subtitle2" fontWeight={600}>
                                {new Date(event.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Paper sx={{
                            p: 2,
                            textAlign: 'center',
                            borderRadius: 2,
                            height: '100%'
                        }}>
                            <Typography variant="h5" sx={{ mb: 0.5 }}>🎫</Typography>
                            <Typography variant="caption" color="text.secondary" gutterBottom>
                                Seats Available
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                fontWeight={600}
                                color={event.seats === 0 ? 'error.main' : 'success.main'}
                            >
                                {event.seats > 0 ? event.seats : "Sold Out"}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Paper sx={{
                            p: 2,
                            textAlign: 'center',
                            borderRadius: 2,
                            height: '100%'
                        }}>
                            <Typography variant="h5" sx={{ mb: 0.5 }}>📍</Typography>
                            <Typography variant="caption" color="text.secondary" gutterBottom>
                                Location
                            </Typography>
                            <Typography variant="subtitle2" fontWeight={600}>
                                {event.city}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Paper sx={{
                            p: 2,
                            textAlign: 'center',
                            borderRadius: 2,
                            height: '100%'
                        }}>
                            <Typography variant="h5" sx={{ mb: 0.5 }}>🏢</Typography>
                            <Typography variant="caption" color="text.secondary" gutterBottom>
                                Category
                            </Typography>
                            <Typography variant="subtitle2" fontWeight={600}>
                                {event.category}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Description Section */}
                <Card sx={{
                    p: 3,
                    borderRadius: 2,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    mb: 3
                }}>
                    <Typography
                        variant="h5"
                        gutterBottom
                        sx={{
                            fontWeight: 700,
                            color: 'text.primary',
                            mb: 2
                        }}
                    >
                        About This Event
                    </Typography>
                    <Typography
                        variant="body1"
                        paragraph
                        sx={{
                            fontSize: '1rem',
                            lineHeight: 1.6,
                            color: 'text.secondary',
                            mb: 3
                        }}
                    >
                        {event.description}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                            fontWeight: 600,
                            mb: 2
                        }}
                    >
                        Event Information
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Typography variant="h6" sx={{ mr: 1 }}>🏛️</Typography>
                                <Box>
                                    <Typography variant="caption" color="text.secondary">
                                        Venue
                                    </Typography>
                                    <Typography variant="body2" fontWeight={600}>
                                        {event.venue}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Typography variant="h6" sx={{ mr: 1 }}>👥</Typography>
                                <Box>
                                    <Typography variant="caption" color="text.secondary">
                                        Organizer
                                    </Typography>
                                    <Typography variant="body2" fontWeight={600}>
                                        {event.organizer}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Card>

                {/* Issues Section */}
                <Card sx={{
                    p: 3,
                    borderRadius: 2,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                color: 'text.primary'
                            }}
                        >
                            Issues ({issues.length})
                        </Typography>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => setOpenIssueDialog(true)}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: 2,
                                px: 3,
                                py: 1
                            }}
                        >
                            🚨 Raise an Issue
                        </Button>
                    </Box>

                    {issues.length === 0 ? (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontStyle: 'italic' }}
                        >
                            No issues reported yet. Having trouble with this event? Report any concerns you may have.
                        </Typography>
                    ) : (
                        <List sx={{ mt: 2 }}>
                            {issues.map((issue) => (
                                <ListItem
                                    key={issue.id}
                                    sx={{
                                        px: 0,
                                        py: 2,
                                        borderBottom: '1px solid #f0f0f0',
                                        '&:last-child': {
                                            borderBottom: 'none'
                                        }
                                    }}
                                >
                                    <ListItemIcon>
                                        <Typography variant="h6">⚠️</Typography>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={issue.text}
                                        secondary={`Reported on ${issue.timestamp}`}
                                        primaryTypographyProps={{
                                            fontWeight: 500,
                                            color: 'text.primary'
                                        }}
                                        secondaryTypographyProps={{
                                            fontSize: '0.75rem',
                                            color: 'text.secondary'
                                        }}
                                    />
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {/* Upvote Button */}
                                        <Button
                                            size="small"
                                            variant={issue.userVote === 'upvote' ? 'contained' : 'outlined'}
                                            color="success"
                                            onClick={() => handleVote(issue.id, 'upvote')}
                                            sx={{
                                                minWidth: 'auto',
                                                px: 1.5,
                                                py: 0.5,
                                                fontSize: '0.75rem',
                                                textTransform: 'none'
                                            }}
                                        >
                                            👍 {issue.upvotes}
                                        </Button>

                                        {/* Irrelevant Button */}
                                        <Button
                                            size="small"
                                            variant={issue.userVote === 'irrelevant' ? 'contained' : 'outlined'}
                                            color="error"
                                            onClick={() => handleVote(issue.id, 'irrelevant')}
                                            sx={{
                                                minWidth: 'auto',
                                                px: 1.5,
                                                py: 0.5,
                                                fontSize: '0.75rem',
                                                textTransform: 'none'
                                            }}
                                        >
                                            ❌ {issue.irrelevantVotes}
                                        </Button>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Card>

                {/* Issue Dialog/Popup */}
                <Dialog
                    open={openIssueDialog}
                    onClose={() => setOpenIssueDialog(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle sx={{ fontWeight: 600 }}>
                        Report an Issue
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Please describe the issue you're experiencing with this event. Our team will review and address it promptly.
                        </Typography>
                        <TextField
                            autoFocus
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            label="Describe your issue"
                            value={issueText}
                            onChange={(e) => setIssueText(e.target.value)}
                            placeholder="Please provide details about the issue..."
                            sx={{ mt: 1 }}
                        />
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                        <Button
                            onClick={() => setOpenIssueDialog(false)}
                            sx={{ textTransform: 'none' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmitIssue}
                            variant="contained"
                            disabled={!issueText.trim()}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600
                            }}
                        >
                            Submit Issue
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
            {/* Stripe Payment Dialog */}
            <StripePaymentDialog
                open={openPaymentDialog}
                onClose={() => setOpenPaymentDialog(false)}
                stripePromise={stripePromise}
                amount={event.price}
                onSuccess={() => alert('Payment Successful!')}
            />

        </Box>
    );
}

export default EventDetails;