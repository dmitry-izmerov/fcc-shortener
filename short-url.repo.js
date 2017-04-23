const lodash = require('lodash');

// simple realization as object in memory
const shortUrlsToFull = {};

function getFull(shortUrl) {
    return shortUrlsToFull[shortUrl];
}

function get(fullUrl) {
    return lodash.findKey(shortUrlsToFull, url => url == fullUrl);
}

function save(short, full) {
    shortUrlsToFull[short] = full;
}

function exists(shortUrl) {
    return shortUrl in shortUrlsToFull;
}

module.exports = {
    getFull: getFull,
    get: get,
    save: save,
    exists: exists
};