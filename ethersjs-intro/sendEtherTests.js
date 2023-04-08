const { assert } = require('chai');
const sendEther = require('./sendEther');
const { AlchemyProvider, parseEther } = require('ethers');
require('dotenv').config()
const { TEST_API_KEY } = process.env;

const provider = new AlchemyProvider("sepolia", TEST_API_KEY);
let tx;
describe('sendEther', () => {
    before(async () => {
        tx = await sendEther({
            value: parseEther("0.001"),
            to: "0x3c7090421f6f856a59194d9b9e1cf0de5cd7ab77",
        });
    })
    it('should resolve with a transaction', async () => {
        assert(tx, "The function did not resolve with a transaction. Did you return the transaction promise?")
        assert.equal(tx.to.toLowerCase(), "0x3c7090421f6f856a59194d9b9e1cf0de5cd7ab77");
        assert.equal(tx.from.toLowerCase(), "0x5ac69f5b24d028d66a8e73de075e483ebd655bc4");
        assert(tx.hash);
    });
    it('should get mined', async () => {
        const receipt = await provider.waitForTransaction(tx.hash, undefined, 10000);
        assert(receipt);
        assert.equal(receipt.blockNumber, 1);
    });
});