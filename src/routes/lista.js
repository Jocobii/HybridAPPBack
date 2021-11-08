const express = require('express');
const router = express.Router();
const pool = require('../database');

router.post('/lista/create', (req, res) => {
    const { namePerson, usuarioId } = req.body;
    pool.query('INSERT INTO lista(name_person, usuario_id) VALUES (?,?)', [namePerson, usuarioId], (err, rows) => {
        if (!err) {
            res.json(req.body);
        } else {
            console.log(err);
        }
    })
})

module.exports = router;