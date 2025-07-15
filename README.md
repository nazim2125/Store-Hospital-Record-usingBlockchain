## ℹ️ Problem Statement

The data privacy of patients is essential because it involves sensitive personal information, such as medical records, test results, and health history. If failed to do so it can result in various consequences, such as financial loss, identity theft, damage to reputation, and even physical harm. It can also lead to discrimination, as individuals with certain health conditions may face challenges in obtaining health insurance.

## ℹ️ About The Project

Our project MediChain seeks to address these challenges by leveraging the power of blockchain to create a secure, decentralized platform for storing and sharing healthcare data. By doing so, we hope to empower patients and Insurance providers, to make more informed decisions, improve outcomes, and advance the field of healthcare as a whole.

## ℹ️ Future Prospects
1. We will be implementing insurance policy as ERC-721 Standard (i.e Non-Fungible Tokens), so as to specify the uniqueness and ownership of each insurance policy.
2. We will be giving patients the flexibility to buy health insurance policy according to their preference instead of defined policies by the insurance provider.
3. We will predict policy annual premium amount using Machine Learning techniques based on factors like patient's age, location, etc.

## 🛠️ Built With

Following technologies and libraries are used for the development of this project.

- [React](https://reactjs.org/)
- [Solidity](https://soliditylang.org/)
- [Truffle](https://trufflesuite.com/)
- [Mocha](https://mochajs.org/)
- [Chai](https://chaijs.com/)
- [Pinata](https://pinata.cloud/)


## 📌 Installation

To setup the project locally follow the steps below

### 💻 Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Ganache](https://trufflesuite.com/ganache/)
- [Metamask Wallet Extension](https://docs.docker.com/compose/install/) or a Web3 browser like Brave

### 🤖 Running the project.

To set this up in the local repository:

1. Copy the commands below to install the dependencies:

```
npm install axios in client directory 

they run in root directory
(npm i -g truffle
npm run client:install
npm run truffle:install)
```

2. Now, start a local Ethereum blockchain network on your system using Ganache. Ganache provides you with 10 testing accounts each with 100 ETH. 

4. Obtain Pinata API Key and API Secret for IPFS from [Pinata Dashboard](https://pinata.cloud/), and create a dedicated gateway for your project. Set the environment variables in `client/.env` file. 

```bash
REACT_APP_PINATA_API_KEY=....
REACT_APP_PINATA_API_SECRET=.....
```

5. Then, copy the following commands to deploy the smart contracts to the local Ethereum blockchain and start the React app:

```
npm run truffle:migrate
npm run client:start
```

6. Set up Metamask to connect to the local blockchain created by Ganache(i.e. [http://localhost:7545/](http://localhost:7545/))

7. Now, obtain the private keys of some of the accounts from Ganache and import the accounts into Metamask wallet.

8. You're ready to go. Visit [http://localhost:3000/](http://localhost:3000/) to check out MediChain
