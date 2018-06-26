const express = require('express');
const exchangeCtrl = require('./exchange.controller');

const router = express.Router();

// router.route('/basic/')
//     .get(exchangeCtrl.basic)

//交易所列表    
router.route('/')
    .get(exchangeCtrl.list)

//交易所详细信息
router.route('/:name')    
    .get(exchangeCtrl.get)

router.param('name', exchangeCtrl.load);


module.exports = router;  