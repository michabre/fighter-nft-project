import React from 'react'
import { 
    Box,
    Button,
    Heading,
    Stack,
    Text } from '@chakra-ui/react'

const CookieConsent = ({ consent }) => {

    return (
      <Box w='100%' className='box-bg' p='5'>
        <Stack direction={['column', null, 'row']} align='center' justify='space-between' spacing='24px'>
          <Box>
            <Heading as='h3' fontSize='20px'>Cookie Consent</Heading>
            <Text>By continuing to browse or by clicking 'Accept', you agree to the storing of cookies on your device to enhance your site experience and for analytical purposes.</Text>
          </Box>
          <Box>
            <Button onClick={consent}>Accept and Close</Button>
          </Box>
        </Stack>
      </Box>
    )
}

export default CookieConsent