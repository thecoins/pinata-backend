const db = require('../../config/mysql');

function queryList(start, count) {
    return new Promise((resolve, reject) => {
        db.query('select * from exchangeinfo where alive=True order by `rank` limit ' + start + ',' + count, function (err, results, fields) {
            if (err)
                return reject(err);
            resolve(results);
        })
    })

}

function queryVolume(name, limit) {
    return new Promise((resolve, reject) => {
        db.query("select volume from exchange where exchange.nick = '" + name + "' order by `timestamp` DESC limit " + limit, function (err, results, fields) {
            if (err) reject(err);
            resolve(results);
        })
    })

}
module.exports = { queryList, queryVolume };
