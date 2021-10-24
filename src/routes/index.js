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
         genericItem.isAmazon = true;
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
        genericItem.isWalmart = true;
        multidata.push(genericItem);
    })
    res.send(multidata);
});

//es post, get es para pruebas
router.get('/item', async (req, res) => {
//     const itemId = req.body.itemId;
//     // set up the request parameters
//     const params = {
//         api_key: "D45A6AB60EE446FAB204D2114298ED5E",
//         type: "product",
//         item_id: itemId,
//     }
  
//   // make the http GET request to BlueCart API
//   axios.get('https://api.bluecartapi.com/request', { params })
//     .then(response => {
  
//       // print the JSON resy ponse from BlueCart API
//       const respon = JSON.stringify(response.data, 0, 2);
//       console.log(itemId);
//         res.send(respon);
//     }).catch(error => {
//       // catch and print the error
//       console.log(error);
//     })
    const { product } = responseOneItemWalmart;
    res.send(product);
});
module.exports = router;