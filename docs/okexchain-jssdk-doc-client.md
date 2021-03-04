<a name="module_client"></a>

## client

* [client](#module_client)
    * [.OKEXChainClient](#module_client.OKEXChainClient)
        * [new exports.OKEXChainClient(url, config)](#new_module_client.OKEXChainClient_new)
        * [.setMode(mode)](#module_client.OKEXChainClient+setMode)
        * [.setChainId(id)](#module_client.OKEXChainClient+setChainId)
        * [.setAddress(address)](#module_client.OKEXChainClient+setAddress)
        * [.setAccountInfo(privateKey)](#module_client.OKEXChainClient+setAccountInfo) ⇒ <code>OKEXChainClient</code>
        * [.sendSendTransaction(to, amount, denom, memo, sequenceNumber)](#module_client.OKEXChainClient+sendSendTransaction) ⇒ <code>Object</code>
        * [.sendCancelOrderTransaction(orderId, memo, sequenceNumber)](#module_client.OKEXChainClient+sendCancelOrderTransaction) ⇒ <code>Object</code>
        * [.sendPlaceOrderTransaction(product, side, price, quantity, memo, sequence)](#module_client.OKEXChainClient+sendPlaceOrderTransaction) ⇒ <code>Object</code>
        * [.buildTransaction(msg, signMsg, memo, fee, sequenceNumber)](#module_client.OKEXChainClient+buildTransaction) ⇒ <code>Transaction</code>
        * [.sendTransaction(tx, mode)](#module_client.OKEXChainClient+sendTransaction) ⇒ <code>Object</code>
        * [.getAccount(address)](#module_client.OKEXChainClient+getAccount) ⇒ <code>Object</code>
        * [.getBalance(address)](#module_client.OKEXChainClient+getBalance) ⇒ <code>Object</code>
        * [.getBalanceFromAccountInfo(accountInfo)](#module_client.OKEXChainClient+getBalanceFromAccountInfo) ⇒ <code>Object</code>
        * [.getSequenceNumber(address)](#module_client.OKEXChainClient+getSequenceNumber) ⇒ <code>Number</code>
        * [.getSequenceNumberFromAccountInfo(accountInfo)](#module_client.OKEXChainClient+getSequenceNumberFromAccountInfo) ⇒ <code>Number</code>
        * [.getAccountNumberFromAccountInfo(accountInfo)](#module_client.OKEXChainClient+getAccountNumberFromAccountInfo) ⇒ <code>Number</code>
        * [.sendTokenIssueTransaction(symbol, whole_name, total_supply, mintable, description, memo, sequenceNumber)](#module_client.OKEXChainClient+sendTokenIssueTransaction) ⇒ <code>Object</code>
        * [.sendTokenBurnTransaction(token, amount, memo, sequenceNumber)](#module_client.OKEXChainClient+sendTokenBurnTransaction) ⇒ <code>Object</code>
        * [.sendTokenMintTransaction(token, amount, memo, sequenceNumber)](#module_client.OKEXChainClient+sendTokenMintTransaction) ⇒ <code>Object</code>
        * [.sendRegisterDexOperatorTransaction(website, handling_fee_address, memo, sequenceNumber)](#module_client.OKEXChainClient+sendRegisterDexOperatorTransaction) ⇒ <code>Object</code>
        * [.sendListTokenPairTransaction(base_asset, quote_asset, init_price, memo, sequenceNumber)](#module_client.OKEXChainClient+sendListTokenPairTransaction) ⇒ <code>Object</code>
        * [.sendAddProductDepositTransaction(amount, product, memo, sequenceNumber)](#module_client.OKEXChainClient+sendAddProductDepositTransaction) ⇒ <code>Object</code>
        * [.sendWithdrawProductDepositTransaction(amount, product, memo, sequenceNumber)](#module_client.OKEXChainClient+sendWithdrawProductDepositTransaction) ⇒ <code>Object</code>
        * [.sendAddLiquidityTransaction(min_liquidity, max_base_amount, base_token, quote_amount, quote_token, deadline, memo, sequenceNumber)](#module_client.OKEXChainClient+sendAddLiquidityTransaction) ⇒ <code>Object</code>
        * [.sendRemoveLiquidityTransaction(liquidity, min_base_amount, base_token, min_quote_amount, quote_token, deadline, memo, sequenceNumber)](#module_client.OKEXChainClient+sendRemoveLiquidityTransaction) ⇒ <code>Object</code>
        * [.sendCreateExchangeTransaction(Token0Name, Token1Name, memo, sequenceNumber)](#module_client.OKEXChainClient+sendCreateExchangeTransaction) ⇒ <code>Object</code>
        * [.sendSwapTokenTransaction(sold_token_amount, sold_token, min_bought_token_amount, bought_token, deadline, recipient, memo, sequenceNumber)](#module_client.OKEXChainClient+sendSwapTokenTransaction) ⇒ <code>Object</code>
        * [.sendFarmCreatePoolTransaction(pool_name, min_lock_denom, min_lock_amount, yield_symbol, memo, sequenceNumber)](#module_client.OKEXChainClient+sendFarmCreatePoolTransaction) ⇒ <code>Object</code>
        * [.sendFarmDestroyPoolTransaction(pool_name, memo, sequenceNumber)](#module_client.OKEXChainClient+sendFarmDestroyPoolTransaction) ⇒ <code>Object</code>
        * [.sendFarmProvideTransaction(pool_name, provide_denom, provide_amount, yielded_per_block, start_height, memo, sequenceNumber)](#module_client.OKEXChainClient+sendFarmProvideTransaction) ⇒ <code>Object</code>
        * [.sendFarmLockTransaction(pool_name, lock_denom, lock_amount, memo, sequenceNumber)](#module_client.OKEXChainClient+sendFarmLockTransaction) ⇒ <code>Object</code>
        * [.sendFarmUnLockTransaction(pool_name, unlock_denom, unlock_amount, memo, sequenceNumber)](#module_client.OKEXChainClient+sendFarmUnLockTransaction) ⇒ <code>Object</code>
        * [.sendFarmClaimTransaction(pool_name, memo, sequenceNumber)](#module_client.OKEXChainClient+sendFarmClaimTransaction) ⇒ <code>Object</code>

<a name="module_client.OKEXChainClient"></a>

### client.OKEXChainClient
The OKEXChain client.

**Kind**: static class of [<code>client</code>](#module_client)  

* [.OKEXChainClient](#module_client.OKEXChainClient)
    * [new exports.OKEXChainClient(url, config)](#new_module_client.OKEXChainClient_new)
    * [.setMode(mode)](#module_client.OKEXChainClient+setMode)
    * [.setChainId(id)](#module_client.OKEXChainClient+setChainId)
    * [.setAddress(address)](#module_client.OKEXChainClient+setAddress)
    * [.setAccountInfo(privateKey)](#module_client.OKEXChainClient+setAccountInfo) ⇒ <code>OKEXChainClient</code>
    * [.sendSendTransaction(to, amount, denom, memo, sequenceNumber)](#module_client.OKEXChainClient+sendSendTransaction) ⇒ <code>Object</code>
    * [.sendCancelOrderTransaction(orderId, memo, sequenceNumber)](#module_client.OKEXChainClient+sendCancelOrderTransaction) ⇒ <code>Object</code>
    * [.sendPlaceOrderTransaction(product, side, price, quantity, memo, sequence)](#module_client.OKEXChainClient+sendPlaceOrderTransaction) ⇒ <code>Object</code>
    * [.buildTransaction(msg, signMsg, memo, fee, sequenceNumber)](#module_client.OKEXChainClient+buildTransaction) ⇒ <code>Transaction</code>
    * [.sendTransaction(tx, mode)](#module_client.OKEXChainClient+sendTransaction) ⇒ <code>Object</code>
    * [.getAccount(address)](#module_client.OKEXChainClient+getAccount) ⇒ <code>Object</code>
    * [.getBalance(address)](#module_client.OKEXChainClient+getBalance) ⇒ <code>Object</code>
    * [.getBalanceFromAccountInfo(accountInfo)](#module_client.OKEXChainClient+getBalanceFromAccountInfo) ⇒ <code>Object</code>
    * [.getSequenceNumber(address)](#module_client.OKEXChainClient+getSequenceNumber) ⇒ <code>Number</code>
    * [.getSequenceNumberFromAccountInfo(accountInfo)](#module_client.OKEXChainClient+getSequenceNumberFromAccountInfo) ⇒ <code>Number</code>
    * [.getAccountNumberFromAccountInfo(accountInfo)](#module_client.OKEXChainClient+getAccountNumberFromAccountInfo) ⇒ <code>Number</code>
    * [.sendTokenIssueTransaction(symbol, whole_name, total_supply, mintable, description, memo, sequenceNumber)](#module_client.OKEXChainClient+sendTokenIssueTransaction) ⇒ <code>Object</code>
    * [.sendTokenBurnTransaction(token, amount, memo, sequenceNumber)](#module_client.OKEXChainClient+sendTokenBurnTransaction) ⇒ <code>Object</code>
    * [.sendTokenMintTransaction(token, amount, memo, sequenceNumber)](#module_client.OKEXChainClient+sendTokenMintTransaction) ⇒ <code>Object</code>
    * [.sendRegisterDexOperatorTransaction(website, handling_fee_address, memo, sequenceNumber)](#module_client.OKEXChainClient+sendRegisterDexOperatorTransaction) ⇒ <code>Object</code>
    * [.sendListTokenPairTransaction(base_asset, quote_asset, init_price, memo, sequenceNumber)](#module_client.OKEXChainClient+sendListTokenPairTransaction) ⇒ <code>Object</code>
    * [.sendAddProductDepositTransaction(amount, product, memo, sequenceNumber)](#module_client.OKEXChainClient+sendAddProductDepositTransaction) ⇒ <code>Object</code>
    * [.sendWithdrawProductDepositTransaction(amount, product, memo, sequenceNumber)](#module_client.OKEXChainClient+sendWithdrawProductDepositTransaction) ⇒ <code>Object</code>
    * [.sendAddLiquidityTransaction(min_liquidity, max_base_amount, base_token, quote_amount, quote_token, deadline, memo, sequenceNumber)](#module_client.OKEXChainClient+sendAddLiquidityTransaction) ⇒ <code>Object</code>
    * [.sendRemoveLiquidityTransaction(liquidity, min_base_amount, base_token, min_quote_amount, quote_token, deadline, memo, sequenceNumber)](#module_client.OKEXChainClient+sendRemoveLiquidityTransaction) ⇒ <code>Object</code>
    * [.sendCreateExchangeTransaction(Token0Name, Token1Name, memo, sequenceNumber)](#module_client.OKEXChainClient+sendCreateExchangeTransaction) ⇒ <code>Object</code>
    * [.sendSwapTokenTransaction(sold_token_amount, sold_token, min_bought_token_amount, bought_token, deadline, recipient, memo, sequenceNumber)](#module_client.OKEXChainClient+sendSwapTokenTransaction) ⇒ <code>Object</code>
    * [.sendFarmCreatePoolTransaction(pool_name, min_lock_denom, min_lock_amount, yield_symbol, memo, sequenceNumber)](#module_client.OKEXChainClient+sendFarmCreatePoolTransaction) ⇒ <code>Object</code>
    * [.sendFarmDestroyPoolTransaction(pool_name, memo, sequenceNumber)](#module_client.OKEXChainClient+sendFarmDestroyPoolTransaction) ⇒ <code>Object</code>
    * [.sendFarmProvideTransaction(pool_name, provide_denom, provide_amount, yielded_per_block, start_height, memo, sequenceNumber)](#module_client.OKEXChainClient+sendFarmProvideTransaction) ⇒ <code>Object</code>
    * [.sendFarmLockTransaction(pool_name, lock_denom, lock_amount, memo, sequenceNumber)](#module_client.OKEXChainClient+sendFarmLockTransaction) ⇒ <code>Object</code>
    * [.sendFarmUnLockTransaction(pool_name, unlock_denom, unlock_amount, memo, sequenceNumber)](#module_client.OKEXChainClient+sendFarmUnLockTransaction) ⇒ <code>Object</code>
    * [.sendFarmClaimTransaction(pool_name, memo, sequenceNumber)](#module_client.OKEXChainClient+sendFarmClaimTransaction) ⇒ <code>Object</code>

<a name="new_module_client.OKEXChainClient_new"></a>

#### new exports.OKEXChainClient(url, config)

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> |  |
| config | <code>Object</code> | {     chainId: "okexchain-66" (mainnet, default) / "okexchain-65" (testnet)     relativePath: "/okexchain/v1" (mainnet, default) / "/okexchain-test/v1" (testnet)     isMainnet: true (mainnet) / false (other, default)     signer: external signer object, Object / null (default) } |

<a name="module_client.OKEXChainClient+setMode"></a>

#### okexChainClient.setMode(mode)
set the mode when send transaction

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  

| Param | Type | Description |
| --- | --- | --- |
| mode | <code>string</code> | block|sync|async |

<a name="module_client.OKEXChainClient+setChainId"></a>

#### okexChainClient.setChainId(id)
set the chainId when send transaction

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 

<a name="module_client.OKEXChainClient+setAddress"></a>

#### okexChainClient.setAddress(address)
set the address

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  

| Param | Type |
| --- | --- |
| address | <code>string</code> | 

<a name="module_client.OKEXChainClient+setAccountInfo"></a>

#### okexChainClient.setAccountInfo(privateKey) ⇒ <code>OKEXChainClient</code>
**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  

| Param | Type |
| --- | --- |
| privateKey | <code>string</code> | 

<a name="module_client.OKEXChainClient+sendSendTransaction"></a>

#### okexChainClient.sendSendTransaction(to, amount, denom, memo, sequenceNumber) ⇒ <code>Object</code>
Send SendTransaction.

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| to | <code>String</code> |  | To Address |
| amount | <code>Number</code> |  | Coin Quantity |
| denom | <code>String</code> |  | Coin Name |
| memo | <code>String</code> |  |  |
| sequenceNumber | <code>Number</code> | <code></code> |  |

<a name="module_client.OKEXChainClient+sendCancelOrderTransaction"></a>

#### okexChainClient.sendCancelOrderTransaction(orderId, memo, sequenceNumber) ⇒ <code>Object</code>
Send CancelOrderTransaction.

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Default |
| --- | --- | --- |
| orderId | <code>String</code> |  | 
| memo | <code>String</code> |  | 
| sequenceNumber | <code>Number</code> | <code></code> | 

<a name="module_client.OKEXChainClient+sendPlaceOrderTransaction"></a>

#### okexChainClient.sendPlaceOrderTransaction(product, side, price, quantity, memo, sequence) ⇒ <code>Object</code>
Send PlaceOrderTransaction.

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Default |
| --- | --- | --- |
| product | <code>String</code> |  | 
| side | <code>String</code> |  | 
| price | <code>Number</code> |  | 
| quantity | <code>Number</code> |  | 
| memo | <code>Number</code> |  | 
| sequence | <code>Number</code> | <code></code> | 

<a name="module_client.OKEXChainClient+buildTransaction"></a>

#### okexChainClient.buildTransaction(msg, signMsg, memo, fee, sequenceNumber) ⇒ <code>Transaction</code>
Build Transaction for sending to okexchain.

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Transaction</code> - Transaction object  

| Param | Type | Default |
| --- | --- | --- |
| msg | <code>Object</code> |  | 
| signMsg | <code>Object</code> |  | 
| memo | <code>String</code> |  | 
| fee | <code>String</code> | <code></code> | 
| sequenceNumber | <code>Number</code> | <code></code> | 

<a name="module_client.OKEXChainClient+sendTransaction"></a>

#### okexChainClient.sendTransaction(tx, mode) ⇒ <code>Object</code>
send transaction to OKEXChain.

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Object</code> - response (success or fail)  

| Param | Type | Description |
| --- | --- | --- |
| tx | <code>signedTx</code> | signed Transaction object |
| mode | <code>Boolean</code> | use synchronous mode, optional |

<a name="module_client.OKEXChainClient+getAccount"></a>

#### okexChainClient.getAccount(address) ⇒ <code>Object</code>
get account

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Object</code> - result  

| Param | Type |
| --- | --- |
| address | <code>String</code> | 

<a name="module_client.OKEXChainClient+getBalance"></a>

#### okexChainClient.getBalance(address) ⇒ <code>Object</code>
get balances from OKEXChain

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Object</code> - result  

| Param | Type |
| --- | --- |
| address | <code>String</code> | 

<a name="module_client.OKEXChainClient+getBalanceFromAccountInfo"></a>

#### okexChainClient.getBalanceFromAccountInfo(accountInfo) ⇒ <code>Object</code>
get balances from accountInfo Object

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Object</code> - result  

| Param | Type | Description |
| --- | --- | --- |
| accountInfo | <code>Object</code> | optional address |

<a name="module_client.OKEXChainClient+getSequenceNumber"></a>

#### okexChainClient.getSequenceNumber(address) ⇒ <code>Number</code>
get SequenceNumber from OKEXChain

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Number</code> - sequenceNumber  

| Param | Type |
| --- | --- |
| address | <code>String</code> | 

<a name="module_client.OKEXChainClient+getSequenceNumberFromAccountInfo"></a>

#### okexChainClient.getSequenceNumberFromAccountInfo(accountInfo) ⇒ <code>Number</code>
get SequenceNumber from accountInfo Object

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Number</code> - sequenceNumber  

| Param | Type |
| --- | --- |
| accountInfo | <code>String</code> | 

<a name="module_client.OKEXChainClient+getAccountNumberFromAccountInfo"></a>

#### okexChainClient.getAccountNumberFromAccountInfo(accountInfo) ⇒ <code>Number</code>
get accountNumber from accountInfo Object

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Number</code> - accountNumber  

| Param | Type |
| --- | --- |
| accountInfo | <code>String</code> | 

<a name="module_client.OKEXChainClient+sendTokenIssueTransaction"></a>

#### okexChainClient.sendTokenIssueTransaction(symbol, whole_name, total_supply, mintable, description, memo, sequenceNumber) ⇒ <code>Object</code>
Send TokenIssueTransaction.

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Default |
| --- | --- | --- |
| symbol | <code>String</code> |  | 
| whole_name | <code>String</code> |  | 
| total_supply | <code>String</code> |  | 
| mintable | <code>Boolean</code> | <code>false</code> | 
| description | <code>String</code> |  | 
| memo | <code>String</code> |  | 
| sequenceNumber | <code>Number</code> | <code></code> | 

<a name="module_client.OKEXChainClient+sendTokenBurnTransaction"></a>

#### okexChainClient.sendTokenBurnTransaction(token, amount, memo, sequenceNumber) ⇒ <code>Object</code>
Send TokenBurnTransaction.

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Default |
| --- | --- | --- |
| token | <code>String</code> |  | 
| amount | <code>String</code> |  | 
| memo | <code>String</code> |  | 
| sequenceNumber | <code>Number</code> | <code></code> | 

<a name="module_client.OKEXChainClient+sendTokenMintTransaction"></a>

#### okexChainClient.sendTokenMintTransaction(token, amount, memo, sequenceNumber) ⇒ <code>Object</code>
Send TokenMintTransaction.

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Default |
| --- | --- | --- |
| token | <code>String</code> |  | 
| amount | <code>String</code> |  | 
| memo | <code>String</code> |  | 
| sequenceNumber | <code>Number</code> | <code></code> | 

<a name="module_client.OKEXChainClient+sendRegisterDexOperatorTransaction"></a>

#### okexChainClient.sendRegisterDexOperatorTransaction(website, handling_fee_address, memo, sequenceNumber) ⇒ <code>Object</code>
Send RegisterDexOperatorTransaction.

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Default |
| --- | --- | --- |
| website | <code>String</code> |  | 
| handling_fee_address | <code>String</code> |  | 
| memo | <code>String</code> |  | 
| sequenceNumber | <code>Number</code> | <code></code> | 

<a name="module_client.OKEXChainClient+sendListTokenPairTransaction"></a>

#### okexChainClient.sendListTokenPairTransaction(base_asset, quote_asset, init_price, memo, sequenceNumber) ⇒ <code>Object</code>
Send ListTokenPairTransaction.

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Default |
| --- | --- | --- |
| base_asset | <code>String</code> |  | 
| quote_asset | <code>String</code> |  | 
| init_price | <code>String</code> |  | 
| memo | <code>String</code> |  | 
| sequenceNumber | <code>Number</code> | <code></code> | 

<a name="module_client.OKEXChainClient+sendAddProductDepositTransaction"></a>

#### okexChainClient.sendAddProductDepositTransaction(amount, product, memo, sequenceNumber) ⇒ <code>Object</code>
Send AddProductDepositTransaction.

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Default |
| --- | --- | --- |
| amount | <code>String</code> |  | 
| product | <code>String</code> |  | 
| memo | <code>String</code> |  | 
| sequenceNumber | <code>Number</code> | <code></code> | 

<a name="module_client.OKEXChainClient+sendWithdrawProductDepositTransaction"></a>

#### okexChainClient.sendWithdrawProductDepositTransaction(amount, product, memo, sequenceNumber) ⇒ <code>Object</code>
Send WithdrawProductDepositTransaction.

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Default |
| --- | --- | --- |
| amount | <code>String</code> |  | 
| product | <code>String</code> |  | 
| memo | <code>String</code> |  | 
| sequenceNumber | <code>Number</code> | <code></code> | 

<a name="module_client.OKEXChainClient+sendAddLiquidityTransaction"></a>

#### okexChainClient.sendAddLiquidityTransaction(min_liquidity, max_base_amount, base_token, quote_amount, quote_token, deadline, memo, sequenceNumber) ⇒ <code>Object</code>
Send AddLiquidityTransaction.

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Default |
| --- | --- | --- |
| min_liquidity | <code>Number</code> |  | 
| max_base_amount | <code>Number</code> |  | 
| base_token | <code>String</code> |  | 
| quote_amount | <code>Number</code> |  | 
| quote_token | <code>String</code> |  | 
| deadline | <code>String</code> |  | 
| memo | <code>String</code> |  | 
| sequenceNumber | <code>Number</code> | <code></code> | 

<a name="module_client.OKEXChainClient+sendRemoveLiquidityTransaction"></a>

#### okexChainClient.sendRemoveLiquidityTransaction(liquidity, min_base_amount, base_token, min_quote_amount, quote_token, deadline, memo, sequenceNumber) ⇒ <code>Object</code>
Send RemoveLiquidityTransaction.

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Default |
| --- | --- | --- |
| liquidity | <code>Number</code> |  | 
| min_base_amount | <code>Number</code> |  | 
| base_token | <code>String</code> |  | 
| min_quote_amount | <code>Number</code> |  | 
| quote_token | <code>String</code> |  | 
| deadline | <code>String</code> |  | 
| memo | <code>String</code> |  | 
| sequenceNumber | <code>Number</code> | <code></code> | 

<a name="module_client.OKEXChainClient+sendCreateExchangeTransaction"></a>

#### okexChainClient.sendCreateExchangeTransaction(Token0Name, Token1Name, memo, sequenceNumber) ⇒ <code>Object</code>
Send CreateExchangeTransaction.

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Default |
| --- | --- | --- |
| Token0Name | <code>String</code> |  | 
| Token1Name | <code>String</code> |  | 
| memo | <code>String</code> |  | 
| sequenceNumber | <code>Number</code> | <code></code> | 

<a name="module_client.OKEXChainClient+sendSwapTokenTransaction"></a>

#### okexChainClient.sendSwapTokenTransaction(sold_token_amount, sold_token, min_bought_token_amount, bought_token, deadline, recipient, memo, sequenceNumber) ⇒ <code>Object</code>
Send SwapTokenTransaction.

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Default |
| --- | --- | --- |
| sold_token_amount | <code>Number</code> |  | 
| sold_token | <code>String</code> |  | 
| min_bought_token_amount | <code>Number</code> |  | 
| bought_token | <code>String</code> |  | 
| deadline | <code>String</code> |  | 
| recipient | <code>String</code> |  | 
| memo | <code>String</code> |  | 
| sequenceNumber | <code>Number</code> | <code></code> | 

<a name="module_client.OKEXChainClient+sendFarmCreatePoolTransaction"></a>

#### okexChainClient.sendFarmCreatePoolTransaction(pool_name, min_lock_denom, min_lock_amount, yield_symbol, memo, sequenceNumber) ⇒ <code>Object</code>
Send FarmCreatePoolTransaction.

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Default |
| --- | --- | --- |
| pool_name | <code>String</code> |  | 
| min_lock_denom | <code>String</code> |  | 
| min_lock_amount | <code>Number</code> |  | 
| yield_symbol | <code>String</code> |  | 
| memo | <code>String</code> |  | 
| sequenceNumber | <code>Number</code> | <code></code> | 

<a name="module_client.OKEXChainClient+sendFarmDestroyPoolTransaction"></a>

#### okexChainClient.sendFarmDestroyPoolTransaction(pool_name, memo, sequenceNumber) ⇒ <code>Object</code>
Send FarmDestroyPoolTransaction.

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Default |
| --- | --- | --- |
| pool_name | <code>String</code> |  | 
| memo | <code>String</code> |  | 
| sequenceNumber | <code>Number</code> | <code></code> | 

<a name="module_client.OKEXChainClient+sendFarmProvideTransaction"></a>

#### okexChainClient.sendFarmProvideTransaction(pool_name, provide_denom, provide_amount, yielded_per_block, start_height, memo, sequenceNumber) ⇒ <code>Object</code>
Send FarmProvideTransaction.

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Default |
| --- | --- | --- |
| pool_name | <code>String</code> |  | 
| provide_denom | <code>String</code> |  | 
| provide_amount | <code>Number</code> |  | 
| yielded_per_block | <code>Number</code> |  | 
| start_height | <code>String</code> |  | 
| memo | <code>String</code> |  | 
| sequenceNumber | <code>Number</code> | <code></code> | 

<a name="module_client.OKEXChainClient+sendFarmLockTransaction"></a>

#### okexChainClient.sendFarmLockTransaction(pool_name, lock_denom, lock_amount, memo, sequenceNumber) ⇒ <code>Object</code>
Send FarmLockTransaction.

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Default |
| --- | --- | --- |
| pool_name | <code>String</code> |  | 
| lock_denom | <code>String</code> |  | 
| lock_amount | <code>Number</code> |  | 
| memo | <code>String</code> |  | 
| sequenceNumber | <code>Number</code> | <code></code> | 

<a name="module_client.OKEXChainClient+sendFarmUnLockTransaction"></a>

#### okexChainClient.sendFarmUnLockTransaction(pool_name, unlock_denom, unlock_amount, memo, sequenceNumber) ⇒ <code>Object</code>
Send FarmUnLockTransaction.

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Default |
| --- | --- | --- |
| pool_name | <code>String</code> |  | 
| unlock_denom | <code>String</code> |  | 
| unlock_amount | <code>Number</code> |  | 
| memo | <code>String</code> |  | 
| sequenceNumber | <code>Number</code> | <code></code> | 

<a name="module_client.OKEXChainClient+sendFarmClaimTransaction"></a>

#### okexChainClient.sendFarmClaimTransaction(pool_name, memo, sequenceNumber) ⇒ <code>Object</code>
Send FarmClaimTransaction.

**Kind**: instance method of [<code>OKEXChainClient</code>](#module_client.OKEXChainClient)  
**Returns**: <code>Object</code> - response  

| Param | Type | Default |
| --- | --- | --- |
| pool_name | <code>String</code> |  | 
| memo | <code>String</code> |  | 
| sequenceNumber | <code>Number</code> | <code></code> | 

