 import React, {useEffect,useState,useContext } from "react";

 // Internal Import
 import {ToDolistContext} from "../../context/ToDoListApp";

 const Home = () => {
    const {checkIfWalletIsConnect, toDolist} = useContext(ToDolistContext);


    useEffect(() => {
        checkIfWalletIsConnect();
        toDolist();

    },[]);
  return <div>Home</div>
 };


 export default Home;