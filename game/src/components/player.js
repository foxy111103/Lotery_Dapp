import "./player.css"
import React from "react";
import { useState,useEffect } from "react";


const Player=({state,address})=>{
 const [account,setAccount]=useState("not connected");
 const [registeredPlayers,setRegisteredPlayer]=useState(null);
 const [reload, setReload]=useState(false);

 const Reload=()=>{
    setReload(!reload); //browser reloads automatically
  }
/* const setAccountLinstener=(provider)=>{
    provider.on("account changed",(accounts)=>{
        setAccount(accounts[0]);
    })
    

  }*/

 useEffect(()=>{
    const connect=async()=>{
        const {web3}=state;
        const accounts = await web3.eth.getAccounts();
        //setAccountLinstener(web3.givenProvider);
        setAccount(accounts[0]);
        Reload();
    }
    state.web3 && connect();
    },[state.web3,reload]);
    
useEffect(()=>{
    const getRegisteredPlayers=async()=>{
    const {web3,contract}= state;
    const all_players=await contract.methods.allMember().call();
    //console.log(all_players);
    const registeredPlayers= await Promise.all(
        all_players.map(async (player)=>{
            return player;
        }
    ))
    setRegisteredPlayer(registeredPlayers);
    Reload();
    }
    state.web3 && state.contract && getRegisteredPlayers();
},[state,state.contract,Reload])
//console.log(registeredPlayers);
const transferFund=async()=>{
    const {contract,web3}=state;
    const amount=web3.utils.toWei("1","ether");
    await contract.methods.transfer().send({from:account,value:amount});
    
  }

return(
    <>
      <ul className="list-group" id="list">
        <div className="center">
          <li className="list-group-item" aria-disabled="true">
            <b>Connected account :</b> {account}
          </li>
          <li className="list-group-item">
            <b>Please pay 1 ether on this contract address : </b> {address}
          </li>
          <li className="list-group-item">
            <button onClick={transferFund}>Transfer</button>
          </li>
          <li className="list-group-item">
            <b>Registerd Players </b>:
            <br />
            <br />
            {registeredPlayers}
          </li>
          
        </div>
      </ul>
    </>
);

}

export default Player;