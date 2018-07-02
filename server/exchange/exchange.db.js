const db = require('../../config/mysql');

function queryList(start, size) {
    return new Promise((resolve, reject) => {
        db.query('select * from exchangeinfo join exchangevolume on (exchangeinfo.nick=exchangevolume.name) where alive=True order by exchangevolume.`lastrank` limit ' + start + ',' + size, function (err, results, fields) {
            if (err)
                return reject(err);
            resolve(results);
        })
    })

}

function queryCount() {
    return new Promise((resolve, reject) => {
        db.query('select count(*) from exchangeinfo where alive=True', function (err, results, fields) {
            if (err)
                return reject(err);
            resolve(results);
        })
    })

}

function queryVolume(name) {
    return new Promise((resolve, reject) => {
        db.query("select timestamp,volume from exchange where exchange.name = '" + name + "' order by `timestamp` ASC", function (err, results, fields) {
            if (err) reject(err);
            resolve(results);
        })
    })

}

function queryInfo(name) {
    return new Promise((resolve, reject) => {
        db.query("select * from exchangeinfo where exchangeinfo.nick = '" + name + "' order by `timestamp` DESC", function (err, results, fields) {
            if (err) reject(err);
            resolve(results);
        })
    })
}
module.exports = { queryList, queryCount, queryInfo, queryVolume };
