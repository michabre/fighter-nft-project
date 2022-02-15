const base64 = require('base-64')

const main = async () => {
    const nftContractFactory = await hre.ethers.getContractFactory('MyEpicNFT')
    const nftContract = await nftContractFactory.deploy()
    await nftContract.deployed()
    console.log("Contract deployed to:", nftContract.address)
  
    // Call the function.
    let jsonData1 = base64.encode('{"description": "The Hipster Visionary", "external_url": "https://drive.google.com/file/d/1XpmFTpYoeKW_9jAeIPalAKqsAqIdypMM/view?usp=sharing", "image": "https://www.tiredbicycle.com/nft/kyle.png", "name": "Kyle"}')
    let txn = await nftContract.makeAnEpicNFT(jsonData1)
    // Wait for it to be mined.
    await txn.wait()
    
  };
  
  const runMain = async () => {
    try {
      await main()
      process.exit(0)
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  }
  
  runMain()