const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const expressWinston = require('express-winston');
const winstonInstance = require('./winston');
const routes = require('../index.route');
const config = require('./config');

const app = express();

if (config.env === 'development') {
    app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

if (config.env === 'development') {
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
    app.use(expressWinston.logger({
        winstonInstance,
        meta:true,
        msg:'HTTP {{req.method}} {{req.url}} {{res.statusCode}}  {{res.responseTime}}ms',
        colorStatus:true
    }));
}

app.use('/api',routes);

module.exports = app;
