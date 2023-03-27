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

        if (arr.length == 1) {
            return arr[0]
        }

        if (arr.length == 2) {
            return this.concat(arr[0], arr[1])
        }
        const { left, right } = this.split(arr)
        return this.concat(this.getRootRecursively(left), this.getRootRecursively(right))
    }

    split(arr) {
        let middle;
        const isOdd = arr.length % 2

        if (isOdd) {
            middle = Math.pow(2, Math.floor(Math.log2(arr.length)))
        } else {
            middle = arr.length / 2
        }

        return { left: arr.splice(0, middle), right: arr }
    }
}

module.exports = MerkleTree;