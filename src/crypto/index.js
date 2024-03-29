/**
 * @module crypto
 */

import csprng from "secure-random"
import bech32 from "bech32"
import cryp from "crypto-browserify"
import uuid from "uuid"
import _ from "lodash"
import bip39 from "bip39"
import bip32 from "bip32"
import { ec as EC } from "elliptic"
import ecc from "tiny-secp256k1"
import hexEncoding from "crypto-js/enc-hex"
import SHA256 from "crypto-js/sha256"
import RIPEMD160 from "crypto-js/ripemd160"
import { Buffer } from "buffer"
import secp256k1 from "secp256k1"
import createKeccakHash from "keccak"
import Hash from "eth-lib/lib/hash"
import BN from 'bn.js'

import {
  sha256ripemd160,
} from "../utils"

// 浏览器端实现
const sync = require('./scrypt-sync')


const MNEMONIC_ENTROPY_LEN = 128
// const HD_PATH = "44'/996'/0'/0/0"

/**
 * Get HD path by cointype param .
 * @param {string} cointype, default 60
 */
export const getHDPath = function (cointype) {
  return "44'/" + (cointype || '60') + "'/0'/0/0"
}

/**
 * Decode address from bech32 to buffer.
 * @param {string} addr bech32 format
 */
export const decodeAddressToBuffer = (addr) => {
  const decodedAddress = bech32.decode(addr)
  return Buffer.from(bech32.fromWords(decodedAddress.words))
}

/**
 * Validate address.
 * @param {string} addr bech32 format
 * @return {boolean}
 */
export const validateAddress = (addr) => {
  try {
    const decodeAddress = bech32.decode(addr)
    if(decodeAddress.prefix === "ex") {
      return true
    }

    return false
  } catch(err) {
    return false
  }
}

/**
 * Encodes address from hex to bech32 format.
 * @param {string} hexAddr address in hex string
 * @param {string} prefix address prefix
 * @return {string} address with bech32 format
 */
export const encodeAddressToBech32 = (hexAddr, prefix = "ex") => {
  hexAddr = hexAddr.slice(0, 2) === '0x' ? hexAddr.slice(2) : hexAddr
  const words = bech32.toWords(Buffer.from(hexAddr, "hex"))
  return bech32.encode(prefix, words)
}

