pragma solidity >=0.4.22 <0.9.0;

import "./GalacticToken.sol";

contract GltkTokenSale {
  address admin;
  GalacticToken public tokenContract;

  constructor(GalacticToken _tokenContract) public {
    // whoever deploys the contract is the admin
    // token contract
    admin = msg.sender;
    tokenContract = _tokenContract;
    // token price
  }
}