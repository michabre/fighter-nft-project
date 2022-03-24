// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

// We inherit the contract we imported. This means we'll have access
// to the inherited contract's methods.
contract MyEpicNFT is ERC721URIStorage, Ownable {
  // Magic given to us by OpenZeppelin to help us keep track of tokenIds.
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  uint256 public totalSupply;

  mapping(address => uint256[]) private _userOwnedTokens;

  event NewEpicNFTMinted(address sender, uint256 tokenId);

   // total supply reached
  modifier totalSupplyReached {
    require(_tokenIds.current() < totalSupply, 'Total Supply has been reached.');
    _;
  }

  // We need to pass the name of our NFTs token and its symbol.
  constructor() ERC721 ("MMA Fighters", "DJMMA") {
      totalSupply = 1000000;
  }

  // A function our user will hit to get their NFT.
  function makeAnEpicNFT(string memory jsonData) totalSupplyReached() public {
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
    _userOwnedTokens[msg.sender].push(newItemId);

    // Increment the counter for when the next NFT is minted.
    _tokenIds.increment();  

    emit NewEpicNFTMinted(msg.sender, newItemId);
  }

  /**
   * Get a specific token owned by the User
   */
  function getToken(uint256 index) public view returns (uint256) {
    return _userOwnedTokens[msg.sender][index];
  }
}