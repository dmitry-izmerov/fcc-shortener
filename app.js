'use strict';

const express = require('express');
const isUrl = require('is-url');
const morgan = require('morgan');

let app = express();

if (app.get('env') == 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('tiny'));
}

app.get('/favicon.ico', function (req, res) {
    res.sendStatus(404);
});

app.get('/:base64', function (req, res) {

    let url = fromBase64(req.params.base64);
    if (isValidUrl(url)) {
        return res.redirect(url);
    }
    res.send({
        error: "Url is invalid"
    });
});

app.get('/new/*', function (req, res) {
    let url = req.params[0];
    let response;
    if (isValidUrl(url)) {
        response = {
            original_url: url,
            short_url: toBase64(url)
        };
    } else {
        response = {
            error: "Url is invalid"
        };
    }

    res.send(response);
});

function isValidUrl(url) {
    return isUrl(url);
}

function toBase64(str) {
    return Buffer.from(str).toString('base64');
}

function fromBase64(base64) {
    return Buffer.from(base64, 'base64').toString('utf-8');
}

let defaultAddress = "0.0.0.0";
let defaultPort = 8080;
let server = app.listen(process.env.PORT || defaultPort, process.env.IP || defaultAddress, function () {
    let addr = server.address();
    console.log("Server is listening at", addr.address + ":" + addr.port);
});