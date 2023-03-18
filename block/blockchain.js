const Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [new Block('data')];
    }
}

module.exports = Blockchain;