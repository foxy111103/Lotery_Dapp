import './manager.css';
import React from 'react';
import { useState,useEffect } from 'react';

const Manager=({state})=>{
    const [Account,setAccount]=useState("");
    const [balance,setBalance]=useState(10);
    const [winner,setWinner]=useState("no winner yet");
    const [reload, setReload]=useState(false);

  const Reload=()=>{
    setReload(!reload); //browser reloads automatically
  }

   /* const setAccountLinstener=(provider)=>{    //function provided by metamask
      provider.on("account changed",(accounts)=>{
          setAccount(accounts[0]);
      })
    }*/
    useEffect(()=>{
        const Account=async ()=>{
            const {web3}=state;
            const accounts = await web3.eth.getAccounts();
            //setAccountLinstener(web3.givenProvider);
            setAccount(accounts[0]);
            Reload();
        }
        state.web3 && Account();
    },[state,state.web3,reload])
    //console.log(Account);
    
        const getBalance=async ()=>{
            const {contract,web3}=state;
            try{
            const balance=await contract.methods.getbal().call({from:Account});
            setBalance(balance);
            }
            catch(error){
                if (error.message.includes("you are not the manager")) {
                 setBalance("Error fetching balance: not manager");
                 }
                else {
                    setBalance("An unexpected error occurred");
                    }
                }
            }
        //state.contract && getBalance();
        //console.log(balance);
        const Winner=async ()=>{
            const {contract}=state;
            try{
                await contract.methods.selectwinner().send({from:Account});
                const player_winner=await contract.methods.winner().call();
                console.log(player_winner);
                setWinner(player_winner);
                
            }
            catch(error){
                if (error.message.includes("you are not the manager")) {
                    setWinner("not manager");
                }
                else if(error.message.includes("not enough players")){
                    setWinner("not enough players");
                }
                else{
                  setWinner("no Winner");
                }
            }
           
        }
        //state.contract && Winner();
        //console.log(winner);
    
    return(
        <ul className="list-group" id="list">
        <div className="center">
          <li className="list-group-item" aria-disabled="true">
            <b>Connected account :</b> {Account}
          </li>
          <li className="list-group-item">
            <b> Winner : </b>
            {winner}
            <button className="button1" onClick={Winner}>
              Click For Winner
            </button>
          </li>
          <li className="list-group-item">
            <b>Balnace : </b> {balance} Wei
            <button className="button1" onClick={getBalance}>
              Click For Balance
            </button>
          </li>
        </div>
      </ul>
    );
}
export default Manager;