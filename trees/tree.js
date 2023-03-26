class Tree {
    constructor() {
        this.root = null
    }

    addNode = function(node){
        if (this.root == null){
            this.root = node
        }

        if (node.data < this.root.data) {
            this.root.left = node
            return
        }

        if(node.data > this.root.data) {
            this.root.right = node
        }
    }
}

module.exports = Tree;