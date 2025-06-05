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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Stack,
    Collapse,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel
} from '@mui/material';
import { 
    LocationOn, 
    CalendarToday, 
    Person,
    Star,
    CheckCircle,
    Diamond,
    EmojiEvents,
    LocalOffer,
    ExpandMore,
    ExpandLess,
    CreditCard,
    AccountBalance,
    Payment
} from '@mui/icons-material';

// Complete events data
const allEvents = [
    {
        id: 1,
        name: "Tech Fest 2025",
        category: "Technology",
        city: "Bangalore",
        venue: "Convention Center",
        description: "3-day tech fest with latest innovations and cutting-edge technology demonstrations. Join us for workshops, keynote speeches, and networking opportunities with industry leaders.",
        price: 499,
        date: "2025-06-03",
        organizer: "IIT Tech Club",
        seats: 120,
        upvotes: 245,
        image: "https://images.unsplash.com/photo-1581090700227-1e8f2b4f9c4e?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: [
            {
                id: 101,
                text: "Parking space is very limited, had to park 2km away",
                timestamp: "2025-06-03 2:30 PM",
                upvotes: 8,
                irrelevantVotes: 1,
                userVote: null
            },
            {
                id: 102,
                text: "WiFi connectivity was poor throughout the event",
                timestamp: "2025-06-03 4:15 PM",
                upvotes: 12,
                irrelevantVotes: 0,
                userVote: null
            },
            {
                id: 103,
                text: "Food stalls were overpriced",
                timestamp: "2025-06-03 6:45 PM",
                upvotes: 5,
                irrelevantVotes: 3,
                userVote: null
            }
        ]
    },
    {
        id: 2,
        name: "Food Carnival",
        category: "Food",
        city: "Delhi",
        venue: "Central Park",
        description: "Explore global cuisine from around the world. Experience authentic flavors, cooking demonstrations, and food competitions.",
        price: 0,
        date: "2025-06-03",
        organizer: "Foodies United",
        seats: 0,
        upvotes: 189,
        image: "https://images.unsplash.com/photo-1542831371-d531d36971e6?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 3,
        name: "Art Night",
        category: "Art",
        city: "Bangalore",
        venue: "Amphitheatre",
        description: "Live music & art showcase featuring local and international artists. Experience creativity in its purest form.",
        price: 0,
        date: "2025-06-01",
        organizer: "Creative House",
        seats: 25,
        upvotes: 156,
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 4,
        name: "Startup Meetup",
        category: "Business",
        city: "Hyderabad",
        venue: "Tech Hub",
        description: "Networking event for entrepreneurs, investors, and startup enthusiasts. Pitch your ideas and connect with like-minded individuals.",
        price: 0,
        date: "2025-06-02",
        organizer: "Startup India",
        seats: 60,
        upvotes: 298,
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 5,
        name: "Yoga Retreat",
        category: "Health",
        city: "Pune",
        venue: "Green Valley",
        description: "Mindfulness and wellness retreat in serene natural surroundings. Rejuvenate your mind, body, and soul.",
        price: 0,
        date: "2025-06-03",
        organizer: "Wellness Org",
        seats: 15,
        upvotes: 167,
        image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 6,
        name: "Book Fair",
        category: "Education",
        city: "Delhi",
        venue: "Expo Hall",
        description: "Thousands of books from various genres, author meet-and-greets, and literary discussions for book lovers.",
        price: 0,
        date: "2025-06-05",
        organizer: "ReadIndia",
        seats: 100,
        upvotes: 134,
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 7,
        name: "Film Festival",
        category: "Entertainment",
        city: "Mumbai",
        venue: "Grand Cinema",
        description: "Premieres and awards ceremony featuring the best of independent and mainstream cinema from around the world.",
        price: 399,
        date: "2025-06-06",
        organizer: "Movie Buffs",
        seats: 5,
        upvotes: 312,
        image: "https://images.unsplash.com/photo-1581905764498-7b8c6e1c3c5d?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 8,
        name: "Music Concert",
        category: "Music",
        city: "Chennai",
        venue: "Stadium Arena",
        description: "Live concert with famous bands and artists. Experience electrifying performances and unforgettable music.",
        price: 499,
        date: "2025-06-07",
        organizer: "Music Lovers",
        seats: 200,
        upvotes: 456,
        image: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 9,
        name: "Gaming Tournament",
        category: "Gaming",
        city: "Bangalore",
        venue: "Gaming Arena",
        description: "Esports championship with cash prizes. Compete in popular games and showcase your gaming skills.",
        price: 199,
        date: "2025-06-08",
        organizer: "Gaming Club",
        seats: 80,
        upvotes: 278,
        image: "https://images.unsplash.com/photo-1580128637393-3e8c5f1a3b8b?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 10,
        name: "Photography Workshop",
        category: "Art",
        city: "Mumbai",
        venue: "Creative Studio",
        description: "Learn professional photography techniques from industry experts. Hands-on training with latest equipment.",
        price: 299,
        date: "2025-06-09",
        organizer: "Photo Masters",
        seats: 30,
        upvotes: 145,
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 11,
        name: "Dance Competition",
        category: "Entertainment",
        city: "Delhi",
        venue: "Cultural Center",
        description: "Inter-college dance competition featuring various dance forms and styles. Show your moves and win exciting prizes.",
        price: 150,
        date: "2025-06-10",
        organizer: "Dance Society",
        seats: 150,
        upvotes: 203,
        image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 12,
        name: "Coding Bootcamp",
        category: "Technology",
        city: "Pune",
        venue: "Tech Park",
        description: "Intensive coding workshop for beginners. Learn programming fundamentals and build your first application.",
        price: 599,
        date: "2025-06-11",
        organizer: "Code Academy",
        seats: 40,
        upvotes: 189,
        image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 13,
        name: "Fashion Show",
        category: "Fashion",
        city: "Mumbai",
        venue: "Fashion Week Venue",
        description: "Latest fashion trends showcase by top designers. Witness the future of fashion and style.",
        price: 799,
        date: "2025-06-12",
        organizer: "Fashion Week",
        seats: 200,
        upvotes: 367,
        image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 14,
        name: "Science Exhibition",
        category: "Education",
        city: "Bangalore",
        venue: "Science Museum",
        description: "Interactive science experiments and displays. Explore the wonders of science through hands-on activities.",
        price: 100,
        date: "2025-06-13",
        organizer: "Science Society",
        seats: 300,
        upvotes: 178,
        image: "https://images.unsplash.com/photo-1581090700227-1e8f2b4f9c4e?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 15,
        name: "Marathon Run",
        category: "Sports",
        city: "Chennai",
        venue: "City Stadium",
        description: "Annual city marathon for all ages. Challenge yourself and promote fitness and healthy living.",
        price: 200,
        date: "2025-06-14",
        organizer: "Sports Club",
        seats: 500,
        upvotes: 234,
        image: "https://images.unsplash.com/photo-1508606572321-901ea443707f?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 16,
        name: "Comedy Night",
        category: "Entertainment",
        city: "Hyderabad",
        venue: "Comedy Club",
        description: "Stand-up comedy with famous comedians. Laugh out loud and enjoy an evening full of humor and entertainment.",
        price: 350,
        date: "2025-06-15",
        organizer: "Laugh Factory",
        seats: 100,
        upvotes: 289,
        image: "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 17,
        name: "Wine Tasting",
        category: "Food",
        city: "Pune",
        venue: "Wine Cellar",
        description: "Premium wine tasting experience with expert sommeliers. Discover exquisite wines from around the world.",
        price: 899,
        date: "2025-06-16",
        organizer: "Wine Society",
        seats: 50,
        upvotes: 156,
        image: "https://images.unsplash.com/photo-1524594154903-1e1c1a1e1e1e?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 18,
        name: "Business Summit",
        category: "Business",
        city: "Mumbai",
        venue: "Business Center",
        description: "Leadership and business strategy summit. Learn from industry leaders and expand your business network.",
        price: 999,
        date: "2025-06-17",
        organizer: "Business Leaders",
        seats: 250,
        upvotes: 345,
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 19,
        name: "Pet Show",
        category: "Animals",
        city: "Delhi",
        venue: "Pet Arena",
        description: "Annual pet competition and show. Celebrate the bond between pets and their owners.",
        price: 100,
        date: "2025-06-18",
        organizer: "Pet Lovers",
        seats: 200,
        upvotes: 167,
        image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 20,
        name: "Meditation Workshop",
        category: "Health",
        city: "Bangalore",
        venue: "Wellness Center",
        description: "Learn mindfulness and meditation techniques for stress relief and mental well-being.",
        price: 250,
        date: "2025-06-19",
        organizer: "Mindful Living",
        seats: 75,
        upvotes: 123,
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 21,
        name: "Car Exhibition",
        category: "Automotive",
        city: "Chennai",
        venue: "Auto Expo Center",
        description: "Latest car models and automotive technology showcase. Explore the future of transportation.",
        price: 150,
        date: "2025-06-20",
        organizer: "Auto Club",
        seats: 400,
        upvotes: 198,
        image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 22,
        name: "Craft Fair",
        category: "Art",
        city: "Hyderabad",
        venue: "Craft Center",
        description: "Handmade crafts and artisan products from local and international craftspeople.",
        price: 75,
        date: "2025-06-21",
        organizer: "Artisan Guild",
        seats: 150,
        upvotes: 134,
        image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 23,
        name: "Digital Marketing Summit",
        category: "Technology",
        city: "Mumbai",
        venue: "Digital Hub",
        description: "Latest trends in digital marketing, social media strategies, and online business growth.",
        price: 450,
        date: "2025-06-22",
        organizer: "Digital Marketers",
        seats: 180,
        upvotes: 267,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 24,
        name: "Cooking Class",
        category: "Food",
        city: "Delhi",
        venue: "Culinary School",
        description: "Learn to cook authentic Indian dishes from master chefs. Hands-on cooking experience.",
        price: 199,
        date: "2025-06-23",
        organizer: "Chef Academy",
        seats: 25,
        upvotes: 145,
        image: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 25,
        name: "Environmental Awareness",
        category: "Environment",
        city: "Pune",
        venue: "Eco Park",
        description: "Learn about environmental conservation, sustainability, and how to make a positive impact.",
        price: 0,
        date: "2025-06-24",
        organizer: "Green Earth",
        seats: 300,
        upvotes: 189,
        image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 26,
        name: "Blockchain Conference",
        category: "Technology",
        city: "Bangalore",
        venue: "Tech Convention",
        description: "Future of blockchain technology, cryptocurrency, and decentralized applications.",
        price: 699,
        date: "2025-06-25",
        organizer: "Crypto Club",
        seats: 120,
        upvotes: 234,
        image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 27,
        name: "Cultural Festival",
        category: "Culture",
        city: "Chennai",
        venue: "Cultural Center",
        description: "Celebrate diverse cultures and traditions from around India and the world.",
        price: 100,
        date: "2025-06-26",
        organizer: "Cultural Society",
        seats: 400,
        upvotes: 178,
        image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 28,
        name: "AI Workshop",
        category: "Technology",
        city: "Hyderabad",
        venue: "AI Lab",
        description: "Hands-on artificial intelligence workshop covering machine learning, deep learning, and AI applications.",
        price: 799,
        date: "2025-06-27",
        organizer: "AI Institute",
        seats: 50,
        upvotes: 298,
        image: "https://images.unsplash.com/photo-1581091012184-7b1f1c1c1c1c?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 29,
        name: "Adventure Sports",
        category: "Sports",
        city: "Mumbai",
        venue: "Adventure Park",
        description: "Thrilling adventure sports activities including rock climbing, zip-lining, and water sports.",
        price: 599,
        date: "2025-06-28",
        organizer: "Adventure Club",
        seats: 80,
        upvotes: 267,
        image: "https://images.unsplash.com/photo-1508780709619-79562169bc64?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    },
    {
        id: 30,
        name: "Literature Meet",
        category: "Education",
        city: "Delhi",
        venue: "Literary Club",
        description: "Meet famous authors and poets. Engage in literary discussions and book readings.",
        price: 150,
        date: "2025-06-29",
        organizer: "Book Club",
        seats: 100,
        upvotes: 156,
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=400&auto=format&fit=crop&q=60",
        defaultIssues: []
    }
];

