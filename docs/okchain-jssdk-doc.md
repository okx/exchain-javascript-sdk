## Modules

<dl>
<dt><a href="#module_client">client</a></dt>
<dd></dd>
<dt><a href="#module_crypto">crypto</a></dt>
<dd></dd>
</dl>

<a name="module_client"></a>

## client

* [client](#module_client)
    * [.OKChainClient](#module_client.OKChainClient)
        * [new exports.OKChainClient(url)](#new_module_client.OKChainClient_new)
        * [.setMode(mode)](#module_client.OKChainClient+setMode)
        * [.setAccountInfo(privateKey)](#module_client.OKChainClient+setAccountInfo) ⇒ <code>OKChainClient</code>
        * [.sendSendTransaction(to, amount, denom, memo, sequenceNumber)](#module_client.OKChainClient+sendSendTransaction) ⇒ <code>Object</code>
        * [.sendCancelOrderTransaction(orderId, memo, sequenceNumber)](#module_client.OKChainClient+sendCancelOrderTransaction) ⇒ <code>Object</code>
        * [.sendPlaceOrderTransaction(product, side, price, quantity, memo, sequence)](#module_client.OKChainClient+sendPlaceOrderTransaction) ⇒ <code>Object</code>
        * [.buildTransaction(msg, signMsg, memo, fee, sequenceNumber)](#module_client.OKChainClient+buildTransaction) ⇒ <code>Transaction</code>
        * [.sendTransaction(tx, mode)](#module_client.OKChainClient+sendTransaction) ⇒ <code>Object</code>
        * [.getAccount(address)](#module_client.OKChainClient+getAccount) ⇒ <code>Object</code>
        * [.getBalance(address)](#module_client.OKChainClient+getBalance) ⇒ <code>Object</code>
        * [.getBalanceFromAccountInfo(accountInfo)](#module_client.OKChainClient+getBalanceFromAccountInfo) ⇒ <code>Object</code>
        * [.getSequenceNumber(address)](#module_client.OKChainClient+getSequenceNumber) ⇒ <code>Number</code>
        * [.getSequenceNumberFromAccountInfo(accountInfo)](#module_client.OKChainClient+getSequenceNumberFromAccountInfo) ⇒ <code>Number</code>
        * [.getAccountNumberFromAccountInfo(accountInfo)](#module_client.OKChainClient+getAccountNumberFromAccountInfo) ⇒ <code>Number</code>
        * [.sendTokenIssueTransaction(symbol, whole_name, total_supply, mintable, description, sequenceNumber)](#module_client.OKChainClient+sendTokenIssueTransaction) ⇒ <code>Object</code>
        * [.sendTokenBurnTransaction(token, amount, memo, sequenceNumber)](#module_client.OKChainClient+sendTokenBurnTransaction) ⇒ <code>Object</code>
        * [.sendTokenMintTransaction(token, amount, memo, sequenceNumber)](#module_client.OKChainClient+sendTokenMintTransaction) ⇒ <code>Object</code>
        * [.sendRegisterDexOperatorTransaction(website, handling_fee_address, memo, sequenceNumber)](#module_client.OKChainClient+sendRegisterDexOperatorTransaction) ⇒ <code>Object</code>
        * [.sendListTokenPairTransaction(base_asset, quote_asset, init_price, memo, sequenceNumber)](#module_client.OKChainClient+sendListTokenPairTransaction) ⇒ <code>Object</code>
        * [.sendAddProductDepositTransaction(amount, product, memo, sequenceNumber)](#module_client.OKChainClient+sendAddProductDepositTransaction) ⇒ <code>Object</code>
        * [.sendWithdrawProductDepositTransaction(amount, product, memo, sequenceNumber)](#module_client.OKChainClient+sendWithdrawProductDepositTransaction) ⇒ <code>Object</code>

<a name="module_client.OKChainClient"></a>

### client.OKChainClient
The OKChain client.

**Kind**: static class of [<code>client</code>](#module_client)  

* [.OKChainClient](#module_client.OKChainClient)
    * [new exports.OKChainClient(url)](#new_module_client.OKChainClient_new)
    * [.setMode(mode)](#module_client.OKChainClient+setMode)
    * [.setAccountInfo(privateKey)](#module_client.OKChainClient+setAccountInfo) ⇒ <code>OKChainClient</code>
    * [.sendSendTransaction(to, amount, denom, memo, sequenceNumber)](#module_client.OKChainClient+sendSendTransaction) ⇒ <code>Object</code>
    * [.sendCancelOrderTransaction(orderId, memo, sequenceNumber)](#module_client.OKChainClient+sendCancelOrderTransaction) ⇒ <code>Object</code>
    * [.sendPlaceOrderTransaction(product, side, price, quantity, memo, sequence)](#module_client.OKChainClient+sendPlaceOrderTransaction) ⇒ <code>Object</code>
    * [.buildTransaction(msg, signMsg, memo, fee, sequenceNumber)](#module_client.OKChainClient+buildTransaction) ⇒ <code>Transaction</code>
    * [.sendTransaction(tx, mode)](#module_client.OKChainClient+sendTransaction) ⇒ <code>Object</code>
    * [.getAccount(address)](#module_client.OKChainClient+getAccount) ⇒ <code>Object</code>
    * [.getBalance(address)](#module_client.OKChainClient+getBalance) ⇒ <code>Object</code>
    * [.getBalanceFromAccountInfo(accountInfo)](#module_client.OKChainClient+getBalanceFromAccountInfo) ⇒ <code>Object</code>
    * [.getSequenceNumber(address)](#module_client.OKChainClient+getSequenceNumber) ⇒ <code>Number</code>
    * [.getSequenceNumberFromAccountInfo(accountInfo)](#module_client.OKChainClient+getSequenceNumberFromAccountInfo) ⇒ <code>Number</code>
    * [.getAccountNumberFromAccountInfo(accountInfo)](#module_client.OKChainClient+getAccountNumberFromAccountInfo) ⇒ <code>Number</code>
    * [.sendTokenIssueTransaction(symbol, whole_name, total_supply, mintable, description, sequenceNumber)](#module_client.OKChainClient+sendTokenIssueTransaction) ⇒ <code>Object</code>
    * [.sendTokenBurnTransaction(token, amount, memo, sequenceNumber)](#module_client.OKChainClient+sendTokenBurnTransaction) ⇒ <code>Object</code>
    * [.sendTokenMintTransaction(token, amount, memo, sequenceNumber)](#module_client.OKChainClient+sendTokenMintTransaction) ⇒ <code>Object</code>
    * [.sendRegisterDexOperatorTransaction(website, handling_fee_address, memo, sequenceNumber)](#module_client.OKChainClient+sendRegisterDexOperatorTransaction) ⇒ <code>Object</code>
    * [.sendListTokenPairTransaction(base_asset, quote_asset, init_price, memo, sequenceNumber)](#module_client.OKChainClient+sendListTokenPairTransaction) ⇒ <code>Object</code>
    * [.sendAddProductDepositTransaction(amount, product, memo, sequenceNumber)](#module_client.OKChainClient+sendAddProductDepositTransaction) ⇒ <code>Object</code>
    * [.sendWithdrawProductDepositTransaction(amount, product, memo, sequenceNumber)](#module_client.OKChainClient+sendWithdrawProductDepositTransaction) ⇒ <code>Object</code>

<a name="new_module_client.OKChainClient_new"></a>

#### new exports.OKChainClient(url)

| Param | Type |
| --- | --- |
| url | <code>string</code> |

<a name="module_client.OKChainClient+setMode"></a>

#### okChainClient.setMode(mode)
set the mode when send transaction

**Kind**: instance method of [<code>OKChainClient</code>](#module_client.OKChainClient)  

| Param | Type | Description |
| --- | --- | --- |
| mode | <code>string</code> | block|sync|async |

<a name="module_client.OKChainClient+setAccountInfo"></a>

#### okChainClient.setAccountInfo(privateKey) ⇒ <code>OKChainClient</code>
**Kind**: instance method of [<code>OKChainClient</code>](#module_client.OKChainClient)  

| Param | Type |
| --- | --- |
| privateKey | <code>string</code> |

<a name="module_client.OKChainClient+sendSendTransaction"></a>

#### okChainClient.sendSendTransaction(to, amount, denom, memo, sequenceNumber) ⇒ <code>Object</code>
Send SendTransaction.

**Kind**: instance method of [<code>OKChainClient</code>](#module_client.OKChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| to | <code>String</code> |  | To Address |
| amount | <code>Number</code> |  | Coin Quantity |
| denom | <code>String</code> |  | Coin Name |
| memo | <code>String</code> |  |  |
| sequenceNumber | <code>Number</code> | <code></code> |  |

<a name="module_client.OKChainClient+sendCancelOrderTransaction"></a>

#### okChainClient.sendCancelOrderTransaction(orderId, memo, sequenceNumber) ⇒ <code>Object</code>
Send CancelOrderTransaction.

**Kind**: instance method of [<code>OKChainClient</code>](#module_client.OKChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Default |
| --- | --- | --- |
| orderId | <code>String</code> |  |
| memo | <code>String</code> |  |
| sequenceNumber | <code>Number</code> | <code></code> |

<a name="module_client.OKChainClient+sendPlaceOrderTransaction"></a>

#### okChainClient.sendPlaceOrderTransaction(product, side, price, quantity, memo, sequence) ⇒ <code>Object</code>
Send PlaceOrderTransaction.

**Kind**: instance method of [<code>OKChainClient</code>](#module_client.OKChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Default |
| --- | --- | --- |
| product | <code>String</code> |  |
| side | <code>String</code> |  |
| price | <code>Number</code> |  |
| quantity | <code>Number</code> |  |
| memo | <code>Number</code> |  |
| sequence | <code>Number</code> | <code></code> |

<a name="module_client.OKChainClient+buildTransaction"></a>

#### okChainClient.buildTransaction(msg, signMsg, memo, fee, sequenceNumber) ⇒ <code>Transaction</code>
Build Transaction for sending to okchain.

**Kind**: instance method of [<code>OKChainClient</code>](#module_client.OKChainClient)  
**Returns**: <code>Transaction</code> - Transaction object  

| Param | Type | Default |
| --- | --- | --- |
| msg | <code>Object</code> |  |
| signMsg | <code>Object</code> |  |
| memo | <code>String</code> |  |
| fee | <code>String</code> | <code></code> |
| sequenceNumber | <code>Number</code> | <code></code> |

<a name="module_client.OKChainClient+sendTransaction"></a>

#### okChainClient.sendTransaction(tx, mode) ⇒ <code>Object</code>
send transaction to OKChain.

**Kind**: instance method of [<code>OKChainClient</code>](#module_client.OKChainClient)  
**Returns**: <code>Object</code> - response (success or fail)  

| Param | Type | Description |
| --- | --- | --- |
| tx | <code>signedTx</code> | signed Transaction object |
| mode | <code>Boolean</code> | use synchronous mode, optional |

<a name="module_client.OKChainClient+getAccount"></a>

#### okChainClient.getAccount(address) ⇒ <code>Object</code>
get account

**Kind**: instance method of [<code>OKChainClient</code>](#module_client.OKChainClient)  
**Returns**: <code>Object</code> - result  

| Param | Type |
| --- | --- |
| address | <code>String</code> |

<a name="module_client.OKChainClient+getBalance"></a>

#### okChainClient.getBalance(address) ⇒ <code>Object</code>
get balances from okchain

**Kind**: instance method of [<code>OKChainClient</code>](#module_client.OKChainClient)  
**Returns**: <code>Object</code> - result  

| Param | Type |
| --- | --- |
| address | <code>String</code> |

<a name="module_client.OKChainClient+getBalanceFromAccountInfo"></a>

#### okChainClient.getBalanceFromAccountInfo(accountInfo) ⇒ <code>Object</code>
get balances from accountInfo Object

**Kind**: instance method of [<code>OKChainClient</code>](#module_client.OKChainClient)  
**Returns**: <code>Object</code> - result  

| Param | Type | Description |
| --- | --- | --- |
| accountInfo | <code>Object</code> | optional address |

<a name="module_client.OKChainClient+getSequenceNumber"></a>

#### okChainClient.getSequenceNumber(address) ⇒ <code>Number</code>
get SequenceNumber from okchain

**Kind**: instance method of [<code>OKChainClient</code>](#module_client.OKChainClient)  
**Returns**: <code>Number</code> - sequenceNumber  

| Param | Type |
| --- | --- |
| address | <code>String</code> |

<a name="module_client.OKChainClient+getSequenceNumberFromAccountInfo"></a>

#### okChainClient.getSequenceNumberFromAccountInfo(accountInfo) ⇒ <code>Number</code>
get SequenceNumber from accountInfo Object

**Kind**: instance method of [<code>OKChainClient</code>](#module_client.OKChainClient)  
**Returns**: <code>Number</code> - sequenceNumber  

| Param | Type |
| --- | --- |
| accountInfo | <code>String</code> |

<a name="module_client.OKChainClient+getAccountNumberFromAccountInfo"></a>

#### okChainClient.getAccountNumberFromAccountInfo(accountInfo) ⇒ <code>Number</code>
get accountNumber from accountInfo Object

**Kind**: instance method of [<code>OKChainClient</code>](#module_client.OKChainClient)  
**Returns**: <code>Number</code> - accountNumber  

| Param | Type |
| --- | --- |
| accountInfo | <code>String</code> |

<a name="module_client.OKChainClient+sendTokenIssueTransaction"></a>

#### okChainClient.sendTokenIssueTransaction(symbol, whole_name, total_supply, mintable, description, sequenceNumber) ⇒ <code>Object</code>
Send TokenIssueTransaction.

**Kind**: instance method of [<code>OKChainClient</code>](#module_client.OKChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Required | Example |
| --- | --- | --- | --- |
| symbol | <code>String</code> | `true` | `"xxb"` |
| whole_name | <code>String</code> | `true` | `"xxb token"` |
| total_supply | <code>String</code>  `precision:8` | `true` | `"10000.00000000"` |
| mintable | <code>Boolean</code> | `true` | <code>false</code> |
| description | <code>String</code> | `true` |  |
| memo | <code>String</code> | `false` |  |
| sequenceNumber | <code>Number</code> | `false` |  |

<a name="module_client.OKChainClient+sendTokenBurnTransaction"></a>

#### okChainClient.sendTokenBurnTransaction(token, amount, memo, sequenceNumber) ⇒ <code>Object</code>
Send TokenBurnTransaction.

**Kind**: instance method of [<code>OKChainClient</code>](#module_client.OKChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Required | Example |
| --- | --- | --- | --- |
| token | <code>String</code> | `true` | `"xxb"` |
| amount | <code>String</code>`precision:8` | `true` | `"100.00000000"` |
| memo | <code>String</code> | `false` |  |
| sequenceNumber | <code>Number</code> | `false` | <code></code> |

<a name="module_client.OKChainClient+sendTokenMintTransaction"></a>

#### okChainClient.sendTokenMintTransaction(token, amount, memo, sequenceNumber) ⇒ <code>Object</code>
Send TokenMintTransaction.

**Kind**: instance method of [<code>OKChainClient</code>](#module_client.OKChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Required | Example |
| --- | --- | --- | --- |
| token | <code>String</code> | `true` | `"xxb"` |
| amount | <code>String</code>`precision:8` | `true` | `"100.00000000"` |
| memo | <code>String</code> | `false` |  |
| sequenceNumber | <code>Number</code> | `false` | <code></code> |

<a name="module_client.OKChainClient+sendRegisterDexOperatorTransaction"></a>

#### okChainClient.sendRegisterDexOperatorTransaction(website, handling_fee_address, memo, sequenceNumber) ⇒ <code>Object</code>
Send RegisterDexOperatorTransaction.

**Kind**: instance method of [<code>OKChainClient</code>](#module_client.OKChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Required | Example |
| --- | --- | --- | --- |
| website | <code>String</code> | `true` | `"http://test.json"` |
| handling_fee_address | <code>String</code> | `true` | `okchain address` eg.`"okchain17xpfvakm2amg962yls6f84z3kell8c5ljresa7"` |
| memo | <code>String</code> | `false` |  |
| sequenceNumber | <code>Number</code> | `false` | <code></code> |

<a name="module_client.OKChainClient+sendListTokenPairTransaction"></a>

#### okChainClient.sendListTokenPairTransaction(base_asset, quote_asset, init_price, memo, sequenceNumber) ⇒ <code>Object</code>
Send ListTokenPairTransaction.

**Kind**: instance method of [<code>OKChainClient</code>](#module_client.OKChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Required | Example |
| --- | --- | --- | --- |
| base_asset | <code>String</code> | `true` | `"tbtc-edc"` |
| quote_asset | <code>String</code> | `true` | `"tusdk-d42"` |
| init_price | <code>String</code>`precision:8` | `true` | `"8000.01000000"` |
| memo | <code>String</code> | `false` |  |
| sequenceNumber | <code>Number</code> | `false` | <code></code> |

<a name="module_client.OKChainClient+sendAddProductDepositTransaction"></a>

#### okChainClient.sendAddProductDepositTransaction(amount, product, memo, sequenceNumber) ⇒ <code>Object</code>
Send AddProductDepositTransaction.

**Kind**: instance method of [<code>OKChainClient</code>](#module_client.OKChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Required | Example |
| --- | --- | --- | --- |
| amount | <code>String</code>`precision:8` | `true` | `default okt`  eg.`"50.00000000"` |
| product | <code>String</code> | `true` | `"tbtc-edc_tusdk-d42"` |
| memo | <code>String</code> | `false` |  |
| sequenceNumber | <code>Number</code> | `false` | <code></code> |

<a name="module_client.OKChainClient+sendWithdrawProductDepositTransaction"></a>

#### okChainClient.sendWithdrawProductDepositTransaction(amount, product, memo, sequenceNumber) ⇒ <code>Object</code>
Send WithdrawProductDepositTransaction.

**Kind**: instance method of [<code>OKChainClient</code>](#module_client.OKChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Required | Example |
| --- | --- | --- | --- |
| amount | <code>String</code>`precision:8` | `true` | `default okt`  eg.`"40.00000000"` |
| product | <code>String</code> | `true` | `"tbtc-edc_tusdk-d42"` |
| memo | <code>String</code> | `false` |  |
| sequenceNumber | <code>Number</code> | `false` | <code></code> |

<a name="module_crypto"></a>

## crypto

* [crypto](#module_crypto)
    * [.decodeAddressToBuffer](#module_crypto.decodeAddressToBuffer)
    * [.validateAddress](#module_crypto.validateAddress) ⇒ <code>boolean</code>
    * [.encodeAddressToBech32](#module_crypto.encodeAddressToBech32) ⇒ <code>string</code>
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
| publicKeyHex | <code>string</code> | publicKey hexstring |
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

| Param | Type |
| --- | --- |
| mnemonic | <code>string</code> |

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

