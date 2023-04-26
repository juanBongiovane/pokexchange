import * as React from 'react';
import {IconButton} from "@mui/material";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import {useEffect, useState} from "react";
import { BASE_API_URL } from "../../constants/apiRoutes";
import { getRandomIndex } from "../../utils/random";

import '../../assets/styles/trainerSelector.css';



const TrainerSelector = () => {

    const [trainers, _] = useState(require('../data/trainer.json'));

    const [selectedTrainer, setSelectedTrainer] = useState(0);

    useEffect(() => {
        setSelectedTrainer(getRandomIndex(trainers));
    }, []);

    const handleChange = () => {
        setSelectedTrainer(getRandomIndex(trainers));
    };

    return (
        <div>
            <h1 id="trainer-select-label">Entrenador</h1>

                    <div className="trainer-crop">
                        <div
                            className="trainer-image"
                            style={{
                                backgroundImage: `url("${BASE_API_URL}public/images/trainer/${trainers[selectedTrainer].name}.png")`,
                            }}
                        ></div>
                        <p>{trainers[selectedTrainer].name}</p>
                    </div>

                <IconButton
                    aria-label="delete"
                    labelId="trainer-select-label"
                    id="trainer"
                    value={selectedTrainer}
                    label="Entrenador"
                    onClick={handleChange}>
                    <AutorenewIcon />
                </IconButton>

       </div>
    );
};

export default TrainerSelector;