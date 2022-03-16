//const ERC20XLA = artifacts.require("ERC20XLA");
//const ERC20XOLA = artifacts.require("XOLA");
const FeeCollector  = artifacts.require("FeeCollector");
const XOLA  = artifacts.require("XOLA");
const XLA  = artifacts.require("XLA");
const StakeSplitter  = artifacts.require("StakeSplitter");
const LoanSplitter  = artifacts.require("LoanSplitter");
const XlaOracle  = artifacts.require("XlaOracle");
const XlaStorage  = artifacts.require("XlaStorage");
module.exports = async function(deployer) {
  await deployer.deploy(XOLA);
  await deployer.deploy(XLA);
  await deployer.deploy(FeeCollector)
  await deployer.deploy(StakeSplitter)
  await deployer.deploy(LoanSplitter)
  await deployer.deploy(XlaOracle)
  await deployer.deploy(XlaStorage)


  //return assert.isTrue(x.toString() === "500");
};
//truffle migration  --reset 