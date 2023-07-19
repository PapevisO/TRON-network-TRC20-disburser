const { WALLET_ADDRESS } = require("./libs/creds")
const { USDT } = require("./libs/tronweb/smart_contract")
const { ratelimitDelay } = require("./libs/utils")

async function application() {
  console.log('Cold wallet address:', WALLET_ADDRESS)

  await USDT.balanceOf(WALLET_ADDRESS)
    .then(el => console.log('Cold wallet balance:', el.toString()))
    .catch(err => console.error(err))

  await ratelimitDelay()

  await USDT.symbol()
    .then(el => console.log('Currency symbol:', el.toString()))
    .catch(err => console.error(err))

  await ratelimitDelay()

  await USDT.decimals()
    .then(el => console.log('Currency contract decimals:', el.toString()))
    .catch(err => console.error(err))
}

application()
