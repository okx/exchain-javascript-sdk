import HttpProxy from "./httpProxy"
import * as crypto from "./crypto"

const api = {
  //token server
  getJwtId: "/okdex/v1/auth/getjwtid",
  createJwt:"/okdex/v1/auth/getjwt"
}
export class TokenClient {
  /**
   * @param {string} Token Server public url
   */
  constructor(tokenServerUrl,privateKey) {
    if (!tokenServerUrl) {
      throw new Error("tokenServer should not be null")
    }
    if (!privateKey) {
      throw new Error("privateKey should not be null")
    }
    this._httpClient = new HttpProxy(tokenServerUrl)
    this._privateKey = privateKey
    var pubKeyHex = crypto.getPubKeyHexFromPrivateKey(privateKey)
    this._pubKey = pubKeyHex
  }

  async requestToken(ttlMillis){
    if((typeof ttlMillis == String)){
      console.warn("ttlMillis should be Number")
      return null
    }
    const getJwtIdResponse = await this.requestUrl("get", `${api.getJwtId}?pubkey=${this._pubKey}`)
    console.log(getJwtIdResponse)

    var t1 = getJwtIdResponse.result.data.t1
    var id = getJwtIdResponse.result.data.id
    var t2 = new Date().getTime()
    const sigData = {
      id:id,
      pubkey:this._pubKey,
      t1:t1,
      t2:t2
    }
    const jsonStr = JSON.stringify(sigData)
    const signBytes = Buffer.from(jsonStr)
    const privKeyBuf = Buffer.from(this._privateKey, "hex")
    const signature = crypto.sign(signBytes.toString("hex"), privKeyBuf)
    const sigHex = signature.toString("hex")
    const createJwtResponse = await this.requestUrl("get", `${api.createJwt}?pubkey=${this._pubKey}&sig=${sigHex}&t2=${t2}&ttlmillis=${ttlMillis}`)
    //console.log(createJwtResponse)
    if(createJwtResponse.result.code!=0){
      console.warn(createJwtResponse.result.msg)
      console.warn(createJwtResponse.result.detailMsg)
      return null
    }
    return createJwtResponse


  }

  async requestUrl(method,path) {
    try {
      const data = await this._httpClient.send(method, path)
      return data
    } catch(err) {
      console.warn(`request ${path} error`, err)
      return []
    }
  }

}
