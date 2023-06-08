import * as React from "react";
import '../../assets/styles/chat.css';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import {Navigate, useNavigate} from "react-router-dom";
import {Box, IconButton, Link, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';


const Chat = () => {
    const navigate = useNavigate();


    return (
        <Box className='chat'>
            <div className='chat-mensaje' >
                chat
            </div>
            <div className='chat-send'>
                <TextField fullWidth label="mensaje" id="fullWidth" />
                <IconButton aria-label="send">
                    <SendIcon/>
                </IconButton>
            </div>
        </Box>
    );
}
export default Chat;