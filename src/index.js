import "babel-polyfill"
import * as client from "./client"
import * as crypto from "./crypto"
import * as wallet from "./wallet"
import {OKCSecp256k1Wallet} from "./secp256k1/secp256k1wallet";

const { OKEXChainClient }  = client
module.exports = OKEXChainClient
module.exports.crypto = crypto;
module.exports.wallet = wallet;
module.exports.OKCSecp256k1Wallet = OKCSecp256k1Wallet


