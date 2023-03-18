const SHA256 = require('crypto-js/sha256');

class Block {
    toHash() {
        return new SHA256('any message')
    }
}

module.exports = Block;
