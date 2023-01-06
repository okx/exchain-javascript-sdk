import OKEXChainClient from "../src"
import * as crypto from "../src/crypto"
import { calculateFee, GasPrice } from "@cosmjs/stargate";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import {re} from "@babel/core/lib/vendor/import-meta-resolve";

const serverUrl = "http://127.0.0.1:8545"


const mnemonic  = "giggle sibling fun arrow elevator spoon blood grocery laugh tortoise culture tool"
const addr = "ex1qj5c07sm6jetjz8f509qtrxgh4psxkv3ddyq7u"
const mnemonic2 = "antique onion adult slot sad dizzy sure among cement demise submit scare"
const addr2 = "ex1fsfwwvl93qv6r56jpu084hxxzn9zphnyxhske5"

describe("okc wasm test",  function() {

    it("store wasm code ", async ()=> {
        jest.setTimeout(300000)
        const client = new OKEXChainClient(serverUrl, {
            chainId: "exchain-67",
            relativePath: "/exchain/v1",
            isMainnet: false,
        })
        const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic, '60')
        await client.setAccountInfo(privateKey)
        const addr = crypto.getAddressFromPrivateKey(client.privateKey)
        console.log(addr)
        const account = await client.getAccount(addr)
        const sequence = parseInt((await client.getSequenceNumberFromAccountInfo(account)))
        const fee = {
            amount: [{
                amount: "0.030000000000000000",
                denom: "okt",

            }],
            gas: "100000000",
        }


        // const permission = {
        //     permission: "Nobody",
        // }
        //

        //default
        const permission = {
            permission: "Everybody",
        }

        // const permission = {
        //     address: "ex1qj5c07sm6jetjz8f509qtrxgh4psxkv3ddyq7u",
        //     permission: "OnlyAddress",
        // }

        const res = await client.storeCode("__tests__/wasm_contract/hackatom.wasm",permission, sequence,fee)
        console.log(JSON.stringify(res))
        // await new Promise(resolve=>setTimeout(resolve, 1000))

        // if (res.result.code == 0 ){
        //     const hash  = res.result.data
        //     console.log(hash)
        //     const txRes = await client.queryTx(hash)
        //     console.log(JSON.stringify(txRes))
        // }

    })

    it('query tx', async function () {
        const client = new OKEXChainClient(serverUrl, {
            chainId: "exchain-67",
            relativePath: "/exchain/v1",
            isMainnet: false,
        })

        const res = await client.queryTx("58CF81F1C9F3FDBFD738A640BAC4D31A3BAF6B7A95EFB21B7890C99E81856F8B")
        console.log(JSON.stringify(res))
    });

    it("instantiate wasm contract ", async ()=> {

        const client = new OKEXChainClient(serverUrl, {
            chainId: "exchain-67",
            relativePath: "/exchain/v1",
            isMainnet: false,
        })
        const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic, '60')
        await client.setAccountInfo(privateKey)
        const addr = crypto.getAddressFromPrivateKey(client.privateKey)
        console.log(addr)
        const account = await client.getAccount(addr)
        const sequence = parseInt((await client.getSequenceNumberFromAccountInfo(account)))
        const fee = {
            amount: [{
                amount: "0.030000000000000000",
                denom: "okt",

            }],
            gas: "100000000",
        }

        const initMsg = {"beneficiary": "ex1fsfwwvl93qv6r56jpu084hxxzn9zphnyxhske5", "verifier": "ex1qj5c07sm6jetjz8f509qtrxgh4psxkv3ddyq7u"}
        const amount = [{
            amount: "1",
            denom: "okt",

        }]

        // const initMsg = {"purchase_price":{"amount":"1","denom":"okt"},"transfer_price":{"amount":"1","denom":"okt"}}
        const res = await client.instantiateContract("27","v1.0.0", initMsg, amount, "ex1qj5c07sm6jetjz8f509qtrxgh4psxkv3ddyq7u", fee,sequence)
        console.log(JSON.stringify(res))
    })

    it('execute contract',async function () {
        const client = new OKEXChainClient(serverUrl, {
            chainId: "exchain-67",
            relativePath: "/exchain/v1",
            isMainnet: false,
        })
        const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic, '60')
        await client.setAccountInfo(privateKey)
        const addr = crypto.getAddressFromPrivateKey(client.privateKey)
        console.log(addr)
        const account = await client.getAccount(addr)
        const sequence = parseInt((await client.getSequenceNumberFromAccountInfo(account)))
        const fee = {
            amount: [{
                amount: "0.030000000000000000",
                denom: "okt",

            }],
            gas: "100000000",
        }
        const amount = [{
            amount: "1",
            denom: "okt",

        }]

        let execMsg = {"release":{}}
        const res = await client.executeContract( "ex1efgvwhxkaj642uwjq65q9k3wzrghy0v2ftyap0kkwe4r3nx3846sjhluuc", execMsg,amount,fee,sequence)
        console.log(JSON.stringify(res))
    });

    it("store migrate wasm code ", async ()=> {

        const client = new OKEXChainClient(serverUrl, {
            chainId: "exchain-67",
            relativePath: "/exchain/v1",
            isMainnet: false,
        })
        const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic, '60')
        await client.setAccountInfo(privateKey)
        const addr = crypto.getAddressFromPrivateKey(client.privateKey)
        console.log(addr)
        const account = await client.getAccount(addr)
        const sequence = parseInt((await client.getSequenceNumberFromAccountInfo(account)))
        const fee = {
            amount: [{
                amount: "0.030000000000000000",
                denom: "okt",

            }],
            gas: "100000000",
        }

        const permission = {
            permission: "Everybody",
        }
        const res = await client.storeCode("__tests__/wasm_contract/burner.wasm", permission,sequence,fee)
        console.log(JSON.stringify(res))
    })

    it('migrate contract', async function () {
        const client = new OKEXChainClient(serverUrl, {
            chainId: "exchain-67",
            relativePath: "/exchain/v1",
            isMainnet: false,
        })
        const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic, '60')
        await client.setAccountInfo(privateKey)
        const addr = crypto.getAddressFromPrivateKey(client.privateKey)
        console.log(addr)
        const account = await client.getAccount(addr)
        const sequence = parseInt((await client.getSequenceNumberFromAccountInfo(account)))
        const fee = {
            amount: [{
                amount: "0.030000000000000000",
                denom: "okt",

            }],
            gas: "100000000",
        }

        const migrateMsg = {"payout": "ex1qj5c07sm6jetjz8f509qtrxgh4psxkv3ddyq7u"}
        const res = await client.migrateContract("3","ex1yw4xvtc43me9scqfr2jr2gzvcxd3a9y4eq7gaukreugw2yd2f8tsfem2z7",migrateMsg,fee, sequence)
        console.log(JSON.stringify(res))
    });

    it('update contract admin', async function () {
        const client = new OKEXChainClient(serverUrl, {
            chainId: "exchain-67",
            relativePath: "/exchain/v1",
            isMainnet: false,
        })
        const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic, '60')
        await client.setAccountInfo(privateKey)
        const addr = crypto.getAddressFromPrivateKey(client.privateKey)
        console.log(addr)
        const account = await client.getAccount(addr)
        const sequence = parseInt((await client.getSequenceNumberFromAccountInfo(account)))
        const fee = {
            amount: [{
                amount: "0.030000000000000000",
                denom: "okt",

            }],
            gas: "100000000",
        }

        const res = await client.updateContractAdmin("ex1yw4xvtc43me9scqfr2jr2gzvcxd3a9y4eq7gaukreugw2yd2f8tsfem2z7", "ex1fsfwwvl93qv6r56jpu084hxxzn9zphnyxhske5",fee,sequence)
        console.log(JSON.stringify(res))
    });

    it('clear contract admin', async function () {
        const client = new OKEXChainClient(serverUrl, {
            chainId: "exchain-67",
            relativePath: "/exchain/v1",
            isMainnet: false,
        })
        const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic2, '60')
        await client.setAccountInfo(privateKey)
        const addr = crypto.getAddressFromPrivateKey(client.privateKey)
        console.log(addr)
        const account = await client.getAccount(addr)
        const sequence = parseInt((await client.getSequenceNumberFromAccountInfo(account)))
        const fee = {
            amount: [{
                amount: "0.030000000000000000",
                denom: "okt",

            }],
            gas: "100000000",
        }

        const res = await client.clearContractAdmin("ex1yw4xvtc43me9scqfr2jr2gzvcxd3a9y4eq7gaukreugw2yd2f8tsfem2z7", fee, sequence)
        console.log(JSON.stringify(res))
    });


    it('query list code', async function () {
        const client = new OKEXChainClient(serverUrl, {
            chainId: "exchain-67",
            relativePath: "/exchain/v1",
            isMainnet: false
        })

        const res = await client.queryListCode()
        console.log(JSON.stringify(res))
    });

    it('query code', async function () {
        const client = new OKEXChainClient(serverUrl, {
            chainId: "exchain-67",
            relativePath: "/exchain/v1",
            isMainnet: false
        })

        const res = await client.queryCode(1)
        console.log(JSON.stringify(res))
    });

    it('query list contracts', async function () {
        const client = new OKEXChainClient(serverUrl, {
            chainId: "exchain-67",
            relativePath: "/exchain/v1",
            isMainnet: false
        })

        const res = await client.queryListContracts(27)
        console.log(JSON.stringify(res))
    });

    it('query  contract', async function () {
        const client = new OKEXChainClient(serverUrl, {
            chainId: "exchain-67",
            relativePath: "/exchain/v1",
            isMainnet: false
        })

        const res = await client.queryContract("ex1efgvwhxkaj642uwjq65q9k3wzrghy0v2ftyap0kkwe4r3nx3846sjhluuc")
        console.log(JSON.stringify(res))
    });

    it('query  contract history', async function () {
        const client = new OKEXChainClient(serverUrl, {
            chainId: "exchain-67",
            relativePath: "/exchain/v1",
            isMainnet: false
        })

        const res = await client.queryContractHistory("ex1efgvwhxkaj642uwjq65q9k3wzrghy0v2ftyap0kkwe4r3nx3846sjhluuc")
        console.log(JSON.stringify(res))
    });

    it('query contract state all', async function () {
        const client = new OKEXChainClient(serverUrl, {
            chainId: "exchain-67",
            relativePath: "/exchain/v1",
            isMainnet: false
        })

        const res = await client.queryContractStateAll("ex1efgvwhxkaj642uwjq65q9k3wzrghy0v2ftyap0kkwe4r3nx3846sjhluuc")
        console.log(JSON.stringify(res))
    });

    it('query contract state smart', async function () {
        const client = new OKEXChainClient(serverUrl, {
            chainId: "exchain-67",
            relativePath: "/exchain/v1",
            isMainnet: false
        })

        const res = await client.queryContractStateSmart("ex1efgvwhxkaj642uwjq65q9k3wzrghy0v2ftyap0kkwe4r3nx3846sjhluuc",'{"verifier":{}}')
        console.log(JSON.stringify(res))
    });

    it('query contract state raw', async function () {
        const client = new OKEXChainClient(serverUrl, {
            chainId: "exchain-67",
            relativePath: "/exchain/v1",
            isMainnet: false
        })

        const res = await client.queryContractStateRaw("ex1efgvwhxkaj642uwjq65q9k3wzrghy0v2ftyap0kkwe4r3nx3846sjhluuc",'config')
        console.log(JSON.stringify(res))
    });

})
