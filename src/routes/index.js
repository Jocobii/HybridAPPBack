const express = require('express');
const router = express.Router();
const pool = require('../database');
router.get('/cuadernos', (req, res) =>{
    pool.query('SELECT * FROM cuadernos', (err, rows) => {
        if (!err) {
            res.json(rows);
        }else {
            console.log(err);
        }
    })
});

router.get('/cuadernos/:id', (req, res) => {
    const { id } =req.params;
    pool.query('SELECT * FROM cuadernos WHERE id = ?', [id], (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

module.exports = router;