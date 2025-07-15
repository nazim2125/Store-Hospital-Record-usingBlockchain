import { useEffect, useState } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import { Buffer } from 'buffer';
import MediChain from './contracts/MediChain.json';
import Dashboard from './components/Dashboard.js';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Footer from './components/Footer';
import SiteNavbar from './components/SiteNavbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pinata API credentials from .env
const PINATA_API_KEY = process.env.REACT_APP_PINATA_API_KEY;
const PINATA_API_SECRET = process.env.REACT_APP_PINATA_API_SECRET;
const PINATA_GATEWAY = 'https://gateway.pinata.cloud/ipfs';
const PINATA_UPLOAD_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

// Pinata upload function
const uploadToPinata = async (fileBuffer, fileName = 'file') => {
  const data = new FormData();
  const blob = new Blob([fileBuffer]);
  data.append('file', blob, fileName);
  try {
    const res = await axios.post(PINATA_UPLOAD_URL, data, {
      maxContentLength: 'Infinity',
      headers: {
        'Content-Type': 'multipart/form-data',
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_API_SECRET,
      },
    });
    return res.data.IpfsHash;
  } catch (err) {
    console.error('Pinata upload error:', err);
    throw err;
  }
};

function App() {
  const [account, setAccount] = useState('');
  const [token, setToken] = useState('');
  const [mediChain, setMediChain] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts'})
        .then(result => {
          setAccount(result[0]);
        })
        .catch(error => {
         console.log(error)
        });
      window.ethereum.on('chainChanged', () => window.location.reload());
		} else {
			alert('Please use Metamask or a Web3 enabled browser');
		}
  }

  const getContractInstance = async () => {
    const web3 = new Web3(window.ethereum || Web3.givenProvider || 'http://localhost:8545')
    const networkId = await web3.eth.net.getId()
    const networkData = MediChain.networks[networkId]
    if(networkData){
      const mediChain = new web3.eth.Contract(MediChain.abi, networkData.address)
      setMediChain(mediChain)
      console.log(await mediChain.methods.name().call())
    }else{
      alert('Smart contract not deployed on this network')
    }
  }

  useEffect(() => {
    getContractInstance()
  }, [])

  return (
    <Router>
      <SiteNavbar token={token} account={account} setAccount={setAccount} setToken={setToken}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login mediChain={mediChain} token={token} setToken={setToken} setAccount={setAccount} connectWallet={connectWallet} account={account}/>} />
        <Route path='/dashboard' element={<Dashboard mediChain={mediChain} token={token} account={account} uploadToPinata={uploadToPinata} pinataGateway={PINATA_GATEWAY}/>} />
        <Route path='/register' element={<Register mediChain={mediChain} uploadToPinata={uploadToPinata} pinataGateway={PINATA_GATEWAY} token={token} setToken={setToken} setAccount={setAccount} connectWallet={connectWallet} account={account} />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
