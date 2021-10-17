const express = require('express');
const router = express.Router();
const pool = require('../database');
router.get('/Cuadernos', (req, res) =>{
    pool.query('SELECT * FROM cuadernos', (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else {
            console.log(err);
        }
    })
})
router.get('/Cuadernos/:id', (req, res) => {
    const { id } =req.params;
    pool.query('SELECT * FROM cuadernos WHERE id = ?', [id], (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else {
            console.log(err);
        }
    })
})


module.exports = router;