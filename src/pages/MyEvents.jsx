import {Button} from "@mui/material";
import React from "react";
import {logoutUser} from "../API/API.jsx";
import {useNavigate} from "react-router-dom";


function MyEvents() {
    const navigate = useNavigate();
    const handleLogout = () => {
        logoutUser();
        navigate("/login");
    };
    return (
        <>
            <h1>My Events!</h1>\
            <Button variant="contained" fullWidth onClick={handleLogout}>
                Log Out
            </Button>
        </>
    );
}

export default MyEvents;