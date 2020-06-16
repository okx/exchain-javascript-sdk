import "babel-polyfill"
import * as client from "./client"
import * as crypto from "./crypto"

const { OKChainClient }  = client
module.exports = OKChainClient
module.exports.crypto = crypto

