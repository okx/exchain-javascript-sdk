import { crypto } from "../src"
import bip39 from "bip39"

const privateKey = "29892b64003fc5c8c89dc795a2ae82aa84353bb4352f28707c2ed32aa1011884"


describe("crypto", () => {

  it("getAddressFromPrivateKey", () => {
    const privateKey = crypto.generatePrivateKey()
    const address = crypto.getAddressFromPrivateKey(privateKey)
    expect(address.length).toBe(46)
  })

  it("getAddressFromPrivateKey", () => {
    const address = crypto.getAddressFromPrivateKey(privateKey)
    expect(address).toBe("okexchain1g7c3nvac7mjgn2m9mqllgat8wwd3aptddw77gw")
  })

  it("getAddressFromPubKey", () => {
    const publicKey = crypto.getPubKeyHexFromPrivateKey(privateKey)
    const address = crypto.getAddressFromPubKey(publicKey)
    expect(address).toBe("okexchain1g7c3nvac7mjgn2m9mqllgat8wwd3aptddw77gw")
  })

  it("getPrivateKeyFromKeyStore", () => {
    const keyStore = crypto.generateKeyStore(privateKey, "okexchain")
    const pk = crypto.getPrivateKeyFromKeyStore(keyStore, "okexchain")
    expect(pk).toBe(privateKey)
  })


  it("getPrivateKeyFromMnemonic", () => {
    const pk = crypto.getPrivateKeyFromMnemonic("total lottery arena when pudding best candy until army spoil drill pool")
    expect(pk.toString("hex")).toBe("29892b64003fc5c8c89dc795a2ae82aa84353bb4352f28707c2ed32aa1011884")
  })

  it("generateMnemonic", ()=>{
    const mnemonic = crypto.generateMnemonic()
    expect(bip39.validateMnemonic(mnemonic)).toBe(true)
  })

  it("decodeAddressToBuffer", ()=>{
    let address = "okexchain1g7c3nvac7mjgn2m9mqllgat8wwd3aptddw77gw"
    const decod = crypto.decodeAddressToBuffer(address)
    expect(decod.toString("hex")).toBe("47b119b3b8f6e489ab65d83ff47567739b1e856d")
  })

  it("sign", () => {
    const msg = "2f8b1705"
    const sig = crypto.sign(msg, privateKey).toString("hex")
    expect(sig).toBe("733a985aa3f2ecb4c58b8cb9c97351bfb12931ae01665966e9f1d5bdcfc294017caf7f146b542319e40f3157d6820c223c42dc578c85ad8d99110f082ba7421a")
  })

  it("validateSig", () => {
    const publicKey = crypto.getPubKeyHexFromPrivateKey(privateKey)
    const msg = "2f8b1705"
    const sig = crypto.sign(msg, privateKey).toString("hex")
    expect(crypto.validateSig(sig, msg, publicKey)).toBeTruthy()
  })


})
