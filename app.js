// app.js

let web3;
let contract;
let accounts;

const contractAddress = '0x24c1A7F0bCA70C780b776643E218cf2Bd98955d3';
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
    // ... (Rest of your ABI as provided)
    {
        "inputs": [],
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

    try {
        await contract.methods.tokenizeProperty(propertyDetails, valuation).send({ from: accounts[0] });
        alert('Property tokenized successfully!');
    } catch (error) {
        console.error('Error tokenizing property:', error);
        alert('Error tokenizing property.');
    }
}

// Function to get property details
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
        `;
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
