const GltkTokenSale = artifacts.require("GltkTokenSale");
const GalacticToken = artifacts.require("GalacticToken");

contract('GltkTokenSale', (accounts) => {
  let gltkTokenSale
  let gltkToken
  const originalTokenPrice = 1000000000000000
  const buyer = accounts[1]
  const admin = accounts[0]
  const numberOfTokens = 10
  // 75% of the total token supply
  const tokensToSell = 750000
  it('initializes the contract with correct values', async () => {
    gltkTokenSale = await GltkTokenSale.deployed()
    gltkToken = await GalacticToken.deployed()

    // 0.001 ether
    const originalTokenPrice = 1000000000000000

    const address = gltkTokenSale.address
    const tokenContract = await gltkTokenSale.tokenContract()
    const tokenPrice = await gltkTokenSale.tokenPrice()

    assert.notEqual(address, '', 'has contract address')
    assert.notEqual(tokenContract, '', 'has token contract')
    assert.equal(tokenPrice, originalTokenPrice)
  })

  it('facilitates token buying', async () => {
    // allocates 75% of tokens to token sale
    const transferReceipt = await gltkToken.transfer(gltkTokenSale.address, tokensToSell, { from: admin })
    const tokenSaleBalance = await gltkToken.balanceOf(gltkTokenSale.address)
    assert.equal(tokenSaleBalance.toNumber(), tokensToSell, 'token sale owns 750.000 tokens')

    // amount of ether (wei) sent to buy token
    // buyer buys 10 tokenszz
    const value = numberOfTokens * originalTokenPrice
    const receipt = await gltkTokenSale.buyTokens(numberOfTokens, { from: buyer, value })
    assert.equal(receipt.logs[0].event, 'Sell', 'should be sell event')
    assert.equal(receipt.logs[0].args._buyer, buyer, 'logs the account that purchased the tokens')
    assert.equal(receipt.logs[0].args._amount, numberOfTokens, 'logs the number of tokens purchased')

    // buyer owns new balance
    const buyerBalance = await gltkToken.balanceOf(buyer)
    assert.equal(buyerBalance.toNumber(), numberOfTokens, 'buyer owns 10 tokens')

    // increases number of tokens sold
    const tokensSold = await gltkTokenSale.tokensSold()
    assert.equal(tokensSold, numberOfTokens, 'increments the number of tokens sold')

    // user has insufficient balance
    let insufficientBalanceErrorMessage
    try {
      await gltkTokenSale.buyTokens(numberOfTokens, { from: buyer, value: 1000 })
    } catch (error) {
      insufficientBalanceErrorMessage = error.message
    }
    assert.equal(insufficientBalanceErrorMessage.indexOf('revert') > 0, true, 'msg.value must be equal number of tokens in wei')

    // token sale has not enough tokens to sell
    let insufficientTokensErrorMessage
    try {
      await gltkTokenSale.buyTokens(tokensToSell, { from: buyer, value })
    } catch (error) {
      insufficientTokensErrorMessage = error.message
    }

    assert.equal(insufficientTokensErrorMessage.indexOf('revert') > 0, true, 'it can only buy up to 750000 tokens')
  })

  it('ends token sale', async () => {
    // try to end sale from account other than admin
    let endSaleErrorMessage
    try {
      await gltkTokenSale.endSale({ from: buyer })
    } catch (error) {
      endSaleErrorMessage = error.message
    }
    assert.equal(endSaleErrorMessage.indexOf('revert') > 0, true, 'must be admin to end sale')

    //end sale as admin
    const result = await gltkTokenSale.endSale({ from: admin })

    const adminBalance = await gltkToken.balanceOf(admin)
    console.log(adminBalance.toNumber());
    const tkPrice = await gltkTokenSale.tokenPrice()
    console.log(tkPrice);
  })
})