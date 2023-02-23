import Navbar from "./Navbar";
import MessagingToken from "../MyToken.json";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";


export default function TransferToken() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(null);
  const ethers = require("ethers");
  //After adding your Hardhat network to your metamask, this code will get providers and signers
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  //Pull the deployed contract instance
  let contract = new ethers.Contract(
    MessagingToken.address,
    MessagingToken.abi,
    signer
  );

  function validateRecipient(address) {
    if (!ethers.utils.isAddress(address)) {
      return false;
    }
    return true;
  }

  function validateAmount(amount) {
    if (isNaN(amount)) {
      return false;
    }
    return true;
  }

  async function sendMessage() {
    if (!validateRecipient(recipient)) {
      alert("Recipient address is not valid.");
      return;
    }
    if (!validateAmount(amount)) {
      alert("Amount is not valid.");
      return;
    }
    try {
      // Transferir tokens al destinatario
      const tx = await contract.sendMessage(recipient, amount);
      console.log("Transaction hash:", tx.hash);
      const receipt = await tx.wait();
      console.log("Transaction status:", receipt.status);
      alert("MTK sent successfully!");
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      alert("Error sending message. Check console for details.");
    }
  }


  // make a getbalance function
    async function getBalance() {
        try {
            const address = await signer.getAddress();
            const balance = await contract.balanceOf(address);
            setBalance(balance.toString());
          } catch (error) {
            console.error("Error al obtener balance:", error);
            alert("Error getting balance. Check console for details.");
          }
    }

    useEffect(() => {
        getBalance();
      }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <div>
      <Navbar></Navbar>
      <div
        style={{
          height: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#FFF",
        }}
      >
        <br />
        <label>
          Recipient address:&nbsp;&nbsp;&nbsp;
          <input
            type="text"
            id="recipient"
            value={recipient}
            onChange={(event) => setRecipient(event.target.value)}
            style = {{color: "black", padding : "3px", borderRadius: '5px' }}
          />
        </label>
        <br />
        <label>
          Amount:&nbsp;&nbsp;&nbsp;
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            style = {{color: "black", padding : "3px", borderRadius: '5px' }}
          />
        </label>
        <br />
        <button
          className="enableEthereumButton bg-blue-800 hover:bg-blue-700 text-white font-bold p-2 rounded text-sm mr-5"
          onClick={sendMessage}
        >
          Send MTK Tokens
        </button>

        <br /><br /><br /><br /><br />
       
         <p>Balance of MTK Tokens: {balance}</p>

      </div>
    </div>
  );
}
