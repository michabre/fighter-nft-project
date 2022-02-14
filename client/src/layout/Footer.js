import * as React from 'react'
import { Flex, Text } from '@chakra-ui/react'

const Footer = ({ copyright }) => { 
  return (
    <Flex bg='gray.800' h='30vh' pt='5' align='center' justify='center'>
      <Text color='gray.200'>{copyright}</Text>
    </Flex>
  )
}

export default Footer