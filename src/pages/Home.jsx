import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Tabs,
    Tab,
    Card,
    CardContent,
    Grid,
    CardActions,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Pagination,
    TextField,
    Chip,
    Avatar,
    Divider,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
import { ThumbUp, Map, PersonAdd, PersonRemove, Flag } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';


// 30 Events data (same as before)
const allEvents = [
    {
        id: 1,
        name: "Tech Fest 2025",
        category: "Technology",
        city: "Bangalore",
        venue: "Convention Center",
        description: "3-day tech fest with latest innovations",
        price: 499,
        date: "2025-06-03",
        organizer: "IIT Tech Club",
        seats: 120,
        upvotes: 245,
        image: "https://images.unsplash.com/photo-1581090700227-1e8f2b4f9c4e?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 2,
        name: "Food Carnival",
        category: "Food",
        city: "Delhi",
        venue: "Central Park",
        description: "Explore global cuisine",
        price: 0,
        date: "2025-06-03",
        organizer: "Foodies United",
        seats: 0,
        upvotes: 189,
        image: "https://images.unsplash.com/photo-1542831371-d531d36971e6?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 3,
        name: "Art Night",
        category: "Art",
        city: "Bangalore",
        venue: "Amphitheatre",
        description: "Live music & art showcase",
        price: 0,
        date: "2025-06-01",
        organizer: "Creative House",
        seats: 25,
        upvotes: 156,
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 4,
        name: "Startup Meetup",
        category: "Business",
        city: "Hyderabad",
        venue: "Tech Hub",
        description: "Networking event for entrepreneurs",
        price: 0,
        date: "2025-06-02",
        organizer: "Startup India",
        seats: 60,
        upvotes: 298,
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 5,
        name: "Yoga Retreat",
        category: "Health",
        city: "Pune",
        venue: "Green Valley",
        description: "Mindfulness and wellness retreat",
        price: 0,
        date: "2025-06-03",
        organizer: "Wellness Org",
        seats: 15,
        upvotes: 167,
        image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 6,
        name: "Book Fair",
        category: "Education",
        city: "Delhi",
        venue: "Expo Hall",
        description: "Thousands of books from various genres",
        price: 0,
        date: "2025-06-05",
        organizer: "ReadIndia",
        seats: 100,
        upvotes: 134,
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 7,
        name: "Film Festival",
        category: "Entertainment",
        city: "Mumbai",
        venue: "Grand Cinema",
        description: "Premieres and awards ceremony",
        price: 399,
        date: "2025-06-06",
        organizer: "Movie Buffs",
        seats: 5,
        upvotes: 312,
        image: "https://images.unsplash.com/photo-1581905764498-7b8c6e1c3c5d?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 8,
        name: "Music Concert",
        category: "Music",
        city: "Chennai",
        venue: "Stadium Arena",
        description: "Live concert with famous bands",
        price: 499,
        date: "2025-06-07",
        organizer: "Music Lovers",
        seats: 200,
        upvotes: 456,
        image: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 9,
        name: "Gaming Tournament",
        category: "Gaming",
        city: "Bangalore",
        venue: "Gaming Arena",
        description: "Esports championship with cash prizes",
        price: 199,
        date: "2025-06-08",
        organizer: "Gaming Club",
        seats: 80,
        upvotes: 278,
        image: "https://images.unsplash.com/photo-1580128637393-3e8c5f1a3b8b?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 10,
        name: "Photography Workshop",
        category: "Art",
        city: "Mumbai",
        venue: "Creative Studio",
        description: "Learn professional photography techniques",
        price: 299,
        date: "2025-06-09",
        organizer: "Photo Masters",
        seats: 30,
        upvotes: 145,
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 11,
        name: "Dance Competition",
        category: "Entertainment",
        city: "Delhi",
        venue: "Cultural Center",
        description: "Inter-college dance competition",
        price: 150,
        date: "2025-06-10",
        organizer: "Dance Society",
        seats: 150,
        upvotes: 203,
        image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 12,
        name: "Coding Bootcamp",
        category: "Technology",
        city: "Pune",
        venue: "Tech Park",
        description: "Intensive coding workshop for beginners",
        price: 599,
        date: "2025-06-11",
        organizer: "Code Academy",
        seats: 40,
        upvotes: 189,
        image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 13,
        name: "Fashion Show",
        category: "Fashion",
        city: "Mumbai",
        venue: "Fashion Week Venue",
        description: "Latest fashion trends showcase",
        price: 799,
        date: "2025-06-12",
        organizer: "Fashion Week",
        seats: 200,
        upvotes: 367,
        image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 14,
        name: "Science Exhibition",
        category: "Education",
        city: "Bangalore",
        venue: "Science Museum",
        description: "Interactive science experiments and displays",
        price: 100,
        date: "2025-06-13",
        organizer: "Science Society",
        seats: 300,
        upvotes: 178,
        image: "https://images.unsplash.com/photo-1581090700227-1e8f2b4f9c4e?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 15,
        name: "Marathon Run",
        category: "Sports",
        city: "Chennai",
        venue: "City Stadium",
        description: "Annual city marathon for all ages",
        price: 200,
        date: "2025-06-14",
        organizer: "Sports Club",
        seats: 500,
        upvotes: 234,
        image: "https://images.unsplash.com/photo-1508606572321-901ea443707f?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 16,
        name: "Comedy Night",
        category: "Entertainment",
        city: "Hyderabad",
        venue: "Comedy Club",
        description: "Stand-up comedy with famous comedians",
        price: 350,
        date: "2025-06-15",
        organizer: "Laugh Factory",
        seats: 100,
        upvotes: 289,
        image: "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 17,
        name: "Wine Tasting",
        category: "Food",
        city: "Pune",
        venue: "Wine Cellar",
        description: "Premium wine tasting experience",
        price: 899,
        date: "2025-06-16",
        organizer: "Wine Society",
        seats: 50,
        upvotes: 156,
        image: "https://images.unsplash.com/photo-1524594154903-1e1c1a1e1e1e?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 18,
        name: "Business Summit",
        category: "Business",
        city: "Mumbai",
        venue: "Business Center",
        description: "Leadership and business strategy summit",
        price: 999,
        date: "2025-06-17",
        organizer: "Business Leaders",
        seats: 250,
        upvotes: 345,
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 19,
        name: "Pet Show",
        category: "Animals",
        city: "Delhi",
        venue: "Pet Arena",
        description: "Annual pet competition and show",
        price: 100,
        date: "2025-06-18",
        organizer: "Pet Lovers",
        seats: 200,
        upvotes: 167,
        image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 20,
        name: "Meditation Workshop",
        category: "Health",
        city: "Bangalore",
        venue: "Wellness Center",
        description: "Learn mindfulness and meditation techniques",
        price: 250,
        date: "2025-06-19",
        organizer: "Mindful Living",
        seats: 75,
        upvotes: 123,
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 21,
        name: "Car Exhibition",
        category: "Automotive",
        city: "Chennai",
        venue: "Auto Expo Center",
        description: "Latest car models and automotive technology",
        price: 150,
        date: "2025-06-20",
        organizer: "Auto Club",
        seats: 400,
        upvotes: 198,
        image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 22,
        name: "Craft Fair",
        category: "Art",
        city: "Hyderabad",
        venue: "Craft Center",
        description: "Handmade crafts and artisan products",
        price: 75,
        date: "2025-06-21",
        organizer: "Artisan Guild",
        seats: 150,
        upvotes: 134,
        image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 23,
        name: "Digital Marketing Summit",
        category: "Technology",
        city: "Mumbai",
        venue: "Digital Hub",
        description: "Latest trends in digital marketing",
        price: 450,
        date: "2025-06-22",
        organizer: "Digital Marketers",
        seats: 180,
        upvotes: 267,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 24,
        name: "Cooking Class",
        category: "Food",
        city: "Delhi",
        venue: "Culinary School",
        description: "Learn to cook authentic Indian dishes",
        price: 199,
        date: "2025-06-23",
        organizer: "Chef Academy",
        seats: 25,
        upvotes: 145,
        image: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 25,
        name: "Environmental Awareness",
        category: "Environment",
        city: "Pune",
        venue: "Eco Park",
        description: "Learn about environmental conservation",
        price: 0,
        date: "2025-06-24",
        organizer: "Green Earth",
        seats: 300,
        upvotes: 189,
        image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 26,
        name: "Blockchain Conference",
        category: "Technology",
        city: "Bangalore",
        venue: "Tech Convention",
        description: "Future of blockchain technology",
        price: 699,
        date: "2025-06-25",
        organizer: "Crypto Club",
        seats: 120,
        upvotes: 234,
        image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 27,
        name: "Cultural Festival",
        category: "Culture",
        city: "Chennai",
        venue: "Cultural Center",
        description: "Celebrate diverse cultures and traditions",
        price: 100,
        date: "2025-06-26",
        organizer: "Cultural Society",
        seats: 400,
        upvotes: 178,
        image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 28,
        name: "AI Workshop",
        category: "Technology",
        city: "Hyderabad",
        venue: "AI Lab",
        description: "Hands-on artificial intelligence workshop",
        price: 799,
        date: "2025-06-27",
        organizer: "AI Institute",
        seats: 50,
        upvotes: 298,
        image: "https://images.unsplash.com/photo-1581091012184-7b1f1c1c1c1c?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 29,
        name: "Adventure Sports",
        category: "Sports",
        city: "Mumbai",
        venue: "Adventure Park",
        description: "Thrilling adventure sports activities",
        price: 599,
        date: "2025-06-28",
        organizer: "Adventure Club",
        seats: 80,
        upvotes: 267,
        image: "https://images.unsplash.com/photo-1508780709619-79562169bc64?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 30,
        name: "Literature Meet",
        category: "Education",
        city: "Delhi",
        venue: "Literary Club",
        description: "Meet famous authors and poets",
        price: 150,
        date: "2025-06-29",
        organizer: "Book Club",
        seats: 100,
        upvotes: 156,
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=400&auto=format&fit=crop&q=60"
    }
];

