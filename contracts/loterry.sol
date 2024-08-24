// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract lottery{
    address public manager;
    address payable[] public participants;
    address payable public winner;
    constructor(){
        manager=msg.sender;
    }
    receive() external payable {
        

     }
     function getbal() public view returns(uint){
        require(msg.sender==manager,"you are not the manager");
        return address(this).balance;
     }
    function random() internal  view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,participants.length)));
     }
     function selectwinner() public payable {
        require(msg.sender==manager,"you are not the manager");
        require(participants.length>=3,"not enough players");
        uint r=random();
        uint index=r%participants.length;
        winner=participants[index];
         winner.transfer(getbal());
         participants=new address payable[](0);
   
     }
     function allMember() public  view returns (address payable[] memory){
            return participants;
     }
     function transfer() external payable {
        require(msg.value ==1 ether,"not enough ether");
        participants.push(payable (msg.sender));
    }
}