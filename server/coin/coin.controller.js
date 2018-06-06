const db = require('../../config/mysql');
const util = require('../util')

function list(req, res, next) {
    db.query('select * from coininfo', function (err, results, fields) {
        if (err) throw err;
        res.json(results);
    })
}


module.exports = { list };