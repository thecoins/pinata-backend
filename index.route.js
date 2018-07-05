const express = require('express');
const router = express.Router();
const exchangeRoutes = require('./server/exchange/exchange.route');
const coinRoutes = require('./server/coin/coin.route');
const globalRoutes = require('./server/global/global.route');
router.get('/check', (req, res) => {
    res.send('OK')
});

router.use('/exchange', exchangeRoutes);
router.use('/coin', coinRoutes);
router.use('/global',globalRoutes);

module.exports = router;