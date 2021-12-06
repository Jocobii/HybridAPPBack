const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/getcotizacion/:idlist', (req, res) => {
    const { idlist } = req.params;
    pool.query('SELECT lis.name_person,prod.title, prod.price,prod.price_symbol FROM lista AS lis JOIN producto_lista AS pl ON lis.id=pl.lista_id JOIN producto as prod ON prod.id= pl.producto_id WHERE lista_id = ?', 
    [idlist], (err, rows) => {
        if (!err) {
            res.status(200).send({rows});
        } else {
            res.json(err);
        }
    })
})

module.exports = router;