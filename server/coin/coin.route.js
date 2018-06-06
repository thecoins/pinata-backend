const express = require('express');
const coinCtrl = require('./coin.controller');

const router = express.Router();

router.route('/')
    .get(coinCtrl.list)


module.exports = router;  