const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.push(transaction)
}

function mine() {
    const blockHeight = blocks.length
    const blockBody = { id: blockHeight, transactions: [] }
    for (let i = 0; i < MAX_TRANSACTIONS; i++) {
        const transaction = mempool.pop();
        if (!!transaction)
            blockBody.transactions.push(transaction)
    }

    const blockStringified = JSON.stringify(blockBody)
    const blockHash = SHA256(blockStringified)
    blocks.push({ ...blockBody, hash: blockHash })
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction,
    mine,
    blocks,
    mempool
};