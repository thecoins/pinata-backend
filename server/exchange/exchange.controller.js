const util = require('../util');
const db = require('../../config/mysql');
const exchangeDb = require('./exchange.db');

/**
 * @api {get} /api/exchange/ Request exchange list
 * @apiName GetExchangeList
 * @apiGroup exchange
 * @apiParam {number} res.query.start Start of list
 * @apiParam {number} res.query.count Count of exchanges
 * @apiParam {number} res.query.limit Limit of sql query volume
 * @apiSuccess {json} Array of Exchanges info
 */
function list(req, res, next) {
    let start = req.query.start;
    let count = req.query.count;
    let limit = req.query.limit;
    exchangeDb.queryList(start, count).then(results => {
        return Promise.all(results.map(exchange => {
            return bundleVolume(exchange, limit)
        }))
        
    }).then(all => {
        res.json(all)
    }).catch(err => {
        throw err;
    });
}

/**
 * bundle exchange info
 * @param {*} exchange 
 * @param {*} limit 
 */
function bundleVolume(exchange,limit) {
    return new Promise((resolve, reject) => {
        exchangeDb.queryVolume(exchange.nick, limit).then(res => {
            let volume = util.convert(res);
            exchange.volume = volume;
            resolve(exchange);
        }).catch(err => {
            reject(err);
        })
    })
}

function load(req, res, next, name) {
    let limit = req.query.limit;
    exchangeDb.queryVolume(name, limit).then(results => {
        req.results = util.convert(results);
        return next();
    }).catch(err => {
        throw err;
    });

}

/**
 * @api {get} /api/exchange/:name Request exchange info
 * @apiName GetExchangeInfo
 * @apiGroup exchange
 * @apiParam {string} :name Name of exchange
 * @apiSuccess {json} Json of exchange info
 */
function get(req, res) {
    return res.json(req.results);
}

module.exports = { list, load, get };