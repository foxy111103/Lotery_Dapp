const lotery= artifacts.require("lottery");//contract name

module.exports=function (deployer){
    deployer.deploy(lotery);
};