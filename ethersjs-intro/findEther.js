const { AlchemyProvider } = require('ethers');
require('dotenv').config()
const { TEST_API_KEY } = process.env;
const provider = new AlchemyProvider("sepolia", TEST_API_KEY);

/**
 * Given an ethereum address find all the addresses
 * that were sent ether from that address
 * @param {string} address - The hexadecimal address for the sender
 * @async
 * @returns {Array} all the addresses that received ether
 */
async function findEther(address) {
    const height = await provider.getBlockNumber()
    const result = []
    for (let i = height; i > 0; i--) {
        const blockWithTransactions = await provider.getBlockWithTransactions(i)
        blockWithTransactions.transactions.forEach(item => {
            if (item.from == address){
                result.push(item.to)
            }
        })
    }
    return result
}

module.exports = findEther;