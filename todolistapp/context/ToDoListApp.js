import React,  {useEffect, useState} from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';


// INTERENAL Import

import { toDolistAddress, toDolistABI } from "./constants";

const fetchContract = (signerOrProvider) => new ethers.Contract(toDolistAddress, toDolistABI, signerOrProvider);

export const ToDolistContext = React.createContext();

export const ToDolistProvider = ({children}) => {

    const [currentAccount, setCurrentAccount] = useState('');
    const [error, setError] = useState('');
    const [allToDolist, setAllToDolist] = useState([]);
    const [myList, setMyList] = useState([]);

    const [allAddress, setAllAddress] = useState([]);

    //-------------Connecting MetamAsk
    const checkIfWalletIsConnect = async ()=> {
        if(!window.ethereum) return setError("Please install Metamask");

        const account = await window.ethereum.request({method: "eth_accounts"});

        if(account.length){
            setCurrentAccount(account[0]);
            console.log(account[0]);
        } else {
            setError("Please Install Metamask & Connect, reload");
        }
        
    };

    //------------ Connect Wallet

    const connectWallet = async() =>{
        if(!window.ethereum) return setError("Please install Metamask");

        const account = await window.ethereum.request({method: "eth_requestAccounts"});

        setCurrentAccount(account[0]);

    };

    //    Interacting with Smart Contract

    const toDolist =async (message) =>{
        try{
            // Connecting with smart Contract
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = await fetchContract(signer);

            // console.log(contract);
            const createlist = await contract.createList(message);
            createlist.wait();

            console.log(createlist);

        } catch (error){
            setError("Something wrong creating list")
        }
    }
    const getToDoList = async()=>{
        try{
            // Connecting with smart Contract
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = await fetchContract(signer);

            // Get Data
            const getAllAddress = await contract.getAddress();
            setAllAddress(getAllAddress);
            console.log(getAllAddress);

            getAllAddress.map(async(eL)=>{
                const getSingleData = await contract.getCreatorData(eL);
                allToDoList.push(getToDoList);
                console.log(getSingleData);
            });
            const allMessage = await contract.getMessage();
            setMyList(allMessage);

        }catch(error){

            setError("Something Wrong Getting Data");
        }
    };

   //Change State of TODOLIST To False To tRue
   const change = async(address)=>{
    try{
        // Connecting with smart Contract
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = await fetchContract(signer);

            const state = await contract.toggle(address);
            state.wait();
            console.log(state);
        
    }catch(error){
        setError("Something wrong Changing Status");
    }
   };

    return(
        <ToDolistContext.Provider value={{checkIfWalletIsConnect, connectWallet, toDolist, getToDoList,change,currentAccount,error,allToDolist,myList,allAddress}}>
            {children}

        </ToDolistContext.Provider>
    )
}


