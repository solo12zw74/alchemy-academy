const { Wallet, AlchemyProvider } = require('ethers');
require('dotenv').config()
const { TEST_API_KEY, TEST_PRIVATE_KEY } = process.env;

// TODO: replace undefined with a new web3 provider
const provider = new AlchemyProvider("sepolia", TEST_API_KEY);

const wallet = new Wallet(TEST_PRIVATE_KEY, provider);

async function sendEther({ value, to }) {
    return wallet.sendTransaction({
        value, to,
        gasLimit: 0x5208,
        gasPrice: 0x3b9aca00
    })
}

module.exports = sendEther;