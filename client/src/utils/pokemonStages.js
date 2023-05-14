export const getStages = (stage) => {
    switch (stage) {

        case 1:
            return "FACE 1";
        case 2:
            return "FACE 2";
        case 3:
            return "FACE 3";
        default:
            return "Número inválido";
    }
};

