import * as React from 'react';
import {IconButton, InputLabel} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {useContext, useEffect, useState} from "react";
import { BASE_API_URL } from "../../constants/apiRoutes";
import { getRandomIndex } from "../../utils/random";

import {TrainerContext} from "../../index";
import '../../assets/styles/trainerSelector.css';



const TrainerSelector = ({initialValue, onTrainerChange }) => {

    const trainers = useContext(TrainerContext);

    const [selectedTrainer, setSelectedTrainer] = useState(null);

    useEffect(() => {
        const rand = getRandomIndex(trainers);
        setSelectedTrainer(rand);
        onTrainerChange(trainers[rand].idTrainer);
    }, []);

    const handleChange = (direction) => {
        //const newTrainerIndex = getRandomIndex(trainers);
        let newTrainerIndex = selectedTrainer+direction;
        if (newTrainerIndex < 0) newTrainerIndex = trainers.length-1;
        if (newTrainerIndex === trainers.length) newTrainerIndex = 0;
        setSelectedTrainer(newTrainerIndex);
        onTrainerChange(trainers[newTrainerIndex].idTrainer);
    };

    return selectedTrainer == null ? (<></>) : (
        <div className="trainer">
            <p id="trainer-select-label">Elige a tu avatar</p>
                <div className="trainer-crop">
                    <IconButton
                        aria-label="previus trtainer"
                        id="trainer"
                        value={selectedTrainer}
                        label="Entrenador"
                        onClick={handleChange.bind(null, -1)}>
                        <ArrowBackIosIcon
                        />
                    </IconButton>
                    <div
                        className="trainer-image"
                        style={{
                            backgroundImage: `url("${BASE_API_URL}/public/images/trainer/${trainers[selectedTrainer].name}.png")`,
                        }}
                    ></div>
                    <IconButton
                        aria-label="next traienr"
                        id="trainer"
                        value={selectedTrainer}
                        label="Entrenador"
                        onClick={handleChange.bind(null, 1)}>
                        <ArrowForwardIosIcon
                        />
                    </IconButton>

                    {/*<InputLabel>{trainers[selectedTrainer].name}</InputLabel>*/}
                </div>
       </div>
    );
};

export default TrainerSelector;