// Status function
const getEventStatus = (eventDate) => {
    const currentDate = new Date('2025-06-05');
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

// Enhanced Ticket tiers function
const getTicketTiers = (basePrice) => {
    return [
        {
            tier: "Standard",
            originalPrice: basePrice,
            price: basePrice,
            color: "primary",
            icon: <LocalOffer sx={{ fontSize: 32 }} />,
            popular: false,
            savings: null,
            features: [
                "General admission access",
                "Event program guide",
                "Basic seating arrangement",
                "Standard entry timing",
                "Access to main sessions",
                "Welcome kit",
                "Basic networking opportunities"
            ]
        },
        {
            tier: "Premium",
            originalPrice: Math.round(basePrice * 1.8),
            price: Math.round(basePrice * 1.5),
            color: "warning",
            icon: <EmojiEvents sx={{ fontSize: 32 }} />,
            popular: true,
            savings: "Save ₹" + Math.round(basePrice * 0.3),
            features: [
                "Priority seating in premium section",
                "Welcome refreshments & snacks",
                "Exclusive event merchandise",
                "Fast-track entry access",
                "Networking lounge access",
                "Digital photo memories",
                "Certificate of participation",
                "Priority customer support",
                "Access to speaker sessions",
                "Premium welcome kit"
            ]
        },
        {
            tier: "VIP Elite",
            originalPrice: Math.round(basePrice * 2.8),
            price: Math.round(basePrice * 2.2),
            color: "error",
            icon: <Diamond sx={{ fontSize: 32 }} />,
            popular: false,
            savings: "Save ₹" + Math.round(basePrice * 0.6),
            features: [
                "VIP front-row seating",
                "Premium catering & beverages",
                "Exclusive VIP merchandise kit",
                "Private meet & greet with speakers",
                "VIP lounge with premium amenities",
                "Professional event photography",
                "Personalized certificate",
                "Complimentary valet parking",
                "Welcome gift hamper",
                "Priority booking for future events",
                "Exclusive networking dinner",
                "One-on-one mentorship session"
            ]
        }
    ];
};

function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Debug logging
    console.log("Event ID from URL:", id);
    console.log("Parsed ID:", parseInt(id));
    
    const event = allEvents.find(e => e.id === parseInt(id));
    console.log("Found event:", event);
    
    // States for popups and forms
    const [openIssueDialog, setOpenIssueDialog] = useState(false);
    const [openTicketDialog, setOpenTicketDialog] = useState(false);
    const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
    const [issueText, setIssueText] = useState('');
    const [issues, setIssues] = useState(event?.defaultIssues || []);
    const [expandedCard, setExpandedCard] = useState(-1);
    const [selectedTier, setSelectedTier] = useState(null);
    
    // Payment form states
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [ticketQuantity, setTicketQuantity] = useState(1);
    const [paymentForm, setPaymentForm] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        upiId: '',
        bankAccount: '',
        ifscCode: ''
    });
    
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
                        borderRadius: 3,
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
    const ticketTiers = getTicketTiers(event.price);

    // Handle expandable cards
    const handleExpandCard = (index) => {
        setExpandedCard(expandedCard === index ? -1 : index);
    };

    // Handle issue submission
    const handleSubmitIssue = () => {
        if (issueText.trim()) {
            const newIssue = {
                id: Date.now(),
                text: issueText,
                timestamp: new Date().toLocaleString(),
                upvotes: 0,
                irrelevantVotes: 0,
                userVote: null
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
                
                if (newIssue.userVote === 'upvote') {
                    newIssue.upvotes -= 1;
                } else if (newIssue.userVote === 'irrelevant') {
                    newIssue.irrelevantVotes -= 1;
                }
                
                if (newIssue.userVote === voteType) {
                    newIssue.userVote = null;
                } else {
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

    // Handle ticket booking - opens payment dialog
    const handleBookTicket = (tier) => {
        setSelectedTier(tier);
        setOpenTicketDialog(false);
        setOpenPaymentDialog(true);
    };

    // Handle payment form changes
    const handlePaymentFormChange = (field, value) => {
        setPaymentForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle final payment submission
    const handlePaymentSubmit = () => {
        const totalAmount = selectedTier.price * ticketQuantity;
        
        // Simulate payment processing
        alert(`🎉 Payment Successful!\n\nEvent: ${event.name}\nTier: ${selectedTier.tier}\nQuantity: ${ticketQuantity}\nTotal Amount: ₹${totalAmount}\nPayment Method: ${paymentMethod.toUpperCase()}\n\nTicket confirmation will be sent to your email!`);
        
        // Reset states
        setOpenPaymentDialog(false);
        setSelectedTier(null);
        setTicketQuantity(1);
        setPaymentForm({
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            cardholderName: '',
            upiId: '',
            bankAccount: '',
            ifscCode: ''
        });
    };

    return (
        <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', py: 3 }}>
            <Container maxWidth="lg">
                {/* Back Button */}
                <Button
                    onClick={() => navigate('/')}
                    sx={{ 
                        mb: 3,
                        color: 'primary.main',
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 600,
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
                    mb: 4, 
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                }}>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <CardMedia
                                component="img"
                                height="400"
                                image={event.image}
                                alt={event.name}
                                sx={{ objectFit: 'cover' }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ mb: 2 }}>
                                    <Chip
                                        label={eventStatus.status}
                                        color={eventStatus.color}
                                        size="medium"
                                        sx={{ 
                                            fontWeight: 'bold',
                                            fontSize: '0.9rem',
                                            px: 2,
                                            py: 1
                                        }}
                                    />
                                </Box>

                                <Typography 
                                    variant="h3" 
                                    component="h1" 
                                    gutterBottom
                                    sx={{ 
                                        fontWeight: 800,
                                        color: 'text.primary',
                                        mb: 1,
                                        lineHeight: 1.2
                                    }}
                                >
                                    {event.name}
                                </Typography>

                                <Typography 
                                    variant="h6" 
                                    color="primary.main"
                                    sx={{ mb: 3, fontWeight: 600 }}
                                >
                                    {event.category} Event
                                </Typography>

                                <Stack spacing={2} sx={{ mb: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <CalendarToday sx={{ mr: 2, color: 'text.secondary' }} />
                                        <Typography variant="body1" fontWeight={500}>
                                            {new Date(event.date).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <LocationOn sx={{ mr: 2, color: 'text.secondary' }} />
                                        <Typography variant="body1" fontWeight={500}>
                                            {event.venue}, {event.city}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Person sx={{ mr: 2, color: 'text.secondary' }} />
                                        <Typography variant="body1" fontWeight={500}>
                                            Organized by {event.organizer}
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Typography 
                                    variant="h4" 
                                    color="primary" 
                                    sx={{ 
                                        mb: 3, 
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {event.price === 0 ? "FREE" : `Starting ₹${event.price}`}
                                </Typography>

                                <Button
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    disabled={event.seats === 0}
                                    onClick={() => setOpenTicketDialog(true)}
                                    sx={{ 
                                        py: 2, 
                                        fontSize: '1.2rem', 
                                        fontWeight: 'bold',
                                        borderRadius: 3,
                                        textTransform: 'none',
                                        background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                                        boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                                        '&:hover': {
                                            boxShadow: '0 8px 25px rgba(25, 118, 210, 0.5)',
                                            transform: 'translateY(-2px)'
                                        }
                                    }}
                                >
                                    {event.seats === 0 ? "🎫 Sold Out" : "🎫 Book Tickets Now"}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Card>

                {/* Event Details Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={6} md={3}>
                        <Paper sx={{ 
                            p: 3, 
                            textAlign: 'center',
                            borderRadius: 3,
                            height: '100%',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white'
                        }}>
                            <CalendarToday sx={{ fontSize: 40, mb: 1 }} />
                            <Typography variant="caption" gutterBottom sx={{ display: 'block', opacity: 0.9 }}>
                                Event Date
                            </Typography>
                            <Typography variant="h6" fontWeight={700}>
                                {new Date(event.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Paper sx={{ 
                            p: 3, 
                            textAlign: 'center',
                            borderRadius: 3,
                            height: '100%',
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            color: 'white'
                        }}>
                            <LocalOffer sx={{ fontSize: 40, mb: 1 }} />
                            <Typography variant="caption" gutterBottom sx={{ display: 'block', opacity: 0.9 }}>
                                Seats Available
                            </Typography>
                            <Typography 
                                variant="h6" 
                                fontWeight={700}
                            >
                                {event.seats > 0 ? event.seats : "Sold Out"}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Paper sx={{ 
                            p: 3, 
                            textAlign: 'center',
                            borderRadius: 3,
                            height: '100%',
                            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                            color: 'white'
                        }}>
                            <LocationOn sx={{ fontSize: 40, mb: 1 }} />
                            <Typography variant="caption" gutterBottom sx={{ display: 'block', opacity: 0.9 }}>
                                Location
                            </Typography>
                            <Typography variant="h6" fontWeight={700}>
                                {event.city}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Paper sx={{ 
                            p: 3, 
                            textAlign: 'center',
                            borderRadius: 3,
                            height: '100%',
                            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                            color: 'white'
                        }}>
                            <Star sx={{ fontSize: 40, mb: 1 }} />
                            <Typography variant="caption" gutterBottom sx={{ display: 'block', opacity: 0.9 }}>
                                Category
                            </Typography>
                            <Typography variant="h6" fontWeight={700}>
                                {event.category}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Description Section */}
                <Card sx={{ 
                    p: 4, 
                    borderRadius: 4,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    mb: 4
                }}>
                    <Typography 
                        variant="h4" 
                        gutterBottom
                        sx={{ 
                            fontWeight: 700,
                            color: 'text.primary',
                            mb: 3
                        }}
                    >
                        About This Event
                    </Typography>
                    <Typography 
                        variant="body1" 
                        paragraph
                        sx={{ 
                            fontSize: '1.1rem',
                            lineHeight: 1.8,
                            color: 'text.secondary',
                            mb: 4
                        }}
                    >
                        {event.description}
                    </Typography>
                    
                    <Divider sx={{ my: 3 }} />
                    
                    <Typography 
                        variant="h5" 
                        gutterBottom 
                        sx={{ 
                            fontWeight: 600,
                            mb: 3
                        }}
                    >
                        Event Information
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                                <LocationOn sx={{ mr: 2, color: 'primary.main', fontSize: 30 }} />
                                <Box>
                                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                                        Venue
                                    </Typography>
                                    <Typography variant="h6" fontWeight={600}>
                                        {event.venue}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                                <Person sx={{ mr: 2, color: 'primary.main', fontSize: 30 }} />
                                <Box>
                                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                                        Organizer
                                    </Typography>
                                    <Typography variant="h6" fontWeight={600}>
                                        {event.organizer}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Card>

                {/* Issues Section */}
                <Card sx={{ 
                    p: 4, 
                    borderRadius: 4,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography 
                            variant="h5" 
                            sx={{ 
                                fontWeight: 700,
                                color: 'text.primary'
                            }}
                        >
                            Event Issues ({issues.length})
                        </Typography>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => setOpenIssueDialog(true)}
                            sx={{ 
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: 3,
                                px: 3,
                                py: 1.5
                            }}
                        >
                            🚨 Report Issue
                        </Button>
                    </Box>
                    
                    {issues.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                            <CheckCircle sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                            <Typography 
                                variant="h6" 
                                color="text.secondary"
                                sx={{ fontWeight: 500 }}
                            >
                                No issues reported yet! This event looks great.
                            </Typography>
                        </Box>
                    ) : (
                        <List sx={{ mt: 2 }}>
                            {issues.map((issue) => (
                                <ListItem 
                                    key={issue.id} 
                                    sx={{ 
                                        px: 0, 
                                        py: 3,
                                        borderBottom: '1px solid #f0f0f0',
                                        '&:last-child': {
                                            borderBottom: 'none'
                                        }
                                    }}
                                >
                                    <ListItemIcon>
                                        <Avatar sx={{ bgcolor: 'error.light' }}>
                                            ⚠️
                                        </Avatar>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={issue.text}
                                        secondary={`Reported on ${issue.timestamp}`}
                                        primaryTypographyProps={{
                                            fontWeight: 600,
                                            color: 'text.primary',
                                            fontSize: '1.1rem'
                                        }}
                                        secondaryTypographyProps={{
                                            fontSize: '0.9rem',
                                            color: 'text.secondary'
                                        }}
                                    />
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Button
                                            size="small"
                                            variant={issue.userVote === 'upvote' ? 'contained' : 'outlined'}
                                            color="success"
                                            onClick={() => handleVote(issue.id, 'upvote')}
                                            sx={{
                                                minWidth: 'auto',
                                                px: 2,
                                                py: 1,
                                                fontSize: '0.85rem',
                                                textTransform: 'none',
                                                borderRadius: 2
                                            }}
                                        >
                                            👍 {issue.upvotes}
                                        </Button>
                                        
                                        <Button
                                            size="small"
                                            variant={issue.userVote === 'irrelevant' ? 'contained' : 'outlined'}
                                            color="error"
                                            onClick={() => handleVote(issue.id, 'irrelevant')}
                                            sx={{
                                                minWidth: 'auto',
                                                px: 2,
                                                py: 1,
                                                fontSize: '0.85rem',
                                                textTransform: 'none',
                                                borderRadius: 2
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

                {/* 3-Tier Ticket Booking Dialog */}
                <Dialog 
                    open={openTicketDialog} 
                    onClose={() => setOpenTicketDialog(false)}
                    maxWidth="lg"
                    fullWidth
                    PaperProps={{
                        sx: { borderRadius: 4 }
                    }}
                >
                    <DialogTitle sx={{ 
                        fontWeight: 700, 
                        fontSize: '2rem', 
                        textAlign: 'center',
                        background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                        color: 'white',
                        py: 3
                    }}>
                        🎫 Choose Your Perfect Experience
                    </DialogTitle>
                    <DialogContent sx={{ p: 4 }}>
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                            Select the perfect ticket tier for {event.name}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', gap: 3, flexWrap: 'wrap' }}>
                            {ticketTiers.map((tier, index) => (
                                <Card
                                    key={tier.tier}
                                    sx={{
                                        width: 320,
                                        minHeight: expandedCard === index ? 'auto' : 480,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        position: 'relative',
                                        border: tier.popular ? '3px solid #ff9800' : '2px solid #e0e0e0',
                                        borderRadius: 3,
                                        transition: 'all 0.3s ease',
                                        transform: tier.popular ? 'scale(1.02)' : 'scale(1)',
                                        '&:hover': {
                                            transform: tier.popular ? 'scale(1.05)' : 'scale(1.03)',
                                            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                        }
                                    }}
                                >
                                    {tier.popular && (
                                        <Box sx={{
                                            position: 'absolute',
                                            top: -8,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            zIndex: 2
                                        }}>
                                            <Chip
                                                label="🔥 MOST POPULAR"
                                                sx={{
                                                    bgcolor: '#ff9800',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.8rem',
                                                    px: 1.5,
                                                    py: 0.5,
                                                    boxShadow: '0 2px 8px rgba(255, 152, 0, 0.4)'
                                                }}
                                            />
                                        </Box>
                                    )}

                                    {tier.savings && (
                                        <Box sx={{
                                            position: 'absolute',
                                            top: tier.popular ? 20 : 12,
                                            right: 12,
                                            zIndex: 1
                                        }}>
                                            <Chip
                                                label={tier.savings}
                                                color="success"
                                                size="small"
                                                sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}
                                            />
                                        </Box>
                                    )}
                                    
                                    <Box sx={{ p: 2.5, textAlign: 'center' }}>
                                        <Box sx={{ 
                                            color: `${tier.color}.main`, 
                                            mb: 1.5,
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}>
                                            {tier.icon}
                                        </Box>
                                        
                                        <Typography variant="h5" fontWeight={700} gutterBottom>
                                            {tier.tier}
                                        </Typography>
                                        
                                        <Box sx={{ mb: 2 }}>
                                            {tier.savings && (
                                                <Typography 
                                                    variant="body1"
                                                    sx={{ 
                                                        textDecoration: 'line-through',
                                                        color: 'text.secondary',
                                                        mb: 0.5
                                                    }}
                                                >
                                                    ₹{tier.originalPrice}
                                                </Typography>
                                            )}
                                            <Typography 
                                                variant="h4"
                                                color={`${tier.color}.main`} 
                                                fontWeight={700}
                                            >
                                                ₹{tier.price}
                                            </Typography>
                                        </Box>
                                        
                                        <Box sx={{ textAlign: 'left', mb: 2 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                                <Typography variant="subtitle1" fontWeight={600} sx={{ color: 'success.main' }}>
                                                    ✅ What's Included:
                                                </Typography>
                                                <IconButton 
                                                    size="small" 
                                                    onClick={() => handleExpandCard(index)}
                                                    sx={{ color: 'primary.main' }}
                                                >
                                                    {expandedCard === index ? <ExpandLess /> : <ExpandMore />}
                                                </IconButton>
                                            </Box>
                                            
                                            {tier.features.slice(0, 3).map((feature, i) => (
                                                <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                    <CheckCircle sx={{ color: 'success.main', mr: 1, fontSize: 16 }} />
                                                    <Typography variant="body2" fontWeight={400} sx={{ fontSize: '0.85rem' }}>
                                                        {feature}
                                                    </Typography>
                                                </Box>
                                            ))}
                                            
                                            <Collapse in={expandedCard === index} timeout="auto" unmountOnExit>
                                                {tier.features.slice(3).map((feature, i) => (
                                                    <Box key={i + 3} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                        <CheckCircle sx={{ color: 'success.main', mr: 1, fontSize: 16 }} />
                                                        <Typography variant="body2" fontWeight={400} sx={{ fontSize: '0.85rem' }}>
                                                            {feature}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Collapse>
                                            
                                            {expandedCard !== index && tier.features.length > 3 && (
                                                <Typography 
                                                    variant="caption" 
                                                    color="primary.main" 
                                                    sx={{ fontStyle: 'italic', cursor: 'pointer' }}
                                                    onClick={() => handleExpandCard(index)}
                                                >
                                                    +{tier.features.length - 3} more features (click to expand)
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                    
                                    <Box sx={{ p: 2.5, pt: 0, mt: 'auto' }}>
                                        <Button
                                            variant={tier.popular ? 'contained' : 'outlined'}
                                            color={tier.color}
                                            fullWidth
                                            size="medium"
                                            onClick={() => handleBookTicket(tier)}
                                            sx={{
                                                py: 1.5,
                                                fontWeight: 700,
                                                textTransform: 'none',
                                                fontSize: '1rem',
                                                borderRadius: 2,
                                                ...(tier.popular && {
                                                    background: 'linear-gradient(45deg, #ff9800 30%, #ffb74d 90%)',
                                                    boxShadow: '0 4px 15px rgba(255, 152, 0, 0.3)',
                                                })
                                            }}
                                        >
                                            Book {tier.tier} - ₹{tier.price}
                                        </Button>
                                    </Box>
                                </Card>
                            ))}
                        </Box>

                        {/* Comparison Table */}
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h6" gutterBottom fontWeight={600} textAlign="center" sx={{ mb: 3 }}>
                                📊 Quick Comparison
                            </Typography>
                            <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: 'grey.800' }}>
                                            <TableCell sx={{ fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>Features</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>
                                                Standard
                                            </TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>
                                                Premium
                                            </TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>
                                                VIP Elite
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'grey.50' } }}>
                                            <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>💰 Price</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 600, color: 'primary.main', fontSize: '0.85rem' }}>
                                                ₹{ticketTiers[0].price}
                                            </TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 600, color: 'warning.main', fontSize: '0.85rem' }}>
                                                ₹{ticketTiers[1].price}
                                            </TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 600, color: 'error.main', fontSize: '0.85rem' }}>
                                                ₹{ticketTiers[2].price}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'grey.50' } }}>
                                            <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>🪑 Seating</TableCell>
                                            <TableCell align="center" sx={{ fontSize: '0.85rem' }}>General</TableCell>
                                            <TableCell align="center" sx={{ fontSize: '0.85rem' }}>Priority</TableCell>
                                            <TableCell align="center" sx={{ fontSize: '0.85rem' }}>VIP Front Row</TableCell>
                                        </TableRow>
                                        <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'grey.50' } }}>
                                            <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>🍽️ Food & Beverages</TableCell>
                                            <TableCell align="center" sx={{ fontSize: '0.85rem' }}>❌</TableCell>
                                            <TableCell align="center" sx={{ fontSize: '0.85rem' }}>✅ Refreshments</TableCell>
                                            <TableCell align="center" sx={{ fontSize: '0.85rem' }}>✅ Premium Catering</TableCell>
                                        </TableRow>
                                        <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'grey.50' } }}>
                                            <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>🎁 Merchandise</TableCell>
                                            <TableCell align="center" sx={{ fontSize: '0.85rem' }}>❌</TableCell>
                                            <TableCell align="center" sx={{ fontSize: '0.85rem' }}>✅ Event Kit</TableCell>
                                            <TableCell align="center" sx={{ fontSize: '0.85rem' }}>✅ Exclusive VIP Kit</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 4 }}>
                        <Button 
                            onClick={() => setOpenTicketDialog(false)}
                            sx={{ 
                                textTransform: 'none',
                                fontWeight: 600,
                                px: 3,
                                py: 1.5,
                                borderRadius: 2
                            }}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Payment Dialog */}
                <Dialog 
                    open={openPaymentDialog} 
                    onClose={() => setOpenPaymentDialog(false)}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        sx: { borderRadius: 4 }
                    }}
                >
                    <DialogTitle sx={{ 
                        fontWeight: 700, 
                        fontSize: '1.8rem', 
                        textAlign: 'center',
                        background: 'linear-gradient(45deg, #4caf50 30%, #81c784 90%)',
                        color: 'white',
                        py: 3
                    }}>
                        💳 Complete Your Payment
                    </DialogTitle>
                    <DialogContent sx={{ p: 4 }}>
                        {selectedTier && (
                            <>
                                {/* Order Summary */}
                                <Card sx={{ p: 3, mb: 4, bgcolor: 'grey.50', borderRadius: 3 }}>
                                                                        <Typography variant="h6" fontWeight={700} gutterBottom>
                                        📋 Order Summary
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={8}>
                                            <Typography variant="body1" fontWeight={600}>
                                                {event.name} - {selectedTier.tier} Ticket
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {new Date(event.date).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} sx={{ textAlign: 'right' }}>
                                            <Typography variant="h6" color="primary.main" fontWeight={700}>
                                                ₹{selectedTier.price * ticketQuantity}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                ₹{selectedTier.price} × {ticketQuantity}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Card>

                                {/* Quantity Selection */}
                                <Box sx={{ mb: 4 }}>
                                    <FormControl fullWidth>
                                        <InputLabel>Number of Tickets</InputLabel>
                                        <Select
                                            value={ticketQuantity}
                                            label="Number of Tickets"
                                            onChange={(e) => setTicketQuantity(e.target.value)}
                                            sx={{ borderRadius: 2 }}
                                        >
                                            {[1, 2, 3, 4, 5].map(num => (
                                                <MenuItem key={num} value={num}>
                                                    {num} Ticket{num > 1 ? 's' : ''}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>

                                {/* Payment Method Selection */}
                                <Box sx={{ mb: 4 }}>
                                    <FormLabel component="legend" sx={{ fontWeight: 600, fontSize: '1.1rem', mb: 2 }}>
                                        💳 Select Payment Method
                                    </FormLabel>
                                    <RadioGroup
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    >
                                        <FormControlLabel 
                                            value="card" 
                                            control={<Radio />} 
                                            label={
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <CreditCard sx={{ mr: 1 }} />
                                                    Credit/Debit Card
                                                </Box>
                                            }
                                        />
                                        <FormControlLabel 
                                            value="upi" 
                                            control={<Radio />} 
                                            label={
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Payment sx={{ mr: 1 }} />
                                                    UPI Payment
                                                </Box>
                                            }
                                        />
                                        <FormControlLabel 
                                            value="netbanking" 
                                            control={<Radio />} 
                                            label={
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <AccountBalance sx={{ mr: 1 }} />
                                                    Net Banking
                                                </Box>
                                            }
                                        />
                                    </RadioGroup>
                                </Box>

                                {/* Payment Form Fields */}
                                {paymentMethod === 'card' && (
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="h6" fontWeight={600} gutterBottom>
                                            Card Details
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Cardholder Name"
                                                    value={paymentForm.cardholderName}
                                                    onChange={(e) => handlePaymentFormChange('cardholderName', e.target.value)}
                                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Card Number"
                                                    value={paymentForm.cardNumber}
                                                    onChange={(e) => handlePaymentFormChange('cardNumber', e.target.value)}
                                                    placeholder="1234 5678 9012 3456"
                                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Expiry Date"
                                                    value={paymentForm.expiryDate}
                                                    onChange={(e) => handlePaymentFormChange('expiryDate', e.target.value)}
                                                    placeholder="MM/YY"
                                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    fullWidth
                                                    label="CVV"
                                                    value={paymentForm.cvv}
                                                    onChange={(e) => handlePaymentFormChange('cvv', e.target.value)}
                                                    placeholder="123"
                                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )}

                                {paymentMethod === 'upi' && (
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="h6" fontWeight={600} gutterBottom>
                                            UPI Details
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            label="UPI ID"
                                            value={paymentForm.upiId}
                                            onChange={(e) => handlePaymentFormChange('upiId', e.target.value)}
                                            placeholder="yourname@paytm"
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                        />
                                    </Box>
                                )}

                                {paymentMethod === 'netbanking' && (
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="h6" fontWeight={600} gutterBottom>
                                            Bank Details
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Bank Account Number"
                                                    value={paymentForm.bankAccount}
                                                    onChange={(e) => handlePaymentFormChange('bankAccount', e.target.value)}
                                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="IFSC Code"
                                                    value={paymentForm.ifscCode}
                                                    onChange={(e) => handlePaymentFormChange('ifscCode', e.target.value)}
                                                    placeholder="SBIN0001234"
                                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )}

                                {/* Total Amount */}
                                <Card sx={{ p: 3, bgcolor: 'primary.light', borderRadius: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="h6" fontWeight={700} color="white">
                                            Total Amount to Pay:
                                        </Typography>
                                        <Typography variant="h4" fontWeight={800} color="white">
                                            ₹{selectedTier.price * ticketQuantity}
                                        </Typography>
                                    </Box>
                                </Card>
                            </>
                        )}
                    </DialogContent>
                    <DialogActions sx={{ p: 4 }}>
                        <Button 
                            onClick={() => setOpenPaymentDialog(false)}
                            sx={{ 
                                textTransform: 'none',
                                fontWeight: 600,
                                px: 3,
                                py: 1.5,
                                borderRadius: 2
                            }}
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={handlePaymentSubmit}
                            variant="contained"
                            color="success"
                            sx={{ 
                                textTransform: 'none',
                                fontWeight: 700,
                                px: 4,
                                py: 1.5,
                                borderRadius: 2,
                                fontSize: '1.1rem'
                            }}
                        >
                            💳 Pay ₹{selectedTier ? selectedTier.price * ticketQuantity : 0}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Issue Dialog */}
                <Dialog 
                    open={openIssueDialog} 
                    onClose={() => setOpenIssueDialog(false)}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{
                        sx: { borderRadius: 4 }
                    }}
                >
                    <DialogTitle sx={{ fontWeight: 700, fontSize: '1.5rem' }}>
                        🚨 Report an Issue
                    </DialogTitle>
                    <DialogContent sx={{ p: 3 }}>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            Help us improve this event by reporting any issues you've experienced. Your feedback is valuable!
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
                            placeholder="Please provide details about the issue you encountered..."
                            sx={{ 
                                mt: 1,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2
                                }
                            }}
                        />
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                        <Button 
                            onClick={() => setOpenIssueDialog(false)}
                            sx={{ 
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: 2
                            }}
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleSubmitIssue}
                            variant="contained"
                            disabled={!issueText.trim()}
                            sx={{ 
                                textTransform: 'none',
                                fontWeight: 700,
                                borderRadius: 2,
                                px: 3
                            }}
                        >
                            Submit Issue
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
}

export default EventDetails;
