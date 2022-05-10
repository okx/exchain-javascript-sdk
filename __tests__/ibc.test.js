import OKEXChainClient from "../src"
import * as crypto from "../src/crypto"




const serverUrl = "http://127.0.0.1:36659"


const mnemonic = "giggle sibling fun arrow elevator spoon blood grocery laugh tortoise culture tool"



describe("okc ibc test", async () => {
    it("ibc transfer test", async ()=> {

        const client = new OKEXChainClient(serverUrl, {
            chainId: "exchain-101",
            relativePath: "/exchain/v1",
            isMainnet: false
        })
        const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic, '60')
        await client.setAccountInfo(privateKey)
        const addr = crypto.getAddressFromPrivateKey(client.privateKey)
        console.log(addr)
        const account = await client.getAccount(addr)
        const sequence = parseInt((await client.getSequenceNumberFromAccountInfo(account)))
        const res = await client.ibcTransfer("cosmos1n064mg7jcxt2axur29mmek5ys7ghta4u4mhcjp", {amount: "2000000000000000000000", denom: "wei"}, "", "channel-0", "1","200000")
        console.log(JSON.stringify(res))
    })

    it("ibc query denom_hash", async () => {
        const client = new OKEXChainClient("http://127.0.0.1:10001", {
            chainId: "ibc-1",
            relativePath: "/",
            isMainnet: false
        })

        const res = await client.queryDenomHash('{"path":"transfer/channel-0","base_denom":"wei"}')
        console.log(JSON.stringify(res))
    })

    it("ibc query denom_traces", async () => {
        const client = new OKEXChainClient("http://127.0.0.1:10001", {
            chainId: "ibc-1",
            relativePath: "/",
            isMainnet: false
        })

        const res = await client.queryDenomTraces()
        console.log(JSON.stringify(res))
    })

    it("ibc query denom_trace", async () => {
        const client = new OKEXChainClient("http://127.0.0.1:10001", {
            chainId: "ibc-1",
            relativePath: "/",
            isMainnet: false
        })

        const res = await client.queryDenomTrace('CD3872E1E59BAA23BDAB04A829035D4988D6397569EC77F1DC991E4520D4092B')
        console.log(JSON.stringify(res))
    })

    it("ibc query parmas", async () => {
        const client = new OKEXChainClient("http://127.0.0.1:10001", {
            chainId: "ibc-1",
            relativePath: "/",
            isMainnet: false
        })

        const res = await client.queryIbcParams()
        console.log(JSON.stringify(res))
    })




})