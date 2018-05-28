const express = require('express');
const router = express.Router();
const exchangeRoutes = require('./server/exchange/exchange.route');
router.get('/check', (req, res) => {
    res.send('OK')
});

router.use('/exchange', exchangeRoutes);
module.exports = router;