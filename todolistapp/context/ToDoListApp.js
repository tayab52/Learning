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

    // useEffect(() => {
    //     checkIfWalletIsConnect();
    // },[]);

    return(
        <ToDolistContext.Provider value={{checkIfWalletIsConnect}}>
            {children}

        </ToDolistContext.Provider>
    )
}


