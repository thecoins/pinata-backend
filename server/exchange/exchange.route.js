const express = require('express');
const exchangeCtrl = require('./exchange.controller');

const router = express.Router();

router.route('/basic/')
    .get(exchangeCtrl.basic)

router.route('/')
    .get(exchangeCtrl.list)

router.route('/:name')    
    .get(exchangeCtrl.get)


router.param('name', exchangeCtrl.load);


module.exports = router;  