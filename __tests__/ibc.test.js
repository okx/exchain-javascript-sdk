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

    it("ibc query AllClientStates", async ()=> {
        const client = new OKEXChainClient("http://127.0.0.1:10001", {
            chainId: "ibc-1",
            relativePath: "/",
            isMainnet: false
        })
        const res = await client.queryAllClientStates()
        console.log(JSON.stringify(res))
    })

    it("ibc query clientState", async ()=> {
        const client = new OKEXChainClient("http://127.0.0.1:10001", {
            chainId: "ibc-1",
            relativePath: "/",
            isMainnet: false
        })
        const res = await client.queryClientStates('07-tendermint-0')
        console.log(JSON.stringify(res))
    })

    it( 'ibc query clientConnections', async ()=> {
        const client = new OKEXChainClient("http://127.0.0.1:10001", {
            chainId: "ibc-1",
            relativePath: "/",
            isMainnet: false
        })
        const res = await client.queryClientConnections('07-tendermint-0')
        console.log(JSON.stringify(res))
    })

    it( 'ibc query all connections', async ()=> {
        const client = new OKEXChainClient("http://127.0.0.1:10001", {
            chainId: "ibc-1",
            relativePath: "/",
            isMainnet: false
        })

        const res = await client.queryAllConnections()
        console.log(JSON.stringify(res))
    })

    it('ibc query connection', async ()=> {
        const client = new OKEXChainClient("http://127.0.0.1:10001", {
            chainId: "ibc-1",
            relativePath: "/",
            isMainnet: false
        })

        const res = await client.queryConnection('connection-0')
        console.log(JSON.stringify(res))
    })

    it('query all channels', async ()=> {
        const client = new OKEXChainClient("http://127.0.0.1:10001", {
            chainId: "ibc-1",
            relativePath: "/",
            isMainnet: false
        })

        const res = await client.queryAllChannels()
        console.log(JSON.stringify(res))
    })


    it('query  channel', async ()=> {
        const client = new OKEXChainClient("http://127.0.0.1:10001", {
            chainId: "ibc-1",
            relativePath: "/",
            isMainnet: false
        })

        const res = await client.queryChannel('channel-0','transfer')
        console.log(JSON.stringify(res))
    })

    it('queryPacketCommitments', async ()=> {
        const client = new OKEXChainClient("http://127.0.0.1:10001", {
            chainId: "ibc-1",
            relativePath: "/",
            isMainnet: false
        })

        const res = await client.queryPacketCommitments('channel-0','transfer',0)
        console.log(JSON.stringify(res))
    })

    it('queryConnectionChannels', async ()=> {
        const client = new OKEXChainClient("http://127.0.0.1:10001", {
            chainId: "ibc-1",
            relativePath: "/",
            isMainnet: false
        })

        const res = await client.queryConnectionChannels('connection-0')
        console.log(JSON.stringify(res))
    })

    it('query tx', async () => {
        const client = new OKEXChainClient("http://127.0.0.1:36659", {
            chainId: "exchain-101",
            relativePath: "/exchain/v1",
            isMainnet: false
        })
        const res = await client.queryTx('D7702BCC93BC3CA3C16EB0F9B1F945D33D1860B931B78FDDB6F0517B120E5E91')
        console.log(JSON.stringify(res))
    })

    it('query txs', async ()=> {
        const client = new OKEXChainClient("http://127.0.0.1:36659",{
            chainId: "exchain-101",
            relativePath: "/exchain/v1",
            isMainnet: false
        })

        const res = await client.queryTxs({action: 'transfer', sender: 'ex1qj5c07sm6jetjz8f509qtrxgh4psxkv3ddyq7u'})
        console.log(JSON.stringify(res))
    })

    it("query header", async ()=>{
        const client = new OKEXChainClient("http://127.0.0.1:36659", {
            chainId: "exchain-101",
            relativePath: "/exchain/v1",
            isMainnet: false
        },"http://127.0.0.1:36657",)
        const res = await client.queryHeader(1)
        console.log(JSON.stringify(res))
    })
})