import {OKCSecp256k1Wallet} from "../src/secp256k1/Secp256k1Wallet";
import {SigningCosmWasmClient} from "@cosmjs/cosmwasm-stargate";
import {Secp256k1Wallet} from "@cosmjs/amino"
import {Secp256k1HdWallet} from "@cosmjs/amino"
import fs from "fs";
import pako from "pako";
import * as crypto from "../src/crypto";
import {GasPrice} from "@cosmjs/stargate";

describe("test signer",  () => {
        it("test signing", async () => {
            jest.setTimeout(300000000)

            const privateKey = crypto.getPrivateKeyFromMnemonic('puzzle glide follow cruel say burst deliver wild tragic galaxy lumber offer')
            const signer =  await OKCSecp256k1Wallet.fromKey(Buffer.from(privateKey,'hex'), "ex")
            const client = await SigningCosmWasmClient.connectWithSigner("http://127.0.0.1:26657", signer, {gasPrice:GasPrice.fromString('200000000wei')})
            const wasmCode = fs.readFileSync("__tests__/wasm_contract/hackatom.wasm")
            const compressed = pako.gzip(wasmCode, {level: 9});

            const accounts = await signer.getAccounts()
            const res = await client.upload(accounts[0].address, compressed,'auto',"upload")
            console.log(JSON.stringify(res))
        })

        it("",async ()=> {
            const privateKey = crypto.getPrivateKeyFromMnemonic('puzzle glide follow cruel say burst deliver wild tragic galaxy lumber offer')
            const signer =  await Secp256k1Wallet.fromKey(Buffer.from(privateKey,'hex'), "ex")
            const client = await SigningCosmWasmClient.connectWithSigner("http://127.0.0.1:26657", signer, {gasPrice:GasPrice.fromString('200000000wei')})
            const wasmCode = fs.readFileSync("__tests__/wasm_contract/hackatom.wasm")
            const compressed = pako.gzip(wasmCode, {level: 9});

            const accounts = await signer.getAccounts()
            const res = await client.upload(accounts[0].address, compressed,'auto',"upload")
            console.log(JSON.stringify(res))
        })

    it("xxx1",async ()=> {
        const mnemonic = 'puzzle glide follow cruel say burst deliver wild tragic galaxy lumber offer'
        const signer =  await Secp256k1HdWallet.fromMnemonic(mnemonic, {prefix:'ex'})
        const client = await SigningCosmWasmClient.connectWithSigner("http://127.0.0.1:26657", signer, {gasPrice:GasPrice.fromString('200000000wei')})
        const wasmCode = fs.readFileSync("__tests__/wasm_contract/hackatom.wasm")
        const compressed = pako.gzip(wasmCode, {level: 9});

        const accounts = await signer.getAccounts()
        const res = await client.upload(accounts[0].address, compressed,'auto',"upload")
        console.log(JSON.stringify(res))
    })
    }
)
