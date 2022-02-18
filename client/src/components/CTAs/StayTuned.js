import React from 'react';
import { 
  Box, 
  Heading,
  Text } from '@chakra-ui/react'

const StayTuned = () => {
  return (
    <Box w='100%' flexGrow="1" p='5' className='box-bg'>
      <Heading as='h3' fontSize='32px'>Stay Tuned</Heading>
      <Text>By providing your email address you agree to bind your soul to us and receive awesome news about upcoming games and releases.</Text>
    </Box>
  )
}

export default StayTuned