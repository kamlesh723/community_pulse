import { AppBar, Toolbar, Typography, Button, Container, Stack } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
            <AppBar
                position="static"
                sx={{
                    background: "linear-gradient(90deg, #1976d2 60%, #2196f3 100%)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    borderBottom: "2px solid #1565c0"
                }}
            >
                <Toolbar sx={{ justifyContent: "space-between", minHeight: 68 }}>
                    {/* Logo/Brand */}
                    <Typography
                        variant="h5"
                        component={Link}
                        to="/"
                        sx={{
                            color: "#fff",
                            fontWeight: 700,
                            textDecoration: "none",
                            letterSpacing: 1,
                            fontFamily: "Montserrat, sans-serif"
                        }}
                    >
                        Community Pulse
                    </Typography>
                    {/* Navigation Links */}
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Button component={Link} to="/about" sx={navBtnStyle}>Registered Events</Button>
                        <Button component={Link} to="/contact" sx={navBtnStyle}>My Events</Button>
                        <Button component={Link} to="/login" sx={navBtnStyle}>Login</Button>
                        <Button component={Link} to="/AddEvent" sx={navBtnStyle}>Add Event</Button>

                    </Stack>
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 4 }}>
                <Outlet />
            </Container>
        </>
    );
}

const navBtnStyle = {
    color: "#fff",
    fontWeight: 500,
    fontSize: 16,
    textTransform: "none",
    "&:hover": { color: "#ffd600" }
};

export default Layout;