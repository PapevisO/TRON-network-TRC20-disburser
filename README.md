# TRON network TRC-20 disburser application

## Prerequisites

Node 16+ (not tested with older versions)
Yarn

If using Node Version Manager locally, call:
`nvm use 16`

Make sure yarn is installed, probably like so
`npm install -g yarn`

Make sure you install Node module dependencies
`yarn install`

## Using

1. Generate a key (or import an already generated if you know what you are doing and how). To generate by means of the app:

`node generate.js`

The example of output is provided in the `key.json.example`

``` js
{
  privateKey: STRING(64),
  publicKey: STRING(130),
  address: {
    base58: STRING(34),
    hex: STRING(42)
  }
}
```

Paste the output to `key.json`.
Note `address.base58` matches the pattern 'T[a-zA-Z-0-9]{33}' and is a public wallet address.

2. Make sure you transfer a USDT amount to the generated/imported wallet.
Note, you can find the USDT contract address in:
'libs/tronweb/smart_contract.js'

3. Specify the amounts and the wallets to disburse funds to in `disburse.json`.
Check the example in `disburse.json.example`

``` js
[
  {
    "recipient": STRING(34),
    "amount": DECIMAL(upto 6 decimal points),
    "currency": "USDT"
  },
  {
    "recipient": STRING(34),
    "amount": DECIMAL(upto 6 decimal points),
    "currency": "USDT"
  }
]
```

Please specify a currency literally `"USDT"` otherwise validator will raise an exception.
The number is espected to be a decimal with upto 6 decimal points or with no decimal points at all.
The script will normalize the value under the hood.
The disburse targets are objects of a json array splic by commas, no comma needed if it is the only object, e.g. you are sending to the only recipient.

4. Make sure to send sufficient TRX for all disburse transactions.
Every transaction to a recipient could take upto 30 TRX, sometimes it can be more.

5. Call the disburse script, or customize it for your needs,

`node verifyBalanceAndSend.js`

The output will return the transaction hashes that you can later provide as a proof of transaction.
