const GalacticToken = artifacts.require("GalacticToken");

contract('GalacticToken', (accounts) => {
  it('initializes the contract with correct values', async () => {
    const galacticToken = await GalacticToken.deployed()
    const tokenName = await galacticToken.name()
    const tokenSymbol = await galacticToken.symbol()
    const standard = await galacticToken.standard()
    assert.equal(tokenName, 'Galactic Token', 'has the correct name')
    assert.equal(tokenSymbol, 'GLTK', 'has the correct symbol')
    assert.equal(standard, 'Galactic Token v1.0', 'has the correct version')
  })

  it('allocates the innital supply upon deployment', async () => {
    const galacticToken = await GalacticToken.deployed()

    const totalSupply = await galacticToken.totalSupply()
    const totalSupplyUnits = totalSupply.toNumber()
    const adminBalance = await galacticToken.balanceOf(accounts[0])
    const totalBalance = adminBalance.toNumber()
    assert.equal(totalSupplyUnits, 1000000, 'Sets total supply to 1000000')
    assert.equal(totalBalance, 1000000, 'Allocates all tokens to admin account')
  })

  it('transfers token', async () => {
    const galacticToken = await GalacticToken.deployed()
    const accountBalance = await galacticToken.balanceOf(accounts[1])
    const receipt = await galacticToken.transfer(accounts[1], 50, { from: accounts[0] })
    const newBalance =  await galacticToken.balanceOf(accounts[1])
    // doesnt emit transfer event
    const fakeTransfer = await galacticToken.transfer.call(accounts[1], 50, { from: accounts[0] })
    assert.equal(fakeTransfer, true)
    assert.equal(newBalance.toNumber(), 50)
  })

  it('approves tokens for delegated transfer', async () => {
    const galacticToken = await GalacticToken.deployed()

    // doesn't emit event/create transaction when using call
    // from = msg.sender
    const fakeApproval = await galacticToken.approve.call(accounts[1], 100, { from: accounts[0] })
    assert.equal(fakeApproval, true, 'it returns true')

    // emit approval
    const approvalReceipt = await galacticToken.approve(accounts[1], 100)
    assert.equal(approvalReceipt.logs[0].event, 'Approval')
    assert.equal(approvalReceipt.logs[0].args._owner, accounts[0])
    assert.equal(approvalReceipt.logs[0].args._spender, accounts[1])
    assert.equal(approvalReceipt.logs[0].args._value, 100)

    const allowance = await galacticToken.allowance(accounts[0], accounts[1])
    assert.equal(allowance.toNumber(), 100, 'allowed value')
  })
})