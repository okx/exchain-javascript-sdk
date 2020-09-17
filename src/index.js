import "babel-polyfill"
import * as client from "./client"
import * as crypto from "./crypto"

const { OKEXChainClient }  = client
module.exports = OKEXChainClient
module.exports.crypto = crypto

