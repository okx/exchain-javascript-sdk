import "babel-polyfill"
import * as client from "./client"
import * as crypto from "./crypto"
import * as tokenClient from  "./tokenClient"


const { OKChainClient }  = client
const { TokenClient } = tokenClient
module.exports = OKChainClient
// module.exports = TokenClient
module.exports.TokenClient = TokenClient
module.exports.crypto = crypto

