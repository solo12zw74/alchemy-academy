const { Wallet, AlchemyProvider, parseUnits } = require('ethers');
require('dotenv').config()
const { TEST_API_KEY, TEST_PRIVATE_KEY } = process.env;

const provider = new AlchemyProvider("sepolia", TEST_API_KEY);

/**
 * Donate at least 1 ether from the wallet to each charity
 * @param   {string} a hex string private key for a wallet with 10 ETH
 * @param   {array} an array of ethereum charity addresses 
 *
 * @returns {Promise} a promise that resolves after all donations have been sent
 */
async function donate(privateKey, charities) {
    const wallet = new Wallet(privateKey, provider);
    const value = parseUnits("1", "gwei")

    for (let index = 0; index < charities.length; index++) {
        const to = charities[index];
        const tx = await wallet.sendTransaction({
            value,
            to,
            gasLimit: 0x52081,
            gasPrice: 0x3b9aca00
        })
    }
}

module.exports = donate;