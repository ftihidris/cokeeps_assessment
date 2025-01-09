const fs = require('fs');
const sodium = require('libsodium-wrappers');

(async () => {
    await sodium.ready;

    const messageJson = fs.readFileSync('message.json', 'utf-8');
    
    const message = JSON.parse(messageJson);

    const recipientPublicKeyHex = "3730253cd42a1d4c0ff360bfdd834d24dd664519693a641efc8757776ea4f02b";
    const recipientPublicKey = sodium.from_hex(recipientPublicKeyHex);

    const keyPair = sodium.crypto_box_keypair();

    const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);

    // Employing the Authenticated Encryption method to conceal the message using the recipient's public key
    const ciphertext = sodium.crypto_box_easy(JSON.stringify(message), nonce, recipientPublicKey, keyPair.privateKey);

    // Keep a record of the hexadecimal version of your ciphertext (encrypted message), nonce, and the public key generated for future reference.
    const ciphertextHex = sodium.to_hex(ciphertext);
    const nonceHex = sodium.to_hex(nonce);
    const publicKeyHex = sodium.to_hex(keyPair.publicKey);

    console.log("Ciphertext:", ciphertextHex);
    console.log("Nonce:", nonceHex);
    console.log("Your Public Key:", publicKeyHex);
})();