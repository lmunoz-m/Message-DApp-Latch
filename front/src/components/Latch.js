import Navbar from "./Navbar";
import { useState } from 'react';
import React from 'react';
import clienteAxios from '../config/axios'
import {setLatchPaired} from '../index.js';


export default function App() {


	const [paired, setPaired] = useState(false);


	const handlePair = async () => {
	  setPaired(true);
	};
	
	const handleUnpair = async () => {
	  setPaired(false);
	};
	
	const handleAction = async (code) => {
		if (paired) {
		  handleUnpair();


		} else {
		  handleSignMessage(code);
		}
	  };


	let ClientSignature;
	let ClientWallet;

	async function getAddress() {
		let address = await window.ethereum.request({ method: 'eth_requestAccounts' })
		return address[0];
	}

	const handleSignMessage = async (code) => {
		const ethers = require("ethers");

		try {
			//const accounts = await window.ethereum.enable();
			const addr = await getAddress();
			ClientWallet = addr;
			const signature = await window.ethereum.send('personal_sign', ['Latch-Web3', addr]);
			//setSignature(signature);
			ClientSignature = signature.result;
			try {
				const response = await clienteAxios.post('/pair', {
					ClientWallet, code, ClientSignature
				});

				console.log(response.data);
				handlePair();
				//navigate('/unpair');
/* 				latchPair = true;
 */
				setLatchPaired(true);
			} catch (error) {
				console.error(error);
			}

		} catch (err) {
			console.error(err);
		}
	};

	function setRenderNavbarButton() {
		renderNavBar = true;
	}
	function renderNavbarButton() {
		return renderNavBar;
	  }

	const [hover, setHover] = useState(false);

	const handleMouseEnter = () => {
		setHover(true);
	};

	const handleMouseLeave = () => {
		setHover(false);
	};

	const [code, setCode] = React.useState('');

	const handleCodeChange = (e) => {
		setCode(e.target.value);
	}


	return (
		<div className="latchClass" style={{ "minHeight": "100vh" }}>
			<Navbar></Navbar>

			<div>
				<input type="text" value={code} onChange={handleCodeChange} style={{
					width: '200px',
					height: '30px',
					position: 'fixed',
					bottom: '500px',
					right: '1005px',
					border: '1px solid gray',
					borderRadius: '5px',
					padding: '5px'
				}} />


			</div>
			<button style={{
				position: 'fixed',
				bottom: '400px',
				right: '1050px',
				backgroundColor: hover ? "lightgrey" : "lightblue",
				border: "none",
				borderRadius: "5px",
				padding: "10px 20px",
				margin: "20px",
				textAlign: "center",
				cursor: "pointer",
				transition: "background-color 0.3s ease",
			}}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={() => handleAction(code)}>{paired ? "Unpair" : "Pair"}</button>

			

		</div>
	);
}
