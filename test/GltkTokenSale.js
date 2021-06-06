const GltkTokenSale = artifacts.require("GltkTokenSale");

contract('GltkTokenSale', (accounts) => {
  let gltkTokenSale
  it('initializes the contract with correct values', async () => {
    gltkTokenSale = await GltkTokenSale.deployed()

    // 0.001 ether
    const expectedTokenPrice = 1000000000000000

    const address = gltkTokenSale.address
    const tokenContract = await gltkTokenSale.tokenContract()
    const tokenPrice = await gltkTokenSale.tokenPrice()

    assert.notEqual(address, '', 'has contract address')
    assert.notEqual(tokenContract, '', 'has token contract')
    assert.equal(tokenPrice, expectedTokenPrice)
  })
})