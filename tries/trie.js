const TrieNode = require('./trie-node');

class Trie {
    constructor() {
        this.root = new TrieNode(null)
    }

    insert = function (word) {
        let node = this.root;

        for (let i = 0; i < word.length; i++) {
            node.children[word[i]] = new TrieNode(word[i]);
            node = node.children[word[i]];

            if (i == word.length - 1) {
                node.isWord = true;
            }
        }
    }
}

module.exports = Trie;