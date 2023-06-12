let lastIndex;

export const getRandomIndex = (obj) => {
    const keys = Object.keys(obj);
    let newIndex;

    do {
        newIndex = Math.floor(Math.random() * keys.length);
    } while (newIndex === lastIndex);

    lastIndex = newIndex;
    console.log(newIndex);
    return newIndex;
};