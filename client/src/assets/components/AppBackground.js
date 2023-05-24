import {Box, Container} from "@mui/material";
import React from "react";

import '../../assets/styles/appBackground.css';

function AppBackground({ children }) {
    return (
        <Container maxWidth={false}
                   sx={{ minHeight: '100vh', padding: 0}}
                   className="no-padding-container"
        >
            <Box sx={{ bgcolor: '#cfe8fc', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {children}
            </Box>
        </Container>
    );
}
export default AppBackground;