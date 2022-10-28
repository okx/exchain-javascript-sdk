import OKEXChainClient from "../src"
import * as crypto from "../src/crypto"
const serverUrl = "https://exchaintestrpc.okex.org"

const privateKey = ''
// const privateKey = ''
const contractAddress = '0x35a5A90BA0281189241f7abc3253664Ed0687B8E'
const withdrawAddress = 'ex1fsfwwvl93qv6r56jpu084hxxzn9zphnyxhske5'
const deployerAddress = 'ex1h0j8x0v9hs4eq6ppgamemfyu4vuvp2sl0q9p3v'
const nonces = ['394684']

describe("okc wasm test", async function() {

    it("register feesplit ", async ()=> {
        jest.setTimeout(300000)
        const client = new OKEXChainClient(serverUrl, {
            chainId: "exchain-65",
            relativePath: "/okexchain-test/v1",
            isMainnet: false,
        })

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



        const res = await client.registerFeeSplit(contractAddress,'',nonces, fee,sequence)
        console.log(JSON.stringify(res))
    })

    it("update feesplit ", async ()=> {
        jest.setTimeout(300000)
        const client = new OKEXChainClient(serverUrl, {
            chainId: "exchain-65",
            relativePath: "/okexchain-test/v1",
            isMainnet: false,
        })

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

        const res = await client.updateFeeSplit(contractAddress,withdrawAddress, fee,sequence)
        console.log(JSON.stringify(res))
    })

    it("cancel feesplit ", async ()=> {
        jest.setTimeout(300000)
        const client = new OKEXChainClient(serverUrl, {
            chainId: "exchain-65",
            relativePath: "/okexchain-test/v1",
            isMainnet: false,
        })

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

        const res = await client.cancelFeeSplit(contractAddress, fee,sequence)
        console.log(JSON.stringify(res))
    })

    it("query feesplit ", async ()=> {
        jest.setTimeout(300000)
        const client = new OKEXChainClient(serverUrl, {
            chainId: "exchain-65",
            relativePath: "/okexchain-test/v1",
            isMainnet: false,
        })

        const res = await client.queryFeesplit(contractAddress)
        console.log(JSON.stringify(res))
    })

    it("query DeployerFeeSplits ", async ()=> {
        jest.setTimeout(300000)
        const client = new OKEXChainClient(serverUrl, {
            chainId: "exchain-65",
            relativePath: "/okexchain-test/v1",
            isMainnet: false,
        })
        const res = await client.queryDeployerFeeSplits(deployerAddress, 1, 100)
        console.log(JSON.stringify(res))
    })

    it("query WithdrawerFeeSplits ", async ()=> {
        jest.setTimeout(300000)
        const client = new OKEXChainClient(serverUrl, {
            chainId: "exchain-65",
            relativePath: "/okexchain-test/v1",
            isMainnet: false,
        })

        const res = await client.queryWithdrawerFeeSplits(withdrawAddress, 1, 100)
        console.log(JSON.stringify(res))
    })

})
