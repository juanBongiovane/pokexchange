import React, {createContext, useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from '../src/router/index';
import Cookies from "js-cookie";
import axios from "axios";
import {BASE_API_URL} from "./constants/apiRoutes";


export const TrainerContext = createContext(null);
export const UserContext = createContext(null);
const data = {
    trainers: require('./assets/data/trainer.json'),
};

const MyRoot = function() {

    const [userData, setUserData] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const fetchUserById = async () => {
        try {
            const token = Cookies.get('token');
            if (token === undefined || token == null || token === "") {
                return;
            }
            const response = await axios.get(BASE_API_URL + '/user', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (response.data) {
                setUserData(response.data);
            }
        } catch (error) {
            console.log('Error fetching user by ID:', error);
        }
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (refresh || (userData == null && (token !== undefined && token != null && token !== ""))) {
            fetchUserById();
        }
        setRefresh(false);
    }, [refresh]);


    return (
            <UserContext.Provider value={[userData, setUserData, setRefresh] }>
                <TrainerContext.Provider value={data.trainers}>
                    <React.StrictMode>
                        <AppRoutes />
                    </React.StrictMode>
                </TrainerContext.Provider>
            </UserContext.Provider>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<MyRoot />);