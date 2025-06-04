// Layout.jsx
import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";

function Layout() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

                    {/* Only Login button */}
                    <Button
                        component={Link}
                        to="/login"
                        sx={{
                            backgroundColor: "#c8c2bd", // bright yellow
                            color: "#1976d2", // matching primary blue text
                            fontWeight: 700,
                            fontSize: 16,
                            textTransform: "none",
                            padding: "8px 20px",
                            borderRadius: 2,
                            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
                            transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                            "&:hover": {
                                backgroundColor: "#ffea00", // brighter yellow on hover
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
                            },
                        }}
                    >
                        Login
                    </Button>

                </Toolbar>
            </AppBar>

            <Container sx={{ mt: 4 }}>
                <Outlet />
            </Container>
        </>
    );
}

export default Layout;
