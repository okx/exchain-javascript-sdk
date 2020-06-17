import OKChainClient from "../src"
import * as crypto from "../src/crypto"



const mnemonic = "total lottery arena when pudding best candy until army spoil drill pool"
const privateKey = "29892b64003fc5c8c89dc795a2ae82aa84353bb4352f28707c2ed32aa1011884"
const serverUrl = "http://localhost:26659"
const userAddress = "okchain1g7c3nvac7mjgn2m9mqllgat8wwd3aptdqket5k"
const baseCoin = "tokt"
const testCoin = "xxb-127"
const testProduct = testCoin + "_" + baseCoin



describe("OKChainClient test", async () => {


  it("get balance", async () => {
    const client = new OKChainClient(serverUrl)
    const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic)
    await client.setAccountInfo(privateKey)
    const res = await client.getBalance(userAddress)
    expect(res.length).toBeGreaterThanOrEqual(0)
  })

  it("send sendTransaction", async () => {
    jest.setTimeout(10000)
    const client = new OKChainClient(serverUrl)
    const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic)
    await client.setAccountInfo(privateKey)
    //console.log(client)
    const addr = crypto.getAddressFromPrivateKey(client.privateKey)
    //console.log(addr)
    const account = await client.getAccount(addr)
    const sequence = parseInt((await client.getSequenceNumberFromAccountInfo(account)))
    const res = await client.sendSendTransaction(userAddress, "1.00000000", baseCoin, "hello world", sequence)
    console.log(JSON.stringify(res))
    expect(res.status).toBe(200)
  })

  it("send placeOrderTransaction,cancelOrderTransaction", async () => {
    jest.setTimeout(20000)
    const symbol = testProduct
    const client = new OKChainClient(serverUrl)
    const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic)
    await client.setAccountInfo(privateKey)
    //console.log(client)
    const addr = crypto.getAddressFromPrivateKey(client.privateKey)
    //console.log(addr)
    const account = await client.getAccount(addr)
    const sequence = parseInt((await client.getSequenceNumberFromAccountInfo(account)))

    const res1 = await client.sendPlaceOrderTransaction(symbol, "BUY", "1.00000000", "1.10000000", "",sequence)
    console.log(JSON.stringify(res1))
    expect(res1.status).toBe(200)

    var patt = /ID[0-9]*-[0-9]*/
    const orderId = patt.exec(JSON.stringify(res1))[0].toString()
    //const orderId = res1.result.tags[1].value
    console.log(orderId)
    const res2 = await client.sendCancelOrderTransaction(orderId, "",sequence + 1)
    console.log(JSON.stringify(res2))
    expect(res2.status).toBe(200)

  })

   async function  prepareAccount() {
    const client = new OKChainClient(serverUrl)
    const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic)
    await client.setAccountInfo(privateKey)
    const addr = crypto.getAddressFromPrivateKey(client.privateKey)
    const account = await client.getAccount(addr)
    const sequence = parseInt((await client.getSequenceNumberFromAccountInfo(account)))
     return {
       okclient:client,
       sequence:sequence
     }
  }

  it("send sendTokenIssueTransaction", async () => {
    jest.setTimeout(10000)
    const data = await prepareAccount()
    const res = await data.okclient.sendTokenIssueTransaction("aa", "aa11", "10000", true)
    console.log(JSON.stringify(res))
    expect(res.status).toBe(200)
  })
  it("send sendTokenBurnTransaction", async () => {
    jest.setTimeout(10000)
    const data = await prepareAccount()
    const res = await data.okclient.sendTokenBurnTransaction("aa", "100", "burn")
    console.log(JSON.stringify(res))
    expect(res.status).toBe(200)
  })
  it("send sendTokenMintTransaction", async () => {
    jest.setTimeout(10000)
    const data = await prepareAccount()
    const res = await data.okclient.sendTokenMintTransaction("aa", "200", "mint")
    console.log(JSON.stringify(res))
    expect(res.status).toBe(200)
  })


  it("send sendRegisterDexOperatorTransaction", async () => {
    jest.setTimeout(10000)
    const data = await prepareAccount()
    const res = await data.okclient.sendRegisterDexOperatorTransaction("http://test.json", "okchain17xpfvakm2amg962yls6f84z3kell8c5ljresa7", "add deposit", data.sequence)
    console.log(JSON.stringify(res))
    expect(res.status).toBe(200)
  })

  it("send sendListTokenPairTransaction", async () => {
    jest.setTimeout(10000)
    const data = await prepareAccount()
    const res = await data.okclient.sendListTokenPairTransaction("tbtc-edc", "tusdk-d42","0.01000000", "list tokenpair", data.sequence)
    console.log(JSON.stringify(res))
    expect(res.status).toBe(200)
  })

  it("send sendAddProductDepositTransaction", async () => {
    jest.setTimeout(10000)
    const data = await prepareAccount()
    const res = await data.okclient.sendAddProductDepositTransaction("50.00000000", "tbtc-edc_tusdk-d42", "add deposit", data.sequence)
    console.log(JSON.stringify(res))
    expect(res.status).toBe(200)
  })

  it("send sendWithdrawProductDepositTransaction", async () => {
    jest.setTimeout(10000)
    const data = await prepareAccount()
    const res = await data.okclient.sendWithdrawProductDepositTransaction("40.00000000", "tbtc-edc_tusdk-d42", "withdraw deposit", data.sequence)
    console.log(JSON.stringify(res))
    expect(res.status).toBe(200)
  })
})
