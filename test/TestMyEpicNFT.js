const { assert, expect } = require("chai");
const { ethers } = require("hardhat");
const base64 = require('base-64')

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

  describe("Make an NFT", () => {
    it("Contract has the right name", async () => {
      let name = await contract.name()
      return assert.equal(name, "MMA Fighters");
    });

    it("Contract has the right symbol", async () => {
      let symbol = await contract.symbol()
      return assert.equal(symbol, "DJMMA");
    });

    it("Owner mints an NFT", async () => {
      const [owner, addr1, addr2] = await ethers.getSigners();
      let jsonData1 = base64.encode('{"description": "What To Do on Your Day Off", "external_url": "add_external_url_here", "image": "image_url_here", "name": "Ferris Bueller"}');
      await contract.connect(owner).makeAnEpicNFT(jsonData1);
      let verify = await contract.balanceOf(owner.address);
      return assert.equal(verify, 1);
    });
  })
  
});

