// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

// We inherit the contract we imported. This means we'll have access
// to the inherited contract's methods.
contract MyEpicNFT is ERC721URIStorage {
  // Magic given to us by OpenZeppelin to help us keep track of tokenIds.
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  event NewEpicNFTMinted(address sender, uint256 tokenId);

  // We need to pass the name of our NFTs token and its symbol.
  constructor() ERC721 ("MMA Fighters", "DJMMA") {
    console.log("NFT contract has been deployed. Woah!");
  }

  // A function our user will hit to get their NFT.
  function makeAnEpicNFT(string memory jsonData) public {
     // Get the current tokenId, this starts at 0.
    uint256 newItemId = _tokenIds.current();

    // Just like before, we prepend data:application/json;base64, to our data.
    string memory finalTokenUri = string(
        abi.encodePacked("data:application/json;base64,", jsonData)
    );

     // Actually mint the NFT to the sender using msg.sender.
    _safeMint(msg.sender, newItemId);

    // Set the NFTs data.
    _setTokenURI(newItemId, finalTokenUri);

    // Increment the counter for when the next NFT is minted.
    _tokenIds.increment();

    console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);
    emit NewEpicNFTMinted(msg.sender, newItemId);
  }
}