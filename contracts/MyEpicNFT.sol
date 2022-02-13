// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// We first import some OpenZeppelin Contracts.
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

// We need to import the helper functions from the contract that we copy/pasted.
import { Base64 } from "./libraries/Base64.sol";

// We inherit the contract we imported. This means we'll have access
// to the inherited contract's methods.
contract MyEpicNFT is ERC721URIStorage {
  // Magic given to us by OpenZeppelin to help us keep track of tokenIds.
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  // We need to pass the name of our NFTs token and its symbol.
  constructor() ERC721 ("ArtistNFT", "RTSY") {
    console.log("This is my NFT contract. Woah!");
  }

  // A function our user will hit to get their NFT.
  function makeAnEpicNFT(string jsonData) public {
     // Get the current tokenId, this starts at 0.
    uint256 newItemId = _tokenIds.current();

    // Get all the JSON metadata in place and base64 encode it.
    string memory json = Base64.encode(
        bytes(
            string(
                abi.encodePacked(
                    jsonData
                )
            )
        )
    );

    // Just like before, we prepend data:application/json;base64, to our data.
    string memory finalTokenUri = string(
        abi.encodePacked("data:application/json;base64,", json)
    );

     // Actually mint the NFT to the sender using msg.sender.
    _safeMint(msg.sender, newItemId);

    // Set the NFTs data.
    //_setTokenURI(newItemId, "https://www.tiredbicycle.com/nft/bob.json");
    //_setTokenURI(newItemId, "data:application/json;base64,ewogICAgImRlc2NyaXB0aW9uIjogIlRoZSBIaXBzdGVyIFZpc2lvbmFyeSIsIAogICAgImV4dGVybmFsX3VybCI6ICJodHRwczovL2RyaXZlLmdvb2dsZS5jb20vZmlsZS9kLzFYcG1GVHBZb2VLV185akFlSVBhbEFLcXNBcUlkeXBNTS92aWV3P3VzcD1zaGFyaW5nIiwgCiAgICAiaW1hZ2UiOiAiaHR0cHM6Ly93d3cudGlyZWRiaWN5Y2xlLmNvbS9uZnQva3lsZS5wbmciLCAKICAgICJuYW1lIjogIkt5bGUiLAogICAgImF0dHJpYnV0ZXMiOiBbCiAgICAgICAgewogICAgICAgICJ0cmFpdF90eXBlIjogInByb2Zlc3Npb24iLCAKICAgICAgICAidmFsdWUiOiAiRGVzaWduZXIiCiAgICAgICAgfSwgCiAgICAgICAgewogICAgICAgICJkaXNwbGF5X3R5cGUiOiAibnVtYmVyIiwKICAgICAgICAidHJhaXRfdHlwZSI6ICJFeHBlcmllbmNlIGluIFllYXJzIiwgCiAgICAgICAgInZhbHVlIjogIjUiCiAgICAgICAgfQogICAgXQp9");
    _setTokenURI(newItemId, finalTokenUri);

    // Increment the counter for when the next NFT is minted.
    _tokenIds.increment();

    console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);
  }
}