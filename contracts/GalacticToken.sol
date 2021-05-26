pragma solidity >=0.4.22 <0.9.0;

contract GalacticToken {
  uint256 public totalSupply;
  string public name = "Galactic Token";
  string public symbol = "GLTK";
  // not part of the erc-20 standard
  string public standard = "Galactic Token v1.0";

  event Transfer(
    address indexed _from,
    address indexed _to,
    uint256 _value
  );

  event Approval(
    address indexed _owner,
    address indexed _spender,
    uint256 _value
  );

  mapping(address => uint256) public balanceOf;
  mapping(address => mapping(address => uint256)) public allowance;

  constructor (uint256 _initialSupply) public {
    // allocate initial suply
    totalSupply = _initialSupply;
    // sender of the account that deploys the contract
    balanceOf[msg.sender] = _initialSupply;
  }

  function transfer(address _to, uint256 _value) public returns (bool success) {
    require(balanceOf[msg.sender] >= _value);
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;

    // emit transfer event to the blockchain
    emit Transfer(msg.sender, _to, _value);
    return true;    
  }


  function approve(address _spender, uint256 _value) public returns (bool success) {
    //alowance
    allowance[msg.sender][_spender] = _value;

    // event
    emit Approval(msg.sender, _spender, _value);
    return true;
  }

  // transferFrom

} 