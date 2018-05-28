const db = require('../../config/mysql');

function list(req, res, next) {
    db.query('select * from exchange limit 20', function (err, results, fields) {
        if (err) throw err;
        res.json(results);
    })
}

module.exports = { list };