function buf2hex(buffer) { // buffer is an ArrayBuffer
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

/**
 * covert ex address to 0x address
 * @param bech32Address
 * @returns {Array}
 */
export const convertBech32ToHex = (bech32Address) => {
  const address = decodeAddressToBuffer(bech32Address)
  const hexAddress = toChecksumAddress("0x"+buf2hex(address))
  return [hexAddress, encodeAddressToBech32(hexAddress.toLowerCase(), 'okexchain')]
}
/**
 * covert 0x address to ex address
 * @param hexAddress
 * @returns {Array}
 */
export const convertHexToBech32 = (hexAddress) => {
  return [encodeAddressToBech32(hexAddress.toLowerCase()), encodeAddressToBech32(hexAddress.toLowerCase(), 'okexchain')]
}

/**
 * covert okexchain address to ex address
 * @param bech32Address
 * @returns {String}
 */
export const convertOKExChainAddressToExAddress = (bech32Address) => {
  const address = decodeAddressToBuffer(bech32Address)
  const hexAddress = toChecksumAddress("0x"+buf2hex(address))
  return encodeAddressToBech32(hexAddress.toLowerCase(), 'ex')
}

/**
 * Returns true if object is BN, otherwise false
 *
 * @method isBN
 * @param {Object} object
 * @return {Boolean}
 */
var isBN = function (object) {
  return BN.isBN(object);
};

/**
 * Check if string is HEX, requires a 0x in front
 *
 * @method isHexStrict
 * @param {String} hex to be checked
 * @returns {Boolean}
 */
var isHexStrict = function (hex) {
  return ((_.isString(hex) || _.isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(hex));
};

/**
 * Hashes values to a sha3 hash using keccak 256
 *
 * To hash a HEX string the hex must have 0x in front.
 *
 * @method sha3
 * @return {String} the sha3 string
 */
var SHA3_NULL_S = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';

export const sha3 = function (value) {
  if (isBN(value)) {
    value = value.toString();
  }

  if (isHexStrict(value) && /^0x/i.test((value).toString())) {
    value = hexToBytes(value);
  }

  var returnValue = Hash.keccak256(value); // jshint ignore:line

  if(returnValue === SHA3_NULL_S) {
    return null;
  } else {
    return returnValue;
  }
};

/**
 * Converts to a checksum address
 *
 * @method toChecksumAddress
 * @param {String} address the given HEX address
 * @return {String}
 */
export const toChecksumAddress = function (address) {
  if (typeof address === 'undefined') return '';

  if (!/^(0x)?[0-9a-f]{40}$/i.test(address))
    throw new Error('Given address "'+ address +'" is not a valid Ethereum address.');

  address = address.toLowerCase().replace(/^0x/i,'');
  var addressHash = sha3(address).replace(/^0x/i,'');
  var checksumAddress = '0x';

  for (var i = 0; i < address.length; i++ ) {
    // If ith character is 8 to f then make it uppercase
    if (parseInt(addressHash[i], 16) > 7) {
      checksumAddress += address[i].toUpperCase();
    } else {
      checksumAddress += address[i];
    }
  }
  return checksumAddress;
};


/**
 * Generates privateKey.
 * @param {number} len privateKey length (default: 32 bytes)
 * @return {string} privateKey hex string
 */
export const generatePrivateKey = (len = 32) => Buffer.from(csprng(len)).toString("hex")

/**
 * Get publicKey from hex string.
 * @param {string} publicKey pubKey with hex string format
 * @return {Elliptic.PublicKey} pubKey
 */
export const getPubKeyFromHex = publicKey => {
  const cure = new EC("secp256k1")
  let keyPair = cure.keyFromPublic(publicKey, "hex")
  return keyPair.getPublic()
}

/**
 * Encode pubKey to compressed pubKey buffer.
 * @param {Elliptic.PublicKey} pubKey
 * @return {Buffer}
 */
export const encodePubKeyToCompressedBuffer = pubKey => {
  let prefix = 2
  if(pubKey.y.isOdd()){
    prefix = 3
  }

  let pubBytes = Buffer.concat([
    Buffer.alloc(1, prefix),
    pubKey.x.toArrayLike(Buffer, "be", 32)
  ])
  return pubBytes
}

/**
 * Get public key from  private key.
 * @param {string} privateKeyHex the private key hex string
 * @return {string} public key in hex string
 */
export const getPubKeyHexFromPrivateKey = privateKeyHex => {
  const curve = new EC("secp256k1")
  const keypair = curve.keyFromPrivate(privateKeyHex, "hex")
  const compressed = Buffer.from(keypair.getPublic().encodeCompressed())
  return compressed.toString("hex")
}
/**
 * Get public key from  private key.
 * @param {Buffer} privateKey
 * @return {Elliptic.PublicKey} PubKey
 * */
export const getPubKeyFromPrivateKey = privateKey => {
  const curve = new EC("secp256k1")
  const keypair = curve.keyFromPrivate(privateKey)
  return keypair.getPublic()
}

/**
 * Gets address from pubKey with hex format.
 * @param {string} publicKey publicKey hexstring
 * @param {string} prefix address prefix
 * @return {string} address
 */
export const getAddressFromPubKey = (publicKey, prefix) => {
    publicKey = publicKey.slice(0, 2) === '0x' ? publicKey.slice(2) : publicKey
    const publicKey1 = Buffer.from(publicKey, 'hex')
    publicKey = Buffer.from(secp256k1.publicKeyConvert(new Uint8Array(publicKey1), false)).slice(1)
    const hash = createKeccakHash('keccak256').update(publicKey).digest()
    return encodeAddressToBech32(hash.slice(-20).toString('hex'), prefix)
}

export const getAddressFromPublicKeyLegacy = (publicKeyHex, prefix) => {
  // const pubKey = ec.keyFromPublic(publicKeyHex, "hex")
  // const pubPoint = pubKey.getPublic()
  // const compressed = pubPoint.encodeCompressed()
  // const hexed = ab2hexstring(compressed)
  const hash = sha256ripemd160(publicKeyHex) // https://git.io/fAn8N
  const address = encodeAddress(hash, prefix)
  return address
}

export const encodeAddress = (value, prefix = "ex", type = "hex") => {
  const words = bech32.toWords(Buffer.from(value, type))
  return bech32.encode(prefix, words)
}

/**
 * Get address from private key.
 * @param {string} privateKeyHex the private key hexstring
 * @param {string} prefix address prefix
 * @return {string} address
 */
export const getAddressFromPrivateKey = (privateKeyHex, prefix) => {
  return getAddressFromPubKey(getPubKeyHexFromPrivateKey(privateKeyHex), prefix)
}

export const getAddressFromPrivateKeyLegacy = (privateKeyHex, prefix) => {
  return getAddressFromPublicKeyLegacy(getPubKeyHexFromPrivateKey(privateKeyHex), prefix)
}

/**
 * Sign msg with privateKey and Msg in hex format.
 * @param {string} msgHex msg in hex format.
 * @param {string} privateKey - The private key in hex format.
 * @return {Buffer} Signature.
 */
export const sign = (msgHex, privateKey) => {
  const msg = Buffer.from(msgHex, "hex")
  const msgHash = createKeccakHash('keccak256').update(msg).digest()
  const signature = ecc.sign(msgHash, Buffer.from(privateKey, "hex")) // enc ignored if buffer
  return signature
}

/**
 * Generates a signature (64 byte <r,s>) for a transaction based on given private key.
 * @param {string} signBytesHex - Unsigned transaction sign bytes hexstring.
 * @param {string | Buffer} privateKey - The private key.
 * @return {Buffer} Signature. Does not include tx.
 */
export const signPrivateKeyOldAddress = (signBytesHex, privateKey) => {
  const msgHash = sha256(signBytesHex)
  const msgHashHex = Buffer.from(msgHash, "hex")
  const signature = ecc.sign(msgHashHex, Buffer.from(privateKey, "hex")) // enc ignored if buffer
  return signature
}

/**
 * Validate signature.
 * @param {string} sigHex signature in hex format
 * @param {string} msgHex msg in hex format.
 * @param {string} pubKeyHex public key in hex format
 * @return {boolean}
 */
export const validateSig = (sigHex, msgHex, pubKeyHex) => {
  const publicKey = Buffer.from(pubKeyHex, "hex")
  if (!ecc.isPoint(publicKey)) throw new Error("invalid pubKey")
  const msg = Buffer.from(msgHex, "hex")
  const msgHashHex = createKeccakHash('keccak256').update(msg).digest()
  const msgHash = Buffer.from(msgHashHex, "hex")
  return ecc.verify(msgHash, publicKey, Buffer.from(sigHex, "hex"))
}

/**
 * Generate KeyStore with privateKey and password.
 * @param {string} privateKeyHex
 * @param {string} password
 * @returns {object}
 */
export const generateKeyStore = (privateKeyHex, password) => {
  const salt = cryp.randomBytes(32)
  const iv = cryp.randomBytes(16)
  const cipherAlg = "aes-128-ctr"

  const kdf = "scrypt"
  const kdfparams = {
    dklen: 32,
    salt: salt.toString("hex"),
    n: 262144,
    p: 1,
    r: 8,
    //prf: "hmac-sha256"
  }
  const options = {
    N: kdfparams.n,
    r: kdfparams.r,
    p: kdfparams.p,
    maxmem: 1024*1024*1024*2,
  }

  const derivedKey = sync(Buffer.from(password),salt,kdfparams.dklen,options)
  const cipher = cryp.createCipheriv(cipherAlg, derivedKey.slice(0, 16), iv)
  if (!cipher) {
    throw new Error("createCipheriv has been failed")
  }

  const ciphertext = Buffer.concat([cipher.update(Buffer.from(privateKeyHex.toLowerCase(), "hex")), cipher.final()])
  const bufferValue = Buffer.concat([derivedKey.slice(16, 32), Buffer.from(ciphertext, "hex")])
  return {
    crypto: {
      ciphertext: ciphertext.toString("hex"),
      cipherparams: {
        iv: iv.toString("hex")
      },
      cipher: cipherAlg,
      kdf,
      kdfparams: kdfparams,
      mac: sha256(bufferValue.toString("hex"))
    },
    id: uuid.v4({
      random: cryp.randomBytes(16)
    }),
    version: 3,
  }
}
/**
 * Get privateKey from keyStore.
 * @param {string | object} keystore
 * @param {string} password
 * @returns {string} privateKey
 */
export const getPrivateKeyFromKeyStore = (keystore, password) => {

  if (!_.isString(password)) {
    throw new Error("invalid password")
  }

  const json = _.isObject(keystore) ? keystore : JSON.parse(keystore)
  const kdfparams = json.crypto.kdfparams
  const options = {
    N: kdfparams.n,
    r: kdfparams.r,
    p: kdfparams.p,
    maxmem: 1024*1024*1024*2,
  }
  const derivedKey = sync(Buffer.from(password),Buffer.from(kdfparams.salt, "hex"),kdfparams.dklen,options)
  const ciphertext = Buffer.from(json.crypto.ciphertext, "hex")
  const bufferValue = Buffer.concat([derivedKey.slice(16, 32), ciphertext])
  const mac = sha256(bufferValue.toString("hex"))

  if (mac !== json.crypto.mac) {
    throw new Error("invalid password")
  }
  const decipher = cryp.createDecipheriv(json.crypto.cipher, derivedKey.slice(0, 16), Buffer.from(json.crypto.cipherparams.iv, "hex"))
  const privateKey = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("hex")

  return privateKey
}

/**
 * Generate mnemonic.
 * @return {string}
 */
export const generateMnemonic = () => bip39.generateMnemonic(MNEMONIC_ENTROPY_LEN)

/**
 * Validate mnemonic.
 * @param {string} mnemonic.
 * @return {bool}
 */
export const validateMnemonic = bip39.validateMnemonic

/**
 * Get private key from mnemonic.
 * @param {string} mnemonic
 * @param {string} cointype, default 60
 * @return {string} hexstring
 */
export const getPrivateKeyFromMnemonic = (mnemonic, cointype) => {
  if(!bip39.validateMnemonic(mnemonic)){
    throw new Error("invalid mnemonic format")
  }
  const seed = bip39.mnemonicToSeed(mnemonic)
  const master = bip32.fromSeed(seed)
  const child = master.derivePath(getHDPath(cointype))
  return child.privateKey.toString("hex")
}


/**
 * Just like ripemd160(sha256(hex))
 * @param {string} hex
 * @returns {string} hash
 */
export const sha256Ripemd160 = (hex) => {
  if (typeof hex !== "string") throw new Error("invalid param, need hex string")
  if (hex.length % 2 !== 0) throw new Error(`invalid hex string length: ${hex}`)
  const hexEncoded = hexEncoding.parse(hex)
  const ProgramSha256 = SHA256(hexEncoded)
  return RIPEMD160(ProgramSha256).toString()
}

/**
 * SHA256.
 * @param {string} hex
 * @returns {string} hash
 */
export const sha256 = (hex) => {
  if (typeof hex !== "string") throw new Error("invalid param,need hex string")
  if (hex.length % 2 !== 0) throw new Error(`invalid hex string length: ${hex}`)
  const hexEncoded = hexEncoding.parse(hex)
  return SHA256(hexEncoded).toString()
}

