const express = require('express');
const router = express.Router();
const pool = require('../database');
const fetch = require('node-fetch');
const axios = require('axios');
const responseamazon = require('../data/responseamazon.json');
const responseWalmart = require('../data/responsewalmart.json');
const responseOneItemWalmart = require('../data/oneItemResponseWalmart.json');
router.get('/cuadernos', (req, res) => {
    pool.query('SELECT * FROM cuadernos', (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

router.get('/cuadernos/:id', (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM cuadernos WHERE id = ?', [id], (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});
// apikey amazon: 8D616E2F2A354DAEB3CF03B0C90F7560
// apikey walmart: D45A6AB60EE446FAB204D2114298ED5E

router.get('/notebook', async (req, res) => {
    let multidata = [];
    // TO DO: Mejorar esta shit
    responseamazon.search_results.map((result) => {
         let genericItem = {};
         genericItem.id = result?.asin
         genericItem.title = result?.title;
         genericItem.link = result?.link;
         genericItem.image = result?.image;
         genericItem.rating = parseInt(result?.rating);
         genericItem.price = result?.price.value;
         genericItem.amazonPrime = result?.is_prime
         genericItem.priceSymbol = result?.price.currency;
         genericItem.plataforma = 1;
         multidata.push(genericItem);
     });
    responseWalmart.search_results.map((result) => {
        let genericItem = {};
        genericItem.id = result?.product.item_id;
        genericItem.title = result?.product.title;
        genericItem.link = result?.product.link;
        genericItem.image = result?.product.main_image;
        genericItem.rating = parseInt(result?.product.rating);
        genericItem.price = result?.offers.primary.price;
        genericItem.plataforma = 2;
        multidata.push(genericItem);
    })
    res.send(multidata);
});

router.get('/item', async (req, res) => {
    // ya funciona
    // const { item_id } = req.query;
    // const item = await getItem(item_id);
    // res.send(item);

    //local response
    const { product } = responseOneItemWalmart;
    console.log(product);
    res.send(product);
});

const getItem = async (item_id) => {
    try{
        const params = {
            api_key: "D45A6AB60EE446FAB204D2114298ED5E",
            type: "product",
            item_id,
        }
        const responseItem = await axios.get('https://api.bluecartapi.com/request', { params });
        const item = JSON.stringify(responseItem.data, 0, 2)
        return item;
    } catch (err) {
        console.log(err);
    }
}
module.exports = router;