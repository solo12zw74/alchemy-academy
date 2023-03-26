class Tree {
    constructor() {
        this.root = null
    }
    addNode(node) {
        if (this.root == null) {
            this.root = node
            return
        }

        this.addNodeRecursively(this.root, node)
    }

    hasNode(data) {
        if (!!!this.root) {
            throw new Error("Tree is empty")
        }

        return this.searchRecursively(this.root, data)
    }

    searchRecursively(parentNode, data) {
        if (parentNode.data == data) {
            return true
        }

        if (data < parentNode.data) {
            if (!!!parentNode.left) {
                return false
            } else {
                return this.searchRecursively(parentNode.left, data)
            }
        }

        if (!!!parentNode.right) {
            return false
        } else {
            return this.searchRecursively(parentNode.right, data)
        }
    }

    addNodeRecursively(parentNode, childNode) {
        if (childNode.data < parentNode.data) {
            if (!!parentNode.left) {
                this.addNodeRecursively(parentNode.left, childNode);
            } else {
                parentNode.left = childNode;
            }
            return;
        }

        if (childNode.data > parentNode.data) {
            if (!!parentNode.right) {
                this.addNodeRecursively(parentNode.right, childNode);
            } else {
                parentNode.right = childNode;
            }
            return;
        }
    }

}

module.exports = Tree;