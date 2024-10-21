// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RealEstateTokenization is ERC721, Ownable {
    uint256 public tokenCounter;

    struct Property {
        uint256 tokenId;
        string propertyDetails;
        uint256 valuation;
    }

    mapping(uint256 => Property) public properties;

    event PropertyTokenized(uint256 tokenId, string propertyDetails, uint256 valuation);

    constructor() ERC721("Estate Industries Real Estate", "EIRE") {
        tokenCounter = 0;
    }

    function tokenizeProperty(string memory _propertyDetails, uint256 _valuation) public onlyOwner {
        uint256 newTokenId = tokenCounter;
        _safeMint(msg.sender, newTokenId);

        Property memory newProperty = Property({
            tokenId: newTokenId,
            propertyDetails: _propertyDetails,
            valuation: _valuation
        });

        properties[newTokenId] = newProperty;
        tokenCounter += 1;

        emit PropertyTokenized(newTokenId, _propertyDetails, _valuation);
    }

    function getProperty(uint256 _tokenId) public view returns (Property memory) {
        require(_exists(_tokenId), "Property does not exist");
        return properties[_tokenId];
    }
}
