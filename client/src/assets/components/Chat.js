import * as React from "react";
import '../../assets/styles/chat.css';

import { Box, IconButton, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../../pages/home";

const Chat = () => {
    const [messages, setMessage] = useContext(ChatContext);
    const [inputValue, setInputValue] = useState('');
    const chatMensajeRef = useRef(null);

    const sendMessage = () => {
        if(inputValue !== ""){
            window.chat(inputValue);
            setInputValue('');
        }
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        if (chatMensajeRef.current) {
            chatMensajeRef.current.scrollTop = chatMensajeRef.current.scrollHeight;
        }
    }, [messages]);

    const sumChars = (str) => {
        return str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    };

    const getColorFromSum = (sum) => {
        const hexColor = sum.toString(16);
        return '#' + hexColor;
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    };

    return (
        <Box className='chat'>
            <div ref={chatMensajeRef} className='chat-mensaje'>
                {messages.map((message, index) => {
                    const nameSum = sumChars(message.name);
                    const nameColor = getColorFromSum(nameSum);

                    return (
                        <div key={index} className="chat-message">
                            <span style={{ color: nameColor }}> {message.name}</span>
                            <span>: {message.message}</span>
                        </div>
                    );
                })}
            </div>
            <div className='chat-send'>
                <TextField type="text"
                           value={inputValue}
                           onChange={handleInputChange}
                           onKeyDown={handleKeyDown}
                           fullWidth
                           label="mensaje"
                           id="fullWidth"
                />
                <IconButton aria-label="send"
                            onClick={sendMessage}
                >
                    <SendIcon/>
                </IconButton>
            </div>
        </Box>
    );
}

export default Chat;