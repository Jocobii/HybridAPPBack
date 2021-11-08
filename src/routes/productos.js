const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/product', (req, res) => {
    res.send("obteniendo productos")
    // pool.query('SELECT * FROM producto', (err, rows) => {
    //     if (!err) {
    //         res.json(rows);
    //     }else {
    //         console.log(err);
    //     }
    // })
});

router.get('/producto/:id', (req, res) => {
    res.send("obteniendo un producto")
});

router.put('/producto/update', (req, res) => {
   res.send('updating produc with id: ', req)
});

module.exports = router;