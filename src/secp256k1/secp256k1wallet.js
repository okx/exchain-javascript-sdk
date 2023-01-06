"use strict";
import secp256k1 from "secp256k1";

Object.defineProperty(exports, "__esModule", {value: true});
exports.OKCSecp256k1Wallet = void 0;
const crypto_1 = require("@cosmjs/crypto");
const encoding_1 = require("@cosmjs/encoding");
const addresses_1 = require("@cosmjs/amino");
const signature_1 = require("@cosmjs/amino");
const signdoc_1 = require("@cosmjs/amino");
import * as crypto from "../crypto";
import {encodePubKeyToCompressedBuffer} from "../crypto";
import {Buffer} from "buffer";
import {re} from "@babel/core/lib/vendor/import-meta-resolve";
import * as web3 from "web3"

/**
 * A wallet that holds a single secp256k1 keypair.
 *
 * If you want to work with BIP39 mnemonics and multiple accounts, use Secp256k1HdWallet.
 */
class OKCSecp256k1Wallet {
    constructor(privkey, pubkey, prefix) {
        this.privkey = privkey;
        this.pubkey = pubkey;
        this.prefix = prefix;
    }

    /**
     * Creates a Secp256k1Wallet from the given private key
     *
     * @param privkey The private key.
     * @param prefix The bech32 address prefix (human readable part). Defaults to "cosmos".
     */
    static async fromKey(privkey, prefix = "cosmos") {
        // const uncompressed = (await crypto_1.Secp256k1.makeKeypair(privkey)).pubkey;
        // const compressed = crypto_1.Secp256k1.compressPubkey(uncompressed)
        // return new OKCSecp256k1Wallet(privkey, crypto_1.Secp256k1.compressPubkey(uncompressed), prefix);

        // const pk = crypto.getPubKeyHexFromPrivateKey(privkey)
        const pk = crypto.encodePubKeyToCompressedBuffer(crypto.getPubKeyFromPrivateKey(privkey))
        // return new OKCSecp256k1Wallet(privkey, Uint8Array.from(Buffer.from(pk, 'hex')), prefix)
        return new OKCSecp256k1Wallet(privkey, Uint8Array.from(pk), prefix)
    }

    get address() {
        return crypto.getAddressFromPrivateKey(Buffer.from(this.privkey).toString('hex'))
        // return crypto.getAddressFromPrivateKeyLegacy(Buffer.from(this.privkey).toString('hex'),this.prefix)
        // return (0, encoding_1.toBech32)(this.prefix, (0, addresses_1.rawSecp256k1PubkeyToRawAddress)(this.pubkey));
    }

    async getAccounts() {
        return [{
            algo: "secp256k1", address: this.address, pubkey: this.pubkey,
        },];
    }

    async signAmino(signerAddress, signDoc) {
        if (signerAddress !== this.address) {
            throw new Error(`Address ${signerAddress} not found in wallet`);
        }
        const message = web3.default.utils.sha3(Buffer.from((0, signdoc_1.serializeSignDoc)(signDoc)))

        // const message = new crypto_1.Sha256((0, signdoc_1.serializeSignDoc)(signDoc)).digest();
        const signature = await crypto_1.Secp256k1.createSignature(Uint8Array.from(Buffer.from(message.substring(2),'hex')), this.privkey);
        const signatureBytes = new Uint8Array([...signature.r(32), ...signature.s(32)]);

        console.log('hash：',Buffer.from(message).toString('hex'));
        console.log(JSON.stringify((0, signature_1.encodeSecp256k1Signature)(this.pubkey, signatureBytes)))
        console.log(this.pubkey)
        return {
            signed: signDoc, signature: (0, signature_1.encodeSecp256k1Signature)(this.pubkey, signatureBytes),
        }
    }
}

exports.OKCSecp256k1Wallet = OKCSecp256k1Wallet;