// 30 Issues data (same as before)
const allIssues = [
    {
        id: 1,
        title: "Streetlight not working",
        description: "Street light not working since last 2 days, causing safety concerns",
        category: "Streetlights",
        location: "Gota Bridge, Ahmedabad",
        status: "In Progress",
        distance: "2.8 km",
        reportedDate: "Aug 14",
        upvotes: 36,
        priority: "High",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 2,
        title: "Pothole on main road",
        description: "The main road is riddled with potholes, making it dangerous",
        category: "Road",
        location: "C.G Road, Ahmedabad",
        status: "Reported",
        distance: "1.1 km",
        reportedDate: "Jun 02",
        upvotes: 27,
        priority: "Critical",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 3,
        title: "Garbage not collected",
        description: "Garbage collection has been irregular in our area",
        category: "Waste",
        location: "SG Highway, Ahmedabad",
        status: "New",
        distance: "1.1 km",
        reportedDate: "Jun 25",
        upvotes: 11,
        priority: "Medium",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 4,
        title: "Water supply disruption",
        description: "No water supply for the past 3 days in residential area",
        category: "Water",
        location: "Satellite, Ahmedabad",
        status: "In Progress",
        distance: "3.2 km",
        reportedDate: "Jun 20",
        upvotes: 45,
        priority: "Critical",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 5,
        title: "Broken traffic signal",
        description: "Traffic signal at major intersection is not functioning",
        category: "Traffic",
        location: "Vastrapur, Ahmedabad",
        status: "Reported",
        distance: "2.5 km",
        reportedDate: "Jun 15",
        upvotes: 23,
        priority: "High",
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 6,
        title: "Park maintenance needed",
        description: "Local park needs cleaning and maintenance work urgently",
        category: "Parks",
        location: "Bodakdev, Ahmedabad",
        status: "New",
        distance: "1.8 km",
        reportedDate: "Jun 28",
        upvotes: 8,
        priority: "Low",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 7,
        title: "Noise pollution from construction",
        description: "Construction work causing excessive noise during night hours",
        category: "Noise",
        location: "Prahlad Nagar, Ahmedabad",
        status: "In Progress",
        distance: "2.1 km",
        reportedDate: "Jul 05",
        upvotes: 19,
        priority: "Medium",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 8,
        title: "Stray dogs menace",
        description: "Increasing number of stray dogs causing safety issues",
        category: "Animals",
        location: "Thaltej, Ahmedabad",
        status: "Reported",
        distance: "1.9 km",
        reportedDate: "Jul 12",
        upvotes: 32,
        priority: "High",
        image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=600&h=400&auto=format&fit=crop&q=60"
    },
    {
        id: 9,
        title: "Broken footpath",
        description: "Footpath is broken and dangerous for pedestrians",
        category: "Infrastructure",
        location: "Navrangpura, Ahmedabad",
        status: "New",
        distance: "3.5 km",
        reportedDate: "Jul 18",
        upvotes: 15,
        priority: "Medium",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 10,
        title: "Air pollution from factory",
        description: "Factory emissions causing air quality issues",
        category: "Environment",
        location: "Naroda, Ahmedabad",
        status: "In Progress",
        distance: "8.2 km",
        reportedDate: "Jul 22",
        upvotes: 67,
        priority: "Critical",
        image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 11,
        title: "Drainage system blocked",
        description: "Drainage system is blocked causing waterlogging",
        category: "Drainage",
        location: "Maninagar, Ahmedabad",
        status: "Reported",
        distance: "4.7 km",
        reportedDate: "Aug 01",
        upvotes: 28,
        priority: "High",
        image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 12,
        title: "Public toilet maintenance",
        description: "Public toilets are in poor condition and need cleaning",
        category: "Sanitation",
        location: "Ellis Bridge, Ahmedabad",
        status: "New",
        distance: "2.3 km",
        reportedDate: "Aug 03",
        upvotes: 12,
        priority: "Medium",
        image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 13,
        title: "Bus stop shelter damaged",
        description: "Bus stop shelter is damaged and provides no protection",
        category: "Transport",
        location: "Paldi, Ahmedabad",
        status: "In Progress",
        distance: "1.6 km",
        reportedDate: "Aug 07",
        upvotes: 9,
        priority: "Low",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 14,
        title: "Illegal parking on road",
        description: "Vehicles parked illegally causing traffic congestion",
        category: "Traffic",
        location: "Ashram Road, Ahmedabad",
        status: "Reported",
        distance: "3.1 km",
        reportedDate: "Aug 10",
        upvotes: 21,
        priority: "Medium",
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 15,
        title: "School playground unsafe",
        description: "School playground equipment is broken and unsafe",
        category: "Education",
        location: "Ambawadi, Ahmedabad",
        status: "New",
        distance: "2.8 km",
        reportedDate: "Aug 12",
        upvotes: 18,
        priority: "High",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 16,
        title: "Mosquito breeding in water",
        description: "Stagnant water causing mosquito breeding",
        category: "Health",
        location: "Bopal, Ahmedabad",
        status: "In Progress",
        distance: "4.2 km",
        reportedDate: "Aug 15",
        upvotes: 25,
        priority: "High",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 17,
        title: "Power outage frequent",
        description: "Frequent power cuts affecting daily life",
        category: "Electricity",
        location: "Chandkheda, Ahmedabad",
        status: "Reported",
        distance: "6.1 km",
        reportedDate: "Aug 18",
        upvotes: 41,
        priority: "Critical",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 18,
        title: "Library needs renovation",
        description: "Public library building is in poor condition",
        category: "Education",
        location: "Law Garden, Ahmedabad",
        status: "New",
        distance: "2.7 km",
        reportedDate: "Aug 20",
        upvotes: 14,
        priority: "Low",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 19,
        title: "Street vendor encroachment",
        description: "Street vendors blocking footpath",
        category: "Encroachment",
        location: "Lal Darwaja, Ahmedabad",
        status: "In Progress",
        distance: "5.3 km",
        reportedDate: "Aug 22",
        upvotes: 16,
        priority: "Medium",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 20,
        title: "Gym equipment broken",
        description: "Outdoor gym equipment in park is broken",
        category: "Parks",
        location: "Kankaria, Ahmedabad",
        status: "Reported",
        distance: "7.8 km",
        reportedDate: "Aug 25",
        upvotes: 7,
        priority: "Low",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 21,
        title: "CCTV cameras not working",
        description: "Security cameras are not functioning properly",
        category: "Security",
        location: "Jodhpur, Ahmedabad",
        status: "New",
        distance: "3.9 km",
        reportedDate: "Aug 28",
        upvotes: 22,
        priority: "High",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 22,
        title: "Hospital waste management",
        description: "Improper disposal of medical waste",
        category: "Health",
        location: "Civil Hospital, Ahmedabad",
        status: "In Progress",
        distance: "4.5 km",
        reportedDate: "Sep 01",
        upvotes: 33,
        priority: "Critical",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 23,
        title: "Internet connectivity poor",
        description: "Poor internet connectivity affecting work from home",
        category: "Technology",
        location: "Satellite, Ahmedabad",
        status: "Reported",
        distance: "2.4 km",
        reportedDate: "Sep 03",
        upvotes: 29,
        priority: "Medium",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 24,
        title: "Fire safety equipment missing",
        description: "Fire extinguishers missing from public building",
        category: "Safety",
        location: "Navrangpura, Ahmedabad",
        status: "New",
        distance: "1.7 km",
        reportedDate: "Sep 05",
        upvotes: 38,
        priority: "Critical",
        image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 25,
        title: "Playground equipment rusty",
        description: "Children's playground equipment is rusty",
        category: "Parks",
        location: "Vastrapur, Ahmedabad",
        status: "In Progress",
        distance: "2.9 km",
        reportedDate: "Sep 07",
        upvotes: 13,
        priority: "High",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 26,
        title: "Manhole cover missing",
        description: "Open manhole without cover posing safety risk",
        category: "Safety",
        location: "Paldi, Ahmedabad",
        status: "Reported",
        distance: "1.2 km",
        reportedDate: "Sep 09",
        upvotes: 52,
        priority: "Critical",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 27,
        title: "Tree branches blocking road",
        description: "Overgrown tree branches blocking main road",
        category: "Environment",
        location: "Ellis Bridge, Ahmedabad",
        status: "New",
        distance: "3.6 km",
        reportedDate: "Sep 11",
        upvotes: 17,
        priority: "Medium",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 28,
        title: "Public Wi-Fi not working",
        description: "Free public Wi-Fi service not working",
        category: "Technology",
        location: "C.G Road, Ahmedabad",
        status: "In Progress",
        distance: "2.1 km",
        reportedDate: "Sep 13",
        upvotes: 24,
        priority: "Low",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 29,
        title: "Sewage overflow",
        description: "Sewage overflow causing health hazards",
        category: "Sanitation",
        location: "Maninagar, Ahmedabad",
        status: "Reported",
        distance: "5.8 km",
        reportedDate: "Sep 15",
        upvotes: 44,
        priority: "Critical",
        image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=250&auto=format&fit=crop&q=60"
    },
    {
        id: 30,
        title: "ATM not working",
        description: "Bank ATM has been out of service for over a week",
        category: "Banking",
        location: "Ashram Road, Ahmedabad",
        status: "New",
        distance: "4.1 km",
        reportedDate: "Sep 17",
        upvotes: 19,
        priority: "Medium",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&auto=format&fit=crop&q=60"
    }
];

