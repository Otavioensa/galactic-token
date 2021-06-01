const GltkTokenSale = artifacts.require("GltkTokenSale");

contract.only('GltkTokenSale', (accounts) => {
  let gltkTokenSale
  it('initializes the contract with correct values', async () => {
    gltkTokenSale = await GltkTokenSale.deployed()

    const address = gltkTokenSale.address
    const tokenContract = await gltkTokenSale.tokenContract()

    assert.notEqual(address, '', 'has contract address')
    assert.notEqual(tokenContract, '', 'has token contract')
  })
})