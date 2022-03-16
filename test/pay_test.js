//const Simple = artifacts.require("Simple");
const FeeCollector  = artifacts.require("FeeCollector");
const XOLA  = artifacts.require("XOLA");
const XLA  = artifacts.require("XLA");
const StakeSplitter  = artifacts.require("StakeSplitter");
const LoanSplitter  = artifacts.require("LoanSplitter");
const Oracle  = artifacts.require("Oracle");
const XlaStorage  = artifacts.require("XlaStorage");
//import x from "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 https://ethereum.stackexchange.com/questions/113697/how-to-run-a-successful-solidity-smart-contract-test-script
 */

    //await fc.lock(xola.address, 400, {from: accounts[1]});//, {from: accounts[1]}) //, {from: accounts[0]}
    //console.log("AC-1  XOLA Before Lock:", ((await xola.balanceOf(accounts[1])).toString()))
    //await fc.unlock(xola.address,accounts[1], 300 , {from: accounts[1]});
    //console.log("AC-1  XOLA After Unlock:", ((await xola.balanceOf(accounts[1])).toString()))

    //const members [] =
    //const ac2 = accounts[2];
    // console.log("Contract XLA:", ((await xla.balanceOf(fc.address)).toString()))
    //console.log("AC-1 XOLA Initial Balance:", (await xola.balanceOf(accounts[1])).toString())
   //await xola.approve(fc.address, await xola.totalSupply(), {from: accounts[1]});
    //const xola = await XOLA.deployed()
        // await fc.SetTokens(xola.address,xla.address)
    // await fc.SetToken(xola.address,xla.address)
    //console.log("Contract Address:", fc.address)
contract("Pay Test", function (accounts ) {
  it("should assert true", async function () {
    const stake_splitter  = await StakeSplitter.deployed()
    const loan_splitter  = await LoanSplitter.deployed()
    const fc = await FeeCollector.deployed()
    const xola = await XLA.deployed()
    const xla = await XLA.deployed()
    const oracle = await Oracle.deployed()
    //const storage = await XlaStorage.deployed()

    // storage.setConfig(xola.address,
    //                   xla.address,
    //                   loan_splitter.address,
    //                   stake_splitter.address,
    //                   oracle.address);


    console.log("FeeCollector Address", fc.address)
    console.log("Account 0 address",accounts[0])
    console.log("Account 1 address",accounts[1])
    console.log("Account 2 address",accounts[2])
    console.log("Account 3 address",accounts[3])
    console.log("XLA Token address:", xla.address)

    //console.log("XOLA Token transfer to vesting")
    //fc.init(xla.address,xola.address,oracle.address)

    await xla.transfer(accounts[1], 15000)
    await xla.approve(fc.address,await xla.totalSupply(), {from: accounts[1]});
    await loan_splitter.initContract(xla.address)
    await loan_splitter.setRefundAddress(stake_splitter.address)
    await loan_splitter.setRate(40);
    await loan_splitter.setFundingLimit(1000);
    await loan_splitter.setMembers([{account:accounts[3],amount:30},{account:accounts[4],amount:70}])
    await stake_splitter.initContract(xla.address)

    //{account:loan_splitter.address,amount:50},
    await stake_splitter.setMembers([{account:loan_splitter.address,amount:100},{account:accounts[1],amount:5},{account:accounts[2],amount:15},{account:accounts[3],amount:80}])
    //await stake_splitter.calculate();
    console.log("AC-1 XLA (stakeholder/buyer):", ((await xla.balanceOf( accounts[1])).toString()))
    console.log("AC-1 XLA (spening 2000)")
    await fc.buy(xla.address,2000,fc.address,stake_splitter.address, {from: accounts[1]})
    console.log("AC-1 XLA After Buy:", ((await xla.balanceOf( accounts[1])).toString()))
    console.log("AC-2 XLA (project stakeholder):", ((await xla.balanceOf(accounts[2])).toString()))
    console.log("AC-3 XLA (investor & stakeholder):", ((await xla.balanceOf(accounts[3])).toString()))
    console.log("AC-4 XLA (investor):", ((await xla.balanceOf(accounts[4])).toString()))
    console.log("Contract XLA (Claimable by XOLA):", ((await xla.balanceOf(fc.address)).toString()))
    console.log("AC-1 XLA (spening 3000)")
    await fc.buy(xla.address,3000,fc.address,stake_splitter.address, {from: accounts[1]})
    //await fc.buy(xla.address,2000,fc.address,stake_splitter.address, {from: accounts[1]})
    console.log("AC-1 XLA After Buy:", ((await xla.balanceOf( accounts[1])).toString()))
    console.log("AC-2 XLA (project stakeholder):", ((await xla.balanceOf(accounts[2])).toString()))
    console.log("AC-3 XLA (investor & stakeholder):", ((await xla.balanceOf(accounts[3])).toString()))
    console.log("AC-4 XLA (investor):", ((await xla.balanceOf(accounts[4])).toString()))
    console.log("Contract XLA (Claimable by XOLA):", ((await xla.balanceOf(fc.address)).toString()))
    //await fc.claim(5, {from: accounts[1]})
    //console.log("Contract XLA After Claim:", ((await xla.balanceOf(fc.address)).toString()))
    // await fc.claim(xla.address,35,{from: accounts[1]})
    // console.log("Contract XLA After Claim:", ((await xla.balanceOf(fc.address)).toString()))
   //await fc.transferERC20(xola.address, fc.address, 300, {from: accounts[0]})
    // XOLA.deployed().then( async tokenInstance  => {
    // console.log("Token address:", tokenInstance.address)
    //   //fc.transferERC20(tokenInstance, fc.address, 300)
    // const balance =  await tokenInstance.balanceOf.call(accounts[0]);
    //   //const balance = await tokenInstance.getBalance.call(accounts[0]);
    // console.log("Balance:", balance.toString())
    //   //deployer.deploy(FeeCollector, tokenInstance.address); // constructor takes the token contract's address as a param
    //   //const dep = await FeeCollector.deployed()
    //   //console.log("FeeCollector deployed:",dep.address)

  //});
    //const fc = FeeCollector.new();





    // await xla.approve(accounts[1],3333);
    // await xla.approve(accounts[0],3333);
    //await fc.setSmartContractAllownace(xola,4444);

    // await xola.increaseAllowance(fc.address,3333, {from: accounts[1]})
    // await xola.increaseAllowance(fc.address,3333, {from: accounts[0]})
    // await xola.increaseAllowance(accounts[1],3333, {from: accounts[0]})
    // await xola.increaseAllowance(accounts[0],3333, {from: accounts[0]})

     //await xla.increaseAllowance(fc.address,3333, {from: accounts[1]})
     //await xla.increaseAllowance(fc.address,3333, {from: accounts[0]})
    // await xla.increaseAllowance(accounts[1],3333, {from: accounts[0]})
    // await xla.increaseAllowance(accounts[0],3333, {from: accounts[0]})

//const balance =  await xola.balanceOf(accounts[1]);
      //const balance = await tokenInstance.getBalance.call(accounts[0]);

    //await fc.transferERC20(xola.address, fc.address, 300, {from: accounts[1]})
    //await xola.Allowance()//xola
    //await xola.approve(fc.address,3333, {from: accounts[1]})
  // await xola.approve(accounts[1],3333);
    // await xola.approve(accounts[0],3333);


  });
});
