Web3 = require('web3');
// Ethereum Mainnet, Avalanche, USDT on network?
let WEB3_PROVIDER_URL="https://api.avax-test.network/ext/bc/C/rpc";
web3 = new Web3(WEB3_PROVIDER_URL);

// Generates one or more accounts in the wallet. If wallets already exist they will not be overridden.
async function generateWallet(){
    // Create account
    let account = await web3.eth.accounts.create();

    // Create empty wallet
    let wallet = await web3.eth.accounts.wallet.create();

    // Add account to empty wallet
    wallet = wallet.add(account);

    console.log("\n Wallet: ");
    console.log(wallet);

    // Return wallet with one account
    return wallet;
}

module.exports = {
    generateWallet
}



