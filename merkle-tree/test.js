const {assert} = require('chai');
const {hashProof, sha256, concatHash, concatLetters} = require('./testUtil');

const { MerkleTree, verify } = require('./index');

const concat = (a, b) => `Hash(${a} + ${b})`;

describe('merkle', function() {
  it('should create a root from two leaves: [A,B]', function() {
    const leaves = ['A', 'B'];

    const merkleTree = new MerkleTree(leaves, concat);

    assert.equal(merkleTree.getRoot(), "Hash(A + B)");
  });
});

describe('merkle', function () {
  it('should handle the base case: [A]', function () {
    const leaves = ['A'];
    const merkleTree = new MerkleTree(leaves, concat);
    assert.equal(merkleTree.getRoot(), "A");
  });

  it('should create a root from two leaves: [A,B]', function () {
    const leaves = ['A', 'B'];
    const merkleTree = new MerkleTree(leaves, concat);
    assert.equal(merkleTree.getRoot(), "Hash(A + B)");
  });

  it('should create a root from four leaves: [A,B,C,D]', function () {
    const leaves = ['A', 'B', 'C', 'D'];
    const merkleTree = new MerkleTree(leaves, concat);
    assert.equal(merkleTree.getRoot(), "Hash(Hash(A + B) + Hash(C + D))");
  });

  it('should create a root from eight leaves: [A,B,C,D,E,F,G,H]', function () {
    const leaves = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const merkleTree = new MerkleTree(leaves, concat);
    assert.equal(merkleTree.getRoot(), "Hash(Hash(Hash(A + B) + Hash(C + D)) + Hash(Hash(E + F) + Hash(G + H)))");
  });
});

describe('merkle', function () {
  it('should handle the base case: [A]', function () {
    const leaves = ['A'];
    const merkleTree = new MerkleTree(leaves, concat);
    assert.equal(merkleTree.getRoot(), "A");
  });

  it('should create a root from two leaves: [A,B]', function () {
    const leaves = ['A', 'B'];
    const merkleTree = new MerkleTree(leaves, concat);
    assert.equal(merkleTree.getRoot(), "Hash(A + B)");
  });

  it('should create a root from four leaves: [A,B,C,D]', function () {
    const leaves = ['A', 'B', 'C', 'D'];
    const merkleTree = new MerkleTree(leaves, concat);
    assert.equal(merkleTree.getRoot(), "Hash(Hash(A + B) + Hash(C + D))");
  });

  it('should create a root from three leaves: [A,B,C]', function() {
    const leaves = ['A', 'B', 'C'];
    const merkleTree = new MerkleTree(leaves, concat);
    assert.equal(merkleTree.getRoot(), "Hash(Hash(A + B) + C)");
  });
  
  it('should create a root from five leaves: [A,B,C,D,E]', function () {
    const leaves = ['A', 'B', 'C', 'D', 'E'];
    const merkleTree = new MerkleTree(leaves, concat);
    assert.equal(merkleTree.getRoot(), "Hash(Hash(Hash(A + B) + Hash(C + D)) + E)");
  });

  it('should create a root from seven leaves: [A,B,C,D,E,F,G]', function () {
    const leaves = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const merkleTree = new MerkleTree(leaves, concat);
    assert.equal(merkleTree.getRoot(), "Hash(Hash(Hash(A + B) + Hash(C + D)) + Hash(Hash(E + F) + G))");
  });
});


describe('merkle proof', function() {
  const leaves = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const root = 'eb100814abc896ab18bcf6c37b6550eeadeae0c312532286a4cf4be132ace526';
  const hashTree = new MerkleTree(leaves.map(sha256), concatHash);
  const lettersTree = new MerkleTree(leaves, concatLetters);

  describe('for each leaf', function() {
    leaves.forEach((leaf, i) => {
      it(`should return a proof that calculates the root from leaf ${leaves[i]}`, function() {
        const proof = hashTree.getProof(i);
        const hashedProof = hashProof(leaf, proof).toString('hex');
        if(hashedProof !== root) {
          const lettersProof = lettersTree.getProof(i);
          console.log(
            "The resulting hash of your proof is wrong. \n" +
            `We were expecting: ${root} \n` +
            `We received: ${hashedProof} \n` +
            `In ${leaves.join('')} Merkle tree, the proof of ${leaves[i]} you gave us is: \n` +
            `${JSON.stringify(lettersProof, null, 2)}`
          );
        }
        assert.equal(hashedProof, root);
      });
    });
  });
});


describe('merkle proof verification', function() {
  describe('a given merkle tree', function() {
    const leaves = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    const root = "Hash(Hash(Hash(Hash(A + B) + Hash(C + D)) + Hash(Hash(E + F) + Hash(G + H))) + Hash(Hash(I + J) + K))";
    let tree; 
    beforeEach(() => {
      tree = new MerkleTree(leaves.slice(0), concat);
    });

    describe('untampered proofs', function() {
      leaves.forEach((_, i) => {
        it(`should verify the proof for leaf index ${i}`, function() {
          const proof = tree.getProof(i);
          assert.equal(verify(proof, leaves[i], root, concat), true);
        });
      });
    });

    describe('tampered proofs', function() {
      describe('verifying a different node with a proof', function() {
        it('should not verify the proof', function() {
          let proof = tree.getProof(2);
          assert.equal(verify(proof, leaves[3], root, concat), false);
        });
      });

      describe('verifying a different root', function() {
        it('should not verify the proof', function() {
          let proof = tree.getProof(2);
          const badRoot = "Hash(Hash(Hash(Hash(A + C) + Hash(C + D)) + Hash(Hash(E + F) + Hash(G + H))) + Hash(Hash(I + J) + K))";
          assert.equal(verify(proof, leaves[2], badRoot, concat), false);
        });
      });

      describe('flipping a nodes position', function() {
        it('should not verify the proof', function() {
          let proof = tree.getProof(3);
          proof[1].left = !proof[1].left;
          assert.equal(verify(proof, leaves[3], root, concat), false);
        });
      });

      describe('editing a hash', function() {
        it('should not verify the proof', function() {
          let proof = tree.getProof(5);
          proof[2].data = "Q";
          assert.equal(verify(proof, leaves[5], root, concat), false);
        });
      });
    });
  });
});

