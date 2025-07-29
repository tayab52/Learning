 import React, {useEffect,useState,useContext } from "react";
 import { MdVerified } from "react-icons/md";
 import { IoIosSend,IoIosLock,IoIosUnlock } from "react-icons/io";
import Image from 'next/image';

 // Internal Import
 import {ToDolistContext} from "../../context/ToDoListApp";
 import Style from '../styles/index.module.css';
 import Data from '../../components/Data';

 const Home = () => {
    const {checkIfWalletIsConnect, connectWallet, toDolist, getToDoList,change,currentAccount,error,allToDolist,myList,allAddress} = useContext(ToDolistContext);


    useEffect(() => {
        checkIfWalletIsConnect();
        

    },[]);
  return (
    <div className={Style.home}>
      <div className={Style.navBar}>
        <Image src={Loading} alt="Logo" width={50} height={50} />
        <div className={Style.connect}>
          {!currentAccount ? (
            <button onClick={()=>connectWallet()}>Connect Wallet</button>
          ):(
            <button>{currentAccount.slice(0, 20)}...</button>
          )}
        </div>
      </div>
    </div>
  )
 };


 export default Home;