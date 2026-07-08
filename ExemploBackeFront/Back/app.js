const express = require('express');
const connection = require('./db');
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.json());

// LISTAR TODOS
server.get('/cursos', (req, res) => {

    const sql = 'SELECT * FROM cursos';

    connection.query(sql, (erro, resultados) => {

        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        return res.json(resultados);

    });

});

// LISTAR POR ID
server.get('/cursos/:id', (req, res) => {

    const id = req.params.id;

    const sql = 'SELECT * FROM cursos WHERE id = ?';

    connection.query(sql, [id], (erro, resultados) => {

        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                mensagem: 'Curso não encontrado.'
            });
        }

        return res.json(resultados[0]);

    });

});

// CADASTRAR
server.post('/cursos', (req, res) => {

    const { nome } = req.body;

    const sql = 'INSERT INTO cursos (nome) VALUES (?)';

    connection.query(sql, [nome], (erro, resultados) => {

        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        return res.status(201).json({
            mensagem: 'Curso cadastrado com sucesso!',
            id: resultados.insertId,
            nome
        });

    });

});

// ATUALIZAR
server.put('/cursos/:id', (req, res) => {

    const id = req.params.id;
    const { nome } = req.body;

    const sql = 'UPDATE cursos SET nome = ? WHERE id = ?';

    connection.query(sql, [nome, id], (erro, resultados) => {

        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        if (resultados.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Curso não encontrado.'
            });
        }

        return res.json({
            mensagem: 'Curso atualizado com sucesso!',
            id,
            nome
        });

    });

});

// EXCLUIR
server.delete('/cursos/:id', (req, res) => {

    const id = req.params.id;

    const sql = 'DELETE FROM cursos WHERE id = ?';

    connection.query(sql, [id], (erro, resultados) => {

        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        if (resultados.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Curso não encontrado.'
            });
        }

        return res.json({
            mensagem: 'Curso removido com sucesso!'
        });

    });

});

server.listen(3023, () => {
    console.log('Servidor rodando na porta 3023');
});