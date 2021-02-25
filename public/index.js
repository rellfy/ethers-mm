﻿import { ethers } from "./ethers.min.js";
import abi from "./abi.js";

const connectMetaMask = async () => {
  console.log("connecting to MetaMask")
  await window.ethereum.enable();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const balance = ethers.utils.formatEther(await signer.getBalance());
  console.log(`balance: ${balance} ETH`);
  return provider;
};

const makeContractCall = async (signer) => {
  const contract = new ethers.Contract(
    "0x994B2D8b39b9FCaa37306870235a507264346e47",
    abi,
    signer
  );
  const tx = await contract.mintWithEth(
    ethers.utils.parseEther("0.1"),
    "0x6be6Cc3fdEC72328f93025B396Bd25566003F0FB",
    await signer.getAddress(),
    Math.floor(Date.now()/1000) + 300,
    {
      value: ethers.utils.parseEther("1"),
    },
  );
  console.log("tx", tx);
  const result = await tx.wait();
  console.log("result", result);
};

// Connect to MetaMask.
const main = async() => {
  const provider = await connectMetaMask();
  await makeContractCall(provider.getSigner());
};

main()
  .then(() => console.log("done"))
  .catch((e) => console.error(e));
