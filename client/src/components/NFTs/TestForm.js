import React from 'react';
import { 
    Box, 
    Button, 
    HStack,
    Heading,
    Input,
    Textarea } from '@chakra-ui/react'

const TestForm = ({nftName, nftImage, nftExternalUrl, nftDescription, updateStateValue, askContractToMintNft}) => {
    return (
      <>
        <HStack spacing='24px'>
          <Box w='30%' p='5' className='box-bg'>
            <Heading as='h3' fontSize='lg'>NFT Section</Heading>
            Select an image to Mint
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
      </>
    )
}

export default TestForm