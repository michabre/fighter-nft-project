import { stats, header } from './data/data'
import React, { useEffect, useState } from "react"
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
  SimpleGrid,
  useDisclosure } from '@chakra-ui/react'
import { ethers } from "ethers"
import parse from "html-react-parser";
import abi from "./contracts/MyEpicNFT.json"

import Header from "./layout/Header"
import Hero from "./components/Hero/Hero"
import FighterStats from "./components/Stats/FighterStats"
import NFTReveal from "./components/NFTs/NFTReveal"
import Footer from "./layout/Footer"
import Notification from "./components/Notification/Notification"
import StayTuned from './components/CTAs/StayTuned'
import ContactMe from './components/CTAs/ContactMe'
import Sponsors from './components/CTAs/Sponsors'
import CookieConsent from './components/CookieConsent/CookieConsent'
import "./App.css"

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

  const contractAddress = "0xf086a2c48982c47dB3292157bb104fF0bF913f01" // mumbai
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

  const updateStateValue = (event) => {
    const action = {
      "name": setNftName,
      "description": setNftDescription,
      "image": setNftImage,
      "url": setExternalNftUrl
    }
    let text = event.target.value
    let type = event.target.getAttribute("data-type")

    action[type](text)
  }

  const acceptHandler = () => {
    setTrackingConsent(true)
}

  /*
  * This runs our function when the page loads.
  */
  useEffect(() => {
    checkIfWalletIsConnected()
  })

  return (
    <>
      {trackingConsent === false && <CookieConsent consent={acceptHandler} />}

      <Header title={header.name} logo={header.logo} account={currentAccount} connect={connectWallet} />

      <Box w='100%' pt='5' pb='5'>
        <Container maxW='container.xl'>
          {notificationMessage && <Notification level={notificationLevel} message={notificationMessage} />}
          <Hero title="Hero Banner">
            <FighterStats data={stats} />
          </Hero>
        </Container>
      </Box>

      <Box w='100%' mb='5'>
        <Container maxW='container.xl'>
        <SimpleGrid columns={[1, null, 2]} spacing='24px'>
            <StayTuned />
            <ContactMe />
          </SimpleGrid>
        </Container>
      </Box>

      <Sponsors />

      {currentAccount && (<Box w='100%'>
        <Container maxW='container.xl'>
          <NFTReveal />
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
