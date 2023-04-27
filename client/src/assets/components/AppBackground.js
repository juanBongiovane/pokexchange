import {Box, Container} from "@mui/material";
import React from "react";

function AppBackground({ children }) {
    return (
        <Container maxWidth={false}
                   sx={{ height: '100vh', padding: 0}}
                   className="no-padding-container"
        >
            <Box sx={{ bgcolor: '#cfe8fc', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{
                    borderRadius: '8px',
                    padding: '32px',
                    backgroundColor: '#fff',
                    minWidth: '300px',
                    maxWidth: '100%',
                    boxShadow: 3
                }}>
                    {children}
                </Box>
            </Box>
        </Container>
    );
}
export default AppBackground;