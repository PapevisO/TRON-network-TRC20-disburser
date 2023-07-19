const { WALLET_ADDRESS } = require("./libs/creds")
const { totalNormalizedAmount, disburseRecords } = require("./libs/disburse")
const { USDT } = require("./libs/tronweb/smart_contract")
const { ratelimitDelay } = require("./libs/utils")

async function application() {
  console.log('Sender (cold wallet) address:', WALLET_ADDRESS)

  await ratelimitDelay()

  await USDT.balanceOf(WALLET_ADDRESS)
    .then(initialBalance => {
      console.log('Sender (cold wallet) prev balance:',
        initialBalance.toNumber(),
        '(normalized to contract decimals)')

      if (initialBalance.toNumber() < totalNormalizedAmount) {
        console.error('sum to disburse:',
          totalNormalizedAmount,
          '(normalized to contract decimals)')
        throw new Error('Error: initial balance is either insufficient or failed to verify')
      }
    })
    .catch(err => {
      console.error(err)

      throw new Error(err)
    })

  await ratelimitDelay()

  await USDT.symbol()
    .then(el => console.log('Currency symbol:', el.toString()))
    .catch(err => console.error(err))

  disburseRecords.forEach(async record => {
    await ratelimitDelay()

    console.log('normalizedAmount (hex):', record.normalizedAmount)
    console.log('humanizedAmount:', record.humanizedAmount)
    await USDT.transfer(record.recipientAddress, record.normalizedAmount)
      .then(el => console.log('Send transaction call return:', el.toString()))
      .catch(err => console.error(err))
  })
}

application()
