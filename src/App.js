/*******  METHOD TO CONNECT TO METAMASK AND INTERACT WITH CONTRACT USING ETHERS.JS ********/
/*  
    this is just a demonstration file.
    this file has no connection with app.js
*/

import React, {useState, useEffect} from 'react'
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import {ethers} from 'ethers';
import './App.css';

const App = () => {
  
  const [contract, setContract] = useState(null);
  const [contractWithSigner, setContractWithSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [totalCont, setTotalCont] = useState(0);


  useEffect(() =>{

    const loadContract = async() =>{
        let contractAdderss = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
        const url = 'http://localhost:8545';
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

        const contract = new ethers.Contract(    // creating instance of contract
            contractAdderss,
            Greeter.abi,
            provider
        );

        const signer = provider.getSigner();
        const contractWithSigner = contract.connect(signer);

        setContract(contract);
        setContractWithSigner(contractWithSigner);
        setProvider(provider);
    }

    loadContract();
  }, []);


  const addCont = async () =>{
      const input = document.querySelector('#value');
      const res = await contractWithSigner.addContestent(input.value);
      if(res) console.log('Added !');
  }

  const totCont = async () =>{
      const res = await contractWithSigner.num();
      setTotalCont(parseInt(res._hex));
  }


  return (
      <div className='center'>
        <input className='input' type="text" id='value'></input>
        <button className='button' onClick={addCont}>Add Contestent</button>

        <button className='button' onClick={totCont}>Total Contestents</button>
        <h3>{totalCont}</h3>
      </div>
  )
}

export default App
