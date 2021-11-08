const express = require('express');
const router = express.Router();
const pool = require('../database');

router.post('/lista/create', (req, res) => {
    const { namePerson, usuarioId } = req.body;
    if(!namePerson || !usuarioId) {
        res.status(400).send('Parametros incorrectos');

        return;
    }
    pool.query('INSERT INTO lista(name_person, usuario_id) VALUES (?,?)', [namePerson, usuarioId], (err, rows) => {
        if (!err) {
            console.log(rows);
            res.status(200).send({status: 200, data: rows.insertId});
        } else {
            res.status(500).send({status: 500, message: 'Ha surgido un error en el servidor'});
            console.log(err);
        }
    })
})

router.get('/milista', (req, res) => {
    pool.query('SELECT * FROM lista WHERE id = (SELECT id FROM lista ORDER BY id DESC LIMIT 1)', (err, rows) => {
        if (!err) {
            console.log(rows);
            res.status(200).send({rows});
        } else {
            res.status(500).send({status: 500, message: 'Ha surgido un error en el servidor'});
            console.log(err);
        }
    })
})

module.exports = router;