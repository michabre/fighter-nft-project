import { header } from './data/data'
import React, { useEffect, useState } from "react"
import { Routes, Route } from 'react-router-dom'
import Base64 from "base-64"
import { 
  Box, 
  Container, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure } from '@chakra-ui/react'
import { ethers } from "ethers"
import parse from "html-react-parser";
import abi from "./contracts/MyEpicNFT.json"

import Home from './routes/home/home.component'

import Header from "./components/header/header.component"
import NFTReveal from "./components/NFTs/NFTReveal"
import Footer from "./components/footer/footer.component"
import Notification from "./components/notification/notification.component"
import CookieConsent from './components/cookie-consent/cookie-consent.component'

import "./App.scss"

const App = () => {
  let provider
  let signer
  let connectedContract

  const [currentAccount, setCurrentAccount] = useState("")
  const [status, setStatus] = useState("No active transaction")
  const [statusLevel, setStatusLevel] = useState("No active transaction")
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notificationLevel, setNotificationLevel] = useState("")

  const [trackingConsent, setTrackingConsent] = useState(false)


  // NFT Details
  const [nftDescription, setNftDescription] = useState("")
  const [nftName, setNftName] = useState("")
  const [nftImage, setNftImage] = useState("")
  const [nftExternalUrl, setExternalNftUrl] = useState("")

  const { isOpen, onOpen, onClose } = useDisclosure()

  //const contractAddress = "0xf086a2c48982c47dB3292157bb104fF0bF913f01" // mumbai
  const contractAddress = "0xE5CA947f1acEA4A92171Ba8E48d700d58902CBAE" // ganache
  const contractABI = abi.abi



  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window

    if (!ethereum) {
      console.log("Make sure you have metamask!")
      return
    } else {
      console.log("We have the ethereum object", ethereum)
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' })
    let chainId = await ethereum.request({ method: 'eth_chainId' });
    console.log("Connected to chain " + chainId);

    const mumbaiChainId = "0x13881"; 
    if (chainId !== mumbaiChainId) {
      console.log("You are not connected to the Mumbai Test Network!");
    }

    if (accounts.length !== 0) {
      const account = accounts[0]
      console.log("Found an authorized account:", account)
      setCurrentAccount(account)
    } else {
      console.log("No authorized account found")
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        setNotificationMessage("No wallet found. Get MetaMask!")
        setNotificationLevel("warning")
        return
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" })
      let chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log("Connected to chain " + chainId);

      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log('Error', error)
    }
  }

  const askContractToMintNft = async () => {  
    try {
      const { ethereum } = window;
  
      if (ethereum) {
        provider = new ethers.providers.Web3Provider(ethereum);
        signer = provider.getSigner();
        connectedContract = new ethers.Contract(contractAddress, contractABI, signer);

        let jsonData = Base64.encode(`{"description": "${nftDescription}", "external_url": "${nftExternalUrl}", "image": "${nftImage}", "name": "${nftName}"}`)

        console.log(`Going to pop wallet now to pay gas...`)        
        let nftTxn = await connectedContract.makeAnEpicNFT(jsonData)
  
        console.log(`Mining, please wait...`)
        await nftTxn.wait()
        
        console.log(`See transaction: https://mumbai.polygonscan.com/tx/${nftTxn.hash}`)

        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log("NewEpicNFTMinted")
          setStatusLevel("Successful Mint!")
          setStatus(`<p>Hey there! We've minted your NFT. It may be blank right now. It can take a max of 10 min to show up on OpenSea.</p><br /><p><a href="https://testnets.opensea.io/assets/${contractAddress}/${tokenId.toNumber()}"><strong>View on OpenSea</strong></a></p>`)
          onOpen()

          setNftName("")
          setNftDescription("")
          setExternalNftUrl("")
          setNftImage("")
        });

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  interface ActionOptions {
    [key: string]: (n:string) => void;
  }

  const action:ActionOptions = {
    "name": setNftName,
    "description": setNftDescription,
    "image": setNftImage,
    "url": setExternalNftUrl
  }

  const updateStateValue = (event:any) => {
    let type:string = event.target.getAttribute("data-type")
    action[type](event.target.value)
  }

  const acceptHandler = () => {
    setTrackingConsent(true)
}

  /*
  * This runs our function when the page loads.
  */
  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  return (
    <>
      {trackingConsent === false && <CookieConsent consent={acceptHandler} />}

      <Header title={header.name} account={currentAccount} connect={connectWallet} />

      <Box w='100%' pt='5' pb='5'>
        <Container maxW='container.xl'>
          {notificationMessage && <Notification level={notificationLevel} message={notificationMessage} />}
        </Container>
      </Box>

      <Routes>
        <Route index element={<Home />} />
      </Routes>

      {currentAccount && (<Box w='100%'>
        <Container maxW='container.xl'>
          <NFTReveal />
          <InstagramCollection token="" />
        </Container>
      </Box>)}
 
      <Footer copyright="Lakwatzero Digital" />

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{statusLevel}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {parse(status)}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default App
