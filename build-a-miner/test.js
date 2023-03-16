const { assert } = require('chai');
const { mine, addTransaction, mempool, blocks } = require('./index');
const SHA256 = require('crypto-js/sha256');

describe('addTransaction', () => {
    it('should add the transaction to the mempool', () => {
        const transaction = { to: 'bob', sender: 'alice' }
        addTransaction(transaction);
        assert.equal(mempool.length, 1);
        assert.equal(mempool[0], transaction);
    });
});

describe('mine', () => {
    describe('first block', () => {
        let hash;
        before(() => {
            hash = mine();
        });
        it('should add to the blocks', () => {
            assert.equal(blocks.length, 1);
        });
        it('should store the expected id', () => {
            const lastBlock = blocks[blocks.length - 1];
            assert(lastBlock.id != null, "did not find an id property on the block");
            assert.equal(lastBlock.id, 0);
        });
        it('should return the expected hash', () => {
            const expectedHash = '0d930c9b14b61414ba299fbcb84a105e039148d3af767ac0cb2b56d59c0e26e6'
            const lastBlock = blocks[blocks.length - 1];
            assert(lastBlock.hash, "did not find a hash property on the block");
            assert.equal(lastBlock.hash.toString(), expectedHash.toString());
        });
    });
    describe('second block', () => {
        let hash;
        before(() => {
            hash = mine();
        });
        it('should add to the blocks', () => {
            assert.equal(blocks.length, 2);
        });
        it('should store the expected id', () => {
            const lastBlock = blocks[blocks.length - 1];
            assert(lastBlock.id != null, "did not find an id property on the block");
            assert.equal(lastBlock.id, 1);
        });
        it('should return the expected hash', () => {
            const expectedHash = '05d75b8a817ee9cdba81cf4b0b8b756692504b3c3e2dcbc3c244593c255ca372'
            const lastBlock = blocks[blocks.length - 1];
            assert(lastBlock.hash, "did not find a hash property on the block");
            assert.equal(lastBlock.hash.toString(), expectedHash.toString());
        });
    });
    describe('with 5 mempool transactions', () => {
        before(() => {
            blocks.length = 0
            mempool.length = 0
                
            for (let i = 0; i < 5; i++) {
                addTransaction({ sender: 'bob', to: 'alice' });
            }
        });
        describe('after mining', () => {
            before(() => {
                mine();
            });
            it('should add to the blocks', () => {
                assert.equal(blocks.length, 1);
            });
            it('should store the transactions on the block', () => {
                assert.equal(blocks[blocks.length - 1].transactions.length, 5);
            });
            it('should clear the mempool', () => {
                assert.equal(mempool.length, 0);
            });
        });
    });
    describe('with 15 mempool transactions', () => {
        before(() => {
            blocks.length = 0
            mempool.length = 0
                
            for (let i = 0; i < 15; i++) {
                addTransaction({ sender: 'bob', to: 'alice' });
            }
        });
        describe('after mining', () => {
            before(() => {
                mine();
            });
            it('should add to the blocks', () => {
                assert.equal(blocks.length, 1);
            });
            it('should store the transactions on the block', () => {
                assert.equal(blocks[blocks.length - 1].transactions.length, 10);
            });
            it('should reduce the mempool to 5', () => {
                assert.equal(mempool.length, 5);
            });
            describe('after mining again', () => {
                before(() => {
                    mine();
                });
                it('should add to the blocks', () => {
                    assert.equal(blocks.length, 2);
                });
                it('should store the transactions on the block', () => {
                    assert.equal(blocks[blocks.length - 1].transactions.length, 5);
                });
                it('should clear the mempool', () => {
                    assert.equal(mempool.length, 0);
                });
            });
        });
    });
});