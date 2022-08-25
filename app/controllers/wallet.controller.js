require("dotenv").config();
const CircularJSON = require('circular-json')
const fs = require('fs')
const envfile = require('envfile')
const sourcePath = '.env'
const encryptionService = require("./encryptPrivateKey.js")
// const decryptionService = require("./decryptPrivateKey.js")
const walletService = require("./generateWallet.js")
// const balanceService = require("./getAvaxBalance.js")
// const tokenService = require("./transferToken.js")
// const gasService = require("./estimateGasFee.js")
// const avaxService = require("./transferAvax.js")

// Create and Save a new Tutorial
async function apiGenerateWalletAndEncryptPrivateKey (req, res) {
  // Generate wallet and encrypt private key function
  let {walletAddress, walletEncryptedPrivateKey} = await generateWalletAndEncryptPrivateKey();
  walletEncryptedPrivateKey = walletEncryptedPrivateKey.toString('base64');
  let walletObject = {
    "walletAddress:": walletAddress,
    "walletEncryptedPrivateKey": walletEncryptedPrivateKey
  }
  console.log("\n Wallet Address (Controller): " + walletAddress);
  console.log("\n Wallet Encrypted Private Key (Controller): " + walletEncryptedPrivateKey);
  res.status(200).send({ walletObject });


};

async function generateWalletAndEncryptPrivateKey(){
    let cryptoWalletAddress, cryptoWalletEncryptedPrivateKey;
    let walletObject = {};
    // console.log("\n Wallet Before: " + walletObject)
    walletObject = await walletService.generateWallet();

    let walletString = CircularJSON.stringify(walletObject);
    // console.log("\n Wallet After: " + walletString)
    let wallet = JSON.parse(walletString);
    // console.log("\n Wallet Address: " + wallet[0].address)
    // console.log("\n Wallet Private Key: " + wallet[0].privateKey)
    cryptoWalletAddress = wallet.address; 
   
    // // save wallet address and private key in .env file
    // console.log(envfile.parse(sourcePath))
    // let parsedFile = envfile.parse(sourcePath);
    // parsedFile.WALLET_ADDRESS = wallet[0].address
    // parsedFile.WALLET_PRIVATE_KEY = wallet[0].privateKey

    // fs.writeFileSync('./.env', envfile.stringify(parsedFile))
    // console.log(envfile.stringify(parsedFile))

// let WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;
// obtain Ebric user's private key via .env 
let WALLET_PRIVATE_KEY = wallet.privateKey
// console.log("\n Private Key: " + WALLET_PRIVATE_KEY);

// encrypt Ebric user's private key using cryptographic public key
let encryptedPrivateKey = encryptionService.encryptPrivateKey(WALLET_PRIVATE_KEY) 
// encryptedText will be returned as Buffer
// in order to see it in more readble form, convert it to base64
// console.log('\n Encrypted Private Key: ', encryptedPrivateKey.toString('base64'))
cryptoWalletEncryptedPrivateKey = encryptedPrivateKey;
        
return {
    "walletAddress": cryptoWalletAddress, 
    "walletEncryptedPrivateKey": cryptoWalletEncryptedPrivateKey
}

}

module.exports = {
    apiGenerateWalletAndEncryptPrivateKey
}
