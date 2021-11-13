const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/login/:email/:password', (req, res) => {
    const { email, password } = req.params;
    console.log(email, password);
    pool.query('SELECT * FROM usuario WHERE correo = ? and password = ?', [email,password], (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});


module.exports = router;