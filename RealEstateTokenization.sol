// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import statements with specific versioned contracts
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.8.0/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.8.0/contracts/access/AccessControl.sol";

contract RealEstateTokenization is ERC721, AccessControl {
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
    event PropertyTokenized(uint256 tokenId, string propertyDetails, uint256 valuation);

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

    function tokenizeProperty(string memory _propertyDetails, uint256 _valuation) public onlyRole(MINTER_ROLE) {
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
