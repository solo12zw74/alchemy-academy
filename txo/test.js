const { assert } = require('chai');
const TXO = require('./TXO');
const Transaction = require('./Transaction');

describe('TXO', function () {
    const address = "1DBS97W3jWw6FnAqdduK1NW6kFo3Aid1N6";
    const amount = 10;
    const txo = new TXO(address, amount);

    describe('constructor', () => {
        it('should set the owner', () => {
            assert.equal(txo.owner, address);
        });
        it('should set the amount', () => {
            assert.equal(txo.amount, amount);
        });
        it('should set spent to false', () => {
            assert.equal(txo.spent, false);
        });
    });

    describe('spend', () => {
        it('should set spent to true', () => {
            txo.spend();
            assert.equal(txo.spent, true);
        });
    });
});


describe('Transaction', function () {
    const fromAddress = "1DBS97W3jWw6FnAqdduK1NW6kFo3Aid1N6";
    const toAddress = "12ruWjb4naCME5QhjrQSJuS5disgME22fe";

    describe('with unspent input TXOs', () => {
        const inputTXO1 = new TXO(fromAddress, 5);
        const inputTXO2 = new TXO(fromAddress, 5);
        const outputTXO1 = new TXO(toAddress, 10);
        const tx = new Transaction([inputTXO1, inputTXO2], [outputTXO1]);

        it('should execute without error', () => {
            try {
                tx.execute();
            }
            catch(ex) {
                assert.fail(ex.message);
                console.log(ex);
            }
        });
    });

    describe('with a spent input TXO', () => {
        const txo1 = new TXO(fromAddress, 5);
        const txo2 = new TXO(fromAddress, 5);
        const txo3 = new TXO(fromAddress, 5);
        const outputTXO1 = new TXO(toAddress, 15);

        txo2.spend();

        const tx = new Transaction([txo1, txo2, txo3], [outputTXO1]);

        it('should throw an error on execute', () => {
            let ex;
            try {
                tx.execute();
            }
            catch (_ex) {
                ex = _ex;
            }
            assert(ex, "Did not throw an exception with a spent input TXO!");
        });
    });
});