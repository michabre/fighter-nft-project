import { stats, header } from './data/data'
import React, { useEffect, useState } from "react"
import { 
  ColorModeScript, 
  useColorMode, 
  Box, 
  Button, 
  Center,
  Container, 
  Flex, 
  HStack,
  VStack, 
  Heading,
  Grid,
  GridItem,
  Input, 
  Text,
  Textarea } from '@chakra-ui/react'
import { ethers } from "ethers"
import abi from "./contracts/MyEpicNFT.json"

import theme from './theme'
import Header from "./layout/Header"
import Hero from "./components/Hero/Hero"
import Slideshow from "./components/Slideshow/Slideshow"
import FighterStats from "./components/Stats/FighterStats"
import Selector from "./components/NFTs/Selector"
import EmailSignup from "./components/CTAs/EmailSignup"
import Footer from "./layout/Footer"
import Notification from "./components/Notification/Notification"

import "./App.css"

const TWITTER_HANDLE = 'michabre'
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`
const OPENSEA_LINK = ''
const TOTAL_MINT_COUNT = 50

const App = () => {
  let provider
  let signer
  let myEpicNFTContract

  const { colorMode, toggleColorMode } = useColorMode()
  const [currentAccount, setCurrentAccount] = useState("")
  const [status, setStatus] = useState("No active transaction")
  const [username, setUsername] = useState("")
  const [message, setMessage] = useState("")
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notificationLevel, setNotificationLevel] = useState("")

  const contractAddress = ""
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
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log('Error', error)
    }
  }

  /*
  * This runs our function when the page loads.
  */
  useEffect(() => {
    console.log('useEffect fired')
    checkIfWalletIsConnected()
  })

  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <Header title={header.name} logo={header.logo} mode={toggleColorMode} current={colorMode} account={currentAccount} connect={connectWallet} />

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
              <Heading as='h3' fontSize='lg'>Sponsors</Heading>
            </Box>
            <Box w='100%' h='100' p='5' className='box-bg'>
              <Heading as='h3' fontSize='lg'>Social Media</Heading>
            </Box>
          </HStack>
        </Container>
      </Box>

      <Box w='100%'>
        <Container maxW='container.xl'>
          <Box w='100%' h='100px' p='5' className='box-bg'>
            <Heading as='h3' fontSize='lg'>NFT Section</Heading>
            <Selector />
          </Box>
        </Container>
      </Box>

      <Box w='100%'>
        <Container maxW='container.xl' py='5'>
          <Box w='100%' h='100px' p='5'>
            <Center>
              <Heading as='h3' fontSize='lg'>Signup CTA</Heading>
            </Center>
            <Center>
              <EmailSignup />
            </Center>
          </Box>
        </Container>
      </Box>
      
      <Footer copyright="Lakwatzero Digital" twitterHandle={TWITTER_HANDLE} twitterLink={TWITTER_LINK} />
    </>
  );
}

export default App
