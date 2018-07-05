const db = require('../../config/mysql');

function query() {
    return new Promise((resolve, reject) => {
        db.query('select * from global order by `timestamp` DESC limit 1 ', function (err, results, fields) {
            if (err)
                return reject(err);
            resolve(results);
        })
    })

}

module.exports = { query };
