class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves
        this.concat = concat
    }
    getRoot() {
        if (this.leaves.length == 1) {
            return this.leaves[0]
        }

        return this.getRootRecursively(this.leaves)
    }

    getRootRecursively(arr) {

        if (arr.length == 2) {
            return this.concat(arr[0], arr[1])
        }
        const { left, right } = this.split(arr)
        return this.concat(this.getRootRecursively(left), this.getRootRecursively(right))
    }

    split(arr) {
        const length = arr.length
        return { left: arr.splice(0, length / 2), right: arr }
    }
}

module.exports = MerkleTree;