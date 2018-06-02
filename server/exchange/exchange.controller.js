const db = require('../../config/mysql');
const util = require('../util')

function list(req, res, next) {
    let start = req.query.start;
    let count = req.query.count;
    db.query('select * from exchangeinfo limit ' + start + ',' + count, function (err, results, fields) {
        if (err) throw err;
        res.json(results);
    })
}

function load(req, res, next, name) {
    db.query("select volume from exchange where exchange.name = '" + name + "' order by `timestamp` DESC limit 100", function (err, results, fields) {
        if (err) throw err;
        req.results = util.convert(results);
        return next();
    })
}

function get(req, res) {
    return res.json(req.results);
}

module.exports = { list, load, get };