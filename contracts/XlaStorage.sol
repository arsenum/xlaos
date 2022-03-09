// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;

contract XlaStorage{
    address public xolaAddress;
    address public xlaAddress;
    // address public loanAddress;
    // address public splitterAddress;
    address public oracleAddress;


    function setConfig(
                address  _xolaAddress,
                address  _xlaAddress,
                address  _oracleAddress
    ) public{
       //todo:check permission
      xolaAddress=_xolaAddress;
      xlaAddress=_xlaAddress;
    //   loanAddress=_loanAddress;
    //   splitterAddress=_splitterAddress;
      oracleAddress=_oracleAddress;
    }

    // uint private _lastUSDPrice = 1000000000000000000; //18 decimal places

    // function getLastUSDPrice() public view returns(uint256){
    //     return _lastUSDPrice;
    // }
}