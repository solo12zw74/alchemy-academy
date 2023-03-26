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

    hasNode(data) {
        if (!!!this.root) {
            throw new Error("Tree is empty")
        }

        return this.searchRecursively(this.root, data)
    }

    searchRecursively(parentNode, data){
        if (parentNode.data == data) {
            return true
        }

        if (data < parentNode.data){
            if (!!!parentNode.left){
                return false
            } else {
                return this.searchRecursively(parentNode.left, data)
            }
        }

        if (!!!parentNode.right){
            return false
        } else {
            return this.searchRecursively(parentNode.right, data)
        }
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