const categories = ["All", ...new Set(allEvents.map(e => e.category))];
const cities = ["All", ...new Set(allEvents.map(e => e.city))];
const organizers = ["All", ...new Set(allEvents.map(e => e.organizer))];

const issueCategories = ["All", ...new Set(allIssues.map(i => i.category))];
const issueStatuses = ["All", ...new Set(allIssues.map(i => i.status))];
const issuePriorities = ["All", ...new Set(allIssues.map(i => i.priority))];

// Function to get event status based on current date (June 5, 2025)
const getEventStatus = (eventDate) => {
    const currentDate = new Date('2025-06-05');
    const eventDateObj = new Date(eventDate);
    const timeDiff = eventDateObj.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < 0) {
        return { status: "Ended", color: "error", order: 3 };
    } else if (daysDiff === 0) {
        return { status: "Ongoing", color: "success", order: 1 };
    } else if (daysDiff <= 7) {
        return { status: "Starting Soon", color: "warning", order: 1 };
    } else {
        return { status: "Upcoming", color: "primary", order: 2 };
    }
};

// Function to get date filter based on current date
const getDateFilter = (eventDate, dateFilter) => {
    if (dateFilter === "All") return true;

    const currentDate = new Date('2025-06-05');
    const eventDateObj = new Date(eventDate);
    const timeDiff = eventDateObj.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    switch (dateFilter) {
        case "Today":
            return daysDiff === 0;
        case "Tomorrow":
            return daysDiff === 1;
        case "Days After":
            return daysDiff > 1;
        default:
            return true;
    }
};

