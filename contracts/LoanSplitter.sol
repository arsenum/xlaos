
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;
//pragma solidity ^0.8.4;
//import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "./ERC20XLA.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "./StakeSplitter.sol";
contract LoanSplitter  {
  Member[] private _members;
  uint256 public total;
  address public XLA_addr;
  int public rate;
  uint256 public fundingLimit;
  uint256 public fundingProgress;
  bool public closed;
  uint256 public paybackProgress;
  uint256 private totalValue;
  address public refundAddress;

  bool public complete;

  //track total amount paid by each member
  //
  struct Member {
    address account;
    uint32 amount;
  }
  // function setMultiplier(m) public {

  // }
  function setRefundAddress(address a) public{
    refundAddress = a;
  }
  function setRate(int m) public {
     rate = m;
  }
  function setFundingLimit(uint256 l) public{
    fundingLimit = l;
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

  function splitPay () external  payable {
    //require(msg.sender == address(this), "Only owner can withdraw funds");
    require(_members.length > 0, "1");
    if(complete){
      return;
    }
     XLA token = XLA(this.XLA_addr());
     uint256 currentBalance = token.balanceOf(address(this));
     paybackProgress += currentBalance;
    if(fundingLimit<=paybackProgress){
      token.transfer(refundAddress,  paybackProgress - fundingLimit);
      paybackProgress = fundingLimit;
      //StakeSplitter ss = StakeSplitter(refundAddress);
       complete = true;


      //ss.splitPay();
      currentBalance = token.balanceOf(address(this));


    }
    //return;


    for(uint i=0; i<_members.length; i++) {
      Member memory member = _members[i];
      //track amount paid to member

      token.allowance(msg.sender,address(this));
      token.allowance(address(this),msg.sender);
      token.increaseAllowance(msg.sender, member.amount);
      token.increaseAllowance(address(this), member.amount);
      //token.transfer(member.account, member.amount);//msg.value * member.amount / total);
      //if(isContract(member.account) ){
        token.transfer(member.account,   (currentBalance * member.amount) /100);
      //}

      //_transfer(member.account, msg.value * member.amount / total);
    }
    if(fundingLimit==paybackProgress){
      //token.transfer(refundAddress,  paybackProgress - fundingLimit);
      StakeSplitter ss = StakeSplitter(refundAddress);



      ss.splitPay();
      //currentBalance = token.balanceOf(address(this));


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
