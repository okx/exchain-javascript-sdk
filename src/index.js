import "babel-polyfill"
import * as client from "./client"
import * as crypto from "./crypto"
import * as wallet from "./wallet"

const { OKEXChainClient }  = client
module.exports = OKEXChainClient
module.exports.crypto = crypto;
module.exports.wallet = wallet;


