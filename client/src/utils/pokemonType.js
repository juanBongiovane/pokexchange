
export const pokemonTypeBox = (type) => {

    const typesBox = {
        "steel": {
            "url": "https://images.wikidexcdn.net/mwuploads/wikidex/6/6c/latest/20230128124521/Tipo_acero_icono_EP.svg",
            "name": "Tipo acero"
        },
        "water": {
            "url": "https://images.wikidexcdn.net/mwuploads/wikidex/d/d6/latest/20230128124702/Tipo_agua_icono_EP.svg",
            "name": "Tipo agua"
        },
        "bug": {
            "url": "https://images.wikidexcdn.net/mwuploads/wikidex/1/1a/latest/20230128124809/Tipo_bicho_icono_EP.svg",
            "name": "Tipo bicho"
        },
        "dragon": {
            "url": "https://images.wikidexcdn.net/mwuploads/wikidex/1/15/latest/20230128124905/Tipo_dragón_icono_EP.svg",
            "name": "Tipo dragón"
        },
        "electric": {
            "url": "https://images.wikidexcdn.net/mwuploads/wikidex/8/84/latest/20230128125008/Tipo_eléctrico_icono_EP.svg",
            "name": "Tipo eléctrico"
        },
        "ghost": {
            "url": "https://images.wikidexcdn.net/mwuploads/wikidex/3/3d/latest/20230128125103/Tipo_fantasma_icono_EP.svg",
            "name": "Tipo fantasma"
        },
        "fire": {
            "url": "https://images.wikidexcdn.net/mwuploads/wikidex/5/55/latest/20230128125153/Tipo_fuego_icono_EP.svg",
            "name": "Tipo fuego"
        },
        "fairy": {
            "url": "https://images.wikidexcdn.net/mwuploads/wikidex/b/b7/latest/20230128125233/Tipo_hada_icono_EP.svg",
            "name": "Tipo hada"
        },
        "ice": {
            "url": "https://images.wikidexcdn.net/mwuploads/wikidex/a/a6/latest/20230128125423/Tipo_hielo_icono_EP.svg",
            "name": "Tipo hielo"
        },
        "fighting": {
            "url": "https://images.wikidexcdn.net/mwuploads/wikidex/f/f2/latest/20230128125518/Tipo_lucha_icono_EP.svg",
            "name": "Tipo lucha"
        },
        "normal": {
            "url": "https://images.wikidexcdn.net/mwuploads/wikidex/c/c3/latest/20230128125621/Tipo_normal_icono_EP.svg",
            "name": "Tipo normal"
        },
        "grass": {
            "url": "https://images.wikidexcdn.net/mwuploads/wikidex/e/ed/latest/20230128125654/Tipo_planta_icono_EP.svg",
            "name": "Tipo planta"
        },
        "psychic": {
            "url": "https://images.wikidexcdn.net/mwuploads/wikidex/2/22/latest/20230128125735/Tipo_psíquico_icono_EP.svg",
            "name": "Tipo psíquico"
        },
        "rock": {
            "url": "https://images.wikidexcdn.net/mwuploads/wikidex/1/14/latest/20230128125805/Tipo_roca_icono_EP.svg",
            "name": "Tipo roca"
        },
        "dark": {
            "url": "https://images.wikidexcdn.net/mwuploads/wikidex/e/e0/latest/20230128132504/Tipo_siniestro_icono_EP.svg",
            "name": "Tipo siniestro"
        },
        "ground": {
            "url": "https://images.wikidexcdn.net/mwuploads/wikidex/c/c8/latest/20230128132625/Tipo_tierra_icono_EP.svg",
            "name": "Tipo tierra"
        },
        "poison": {
            "url": "https://images.wikidexcdn.net/mwuploads/wikidex/f/fa/latest/20230128132735/Tipo_veneno_icono_EP.svg",
            "name": "Tipo veneno"
        },
        "flying": {
            "url": "https://images.wikidexcdn.net/mwuploads/wikidex/6/6b/latest/20230128132815/Tipo_volador_icono_EP.svg",
            "name": "Tipo volador"
        }
    };
    return typesBox[type];
};

export const pokemonTypeString = (type) => {
    const typesString = {
        steel: {
            url: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/5/52/latest/20221208180543/Tipo_acero_EP.png/80px-Tipo_acero_EP.png",
            name: "Tipo acero"
        },
        water: {
            url: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/5/59/latest/20221208180426/Tipo_agua_EP.png/80px-Tipo_agua_EP.png",
            name: "Tipo agua"
        },
        bug: {
            url: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/5/5d/latest/20221208180434/Tipo_bicho_EP.png/80px-Tipo_bicho_EP.png",
            name: "Tipo bicho"
        },
        dragon: {
            url: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/b/b8/latest/20221208180443/Tipo_drag%C3%B3n_EP.png/80px-Tipo_drag%C3%B3n_EP.png",
            name: "Tipo dragón"
        },
        electric: {
            url: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/3/38/latest/20221208180452/Tipo_el%C3%A9ctrico_EP.png/80px-Tipo_el%C3%A9ctrico_EP.png",
            name: "Tipo eléctrico"
        },
        ghost: {
            url: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/0/03/latest/20221208180503/Tipo_fantasma_EP.png/80px-Tipo_fantasma_EP.png",
            name: "Tipo fantasma"
        },
        fire: {
            url: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/c/c0/latest/20221208180625/Tipo_fuego_EP.png/80px-Tipo_fuego_EP.png",
            name: "Tipo fuego"
        },
        fairy: {
            url: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/9/97/latest/20221208180633/Tipo_hada_EP.png/80px-Tipo_hada_EP.png",
            name: "Tipo hada"
        },
        ice: {
            url: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/1/17/latest/20221208180641/Tipo_hielo_EP.png/80px-Tipo_hielo_EP.png",
            name: "Tipo hielo"
        },
        fighting: {
            url: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/5/5f/latest/20221208180651/Tipo_lucha_EP.png/80px-Tipo_lucha_EP.png",
            name: "Tipo lucha"
        },
        normal: {
            url: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/9/99/latest/20221208180705/Tipo_normal_EP.png/80px-Tipo_normal_EP.png",
            name: "Tipo normal"
        },
        grass: {
            url: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/a/a7/latest/20221208180710/Tipo_planta_EP.png/80px-Tipo_planta_EP.png",
            name: "Tipo planta"
        },
        psychic: {
            url: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/9/9b/latest/20221208180717/Tipo_ps%C3%ADquico_EP.png/80px-Tipo_ps%C3%ADquico_EP.png",
            name: "Tipo psíquico"
        },
        rock: {
            url: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/8/88/latest/20221208180726/Tipo_roca_EP.png/80px-Tipo_roca_EP.png",
            name: "Tipo roca"
        },
        dark: {
            url: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/d/de/latest/20221208180734/Tipo_siniestro_EP.png/80px-Tipo_siniestro_EP.png",
            name: "Tipo siniestro"
        },
        ground: {
            url: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/c/c9/latest/20221208180742/Tipo_tierra_EP.png/80px-Tipo_tierra_EP.png",
            name: "Tipo tierra"
        },
        poison: {
            url: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/1/11/latest/20221208180751/Tipo_veneno_EP.png/80px-Tipo_veneno_EP.png",
            name: "Tipo veneno"
        },
        flying: {
            url: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/9/9a/latest/20221208180800/Tipo_volador_EP.png/80px-Tipo_volador_EP.png",
            name: "Tipo volador"
        }
    };
    return typesString[type];
};