const express = require('express');
const exchangeCtrl = require('./exchange.controller');

const router = express.Router();

router.route('/basic/')
    .get(exchangeCtrl.basic)

//交易所列表    
router.route('/')
    .get(exchangeCtrl.list)

//交易所基本信息
router.route('/:name')    
    .get(exchangeCtrl.getinfo)

//交易所交易量信息
router.route('/volume/:name')
    .get(exchangeCtrl.getvolume)    

router.param('name', exchangeCtrl.load);


module.exports = router;  