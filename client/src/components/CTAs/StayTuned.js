import React from 'react';
import { 
  Box, 
  Heading,
  Text } from '@chakra-ui/react'
import EmailSignup from './EmailSignup';

const StayTuned = () => {
  return (
    <Box w='100%' flexGrow="1" p='5' className='box-bg'>
      <Heading as='h3' fontSize='32px'>Stay Tuned</Heading>
      <Text>By providing your email address you agree to receive awesome news about upcoming fignts, promos, and merchandise.</Text>
      <Box>
        <EmailSignup action="https://mikevsweb.us15.list-manage.com/subscribe/post?u=c206d0bc37dc43c7920af49f4&amp;id=90e19a98e1" />
      </Box>
    </Box>
  )
}

export default StayTuned