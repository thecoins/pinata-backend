const express = require('express');
const exchangeCtrl = require('./exchange.controller');

const router = express.Router();

router.route('/')

    .get(exchangeCtrl.list)


module.exports = router;  