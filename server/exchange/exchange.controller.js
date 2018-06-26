const util = require('../util');
// const db = require('../../config/mysql');
const exchangeDb = require('./exchange.db');
const status = require('http-status');

/**
 * @api {get} /api/exchange/basic/ Request exchange basic info
 * @apiName GetExchangeList
 * @apiGroup exchange
 * @apiParam {number} res.query.start Start of list
 * @apiParam {number} res.query.count Count of exchanges
 * @apiSuccess {json} Array of Exchanges info
 */
// function basic(req, res, next) {
//     let start = req.query.start;
//     let count = req.query.count;
//     exchangeDb.queryList(start, count).then(results => {        
//         res.json(results)
//     }).catch(err => {
//         throw err;
//     });
// }

/**
 * @api {get} /api/exchange/ Request exchange info whth trend
 * @apiName GetExchangeList
 * @apiGroup exchange
 * @apiParam {number} res.query.start Start of list
 * @apiParam {number} res.query.size PageSize of list
 * @apiParam {number} res.query.limit Limit of sql query volume
 * @apiSuccess {json} Array of Exchanges info
 */
function list(req, res, next) {
    let start = req.query.start;
    let size = req.query.size;
    // let limit = req.query.limit;
    let data = {};
    exchangeDb.queryList(start,size).then(resulsts => {
      data.data = resulsts;
      return exchangeDb.queryCount()
    }).then(count => {
        data.total = count[0]['count(*)'];
        data.code = status.OK;
        res.json(data);
    }).catch(err => {
        throw err;
    });
    // exchangeDb.queryList(start, size).then(results => {
    //     return Promise.all(results.map(exchange => {
    //         return bundleVolume(exchange, limit)
    //     }))
        
    // }).then(list => {
    //     data.data = list;
    //     return exchangeDb.queryCount()
    // }).then(count => {
    //     data.total = count[0]['count(*)'];
    //     data.code = status.OK;
    //     res.json(data);
    // }).catch(err => {
    //     throw err;
    // });
}

/**
 * bundle exchange info
 * @param {*} exchange 
 * @param {*} limit 
 */
// function bundleVolume(exchange,limit) {
//     return new Promise((resolve, reject) => {
//         exchangeDb.queryVolume(exchange.nick, limit).then(res => {
//             let volume = util.convert(res);
//             exchange.volume = volume;
//             resolve(exchange);
//         }).catch(err => {
//             reject(err);
//         })
//     })
// }

function load(req, res, next,name) {
    let data = {}
    exchangeDb.queryInfo(name).then(info => {
        data.info = info;
        return exchangeDb.queryVolume(name)
    }).then(volume => {
        data.volume = util.convert(volume);
        data.code = status.OK;
        req.results = data;
        return next();
    }).catch(err =>{
        console.log(err);
    })

    

}

/**
 * @api {get} /api/exchange/:name Request exchange info
 * @apiName GetExchangeInfo
 * @apiGroup exchange
 * @apiParam {string} :name Name of exchange
 * @apiParam {number} res.query.limit Limit of sql query volume
 * @apiSuccess {json} Json of exchange info
 */
function get(req, res) {
    return res.json(req.results);
}



module.exports = { list, load, get };