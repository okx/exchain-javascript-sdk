<a name="module_crypto"></a>

## crypto

* [crypto](#module_crypto)
    * _static_
        * [.getHDPath](#module_crypto.getHDPath)
        * [.decodeAddressToBuffer](#module_crypto.decodeAddressToBuffer)
        * [.validateAddress](#module_crypto.validateAddress) ⇒ <code>boolean</code>
        * [.encodeAddressToBech32](#module_crypto.encodeAddressToBech32) ⇒ <code>string</code>
        * [.convertBech32ToHex](#module_crypto.convertBech32ToHex) ⇒ <code>String</code>
        * [.convertHexToBech32](#module_crypto.convertHexToBech32) ⇒ <code>string</code>
        * [.generatePrivateKey](#module_crypto.generatePrivateKey) ⇒ <code>string</code>
        * [.getPubKeyFromHex](#module_crypto.getPubKeyFromHex) ⇒ <code>Elliptic.PublicKey</code>
        * [.encodePubKeyToCompressedBuffer](#module_crypto.encodePubKeyToCompressedBuffer) ⇒ <code>Buffer</code>
        * [.getPubKeyHexFromPrivateKey](#module_crypto.getPubKeyHexFromPrivateKey) ⇒ <code>string</code>
        * [.getPubKeyFromPrivateKey](#module_crypto.getPubKeyFromPrivateKey) ⇒ <code>Elliptic.PublicKey</code>
        * [.getAddressFromPubKey](#module_crypto.getAddressFromPubKey) ⇒ <code>string</code>
        * [.getAddressFromPrivateKey](#module_crypto.getAddressFromPrivateKey) ⇒ <code>string</code>
        * [.sign](#module_crypto.sign) ⇒ <code>Buffer</code>
        * [.validateSig](#module_crypto.validateSig) ⇒ <code>boolean</code>
        * [.generateKeyStore](#module_crypto.generateKeyStore) ⇒ <code>object</code>
        * [.getPrivateKeyFromKeyStore](#module_crypto.getPrivateKeyFromKeyStore) ⇒ <code>string</code>
        * [.generateMnemonic](#module_crypto.generateMnemonic) ⇒ <code>string</code>
        * [.validateMnemonic](#module_crypto.validateMnemonic) ⇒ <code>bool</code>
        * [.getPrivateKeyFromMnemonic](#module_crypto.getPrivateKeyFromMnemonic) ⇒ <code>string</code>
        * [.sha256Ripemd160](#module_crypto.sha256Ripemd160) ⇒ <code>string</code>
        * [.sha256](#module_crypto.sha256) ⇒ <code>string</code>
    * _inner_
        * [~isBN(object)](#module_crypto..isBN) ⇒ <code>Boolean</code>
        * [~isHexStrict(hex)](#module_crypto..isHexStrict) ⇒ <code>Boolean</code>
        * [~sha3()](#module_crypto..sha3) ⇒ <code>String</code>
        * [~toChecksumAddress(address)](#module_crypto..toChecksumAddress) ⇒ <code>String</code>

<a name="module_crypto.getHDPath"></a>

### crypto.getHDPath
Get HD path by cointype param .

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  

| Param | Type | Description |
| --- | --- | --- |
| cointype, | <code>string</code> | default 60 |

<a name="module_crypto.decodeAddressToBuffer"></a>

### crypto.decodeAddressToBuffer
Decode address from bech32 to buffer.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  

| Param | Type | Description |
| --- | --- | --- |
| addr | <code>string</code> | bech32 format |

<a name="module_crypto.validateAddress"></a>

### crypto.validateAddress ⇒ <code>boolean</code>
Validate address.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  

| Param | Type | Description |
| --- | --- | --- |
| addr | <code>string</code> | bech32 format |

<a name="module_crypto.encodeAddressToBech32"></a>

### crypto.encodeAddressToBech32 ⇒ <code>string</code>
Encodes address from hex to bech32 format.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  
**Returns**: <code>string</code> - address with bech32 format  

| Param | Type | Description |
| --- | --- | --- |
| hexAddr | <code>string</code> | address in hex string |
| prefix | <code>string</code> | address prefix |

<a name="module_crypto.convertBech32ToHex"></a>

### crypto.convertBech32ToHex ⇒ <code>String</code>
covert okexchain address to 0x address

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  

| Param |
| --- |
| bech32Address | 

<a name="module_crypto.convertHexToBech32"></a>

### crypto.convertHexToBech32 ⇒ <code>string</code>
covert 0x address to okexchain address

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  

| Param |
| --- |
| hexAddress | 

<a name="module_crypto.generatePrivateKey"></a>

### crypto.generatePrivateKey ⇒ <code>string</code>
Generates privateKey.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  
**Returns**: <code>string</code> - privateKey hex string  

| Param | Type | Description |
| --- | --- | --- |
| len | <code>number</code> | privateKey length (default: 32 bytes) |

<a name="module_crypto.getPubKeyFromHex"></a>

### crypto.getPubKeyFromHex ⇒ <code>Elliptic.PublicKey</code>
Get publicKey from hex string.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  
**Returns**: <code>Elliptic.PublicKey</code> - pubKey  

| Param | Type | Description |
| --- | --- | --- |
| publicKey | <code>string</code> | pubKey with hex string format |

<a name="module_crypto.encodePubKeyToCompressedBuffer"></a>

### crypto.encodePubKeyToCompressedBuffer ⇒ <code>Buffer</code>
Encode pubKey to compressed pubKey buffer.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  

| Param | Type |
| --- | --- |
| pubKey | <code>Elliptic.PublicKey</code> | 

<a name="module_crypto.getPubKeyHexFromPrivateKey"></a>

### crypto.getPubKeyHexFromPrivateKey ⇒ <code>string</code>
Get public key from  private key.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  
**Returns**: <code>string</code> - public key in hex string  

| Param | Type | Description |
| --- | --- | --- |
| privateKeyHex | <code>string</code> | the private key hex string |

<a name="module_crypto.getPubKeyFromPrivateKey"></a>

### crypto.getPubKeyFromPrivateKey ⇒ <code>Elliptic.PublicKey</code>
Get public key from  private key.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  
**Returns**: <code>Elliptic.PublicKey</code> - PubKey  

| Param | Type |
| --- | --- |
| privateKey | <code>Buffer</code> | 

<a name="module_crypto.getAddressFromPubKey"></a>

### crypto.getAddressFromPubKey ⇒ <code>string</code>
Gets address from pubKey with hex format.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  
**Returns**: <code>string</code> - address  

| Param | Type | Description |
| --- | --- | --- |
| publicKey | <code>string</code> | publicKey hexstring |
| prefix | <code>string</code> | address prefix |

<a name="module_crypto.getAddressFromPrivateKey"></a>

### crypto.getAddressFromPrivateKey ⇒ <code>string</code>
Get address from private key.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  
**Returns**: <code>string</code> - address  

| Param | Type | Description |
| --- | --- | --- |
| privateKeyHex | <code>string</code> | the private key hexstring |
| prefix | <code>string</code> | address prefix |

<a name="module_crypto.sign"></a>

### crypto.sign ⇒ <code>Buffer</code>
Sign msg with privateKey and Msg in hex format.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  
**Returns**: <code>Buffer</code> - Signature.  

| Param | Type | Description |
| --- | --- | --- |
| msgHex | <code>string</code> | msg in hex format. |
| privateKey | <code>string</code> | The private key in hex format. |

<a name="module_crypto.validateSig"></a>

### crypto.validateSig ⇒ <code>boolean</code>
Validate signature.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  

| Param | Type | Description |
| --- | --- | --- |
| sigHex | <code>string</code> | signature in hex format |
| msgHex | <code>string</code> | msg in hex format. |
| pubKeyHex | <code>string</code> | public key in hex format |

<a name="module_crypto.generateKeyStore"></a>

### crypto.generateKeyStore ⇒ <code>object</code>
Generate KeyStore with privateKey and password.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  

| Param | Type |
| --- | --- |
| privateKeyHex | <code>string</code> | 
| password | <code>string</code> | 

<a name="module_crypto.getPrivateKeyFromKeyStore"></a>

### crypto.getPrivateKeyFromKeyStore ⇒ <code>string</code>
Get privateKey from keyStore.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  
**Returns**: <code>string</code> - privateKey  

| Param | Type |
| --- | --- |
| keystore | <code>string</code> \| <code>object</code> | 
| password | <code>string</code> | 

<a name="module_crypto.generateMnemonic"></a>

### crypto.generateMnemonic ⇒ <code>string</code>
Generate mnemonic.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto.validateMnemonic"></a>

### crypto.validateMnemonic ⇒ <code>bool</code>
Validate mnemonic.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  

| Param | Type |
| --- | --- |
| mnemonic. | <code>string</code> | 

<a name="module_crypto.getPrivateKeyFromMnemonic"></a>

### crypto.getPrivateKeyFromMnemonic ⇒ <code>string</code>
Get private key from mnemonic.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  
**Returns**: <code>string</code> - hexstring  

| Param | Type | Description |
| --- | --- | --- |
| mnemonic | <code>string</code> |  |
| cointype, | <code>string</code> | default 60 |

<a name="module_crypto.sha256Ripemd160"></a>

### crypto.sha256Ripemd160 ⇒ <code>string</code>
Just like ripemd160(sha256(hex))

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  
**Returns**: <code>string</code> - hash  

| Param | Type |
| --- | --- |
| hex | <code>string</code> | 

<a name="module_crypto.sha256"></a>

### crypto.sha256 ⇒ <code>string</code>
SHA256.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  
**Returns**: <code>string</code> - hash  

| Param | Type |
| --- | --- |
| hex | <code>string</code> | 

<a name="module_crypto..isBN"></a>

### crypto~isBN(object) ⇒ <code>Boolean</code>
Returns true if object is BN, otherwise false

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Type |
| --- | --- |
| object | <code>Object</code> | 

<a name="module_crypto..isHexStrict"></a>

### crypto~isHexStrict(hex) ⇒ <code>Boolean</code>
Check if string is HEX, requires a 0x in front

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>String</code> | to be checked |

<a name="module_crypto..sha3"></a>

### crypto~sha3() ⇒ <code>String</code>
Hashes values to a sha3 hash using keccak 256

To hash a HEX string the hex must have 0x in front.

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <code>String</code> - the sha3 string  
<a name="module_crypto..toChecksumAddress"></a>

### crypto~toChecksumAddress(address) ⇒ <code>String</code>
Converts to a checksum address

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>String</code> | the given HEX address |

