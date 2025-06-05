import React, { useEffect, useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    useTheme,
    useMediaQuery,
    Box,
} from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Layout() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const navigate = useNavigate();

    // Simple login state: check if token exists in localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token"); // Or whatever key you use
        setIsLoggedIn(!!token);
    }, []);

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token on logout
        setIsLoggedIn(false);
        navigate("/login"); // redirect to login page
    };

    return (
        <>
            <AppBar
                position="static"
                sx={{
                    background: "linear-gradient(90deg, #1976d2 60%, #2196f3 100%)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    borderBottom: "2px solid #1565c0",
                }}
            >
                <Toolbar sx={{ justifyContent: "space-between", minHeight: 68 }}>
                    <Typography
                        variant="h5"
                        component={Link}
                        to="/"
                        sx={{
                            color: "#fff",
                            fontWeight: 700,
                            textDecoration: "none",
                            letterSpacing: 1,
                            fontFamily: "Montserrat, sans-serif",
                        }}
                    >
                        Community Pulse
                    </Typography>

                    {/* Buttons container aligned right with small gaps */}
                    <Box sx={{ display: "flex", gap: 1 }}>
                        {isLoggedIn ? (
                            <>
                                <Button
                                    onClick={() => navigate("/report")}
                                    sx={{
                                        backgroundColor: "#c8c2bd",
                                        color: "#1976d2",
                                        fontWeight: 700,
                                        fontSize: 16,
                                        textTransform: "none",
                                        padding: "8px 20px",
                                        borderRadius: 2,
                                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
                                        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                                        "&:hover": {
                                            backgroundColor: "#ffea00",
                                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
                                        },
                                    }}
                                >
                                    Report New Issue
                                </Button>

                                <Button
                                    onClick={() => navigate("/add-event")}
                                    sx={{
                                        backgroundColor: "#c8c2bd",
                                        color: "#1976d2",
                                        fontWeight: 700,
                                        fontSize: 16,
                                        textTransform: "none",
                                        padding: "8px 20px",
                                        borderRadius: 2,
                                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
                                        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                                        "&:hover": {
                                            backgroundColor: "#ffea00",
                                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
                                        },
                                    }}
                                >
                                    + Add New Event
                                </Button>

                                <Button
                                    onClick={handleLogout}
                                    sx={{
                                        backgroundColor: "#c8c2bd",
                                        color: "#1976d2",
                                        fontWeight: 700,
                                        fontSize: 16,
                                        textTransform: "none",
                                        padding: "8px 20px",
                                        borderRadius: 2,
                                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
                                        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                                        "&:hover": {
                                            backgroundColor: "#ffea00",
                                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
                                        },
                                    }}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Button
                                component={Link}
                                to="/login"
                                sx={{
                                    backgroundColor: "#c8c2bd",
                                    color: "#1976d2",
                                    fontWeight: 700,
                                    fontSize: 16,
                                    textTransform: "none",
                                    padding: "8px 20px",
                                    borderRadius: 2,
                                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
                                    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                                    "&:hover": {
                                        backgroundColor: "#ffea00",
                                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
                                    },
                                }}
                            >
                                Login
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            <Container sx={{ mt: 4 }}>
                <Outlet />
            </Container>
        </>
    );
}

export default Layout;
