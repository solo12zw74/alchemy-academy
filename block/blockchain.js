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

    isValid = function () {
        let result = true;
        for (let index = 1; index < this.chain.length; index++) {
            let prevBlock = this.chain[index - 1]
            let block = this.chain[index]
            result &= prevBlock.toHash().toString() == block.previousHash
        }
        return result;
    }
}

module.exports = Blockchain;