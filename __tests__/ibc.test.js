import OKEXChainClient from "../src"
import * as crypto from "../src/crypto"




const serverUrl = "http://127.0.0.1:36659"


const mnemonic = "giggle sibling fun arrow elevator spoon blood grocery laugh tortoise culture tool"



describe("okc ibc test", async () => {
    it("ibc transfer test", async ()=> {

        const client = new OKEXChainClient(serverUrl, {
            chainId: "101",
            relativePath: "/exchain/v1",
            isMainnet: false
        })
        const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic)
        await client.setAccountInfo(privateKey)
        const addr = crypto.getAddressFromPrivateKey(client.privateKey)
        console.log(addr)
        const account = await client.getAccount(addr)
        const sequence = parseInt((await client.getSequenceNumberFromAccountInfo(account)))
        const res = await client.ibcTransfer("cosmos1n064mg7jcxt2axur29mmek5ys7ghta4u4mhcjp", "2000000000000000000000", "wei", "", sequence, "channel-0","1","10000")
        console.log(JSON.stringify(res))
    })


})