const shortUrlRepo = require('./short-url.repo');
const shortId = require('shortid');
shortId.seed(911);

function getShort(fullUrl) {
    let shortUrl = shortUrlRepo.get(fullUrl);
    if (!shortUrl) {
        shortUrl = generateShortUrl();
        shortUrlRepo.save(shortUrl, fullUrl);
    }
    return shortUrl;
}

function generateShortUrl() {
    let shortUrl = null;
    do {
        shortUrl = shortId.generate();
    } while(shortUrlRepo.exists(shortUrl));
    return shortUrl;
}

function getFull(shortUrl) {
    return shortUrlRepo.getFull(shortUrl);
}

module.exports = {
    getShort: getShort,
    getFull: getFull
};
