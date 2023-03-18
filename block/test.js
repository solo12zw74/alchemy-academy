const Block = require('./block');
const Blockchain = require('./blockchain');
const assert = require('assert');
const SHA256 = require("crypto-js/sha256");

describe('Block', function() {
    it('should have a hash property', function() {
        const newBlock = new Block();
        assert(/^[0-9A-F]{64}$/i.test(newBlock.toHash()));
    });

    it('should store a random name', function() {
        const randomName = require('faker').name.findName();
        assert.equal(randomName, new Block(randomName).data)
    });

    it('should hash some random data', function() {
        const randomEmail = require('faker').internet.email();
        const myHash = SHA256(randomEmail).toString();
        const yourHash = new Block(randomEmail).toHash().toString();
        assert.equal(myHash, yourHash);
    });
});

describe('Blockchain', function() {
    it('should have a genesis block', function() {
        const blockchain = new Blockchain();
        const genesisBlock = blockchain.chain[0];
        assert(genesisBlock, 'Could not find the genesis block!');
        console.log(typeof(genesisBlock))
        assert(genesisBlock instanceof Block, 'genesis block should be a block!');
    })
})