// Function to get issue status color
const getIssueStatusColor = (status) => {
    switch (status) {
        case "New": return "primary";
        case "In Progress": return "warning";
        case "Reported": return "success";
        default: return "default";
    }
};

function Home() {
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);

    // Events filters
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [cityFilter, setCityFilter] = useState("All");
    const [organizerFilter, setOrganizerFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [dateFilter, setDateFilter] = useState("All");
    const [eventUpvotes, setEventUpvotes] = useState({});
    const [showMap, setShowMap] = useState(false);

    // Issues filters
    const [issueCategoryFilter, setIssueCategoryFilter] = useState("All");
    const [issueStatusFilter, setIssueStatusFilter] = useState("All");
    const [issuePriorityFilter, setIssuePriorityFilter] = useState("All");
    const [issueSearchQuery, setIssueSearchQuery] = useState("");

    // NEW STATES FOR ISSUES FUNCTIONALITY
    const [issueUpvotes, setIssueUpvotes] = useState({});
    const [followedIssues, setFollowedIssues] = useState(new Set());
    const [spamDialog, setSpamDialog] = useState({ open: false, issueId: null });

    const [page, setPage] = useState(1);
    const itemsPerPage = 8;

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        setPage(1);
    };

    const handleViewDetails = (eventId) => {
        navigate(`/event/${eventId}`);
    };

    const handleEventUpvote = (eventId) => {
        setEventUpvotes(prev => ({
            ...prev,
            [eventId]: (prev[eventId] || 0) + 1
        }));
    };

    // NEW ISSUE HANDLERS
    const handleIssueUpvote = (issueId) => {
        setIssueUpvotes(prev => ({
            ...prev,
            [issueId]: (prev[issueId] || 0) + 1
        }));
    };

    const handleFollowIssue = (issueId) => {
        setFollowedIssues(prev => {
            const newSet = new Set(prev);
            if (newSet.has(issueId)) {
                newSet.delete(issueId);
            } else {
                newSet.add(issueId);
            }
            return newSet;
        });
    };

    const handleReportSpam = (issueId) => {
        setSpamDialog({ open: true, issueId });
    };

    const confirmSpamReport = () => {
        // Here you would typically send to backend
        console.log(`Reported issue ${spamDialog.issueId} as spam`);
        setSpamDialog({ open: false, issueId: null });
        // Show success message
        alert("Issue reported as spam. Thank you for helping keep our community clean!");
    };

    // Filter events with sorting by status order and upvotes
    const filteredEvents = allEvents.filter(event => {
        const matchesCategory = categoryFilter === "All" || event.category === categoryFilter;
        const matchesCity = cityFilter === "All" || event.city === cityFilter;
        const matchesOrganizer = organizerFilter === "All" || event.organizer === organizerFilter;
        const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDate = getDateFilter(event.date, dateFilter);

        return matchesCategory && matchesSearch && matchesDate && matchesCity && matchesOrganizer;
    }).sort((a, b) => {
        const statusA = getEventStatus(a.date);
        const statusB = getEventStatus(b.date);

        // First sort by status order
        if (statusA.order !== statusB.order) {
            return statusA.order - statusB.order;
        }

        // Then sort by upvotes in decreasing order within same status
        const upvotesA = a.upvotes + (eventUpvotes[a.id] || 0);
        const upvotesB = b.upvotes + (eventUpvotes[b.id] || 0);
        return upvotesB - upvotesA;
    });

    // Filter issues
    const filteredIssues = allIssues.filter(issue => {
        const matchesCategory = issueCategoryFilter === "All" || issue.category === issueCategoryFilter;
        const matchesStatus = issueStatusFilter === "All" || issue.status === issueStatusFilter;
        const matchesPriority = issuePriorityFilter === "All" || issue.priority === issuePriorityFilter;
        const matchesSearch = issue.title.toLowerCase().includes(issueSearchQuery.toLowerCase());

        return matchesCategory && matchesStatus && matchesPriority && matchesSearch;
    });

    const currentItems = tabValue === 0 ? filteredEvents : filteredIssues;
    const paginatedItems = currentItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const totalPages = Math.ceil(currentItems.length / itemsPerPage);

    return (
        <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh' }}>
            <Container maxWidth="xl" sx={{ py: 0.01, px: 0.01 }}>
                {/* Tabs */}
                <Box sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    mb: 4,
                    bgcolor: 'white',
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        centered
                        sx={{
                            '& .MuiTab-root': {
                                fontSize: '1.2rem',
                                fontWeight: 600,
                                textTransform: 'none',
                                minWidth: 150,
                                py: 2,
                                '&.Mui-selected': {
                                    color: '#1976d2',
                                }
                            },
                            '& .MuiTabs-indicator': {
                                height: 3,
                                borderRadius: 2,
                            }
                        }}
                    >
                        <Tab label="🎉 Events" />
                        <Tab label="⚠️ Issues" />
                    </Tabs>
                </Box>

                {/* Events Tab Content */}
                {tabValue === 0 && (
                    <Box>
                        {/* Events Section Title */}
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{
                                mb: 3,
                                fontWeight: 600,
                                color: '#333',
                                padding: '0 16px',
                            }}
                        >
                            Events in Your City
                        </Typography>

                        {/* Events Filters */}

                        <Card sx={{ mb: 2, p: 2, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                            <Grid container spacing={1} sx={{ alignItems: 'center' }}>

                                <Grid item xs={12} sm={6} md={4} lg={2.2}>
                                    <FormControl fullWidth size="small" sx={{ minWidth: 150 }}>
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                            value={categoryFilter}
                                            onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
                                            sx={{
                                                '& .MuiSelect-select': {
                                                    padding: '12px 14px',
                                                    minWidth: '120px'
                                                }
                                            }}
                                        >
                                            {categories.map((cat, i) => (
                                                <MenuItem value={cat} key={i}>{cat}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2.2}>
                                    <FormControl fullWidth size="small" sx={{ minWidth: 150 }}>
                                        <InputLabel>City</InputLabel>
                                        <Select
                                            value={cityFilter}
                                            onChange={(e) => { setCityFilter(e.target.value); setPage(1); }}
                                            sx={{
                                                '& .MuiSelect-select': {
                                                    padding: '12px 14px',
                                                    minWidth: '120px'
                                                }
                                            }}
                                        >
                                            {cities.map((city, i) => (
                                                <MenuItem value={city} key={i}>{city}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2.2}>
                                    <FormControl fullWidth size="small" sx={{ minWidth: 150 }}>
                                        <InputLabel>Organizer</InputLabel>
                                        <Select
                                            value={organizerFilter}
                                            onChange={(e) => { setOrganizerFilter(e.target.value); setPage(1); }}
                                            sx={{
                                                '& .MuiSelect-select': {
                                                    padding: '12px 14px',
                                                    minWidth: '120px'
                                                }
                                            }}
                                        >
                                            {organizers.map((org, i) => (
                                                <MenuItem value={org} key={i}>{org}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2.2}>
                                    <TextField
                                        label="Search"
                                        value={searchQuery}
                                        onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                                        fullWidth
                                        size="small"
                                        sx={{
                                            minWidth: 120,
                                            '& .MuiInputBase-root': {
                                                minWidth: '100px'
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2.8}>
                                    <FormControl fullWidth size="small" sx={{ minWidth: 150 }}>
                                        <InputLabel>Date Filter</InputLabel>
                                        <Select
                                            value={dateFilter}
                                            onChange={(e) => {
                                                setDateFilter(e.target.value);
                                                setPage(1);
                                            }}
                                            sx={{
                                                '& .MuiSelect-select': {
                                                    padding: '12px 14px',
                                                    minWidth: '120px'
                                                }
                                            }}
                                        >
                                            <MenuItem value="All">All Dates</MenuItem>
                                            <MenuItem value="Today">Today</MenuItem>
                                            <MenuItem value="Tomorrow">Tomorrow</MenuItem>
                                            <MenuItem value="Days After">Days After</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={0.4}>
                                    <IconButton
                                        onClick={() => setShowMap(true)}
                                        sx={{
                                            bgcolor: '#1976d2',
                                            color: 'white',
                                            width: 40,
                                            height: 40,
                                            '&:hover': {
                                                bgcolor: '#1565c0'
                                            }
                                        }}
                                    >
                                        <Map />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Card>

                        {/* Event Cards */}
                        <Grid container spacing={3} sx={{ mt: 1, justifyContent: 'center' }}>
                            {paginatedItems.map(event => {
                                const eventStatus = getEventStatus(event.date);
                                const currentUpvotes = event.upvotes + (eventUpvotes[event.id] || 0);
                                return (
                                    <Grid item key={event.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Card
                                            sx={{
                                                width: 280,
                                                height: 420,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                position: 'relative',
                                                borderRadius: 2,
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-4px)',
                                                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                                }
                                            }}
                                        >
                                            {/* Status Tag */}
                                            <Chip
                                                label={eventStatus.status}
                                                color={eventStatus.color}
                                                size="small"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 6,
                                                    right: 8,
                                                    zIndex: 1,
                                                    fontWeight: 'bold',
                                                }}
                                            />

                                            {/* Free Tag */}
                                            {event.price === 0 && (
                                                <Chip
                                                    label="FREE"
                                                    color="success"
                                                    size="small"
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 6,
                                                        left: 8,
                                                        zIndex: 1,
                                                        fontWeight: 'bold',
                                                        bgcolor: '#4caf50',
                                                        color: 'white',
                                                    }}
                                                />
                                            )}

                                            {/* Upvote Button */}
                                            <Box sx={{
                                                position: 'absolute',
                                                top: 40,
                                                left: 8,
                                                zIndex: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                bgcolor: 'rgba(255,255,255,0.9)',
                                                borderRadius: 2,
                                                px: 1,
                                                py: 0.5
                                            }}>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleEventUpvote(event.id)}
                                                    sx={{ p: 0.5 }}
                                                >
                                                    <ThumbUp sx={{ fontSize: 16, color: '#1976d2' }} />
                                                </IconButton>
                                                <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 600 }}>
                                                    {currentUpvotes}
                                                </Typography>
                                            </Box>

                                            <Box
                                                component="img"
                                                src={event.image}
                                                alt={event.name}
                                                sx={{
                                                    width: '100%',
                                                    height: 160,
                                                    objectFit: 'cover',
                                                    objectPosition: 'center',
                                                    borderTopLeftRadius: 8,
                                                    borderTopRightRadius: 8,
                                                }}
                                            />
                                            <CardContent sx={{ flexGrow: 1, p: 2, display: 'flex', flexDirection: 'column' }}>
                                                <Typography variant="h6" gutterBottom fontWeight={600} sx={{ color: '#1976d2', fontSize: '1rem' }}>
                                                    {event.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                    📍 {event.city} – {event.venue}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                    📅 {event.date}
                                                </Typography>
                                                <Typography variant="body2" sx={{ mb: 1 }}>
                                                    🎫 Seats: {event.seats > 0 ? event.seats : "Sold Out"}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        mb: 1,
                                                        lineHeight: 1.4,
                                                        flexGrow: 1,
                                                        overflow: 'hidden',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                    }}
                                                >
                                                    {event.description}
                                                </Typography>
                                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2', mt: 'auto' }}>
                                                    {event.price === 0 ? "FREE" : `₹${event.price}`}
                                                </Typography>
                                            </CardContent>
                                            <CardActions sx={{ p: 2, pt: 0 }}>
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    size="small"
                                                    onClick={() => handleViewDetails(event.id)}
                                                    sx={{
                                                        fontWeight: 600,
                                                        textTransform: 'none',
                                                    }}
                                                >
                                                    View Details
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                )}

                {/* Issues Tab Content - UPDATED WITH NEW FUNCTIONALITY */}
                {tabValue === 1 && (
                    <Box>
                        {/* Issues Section Title */}
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{
                                mb: 3,
                                fontWeight: 600,
                                color: '#333',
                                padding: '0 16px',
                            }}
                        >
                            Community Issues
                        </Typography>

                        {/* Issues Filters */}
                        // Events Filters card
                        <Card sx={{ mb: 2, p: 2, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                            <Grid container spacing={1} sx={{ alignItems: 'center' }}>

                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth size="small" sx={{ minWidth: 180 }}>
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                            value={issueCategoryFilter}
                                            onChange={(e) => { setIssueCategoryFilter(e.target.value); setPage(1); }}
                                            sx={{
                                                '& .MuiSelect-select': {
                                                    padding: '12px 14px',
                                                    minWidth: '150px'
                                                }
                                            }}
                                        >
                                            {issueCategories.map((cat, i) => (
                                                <MenuItem value={cat} key={i}>{cat}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth size="small" sx={{ minWidth: 180 }}>
                                        <InputLabel>Status</InputLabel>
                                        <Select
                                            value={issueStatusFilter}
                                            onChange={(e) => { setIssueStatusFilter(e.target.value); setPage(1); }}
                                            sx={{
                                                '& .MuiSelect-select': {
                                                    padding: '12px 14px',
                                                    minWidth: '150px'
                                                }
                                            }}
                                        >
                                            {issueStatuses.map((status, i) => (
                                                <MenuItem value={status} key={i}>{status}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth size="small" sx={{ minWidth: 180 }}>
                                        <InputLabel>Priority</InputLabel>
                                        <Select
                                            value={issuePriorityFilter}
                                            onChange={(e) => { setIssuePriorityFilter(e.target.value); setPage(1); }}
                                            sx={{
                                                '& .MuiSelect-select': {
                                                    padding: '12px 14px',
                                                    minWidth: '150px'
                                                }
                                            }}
                                        >
                                            {issuePriorities.map((priority, i) => (
                                                <MenuItem value={priority} key={i}>{priority}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <TextField
                                        label="Search Issues"
                                        value={issueSearchQuery}
                                        onChange={(e) => { setIssueSearchQuery(e.target.value); setPage(1); }}
                                        fullWidth
                                        size="small"
                                        sx={{
                                            minWidth: 180,
                                            '& .MuiInputBase-root': {
                                                minWidth: '150px'
                                            }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Card>

                        {/* Issue Cards - UPDATED WITH NEW FUNCTIONALITY */}
                        <Grid container spacing={3} sx={{ mt: 1, justifyContent: 'center' }}>
                            {paginatedItems.map(issue => {
                                const currentUpvotes = issue.upvotes + (issueUpvotes[issue.id] || 0);
                                const isFollowed = followedIssues.has(issue.id);

                                return (
                                    <Grid item key={issue.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Card
                                            sx={{
                                                width: 280,
                                                height: 420,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                position: 'relative',
                                                borderRadius: 2,
                                                transition: 'all 0.3s ease',
                                                border: issue.priority === 'Critical' ? '2px solid #f44336' :
                                                    issue.priority === 'High' ? '2px solid #ff9800' : '1px solid #e0e0e0',
                                                '&:hover': {
                                                    transform: 'translateY(-4px)',
                                                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                                }
                                            }}
                                        >
                                            {/* Status Tag */}
                                            <Chip
                                                label={issue.status}
                                                color={getIssueStatusColor(issue.status)}
                                                size="small"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 6,
                                                    right: 8,
                                                    zIndex: 1,
                                                    fontWeight: 'bold',
                                                }}
                                            />

                                            {/* Follow Button */}
                                            <IconButton
                                                onClick={() => handleFollowIssue(issue.id)}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 6,
                                                    left: 8,
                                                    zIndex: 1,
                                                    bgcolor: isFollowed ? '#4caf50' : 'rgba(255,255,255,0.9)',
                                                    color: isFollowed ? 'white' : '#1976d2',
                                                    width: 32,
                                                    height: 32,
                                                    '&:hover': {
                                                        bgcolor: isFollowed ? '#45a049' : '#e3f2fd',
                                                    }
                                                }}
                                            >
                                                {isFollowed ? <PersonRemove sx={{ fontSize: 16 }} /> : <PersonAdd sx={{ fontSize: 16 }} />}
                                            </IconButton>

                                            {/* Report Spam Button */}
                                            <IconButton
                                                onClick={() => handleReportSpam(issue.id)}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 6,
                                                    right: 50,
                                                    zIndex: 1,
                                                    bgcolor: 'rgba(255,255,255,0.9)',
                                                    color: '#f44336',
                                                    width: 32,
                                                    height: 32,
                                                    '&:hover': {
                                                        bgcolor: '#ffebee',
                                                    }
                                                }}
                                            >
                                                <Flag sx={{ fontSize: 16 }} />
                                            </IconButton>

                                            <Box
                                                component="img"
                                                src={issue.image}
                                                alt={issue.title}
                                                sx={{
                                                    width: '100%',
                                                    height: 160,
                                                    objectFit: 'cover',
                                                    objectPosition: 'center',
                                                    borderTopLeftRadius: 8,
                                                    borderTopRightRadius: 8,
                                                }}
                                            />
                                            <CardContent sx={{ flexGrow: 1, p: 2, display: 'flex', flexDirection: 'column' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                    <Avatar sx={{ bgcolor: '#f44336', width: 24, height: 24, mr: 1 }}>
                                                        ⚠️
                                                    </Avatar>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Chip
                                                            label={issue.category}
                                                            size="small"
                                                            variant="outlined"
                                                            sx={{ fontWeight: 600, fontSize: '0.7rem' }}
                                                        />
                                                        {/* Working Upvote Button */}
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleIssueUpvote(issue.id)}
                                                                sx={{
                                                                    p: 0.5,
                                                                    color: '#1976d2',
                                                                    '&:hover': {
                                                                        bgcolor: '#e3f2fd'
                                                                    }
                                                                }}
                                                            >
                                                                <ThumbUp sx={{ fontSize: 14 }} />
                                                            </IconButton>
                                                            <Typography variant="caption" color="primary" fontWeight={600}>
                                                                {currentUpvotes}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>

                                                <Typography variant="h6" gutterBottom fontWeight={600} sx={{ color: '#d32f2f', fontSize: '1rem' }}>
                                                    {issue.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{
                                                        mb: 1,
                                                        lineHeight: 1.4,
                                                        flexGrow: 1,
                                                        overflow: 'hidden',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                    }}
                                                >
                                                    {issue.description}
                                                </Typography>

                                                <Divider sx={{ my: 1 }} />

                                                <Box sx={{ mt: 'auto' }}>
                                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, fontWeight: 600 }}>
                                                        📍 {issue.location}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <Typography variant="caption" color="text.secondary">
                                                            📅 {issue.reportedDate}
                                                        </Typography>
                                                        <Typography variant="caption" color="primary" fontWeight={600}>
                                                            📍 {issue.distance}
                                                        </Typography>
                                                    </Box>

                                                    {/* Follow Status */}
                                                    {isFollowed && (
                                                        <Chip
                                                            label="Following"
                                                            color="success"
                                                            size="small"
                                                            sx={{
                                                                mt: 1,
                                                                fontSize: '0.7rem',
                                                                height: 20
                                                            }}
                                                        />
                                                    )}
                                                </Box>
                                            </CardContent>
                                            <CardActions sx={{ p: 2, pt: 0 }}>
                                                <Button
                                                    variant="outlined"
                                                    fullWidth
                                                    size="small"
                                                    color={issue.priority === 'Critical' ? 'error' : 'primary'}
                                                    sx={{
                                                        fontWeight: 600,
                                                        textTransform: 'none',
                                                    }}
                                                >
                                                    View Details
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                )}

                {/* Map Component - UPDATED FOR STARTING SOON + UPCOMING EVENTS */}
                {showMap && (
                    <MapView
                        events={filteredEvents.filter(event => {
                            const status = getEventStatus(event.date);
                            return status.status === "Starting Soon" || status.status === "Upcoming";
                        })}
                        onClose={() => setShowMap(false)}
                    />
                )}

                {/* Spam Report Dialog */}
                <Dialog
                    open={spamDialog.open}
                    onClose={() => setSpamDialog({ open: false, issueId: null })}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle sx={{ fontWeight: 700, color: '#f44336' }}>
                        🚨 Report Spam Issue
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Are you sure you want to report this issue as spam?
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            This action will help us maintain the quality of our community by flagging inappropriate or fake issues.
                            Our moderation team will review this report.
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                        <Button
                            onClick={() => setSpamDialog({ open: false, issueId: null })}
                            sx={{ textTransform: 'none' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={confirmSpamReport}
                            variant="contained"
                            color="error"
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600
                            }}
                        >
                            Report as Spam
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(_, val) => setPage(val)}
                            color="primary"
                            size="large"
                        />
                    </Box>
                )}
            </Container>
        </Box>
    );
}

export default Home;

