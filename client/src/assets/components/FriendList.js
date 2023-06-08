import {useContext, useEffect, useState} from "react";
import {TrainerContext, UserContext} from "../../index";
import {BottomNavigation, BottomNavigationAction, Box, IconButton, Paper} from "@mui/material";
import {BASE_API_URL} from "../../constants/apiRoutes";
import * as React from "react";
import '../../assets/styles/friend.css';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


const FriendList = ()=>{

    const [user, setUserData, setRefresh] = useContext(UserContext);
    const trainers = useContext(TrainerContext);

    const [friendList, setFriendList] = useState([]);
    console.log(friendList);
    const [loading, setLoading] = useState(true);
    const [otherTab, setOtherTab] = useState(false);

    const [value, setValue] = React.useState(0);

    useEffect(() => {
        setFriendList(user.friends.map(f => ({...(f.friend), state: f.state, online: false})));
        if (window.resendConnected) window.resendConnected()
    }, [user]);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:4000/friendlist');
        socket.onopen = function(e) {
            socket.send(JSON.stringify({
                state: "connected"
            }));
        };

        window.resendConnected = ((socket) => () => {
            console.log("Sending connected");
            socket.send(JSON.stringify({
                state: "connected"
            }));
        })(socket);

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
                    setFriendList((prevState) => {
                        return  prevState.map(f => ({
                            ...f,
                            online: messageData.body.includes(f._id)
                        }));
                    });
                    break;
                }
                case "connectedFriend": {
                    console.log("New conected friend", messageData.body)

                    setFriendList((prevState) => {
                        return prevState.map(f => (f._id === messageData.body ? {...f, online: true} : f));
                    });
                    break;
                }
                case "disconnectedFriend": {
                    console.log("New conected friend", messageData.body)
                    setFriendList((prevState) => {
                        return prevState.map(f => (f._id === messageData.body ? {...f, online: false} : f));
                    });
                    break;
                }
                case 'addFriendOK':{
                    console.log("anadir amigo ");
                    setRefresh(true);
                }
            }
        };

        window.handleAddFriendOK = ((socket) => (friendId) => {
            socket.send(
                JSON.stringify(
                    {
                        state: 'addFriendOK',
                        body: friendId
                    })
            );
        })(socket);

        window.handleNOTAddFriendOK = ((socket) => (friendId) => {
            socket.send(
                JSON.stringify(
                    {
                        state: 'NOTaddFriend',
                        body: friendId
                    })
            );
        })(socket);

        window.closeFriendSocket = ((socket) => () => {
            socket.close();
        })(socket);

        socket.onclose =  function () {
            setOtherTab(true);
            if (window.exchangeSocket)
                window.exchangeSocket.close()
            console.log('Conexión WebSocket cerrada');
        };
    }, []);

    return (
        <Box xs={12} className="friend-container">
            <Paper elevation={1}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction icon={<PeopleAltIcon />} />
                    <BottomNavigationAction icon={<GroupAddIcon />} />
                </BottomNavigation>
            </Paper>
            <div style={{ overflowY: 'auto' }}>
                {otherTab ? (
                    <div>Has abierto el chat en otra pestaña</div>
                ) : loading ? (
                    <div>Loading</div>
                ) : value === 0 ? (
                    <>
                        {friendList
                            .filter((o) => o.state === '')
                            .map((o) => (
                                <Paper elevation={3} className="friend-box" key={o._id}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                            paddingLeft: '10px',
                                        }}
                                    >
                                        <div>{o.online ? '🟢' : '⚪️'}</div>
                                        <div
                                            className="trainer-image"
                                            style={{
                                                backgroundImage: `url("${BASE_API_URL}/public/images/trainer/${trainers[o.trainerAvatar - 1].name}.png")`,
                                            }}
                                        ></div>
                                        <div className="trainer-name">
                                            <p>{o.name}</p>
                                        </div>
                                    </div>
                                </Paper>
                            ))}
                    </>
                ) : (
                    <>
                        {friendList
                            .filter((o) => o.state === 'PENDIENTE' || o.state === 'ENVIADO')
                            .map((o) => (
                                <Paper elevation={3} className="friend-box" key={o._id}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                        }}
                                    >
                                        <div
                                            className="trainer-image"
                                            style={{
                                                backgroundImage: `url("${BASE_API_URL}/public/images/trainer/${trainers[o.trainerAvatar - 1].name}.png")`,
                                            }}
                                        ></div>
                                        <div className="trainer-name">
                                            <p>{o.name}</p>
                                        </div>
                                        {o.state === 'PENDIENTE' ? (
                                            <>
                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={() => window.handleNOTAddFriendOK(o._id)}
                                                >
                                                    <DeleteIcon color="error" />
                                                </IconButton>
                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={() => window.handleAddFriendOK(o._id)}
                                                >
                                                    <HowToRegIcon color="success" />
                                                </IconButton>
                                            </>
                                        ) : (
                                            <>
                                                <div className="friendPending"></div>
                                                <AccessTimeIcon />
                                            </>
                                        )}
                                    </div>
                                </Paper>
                            ))}
                    </>
                )}
            </div>
        </Box>
    );
}

export default FriendList;