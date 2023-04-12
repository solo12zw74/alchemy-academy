const { assert } = require('chai');
const { parseEther, AlchemyProvider, parseUnits } = require('ethers')
const donate = require('./donate');
require('dotenv').config()
const { TEST_PRIVATE_KEY, TEST_API_KEY } = process.env;
const provider = new AlchemyProvider("sepolia", TEST_API_KEY);

const charities = [
    '0xBfB25955691D8751727102A59aA49226C401F8D4',
    '0xd364d1F83827780821697C787A53674DC368eC73',
    '0x0df612209f74E8Aa37432c14F88cb8CD2980edb3',
]

const donationPromise = donate(TEST_PRIVATE_KEY, charities);
describe('donate', () => {
    it('should return an instance of Promise', () => {
        assert(donationPromise instanceof Promise);
    });
    it('should increase the balance of each charity', async () => {
        await donationPromise;
        for (let i = 0; i < charities.length; i++) {
            const charity = charities[i];
            const balance = await provider.getBalance(charities[i]);
            assert.isAtLeast(balance, parseUnits("1.0", "gwei"));
        }
    });
});