 import React, {useEffect,useState,useContext } from "react";

 // Internal Import
 import {ToDolistContext} from "../../context/ToDoListApp";

 const Home = () => {
    const {checkIfWalletIsConnect} = useContext(ToDolistContext);


    useEffect(() => {
        checkIfWalletIsConnect();

    },[]);
  return <div>Home</div>
 };


 export default Home;