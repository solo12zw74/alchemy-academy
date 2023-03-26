class Tree {
    constructor() {
        this.root = null
    }

    addNode = function (node) {
        if (this.root == null) {
            this.root = node
            return
        }

        addNodeRecursively(this.root, node)
    }
}

function addNodeRecursively(parentNode, childNode) {

    if (childNode.data < parentNode.data) {
        if (!!parentNode.left) {
            addNodeRecursively(parentNode.left, childNode);
        } else {
            parentNode.left = childNode;
        }
        return;
    }

    if (childNode.data > parentNode.data) {
        if (!!parentNode.right) {
            addNodeRecursively(parentNode.right, childNode);
        } else {
            parentNode.right = childNode;
        }
        return;
    }
}

module.exports = Tree;