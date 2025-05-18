import React from "react";
import {Outlet} from "react-router-dom";
import Box from "@mui/material/Box";
import {styled} from '@mui/material/styles';

const Main = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
}));

const PrivateLayout = () => {
    return (
        <Box sx={{display: 'flex'}}>
            <Main>
                <Outlet/>
            </Main>
        </Box>
    );
};

export default PrivateLayout;
