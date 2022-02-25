import React from 'react'
import { 
    Box,
    Button,
    Flex,
    Heading,
    Spacer,
    Text } from '@chakra-ui/react'

const CookieConsent = ({ consent }) => {

    return (
      <Box w='100%' className='box-bg' p='5'>
        <Flex align='center'>
          <Box>
            <Heading as='h3' fontSize='20px'>Cookie Consent</Heading>
            <Text>By continuing to browse or by clicking 'Accept', you agree to the storing of cookies on your device to enhance your site experience and for analytical purposes. To learn more, please see our Cookie Policy.</Text>
          </Box>
          <Spacer />
          <Box>
            <Button onClick={consent}>Accept and Close</Button>
          </Box>
        </Flex>
      </Box>
    )
}

export default CookieConsent