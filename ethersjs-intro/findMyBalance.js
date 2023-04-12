const { Wallet, AlchemyProvider } = require('ethers');
require('dotenv').config()
const { TEST_API_KEY, TEST_PRIVATE_KEY } = process.env;

async function findMyBalance(privateKey) {
    const provider = new AlchemyProvider("sepolia", TEST_API_KEY);
    const wallet = new Wallet(TEST_PRIVATE_KEY, provider);
    return await provider.getBalance(wallet.address)
}

module.exports = findMyBalance;