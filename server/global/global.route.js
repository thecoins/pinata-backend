const express = require('express');
const globalCtrl = require('./global.controller');

const router = express.Router();

//全局信息    
router.route('/')
    .get(globalCtrl.get)

module.exports = router;  