const { assert } = require('chai');
const findMyBalance = require('./findMyBalance')
require('dotenv').config()
const { TEST_PRIVATE_KEY, INITIAL_BALANCE } = process.env;

describe('findMyBalance', () => {
    it('should return an instance of Promise', () => {
        assert(findMyBalance(TEST_PRIVATE_KEY) instanceof Promise);
    });
    it('should resolve with the initial balance', async () => {
        const balance = await findMyBalance(TEST_PRIVATE_KEY);
        assert.equal(INITIAL_BALANCE, balance);
    });
});