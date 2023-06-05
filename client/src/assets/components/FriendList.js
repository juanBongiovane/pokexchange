import {useContext, useEffect, useState} from "react";
import {TrainerContext, UserContext} from "../../index";
import {Box, Paper} from "@mui/material";
import {BASE_API_URL} from "../../constants/apiRoutes";
import * as React from "react";
import '../../assets/styles/friend.css';


const FriendList = ()=>{

    const [user, setUserData] = useContext(UserContext);
    const trainers = useContext(TrainerContext);

    const [friendList, setFriendList] = useState(user.friends.map(f => ({...f, online: false})));

    const [loading, setLoading] = useState(true);
    const [otherTab, setOtherTab] = useState(false);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:4000/friendlist');
        socket.onopen = function(e) {
            socket.send(JSON.stringify({
                state: "connected"
            }));
        };

        socket.onmessage = function (event) {
            const messageData = JSON.parse(event.data);
            console.log("recibido: ", messageData);
            switch (messageData.state){
                case "connectionOK": {
                    console.log("Conexion existosa");
                    break;
                }
                case "friendList": {
                    console.log("Recibida lista amigos", messageData);
                    setLoading(false);
                    let newFriendList = friendList.map(f => ({
                        ...f,
                        online: messageData.body.includes(f._id)
                    }))
                    setFriendList(newFriendList);
                    break;
                }
                case "connectedFriend": {
                    let newFriendList = friendList.map(f => (f._id === messageData.body ? {...f, online: true} : f));
                    console.log("New conected friend", messageData.body, newFriendList)
                    setFriendList(newFriendList);
                    break;
                }
                case "disconnectedFriend": {
                    let newFriendList = friendList.map(f => (f._id === messageData.body ? {...f, online: false} : f));
                    console.log("New conected friend", messageData.body, newFriendList)
                    setFriendList(newFriendList);
                    break;
                }
            }
        };

        socket.onclose =  function () {
            setOtherTab(true);
            if (window.exchangeSocket)
                window.exchangeSocket.close()
            console.log('Conexión WebSocket cerrada');
        };
    }, []);

    return (
        <Box xs={12} className="friend-container" >
            { otherTab ? <div>Has abierto el chat en otra pestacha</div> : (loading ? <div>Loading</div> : (
                <>
                    {friendList.map(o => (
                        <Paper elevation={3} className="friend-box" key={o._id}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                <div>{o.online ? "🟢" : "⚪️"}</div>
                                <div
                                    className="trainer-image"
                                    style={{
                                        backgroundImage: `url("${BASE_API_URL}/public/images/trainer/${trainers[(o.trainerAvatar)-1].name}.png")`,
                                    }}
                                ></div>
                                <div className="trainer-name">
                                    <p>{o.name}</p>
                                </div>
                            </div>
                        </Paper>
                    ))}
                </>
            ))}
        </Box>
    );
}

export default FriendList;