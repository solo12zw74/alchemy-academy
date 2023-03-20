const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(data){
        this.data = data;
        this.previousHash = '';
    }
    
    toHash() {
        return new SHA256(this.previousHash + this.data)
    }
}

module.exports = Block;
