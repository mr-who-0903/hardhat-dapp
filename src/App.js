import React, {useState, useEffect} from 'react'
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import {ethers} from 'ethers';
import './App.css';

const App = () => {

  const [greeting, doGreeting] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [change, setChange] = useState(false);
  const [num, setNum] = useState(0);

  useEffect(() =>{

    const loadContract = async() =>{
        let contractAdderss = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const url = 'http://localhost:8545';
        const provider = new ethers.providers.JsonRpcProvider(url);
        const contract = new ethers.Contract(    // creating instance of contract
            contractAdderss,
            Greeter.abi,
            provider
        );

        setContract(contract);
        setProvider(provider);
    }

    loadContract();
  }, []);


  useEffect(() =>{

    const getGreetings = async () =>{
      const greeting = await contract.greet();
      doGreeting(greeting);
    }
    contract && getGreetings();
  },[contract, change]);


  const changeGreeting = async () =>{
    const input = document.querySelector('#value');
    const signer = contract.connect(provider.getSigner());
    await signer.setGreeting(input.value);
    setChange(!change);
  }

  const reverseNum = async () =>{
    const input = document.querySelector('#num');
    const signer = contract.connect(provider.getSigner());
    const revNum = await signer.reverse(input.value);
    setNum(parseInt(revNum._hex)); 
  }


  return (
      <div className='center'>
        <h3>{greeting}</h3>
        <h3>{num}</h3>
        <input className='input' type="text" id='value'></input>
        <button className="button" onClick={changeGreeting}>Change</button>

        <input className='input' type="text" id='num' autoComplete='off'></input>
        <button className="button" onClick={reverseNum}>Reverse</button>
      </div>
  )
}

export default App


/****** CONNECT TO METAMASK ********/

// const connect = async () =>{
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   await provider.send("eth_requestAccounts", []);
//   const signer = provider.getSigner();
//   console.log("Account:", await signer.getAddress());
// } 