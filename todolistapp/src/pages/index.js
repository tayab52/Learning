import React, { useEffect, useState, useContext } from "react";
import { MdVerified } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import Image from "next/image";

// Internal Import
import { ToDolistContext } from "../../context/ToDoListApp";
import Style from "../styles/index.module.css";
import loadingGif from '../../Logo/loding.gif';
import Data from "../../components/Data";


const Home = () => {
  const [message, setMessage] = useState("");
  const {
    checkIfWalletIsConnect,
    connectWallet,
    getToDoList,
    toDolist,
    change,
    currentAccount,
    error,
    allToDolist,
    myList,
    allAddress,
  } = useContext(ToDolistContext);

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  return (
    <div className={Style.home}>
      <div className={Style.navBar}>
        <Image src={loadingGif} alt="Logo" width={50} height={50} />
        <div className={Style.connect}>
          {!currentAccount ? (
            <button onClick={() => connectWallet()}>Connect Wallet</button>
          ) : (
            <button>{currentAccount.slice(0, 20)}...</button>
          )}
        </div>
      </div>

      <div className={Style.home_box}>
        <div className={Style.home_completed}>
          <h2>ToDo History List</h2>
          <div>
            {myList.map((eL, i) => (
              <div key={i} className={Style.home_completed_list}>
                <MdVerified className={Style.iconColor} />
                <p>{eL.slice(0, 30)}..</p>
              </div>
            ))}
          </div>
        </div>

        <div className={Style.home_create}>
          <div className={Style.home_create_box}>
            <h2>Create Blockchain ToDoList</h2>
            <div className={Style.home_create_input}>
              <input
                type="text"
                placeholder="Enter your todo"
                onChange={(e) => setMessage(e.target.value)}
              />
              {currentAccount ? (
                <IoIosSend
                  className={Style.iconBlack}
                  onClick={() => toDolist(message)}
                />
              ) : (
                <IoIosSend
                  className={Style.iconBlack}
                  onClick={() => connectWallet()}
                />
              )}
            </div>

            <Data
              allToDolist={allToDolist}
              allAddress={allAddress}
              myList={myList}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;