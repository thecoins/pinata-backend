const util = require('../util');
// const db = require('../../config/mysql');
const globalDb = require('./global.db');
const status = require('http-status');

/**
 * @api {get} /api/global/ Request Global info
 * @apiName GetGlobalInfo
 * @apiGroup global
 * @apiSuccess {json} Global info
 */
function get(req, res, next) {
    let data = {};
    globalDb.query().then(results => { 
        data.data = results[0]    
        data.code = status.OK;
        res.json(data)
    }).catch(err => {
        throw err;
    });
}

module.exports = { get };