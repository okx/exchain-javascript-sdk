import { crypto } from "../src"
import bip39 from "bip39"

const privateKey = "29892b64003fc5c8c89dc795a2ae82aa84353bb4352f28707c2ed32aa1011884"


describe("crypto", () => {

  it("getAddressFromPrivateKey", () => {
    const address = crypto.getAddressFromPrivateKey(privateKey)
    expect(address).toBe("ex1jjvpmgwwgs99nhlje3aag0lackunqgj7pcgnd4")
    expect(address.length).toBe(41)
  })

  it("getAddressFromPrivateKeyLegacy", () => {
    const address = crypto.getAddressFromPrivateKeyLegacy(privateKey)
    expect(address).toBe("ex1g7c3nvac7mjgn2m9mqllgat8wwd3aptd2947tz")
    expect(address.length).toBe(41)
  })

  it("getAddressFromPubKey", () => {
    const publicKey = crypto.getPubKeyHexFromPrivateKey(privateKey)
    const address = crypto.getAddressFromPubKey(publicKey)
    expect(address).toBe("ex1jjvpmgwwgs99nhlje3aag0lackunqgj7pcgnd4")
  })

  it("getPrivateKeyFromKeyStore", () => {
    const keyStore = crypto.generateKeyStore(privateKey, "ex")
    const pk = crypto.getPrivateKeyFromKeyStore(keyStore, "ex")
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
    let address = "ex1ya7dn2rr8nx07tx9ksq8gvz5utvarrh0knjnjn"
    const decod = crypto.decodeAddressToBuffer(address)
    console.log(decod.toString("hex"));
    expect(decod.toString("hex")).toBe("277cd9a8633cccff2cc5b400743054e2d9d18eef")
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

  it("convertBech32ToHex", () => {
    let bech32Address = "ex1ya7dn2rr8nx07tx9ksq8gvz5utvarrh0knjnjn"
    let newHexAddress = crypto.convertBech32ToHex(bech32Address)
    console.log('newHexAddress', newHexAddress);

    let hexAddress = "0x277CD9a8633ccCFF2Cc5B400743054e2d9d18eEf"
    let okexchainAddress = "okexchain1ya7dn2rr8nx07tx9ksq8gvz5utvarrh03cen3l"
    expect(hexAddress).toBe(newHexAddress[0])
    expect(okexchainAddress).toBe(newHexAddress[1])
  })

  it("convertHexToBech32", () => {
    let hexAddress = "0x277CD9a8633ccCFF2Cc5B400743054e2d9d18eEf"
    let newBech32Address = crypto.convertHexToBech32(hexAddress)
    console.log('newBech32Address', newBech32Address)

    let exAddress = "ex1ya7dn2rr8nx07tx9ksq8gvz5utvarrh0knjnjn"
    let okexchainAddress = "okexchain1ya7dn2rr8nx07tx9ksq8gvz5utvarrh03cen3l"
    expect(exAddress).toBe(newBech32Address[0])
    expect(okexchainAddress).toBe(newBech32Address[1])
  })

  it("convertOKExChainAddressToExAddress", () => {
    // let bech32Address = "okexchain1ya7dn2rr8nx07tx9ksq8gvz5utvarrh03cen3l"
    let bech32Address = "okexchain1jj8fggmk296f3adt8c469v8r2w3fkv03whjup2"
    let newBech32Address = crypto.convertOKExChainAddressToExAddress(bech32Address)
    console.log('newHexAddress', newBech32Address);
  })


})
