// app.js

let web3;
let contract;
let accounts;

const contractAddress = '0x84e45a65C7Ca73529984bB383b02D6a6cB461748';
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "minters",
				"type": "address[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "grantRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "propertyDetails",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "valuation",
				"type": "uint256"
			}
		],
		"name": "PropertyTokenized",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "renounceRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "revokeRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "previousAdminRole",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "newAdminRole",
				"type": "bytes32"
			}
		],
		"name": "RoleAdminChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleGranted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleRevoked",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_propertyDetails",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_valuation",
				"type": "uint256"
			}
		],
		"name": "tokenizeProperty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "DEFAULT_ADMIN_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "getProperty",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "propertyDetails",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "valuation",
						"type": "uint256"
					}
				],
				"internalType": "struct RealEstateTokenization.Property",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			}
		],
		"name": "getRoleAdmin",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "hasRole",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MINTER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "properties",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "propertyDetails",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "valuation",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let uploadedFiles = [];  // Keep track of uploaded media files (images/videos)

window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);

        // Request account access
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
            accounts = await web3.eth.getAccounts();

            // Update UI with connected wallet address
            document.getElementById('walletAddress').innerText = `Connected Wallet: ${accounts[0]}`;

            // Create a contract instance
            contract = new web3.eth.Contract(contractABI, contractAddress);

            // Display sections based on the connected account's role
            document.getElementById('getPropertySection').style.display = 'block';

            // Check if the connected account has MINTER_ROLE
            checkMinterRole();

            // Add event listeners
            document.getElementById('tokenizePropertyButton').addEventListener('click', tokenizeProperty);
            document.getElementById('getPropertyButton').addEventListener('click', getProperty);

            // Add event listener for media input
            document.getElementById('mediaInput').addEventListener('change', handleMediaUpload);

        } catch (error) {
            console.error(error);
            alert('User denied account access or an error occurred.');
        }

    } else {
        alert('Please install MetaMask to use this DApp!');
    }
});

// Function to check if the user has MINTER_ROLE
async function checkMinterRole() {
    const MINTER_ROLE = web3.utils.keccak256('MINTER_ROLE');
    try {
        const hasRole = await contract.methods.hasRole(MINTER_ROLE, accounts[0]).call();
        if (hasRole) {
            document.getElementById('tokenizePropertySection').style.display = 'block';
        }
    } catch (error) {
        console.error('Error checking minter role:', error);
    }
}

// Function to tokenize a new property
async function tokenizeProperty() {
    const propertyDetails = document.getElementById('propertyDetailsInput').value;
    const valuation = document.getElementById('valuationInput').value;

    if (!propertyDetails || !valuation) {
        alert('Please enter property details and valuation.');
        return;
    }

    // Retrieve uploaded media files
    if (uploadedFiles.length === 0) {
        alert('Please upload at least one image or video.');
        return;
    }

    try {
        // Placeholder for uploading media (you should replace this with actual storage logic like IPFS)
        const firstImageURL = uploadedFiles[0]; // Store the first image as the NFT image

        // Tokenize the property
        await contract.methods.tokenizeProperty(propertyDetails, valuation).send({ from: accounts[0] });

        alert('Property tokenized successfully!');
    } catch (error) {
        console.error('Error tokenizing property:', error);
        alert('Error tokenizing property.');
    }
}

// Function to handle file uploads and display previews
function handleMediaUpload() {
    const files = document.getElementById('mediaInput').files;
    const mediaPreview = document.getElementById('mediaPreview');

    // Loop through selected files and generate preview without replacing the previous ones
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileReader = new FileReader();

        fileReader.onload = function (e) {
            const fileURL = e.target.result;
            let mediaElement;

            if (file.type.startsWith('image/')) {
                mediaElement = document.createElement('img');
                mediaElement.src = fileURL;
                mediaElement.style.maxWidth = '150px';
                mediaElement.style.margin = '10px';
                uploadedFiles.push(fileURL);  // Store the image URL
            } else if (file.type.startsWith('video/')) {
                mediaElement = document.createElement('video');
                mediaElement.src = fileURL;
                mediaElement.controls = true;
                mediaElement.style.maxWidth = '150px';
                mediaElement.style.margin = '10px';
                uploadedFiles.push(fileURL);  // Store the video URL
            }

            if (mediaElement) {
                mediaPreview.appendChild(mediaElement); // Append without removing previous ones
            }
        };

        fileReader.readAsDataURL(file);
    }
}

// Function to get property details, including media
async function getProperty() {
    const tokenId = document.getElementById('tokenIdInput').value;
    if (!tokenId) {
        alert('Please enter a Token ID');
        return;
    }
    try {
        const property = await contract.methods.getProperty(tokenId).call();

        document.getElementById('propertyDetails').innerHTML = `
            <h3>Property Details</h3>
            <p><strong>Token ID:</strong> ${property.tokenId}</p>
            <p><strong>Details:</strong> ${property.propertyDetails}</p>
            <p><strong>Valuation:</strong> ${property.valuation}</p>
            <p><strong>Media:</strong></p>
            <div id="mediaContainer"></div>
        `;

        // Display media files (images and videos)
        const mediaContainer = document.getElementById('mediaContainer');
        uploadedFiles.forEach(fileURL => {
            let mediaElement;
            if (fileURL.includes('image/')) {
                mediaElement = document.createElement('img');
                mediaElement.src = fileURL;
                mediaElement.style.maxWidth = '150px';
                mediaElement.style.margin = '10px';
            } else if (fileURL.includes('video/')) {
                mediaElement = document.createElement('video');
                mediaElement.src = fileURL;
                mediaElement.controls = true;
                mediaElement.style.maxWidth = '150px';
                mediaElement.style.margin = '10px';
            }
            if (mediaElement) {
                mediaContainer.appendChild(mediaElement);
            }
        });
    } catch (error) {
        console.error('Error fetching property details:', error);
        alert('Error fetching property details.');
    }
}

// Connect Wallet Button
document.getElementById('connectWalletButton').addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
            window.location.reload();
        } catch (error) {
            console.error('Error connecting wallet:', error);
            alert('Error connecting wallet.');
        }
    } else {
        alert('Please install MetaMask to use this DApp!');
    }
});
