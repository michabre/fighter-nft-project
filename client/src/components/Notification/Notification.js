import React from 'react';

import { 
  Box, 
  HStack, 
  Text,
} from '@chakra-ui/react'

import { InfoIcon } from '@chakra-ui/icons'

const levels = {
  success: 'green.100',
  error: 'orange.200',
  warning: 'yellow.200',
}

const Notification = ({ level, message }) => {
  return (
    <Box bg={levels[level]} w='100%' my={5} p={4} color='black'>
      <HStack alignItems='center'>
        <InfoIcon /><Text>{message}</Text>
      </HStack>
    </Box>
  )
}

export default Notification;