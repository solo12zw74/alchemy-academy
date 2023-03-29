const TrieNode = require('./trie-node');

class Trie {
    constructor() {
        this.root = new TrieNode(null)
    }
}

module.exports = Trie;