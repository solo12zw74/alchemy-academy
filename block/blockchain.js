const Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [new Block('data')];
    }

    addBlock = function (block) {
        this.chain.push(block)
    }
}

module.exports = Blockchain;