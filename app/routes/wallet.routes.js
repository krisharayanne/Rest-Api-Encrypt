module.exports = app => {
    const wallets = require("../controllers/wallet.controller.js");
    var router = require("express").Router();

    // Generate a wallet and encrypt wallet's private key
    router.get("/", wallets.apiGenerateWalletAndEncryptPrivateKey);
   
    app.use('/api/wallets', router);
  };