const Web3 = require('web3');

(async () => {
    // Sepolia Infura endpoint
    const infuraUrl = 'your_infura_sepolia_endpoint';
    const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

    // Wallet
    const account = web3.eth.accounts.privateKeyToAccount('your_private_key');
    web3.eth.accounts.wallet.add(account);

    const senderAddress = account.address;
    const recipientAddress = '0x29a9225d38de0837d8368BB7AB42D5Cc73900C28';
    const publicKeyHex = '3730253cd42a1d4c0ff360bfdd834d24dd664519693a641efc8757776ea4f02b'; 

    // Transaction
    const tx = {
        from: senderAddress,
        to: recipientAddress,
        gas: 30000,
        data: web3.utils.toHex(publicKeyHex) 
    };

    // Sign and send transaction
    try {
        const signedTx = await web3.eth.accounts.signTransaction(tx, account.privateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log('Transaction successful:', receipt);
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
})();