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
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);
  const [totalCont, setTotalCont] = useState(0);


  useEffect(() =>{

    const loadContract = async() =>{
        let contractAdderss = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0";
        const url = 'http://localhost:8545';
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        console.log(signer);
        setAddress(await signer.getAddress());

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


  const addCont = async () =>{
      const input = document.querySelector('#value');
      const signer = contract.connect(provider.getSigner());
      await signer.addContestent(input.value);
  }

  const totCont = async () =>{
    const signer = contract.connect(provider.getSigner());
    const res = await signer.num();
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

