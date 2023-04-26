import * as React from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";

import trainersJson from '../data/trainer.json';

const TrainerSelector = () => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const trainers = require('../data/trainer.json');


    return (
        <FormControl fullWidth>
            <InputLabel id="trainer-select-label">Entrenador</InputLabel>
            <Select
                labelId="trainer-select-label"
                id="trainer"
                value={selectedValue}
                label="Entrenador"
                onChange={handleChange}
            >
                {trainers.map((trainer) => (
                    <MenuItem key={trainer['id-trainer']} value={trainer['id-trainer']}>
                        <a href={trainer.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                            {trainer.trainer}
                        </a>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default TrainerSelector;