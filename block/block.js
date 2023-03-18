const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(data){
        this.data = data;
    }
    
    toHash() {
        return new SHA256(this.data)
    }
}

module.exports = Block;
