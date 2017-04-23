'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const shortUrlService = require('./short-url.service.js');
const urlHelper = require('./url.helper.js');

let app = express();

if (app.get('env') == 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('tiny'));
}

app.get('/favicon.ico', function (req, res) {
    res.sendStatus(404);
});

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/:short_link', function (req, res) {

    let url = shortUrlService.getFull(req.params.short_link);
    if (urlHelper.isValid(url)) {
        return res.redirect(url);
    }
    res.send({
        error: "Url is invalid"
    });
});

app.get('/new/*', function (req, res) {
    let url = req.params[0];
    let response;
    if (urlHelper.isValid(url)) {

        let shortUrl = shortUrlService.getShort(url);

        response = {
            original_url: url,
            short_url: shortUrl
        };
    } else {
        response = {
            error: "Url is invalid"
        };
    }

    res.send(response);
});

let defaultAddress = "0.0.0.0";
let defaultPort = 8080;
let server = app.listen(process.env.PORT || defaultPort, process.env.IP || defaultAddress, function () {
    let addr = server.address();
    console.log("Server is listening at", addr.address + ":" + addr.port);
});