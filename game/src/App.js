import './App.css';
import {useState,useEffect} from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import loterry from "./contracts/lottery.json";
import Manager from "./components/manager";
import Player from "./components/player";
import {Route,Link} from "react-router-dom";
import Intro from "./components/intro";

function App() {
  const [state,setstate]=useState({web3:null,contract:null});
  const [address,setAddress]= useState(null);
  
  useEffect(()=>{

    const loadProvider = async () => {
        const provider = await detectEthereumProvider();
        if (provider) {
          provider.request({ method: "eth_requestAccounts" });
          const web3 = new Web3(provider);
          
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = await loterry.networks[networkId];
          const contract = new web3.eth.Contract(loterry.abi,deployedNetwork.address );
          const add=contract._address;
          
          setAddress(add);
          setstate({web3,contract});
        
      }
    }
    loadProvider();
  },[])
  console.log(state);
  

  return (
    <div className="App">
      <Route exact path="/">
      <Intro></Intro>
      </Route>
    <Route path="/manager">
    <Manager state={state}></Manager>
    </Route>
    <Route path="/player">
    <Player state={state} address={address} ></Player>
    </Route>
    </div>
  );
}

export default App;
