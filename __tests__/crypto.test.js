import { crypto } from "../src"
import bip39 from "bip39"

const privateKey = "29892b64003fc5c8c89dc795a2ae82aa84353bb4352f28707c2ed32aa1011884"


describe("crypto", () => {

  it("getAddressFromPrivateKey", () => {
    const address = crypto.getAddressFromPrivateKey(privateKey)
    expect(address).toBe("okexchain1jjvpmgwwgs99nhlje3aag0lackunqgj7xnrnwe")
    expect(address.length).toBe(48)
  })

  it("getAddressFromPubKey", () => {
    const publicKey = crypto.getPubKeyHexFromPrivateKey(privateKey)
    const address = crypto.getAddressFromPubKey(publicKey)
    expect(address).toBe("okexchain1jjvpmgwwgs99nhlje3aag0lackunqgj7xnrnwe")
  })

  it("getPrivateKeyFromKeyStore", () => {
    const keyStore = crypto.generateKeyStore(privateKey, "okexchain")
    const pk = crypto.getPrivateKeyFromKeyStore(keyStore, "okexchain")
    expect(pk).toBe(privateKey)
  })


  it("getPrivateKeyFromMnemonic", () => {
    const pk_60 = crypto.getPrivateKeyFromMnemonic("total lottery arena when pudding best candy until army spoil drill pool", '60')
    const pk_996 = crypto.getPrivateKeyFromMnemonic("total lottery arena when pudding best candy until army spoil drill pool", '996')
    const address_60 = crypto.getAddressFromPrivateKey(pk_60)
    const address_996 = crypto.getAddressFromPrivateKey(pk_996)
    console.log('address', address_60, address_996)
    expect(pk_60.toString("hex")).toBe("828e61f969a7369f3340b07dd2080740d8445d7f802899ddacf9bc4db8608997")
    expect(pk_996.toString("hex")).toBe("29892b64003fc5c8c89dc795a2ae82aa84353bb4352f28707c2ed32aa1011884")
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
    expect(sig).toBe("19d94b95f23ec8def89ac562bc47255fa138bec3185ca4e6ac6ee6912fd89cce095489ad872d1d54e303d6db33428095041f794d1c0c83a748b58befe6b98b8e")
  })

  it("validateSig", () => {
    const publicKey = crypto.getPubKeyHexFromPrivateKey(privateKey)
    const msg = "2f8b1705"
    const sig = crypto.sign(msg, privateKey).toString("hex")
    expect(crypto.validateSig(sig, msg, publicKey)).toBeTruthy()
  })

  it("bech32 and hex", () => {
    let bech32Address = "okexchain1g7c3nvac7mjgn2m9mqllgat8wwd3aptddw77gw"
    let hexAddress = crypto.convertBech32ToHex(bech32Address)
    let newBech32Address = crypto.convertHexToBech32(hexAddress)
    expect(bech32Address).toBe(newBech32Address)
  })


})
