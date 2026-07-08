const express = require('express');

const server = express();

server.get('/aluno', (req, res) => {
    let aluno = {
        "nome":"Renan",
        "curso":"TI"
    }

    return res.json({aluno});
});

server.get('/professor', (req, res) => {
    let professor = {
        "nome":"Carlos",
        "disciplina":"redes"
    }

    return res.json({professor});
});

server.get('/escola', (req, res) => {
    let escola = {
        "nome":"CentroWeg",
        "cidade":"Jaraguá do Sul"
    }

    return res.json({escola});
});

server.listen(3002, () => {});