const GalacticToken = artifacts.require("GalacticToken");
const GltkTokenSale = artifacts.require("GltkTokenSale");

module.exports = async function (deployer) {
  await deployer.deploy(GalacticToken, 1000000);
  await deployer.deploy(GltkTokenSale, GalacticToken.address);
};
