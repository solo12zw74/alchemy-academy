const Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [new Block('data')];
    }

    addBlock = function (block) {
        var previousBlock = this.chain[this.chain.length - 1]
        block.previousHash = previousBlock.toHash()
        this.chain.push(block)
    }
}

module.exports = Blockchain;