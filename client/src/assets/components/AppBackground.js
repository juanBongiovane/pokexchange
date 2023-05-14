import {Box, Container} from "@mui/material";
import React from "react";

import '../../assets/styles/appBackground.css';

function AppBackground({ children }) {
    return (
        <Container maxWidth={false}
                   sx={{ height: '100vh', padding: 0}}
                   className="no-padding-container"
        >
            <Box sx={{ bgcolor: '#cfe8fc', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {children}
            </Box>
        </Container>
    );
}
export default AppBackground;