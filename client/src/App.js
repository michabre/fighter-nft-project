import { stats, header } from './data/data'
import React, { useEffect, useState } from "react"
import Base64 from "base-64"
import { 
  Box, 
  Button, 
  Container, 
  HStack,
  Heading,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Textarea,
  useDisclosure } from '@chakra-ui/react'
import { ethers } from "ethers"
import parse from "html-react-parser";
import abi from "./contracts/MyEpicNFT.json"

import Header from "./layout/Header"
import Hero from "./components/Hero/Hero"
//import Slideshow from "./components/Slideshow/Slideshow"
import FighterStats from "./components/Stats/FighterStats"
import Selector from "./components/NFTs/Selector"
//import EmailSignup from "./components/CTAs/EmailSignup"
import Footer from "./layout/Footer"
import Notification from "./components/Notification/Notification"

import "./App.css"

const TWITTER_HANDLE = 'michabre'
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`

const App = () => {
  let provider
  let signer
  let connectedContract

  const [currentAccount, setCurrentAccount] = useState("")
  const [status, setStatus] = useState("No active transaction")
  const [statusLevel, setStatusLevel] = useState("No active transaction")
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notificationLevel, setNotificationLevel] = useState("")

  // NFT Details
  const [nftDescription, setNftDescription] = useState("")
  const [nftName, setNftName] = useState("")
  const [nftImage, setNftImage] = useState("")
  const [nftExternalUrl, setExternalNftUrl] = useState("")

  const { isOpen, onOpen, onClose } = useDisclosure()


  //const contractAddress = "0x1849b82aaF769adcaE510d5F59e995c2728AD27F" // mumbai
  const contractAddress = "0xc527209D5181D1113D91c53D76c0c2dC6a0bE260" // ganache
  const contractABI = abi.abi

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window

    if (!ethereum) {
      console.log("Make sure you have metamask!")
      setNotificationMessage("Make sure you have metamask!")
      setNotificationLevel("warning")
      return
    } else {
      console.log("We have the ethereum object", ethereum)
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' })
    let chainId = await ethereum.request({ method: 'eth_chainId' });
    console.log("Connected to chain " + chainId);

    const mumbaiChainId = "0x13881"; 
    const ganacheChainId = "0x539";
    // if (chainId !== mumbaiChainId) {
    //   console.log("You are not connected to the Mumbai Test Network!");
    // }

    if (chainId !== ganacheChainId) {
      console.log("You are not connected to the Ganache Test Network!");
      setNotificationMessage("You are not connected to the Ganache Test Network!")
      setNotificationLevel("warning")
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
  
        console.log("Going to pop wallet now to pay gas...")
        let nftTxn = await connectedContract.makeAnEpicNFT(jsonData);
  
        console.log("Mining...please wait.")
        await nftTxn.wait();
        
        console.log(`Mined, see transaction: https://mumbai.polygonscan.com/tx/${nftTxn.hash}`);

        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          setStatusLevel("Successful Mint!")
          setStatus(`<p>Hey there! We've minted your NFT. It may be blank right now. It can take a max of 10 min to show up on OpenSea.</p><br /><p><a href="https://testnets.opensea.io/assets/${contractAddress}/${tokenId.toNumber()}"><strong>View on OpenSea</strong></a></p>`)
          onOpen()
        });

        setNftName("")
        setNftDescription("")
        setExternalNftUrl("")
        setNftImage("")
  
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

  /*
  * This runs our function when the page loads.
  */
  useEffect(() => {
    checkIfWalletIsConnected()
  })

  return (
    <>
      <Header title={header.name} logo={header.logo} account={currentAccount} connect={connectWallet} />

      <Box w='100%' pt='5'>
        <Container maxW='container.xl'>
          {notificationMessage && <Notification level={notificationLevel} message={notificationMessage} />}
          <Hero title="Hero Banner">
            <FighterStats data={stats} />
          </Hero>
        </Container>
      </Box>

      <Box w='100%' mb='5'>
        <Container maxW='container.xl'>
          <HStack spacing='24px'>
            <Box w='100%' h='100' p='5' className='box-bg'>
              <Heading as='h3' fontSize='xl'>Thank You To All My Sponsors</Heading>
            </Box>
            <Box w='100%' h='100' p='5' className='box-bg'>
            <Heading as='h3' fontSize='xl'>Join Me On My Journey</Heading>
            </Box>
          </HStack>
        </Container>
      </Box>

      {currentAccount && (<Box w='100%'>
        <Container maxW='container.xl'>
        <HStack spacing='24px'>
          <Box w='30%' p='5' className='box-bg'>
            <Heading as='h3' fontSize='lg'>NFT Section</Heading>
            <Text>View Collection on OpenSea</Text>
            <Text>https://testnets.opensea.io/assets/INSERT_CONTRACT_ADDRESS_HERE/INSERT_TOKEN_ID_HERE</Text>
            <Selector />
          </Box>
          <Box w='70%' p='5'>
            <Heading as='h3' fontSize='lg'>NFT Section</Heading>

            <HStack spacing='24px'>
              <Box>
                <Input 
                  value={nftName}
                  data-type="name"
                  onChange={updateStateValue}
                  placeholder='Enter your name' 
                  size='lg' 
                  mb={5} 
                />
                <Input 
                  value={nftImage}
                  data-type="image"
                  onChange={updateStateValue}
                  placeholder='Add an Image' 
                  size='lg' 
                  mb={5} 
                />
                <Input 
                  value={nftExternalUrl}
                  data-type="url"
                  onChange={updateStateValue}
                  placeholder='External URL' 
                  size='lg' 
                  mb={5} 
                />
                <Textarea
                  value={nftDescription}
                  data-type="description"
                  onChange={updateStateValue}
                  placeholder='Write a description'
                  size='lg'
                  mb={5}
                />
              </Box>
            </HStack>

            <Button onClick={askContractToMintNft} className="cta-button connect-wallet-button">
             Mint NFT
            </Button>
          </Box>
          </HStack>
        </Container>
      </Box>)}
 
      <Footer copyright="Lakwatzero Digital" twitterHandle={TWITTER_HANDLE} twitterLink={TWITTER_LINK} />

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
