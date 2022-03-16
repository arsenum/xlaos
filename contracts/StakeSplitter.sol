
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;
//pragma solidity ^0.8.4;
//import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "./XLA.sol";
import "./LoanSplitter.sol";
contract StakeSplitter  {
  Member[] private _members;
  uint256 public total;
  address public XLA_addr;
  //track total amount paid by each member
  //
  struct Member {
    address account;
    uint32 amount;
  }
  function initContract(address _xla) public {
    XLA_addr = _xla;
    //uint256 amount  = 15555;
    XLA xla = XLA(_xla);
    //xla.increaseAllowance(address(this), amount);
    xla.allowance(msg.sender, address(this));
    xla.allowance( address(this),msg.sender);
}

  function setMembers(Member[] calldata m)  public {
    for(uint i=0; i<m.length; i++) {
      _members.push(m[i]);
    }
  }
  function isContract(address _addr) private view returns (bool ){
    uint32 size;
    assembly {
      size := extcodesize(_addr)
    }
    return (size > 0);
  }
  // function calculate() public{
  //   for(uint i=0; i<m.length; i++) {
  //     _members.push(m[i]);
  //   }
  // }
  function splitPay () public  payable {
    //require(msg.sender == address(this), "Only owner can withdraw funds");
    require(_members.length > 0, "1");
    bool loanPriority;
    
    XLA token = XLA(this.XLA_addr());
    token.allowance(msg.sender,address(this));
    token.allowance(address(this),msg.sender);
    token.increaseAllowance(msg.sender, token.balanceOf(address(this)));
    token.increaseAllowance(address(this), token.balanceOf(address(this)));
    uint256 currentBalance = token.balanceOf(address(this));
    for(uint i=0; i<_members.length; i++) {
      Member memory member = _members[i];
      if(isContract(member.account)){
        LoanSplitter ls = LoanSplitter(member.account);
        if(!ls.complete() && member.amount == 100){
          //todo: check that payment does not overpay contract
           token.transfer(member.account,   currentBalance * member.amount /100);
           ls.splitPay();
           loanPriority = true;
          // _members.pop(i);
        }
      }
    }
    if(loanPriority){
      return;
    }
    
    for(uint i=0; i<_members.length; i++) {
      Member memory member = _members[i];
      //track amount paid to member
      //token.balanceOf(address(this))
      
      if(isContract(member.account)){
            //token.transfer(member.account, 143 * (member.amount/100));
        LoanSplitter ls = LoanSplitter(member.account);
        if(!ls.complete()){
          token.transfer(member.account,   ( currentBalance * member.amount) /100); //token.balanceOf(address(this))
    
          ls.splitPay();
        }
      }
      else{
          token.transfer(member.account,   ( currentBalance * member.amount) /100); //token.balanceOf(address(this))
    
        }
     //msg.value * member.amount / total);
      //_transfer(member.account, msg.value * member.amount / total);
    }
  }

  function members() external view returns (Member[] memory) {
    return _members;
  }
  // adopted from https://github.com/lexDAO/Kali/blob/main/contracts/libraries/SafeTransferLib.sol
//   error TransferFailed();
//   function _transfer(address to, uint256 amount) internal {
//     bool callStatus;
//     assembly {
//       callStatus := call(gas(), to, amount, 0, 0, 0, 0)
//     }
//     if (!callStatus) revert TransferFailed();
//   }
}
