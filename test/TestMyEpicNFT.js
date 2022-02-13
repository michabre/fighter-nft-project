const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyEpicNFT", function () {
  let contract;

  beforeEach(async () => {
    const MyEpicNFT = await ethers.getContractFactory("MyEpicNFT");
    contract = await MyEpicNFT.deploy();
  });

  describe("Test MyEpicNFT Contract", () => {
    it("contract has been deployed", async () => {
      await contract.deployed();
      testMyEpicNFTContract = contract.address; 
      return assert.isTrue(true);
    });
  });
  
});

