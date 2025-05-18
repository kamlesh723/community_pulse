import {AppBar, Toolbar, Typography, Button, Container} from "@mui/material";
import {Link, Outlet} from "react-router-dom";

function Layout() {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{flexGrow: 1}}>
                        Community Pulse
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/about">About</Button>
                    <Button color="inherit" component={Link} to="/contact">Contact</Button>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/register">Register</Button>
                </Toolbar>
            </AppBar>
            <Container sx={{mt: 4}}>
                <Outlet/>
            </Container>
        </>
    );
}

export default Layout