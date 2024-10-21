// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RealEstateTokenization {
    struct Property {
        uint256 tokenId;
        string propertyDetails;
        uint256 valuation;
        string[] mediaUrls;  // Store IPFS URLs for media
    }

    mapping(uint256 => Property) public properties;
    uint256 public tokenCounter;

    constructor() {
        tokenCounter = 1;
    }

    event PropertyTokenized(uint256 tokenId, string propertyDetails, uint256 valuation, string[] mediaUrls);

    function tokenizeProperty(string memory _propertyDetails, uint256 _valuation, string[] memory _mediaUrls) public {
        uint256 tokenId = tokenCounter;
        properties[tokenId] = Property(tokenId, _propertyDetails, _valuation, _mediaUrls);
        emit PropertyTokenized(tokenId, _propertyDetails, _valuation, _mediaUrls);
        tokenCounter++;
    }

    function getProperty(uint256 _tokenId) public view returns (Property memory) {
        return properties[_tokenId];
    }
}
