import React, {createContext, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
    RouterProvider,
} from "react-router-dom";
import routes from "./router";


export const TrainerContext = createContext(null);

export const UserContext = createContext(null);

const data = {
    trainers: require('./assets/data/trainer.json'),
}

const MyRoot = function() {
    const [userData, setUserData] = useState({
        "_id": "6458059963a49ba4475f5fc1",
        "name": "juan",
        "birthDate": "1992-12-15T00:00:00.000Z",
        "email": "juan.2012@hotmail.com",
        "password": "0c08e45dbfeadbf220931c3d4c10578856c32b90d202af62b4c713a3149d1b7d3f9cc5a6aa6138906784128ae66eb0412156f774a9d38f5326831cf0794efaa3",
        "trainerAvatar": 8,
        "friends": [],
        "boxes": [
            {
                "name": "caja 1",
                "pokemons": [
                    {
                        "name": "raichu",
                        "level": 1,
                        "species": {
                            "name": "Raichu",
                            "color": "yellow",
                            "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/26.png",
                            "imgBox": "https://img.pokemondb.net/sprites/sword-shield/normal/raichu.png",
                            "imgGif": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/26.gif",
                            "stages": 3,
                            "price": 400
                        },
                        "_id": "645d654a00264d01121a5712"
                    },
                    {
                        "name": "bulbasaur",
                        "level": 20,
                        "species": {
                            "name": "Raichu",
                            "color": "yellow",
                            "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
                            "imgBox": "https://img.pokemondb.net/sprites/sword-shield/normal/bulbasaur.png",
                            "imgGif": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif",
                            "stages": 3,
                            "price": 400
                        },
                        "_id": "645d658c9a2700ae894529ec"
                    }
                ]
            },
            {
                "name": "caja 2",
                "pokemons": []
            },
            {
                "name": "caja 3",
                "pokemons": []
            }
        ],
        "__v": 0
    });

    return (
        <UserContext.Provider value={[userData, setUserData]}>
            <TrainerContext.Provider value={data.trainers}>
                <React.StrictMode>
                    <RouterProvider router={routes} />
                </React.StrictMode>
            </TrainerContext.Provider>
       </UserContext.Provider>);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyRoot></MyRoot>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
