pragma solidity ^0.8.0;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/token/ERC20/ERC20.sol";

contract CoreToken is ERC20 {
    // constructor(uint256 initialSupply) ERC20Detailed("Gold", "GLD", 18) public {
    //     _mint(msg.sender, initialSupply);
    // }
     constructor() ERC20("Core Token", "CMN") {
        _mint(msg.sender, 1000000000 * 10 ** decimals());
    }
}