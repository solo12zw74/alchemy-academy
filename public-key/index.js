const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    const slicedPublicKey = publicKey.slice(1,)
    const keyHash = keccak256(slicedPublicKey)
    return keyHash.slice(-20)
}

module.exports = getAddress;