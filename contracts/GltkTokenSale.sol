pragma solidity >=0.4.22 <0.9.0;

import "./GalacticToken.sol";

contract GltkTokenSale {
  address admin;
  GalacticToken public tokenContract;
  uint256 public tokenPrice;
  uint256 public tokensSold;

  event Sell(
    address _buyer,
    uint256 _amount
  );


  constructor(GalacticToken _tokenContract) public {
    // whoever deploys the contract is the admin
    // token contract
    admin = msg.sender;
    tokenContract = _tokenContract;
    tokenPrice = 1000000000000000;
  }

  function multiply(uint x, uint y) internal pure returns (uint z) {
    require(y == 0 || (z = x * y) / y == x);
  }

  function buyTokens(uint256 _numberOfTokens) public payable {
    require(msg.value == multiply(_numberOfTokens, tokenPrice));
    require(address(this).balance >= _numberOfTokens);
    require(tokenContract.transfer(msg.sender, _numberOfTokens));

    tokensSold += _numberOfTokens;
    emit Sell(msg.sender, _numberOfTokens);
  }
}