const db = require('../../config/mysql');
const util = require('../util')

function list(req, res, next) {
    let start = req.query.start;
    let count = req.query.count;
    db.query('select * from coininfo limit ' + start + ',' + count, function (err, results, fields) {
        if (err) throw err;
        res.json(results);
    })
}


module.exports = { list };