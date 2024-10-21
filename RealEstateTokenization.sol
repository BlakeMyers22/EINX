// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import ERC721URIStorage for handling token metadata (URI)
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.8.0/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.8.0/contracts/access/AccessControl.sol";

contract RealEstateTokenization is ERC721URIStorage, AccessControl {
    uint256 public tokenCounter;

    struct Property {
        uint256 tokenId;
        string propertyDetails;
        uint256 valuation;
    }

    mapping(uint256 => Property) public properties;

    // Define the MINTER_ROLE
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    // Event for property tokenization
    event PropertyTokenized(uint256 tokenId, string propertyDetails, uint256 valuation, string tokenURI);

    constructor(address[] memory minters) ERC721("Estate Industries Real Estate", "EIRE") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        tokenCounter = 0;

        // Grant MINTER_ROLE to specified addresses
        for (uint256 i = 0; i < minters.length; i++) {
            _setupRole(MINTER_ROLE, minters[i]);
        }
    }

    // Override supportsInterface to resolve the conflict
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // Tokenize a property with a reference to a small image (e.g., a thumbnail)
    function tokenizeProperty(
        string memory _propertyDetails, 
        uint256 _valuation, 
        string memory _tokenURI  // Accept the tokenURI for the thumbnail or IPFS link
    ) public onlyRole(MINTER_ROLE) {
        uint256 newTokenId = tokenCounter;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);  // Set the token URI for the thumbnail or small image

        Property memory newProperty = Property({
            tokenId: newTokenId,
            propertyDetails: _propertyDetails,
            valuation: _valuation
        });

        properties[newTokenId] = newProperty;
        tokenCounter += 1;

        emit PropertyTokenized(newTokenId, _propertyDetails, _valuation, _tokenURI);
    }

    // Fetch property details based on token ID
    function getProperty(uint256 _tokenId) public view returns (Property memory) {
        require(_exists(_tokenId), "Property does not exist");
        return properties[_tokenId];
    }
}
