/**
 * @jest-environment node
 */
/**
 * @module client
 */
import * as crypto from "./crypto"
import Transaction from "./transaction"
import HttpProxy from "./httpProxy"


const apiPath = {
  //rest server
  txs: "/okchain/v1/txs",
  queryAccount: "/okchain/v1/auth/accounts",
}

const chainId = "okchain"
const bech32Head = "okchain"
const mode = "block"
const nativeDenom = "tokt"
var defaultFee = {
  amount: [{
    amount: "0.02000000",
    denom: nativeDenom,

  }],
  gas: "200000",
}


export const GetClient = async (privateKey,url) => {
  const client = new OKChainClient(url)
  client.setAccountInfo(privateKey)
  return client
}

/**
 * The OKChain client.
 */
export class OKChainClient {
  /**
   * @param {string} url
   */
  constructor(url) {
    if(!url) {
      throw new Error("null url")
    }
    this.httpClient = new HttpProxy(url)
    this.mode = mode
  }

  /**
   * set the mode when send transaction
   * @param {string} mode block|sync|async
   */
  async setMode(m) {
    this.mode = m
  }

  /**
   * @param {string} privateKey
   * @return {OKChainClient}
   */
  async setAccountInfo(privateKey) {
    if (privateKey !== this.privateKey) {
      const address = crypto.getAddressFromPrivateKey(privateKey, bech32Head)
      if (!address) throw new Error("invalid privateKey: " + privateKey)
      if (address === this.address) return this
      this.privateKey = privateKey
      this.address = address
      const data = await this.getAccount(address)
      this.account_number = await this.getAccountNumberFromAccountInfo(data)
    }
    return this
  }




  /**
   * Send SendTransaction.
   * @param {String} to To Address
   * @param {Number} amount Coin Quantity
   * @param {String} denom Coin Name
   * @param {String} memo
   * @param {Number} sequenceNumber
   * @return {Object} response
   */

  async sendSendTransaction(to, amount, denom, memo="", sequenceNumber=null) {

    const coin = {
      amount: amount,
      denom: denom,

    }

    const msg = [{
      type: "okchain/token/MsgTransfer",
      value: {
        amount:[coin],
        from_address:this.address,
        to_address:to,
      },
    }]

    const signMsg = msg



    const signedTx = await this.buildTransaction(msg, signMsg, sequenceNumber, memo, defaultFee)
    const res = await this.sendTransaction(signedTx)
    return res
  }

  /**
   * Send CancelOrderTransaction.
   * @param {String} orderId
   * @param {String} memo
   * @param {Number} sequenceNumber
   * @return {Object} response
   */

  async sendCancelOrderTransaction(orderId, memo="", sequenceNumber=null) {
    var orderIdList = [orderId]
    return this.sendCancelOrdersTransaction(orderIdList, memo, sequenceNumber)
  }

  async sendCancelOrdersTransaction(orderIdList, memo="", sequenceNumber=null) {
    var msg = []
    var signMsg = []

    msg.push({
      type: "okchain/order/MsgCancel",
      value: {
        order_ids:orderIdList,
        sender:this.address,
      },
    })
    signMsg = msg

    const signedTx = await this.buildTransaction(msg, signMsg, sequenceNumber, memo, defaultFee)
    const res = await this.sendTransaction(signedTx)
    return res
  }


  /**
   * Send PlaceOrderTransaction.
   * @param {String} product
   * @param {String} side
   * @param {Number} price
   * @param {Number} quantity
   * @param {Number} memo
   * @param {Number} sequence
   * @return {Object} response
   */
  async sendPlaceOrderTransaction(product, side, price, quantity, memo="", sequence=null) {
    var order_items = [{
      price:price,
      product:product,
      quantity:quantity,
      side:side,
    }]
    return this.sendPlaceOrdersTransaction(order_items, memo, sequence)
  }

  async sendPlaceOrdersTransaction(order_items, memo="", sequence=null) {
    const placeOrderMsg = [{
      type:"okchain/order/MsgNew",
      value:{
        order_items:order_items,
        sender: this.address,
      },

    }]
    const signMsg = placeOrderMsg


    const signedTx = await this.buildTransaction(placeOrderMsg, signMsg, sequence, memo, defaultFee)
    const res = await this.sendTransaction(signedTx)
    return res
  }

  /**
   * Build Transaction for sending to okchain.
   * @param {Object} msg
   * @param {Object} signMsg
   * @param {Number} sequenceNumber
   * @param {String} memo
   * @return {Transaction} Transaction object
   */
  async buildTransaction(msg, signMsg, sequenceNumber=null, memo="",fee=null) {
    if ((!this.account_number || !sequenceNumber)) {
      const accountInfo = await this.getAccount()
      sequenceNumber = await this.getSequenceNumberFromAccountInfo(accountInfo)
      this.account_number = await this.getAccountNumberFromAccountInfo(accountInfo)
    }

    const params = {
      account_number: parseInt(this.account_number),
      chain_id: chainId,
      memo: memo,
      msg,
      sequence: sequenceNumber,
      fee: fee,
    }

    const tx = new Transaction(params)
    return tx.sign(this.privateKey, signMsg)
  }

  /**
   * send transaction to OKChain.
   * @param {signedTx} tx signed Transaction object
   * @param {Boolean} mode use synchronous mode, optional
   * @return {Object} response (success or fail)
   */
  async sendTransaction(signedTx) {
    const buf = signedTx.serializeTransactionWithJson(this.mode)
    console.log(buf)
    const opts = {
      data: buf,
      headers: {
        "content-type": "text/plain",
      }
    }
    return this.httpClient.send("post", `${apiPath.txs}`, null, opts)
  }



  /**
   * get account
   * @param {String} address
   * @return {Object} result
   */
  async getAccount(address=this.address) {
    if(!address) {
      throw new Error("address should not be falsy")
    }
    try {
      const data = await this.httpClient.send("get", `${apiPath.queryAccount}/${address}`)
      return data
    } catch(err) {
      return null
    }
  }

  /**
   * get balances from okchain
   * @param {String} address
   * @return {Object} result
   */
  async getBalance(address=this.address) {
    try {
      const data = await this.getAccount(address)
      return this.getBalanceFromAccountInfo(data)
    } catch(err) {
      return []
    }
  }

  /**
   * get balances from accountInfo Object
   * @param {Object} accountInfo optional address
   * @return {Object} result
   */
  async getBalanceFromAccountInfo(accountInfo) {
    return accountInfo.result.value.coins
  }

  /**
   * get SequenceNumber from okchain
   * @param {String} address
   * @return {Number} sequenceNumber
   */
  async getSequenceNumber(address=this.address) {
    try {
      const data = await this.getAccount(address)
      return this.getSequenceNumberFromAccountInfo(data)
    } catch(err) {
      return null
    }
  }

  /**
   * get SequenceNumber from accountInfo Object
   * @param {String} accountInfo
   * @return {Number} sequenceNumber
   */
  async getSequenceNumberFromAccountInfo(accountInfo) {
    return accountInfo.result.value.sequence
  }

  /**
   * get accountNumber from accountInfo Object
   * @param {String} accountInfo
   * @return {Number} accountNumber
   */
  async getAccountNumberFromAccountInfo(accountInfo) {
    return accountInfo.result.value.account_number
  }

}
