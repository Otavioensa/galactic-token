const GalacticToken = artifacts.require("GalacticToken");

module.exports = function (deployer) {
  deployer.deploy(GalacticToken, 1000000);
};
