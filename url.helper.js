const isUrl = require('is-url');

function isValidUrl(url) {
    return isUrl(url);
}

module.exports = {
  isValid: isValidUrl  
};
