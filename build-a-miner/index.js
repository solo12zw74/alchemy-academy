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
    const blockBody = { id: blockHeight, transactions: [], nonce: 0 }
    
    for (let i = 0; i < MAX_TRANSACTIONS; i++) {
        const transaction = mempool.pop();
        if (!!transaction)
            blockBody.transactions.push(transaction)
    }

    let blockHash;
    do {
        const blockStringified = JSON.stringify(blockBody)
        blockHash = SHA256(blockStringified)
        blockBody.nonce++
    } while (BigInt(`0x${blockHash}`) >= TARGET_DIFFICULTY);
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