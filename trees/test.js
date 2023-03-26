const Node = require('./node');
const Tree = require('./tree');
const { assert } = require('chai');

describe('node', () => {
    const data = 3;
    const node = new Node(data);

    it('should store data', () => {
        assert.equal(node.data, 3);
    });

    it('should have a null left', () => {
        assert.strictEqual(node.left, null);
    });

    it('should have a null right', () => {
        assert.strictEqual(node.right, null);
    });
});

describe('tree', () => {
    const tree = new Tree();

    it('should have a null root', () => {
        assert.strictEqual(tree.root, null);
    });
});

describe('tree', () => {
    const tree = new Tree();

    it('should have a null root', () => {
        assert.strictEqual(tree.root, null);
    });

    describe('after adding a node', () => {
        before(() => {
            tree.addNode(new Node(2));
        });

        it('should have a root', () => {
            assert(tree.root, "did not find a root on the tree");
            assert.equal(tree.root.data, 2);
        });
    });
}); 