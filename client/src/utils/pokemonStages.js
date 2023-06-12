export const getStages = (stage) => {
    switch (stage) {

        case 1:
            return "Fase 1";
        case 2:
            return "Fase 2";
        case 3:
            return "Fase 3";
        default:
            return "Número inválido";
    }
};

