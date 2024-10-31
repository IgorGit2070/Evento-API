// api.js
let eventos = [
    { id: 1, titulo: "Evento A", data: "2024-11-01", local: "Local A", descricao: "Descrição do Evento A" },
    { id: 2, titulo: "Evento B", data: "2024-11-05", local: "Local B", descricao: "Descrição do Evento B" },
];

let participantes = {
    1: [],
    2: []
};

export const getEventos = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(eventos), 500);
    });
};

export const getParticipantes = (eventoId) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(participantes[eventoId] || []), 500);
    });
};

export const addParticipante = (eventoId, participante) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            participantes[eventoId].push(participante);
            resolve(participante);
        }, 500);
    });
};
