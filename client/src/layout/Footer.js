import * as React from 'react'
import { Text, Stack, Container } from '@chakra-ui/react'

const Footer = ({ copyright }) => { 
  return (
    <Container maxW='container.xl' mt='5'>
      <Stack h='30vh' pt='5' spacing='1'>
        <Text color='gray.200' fontSize='sm' align='left' as='i'>Copyright &copy; 2022</Text>
        <Text color='gray.200' fontSize='sm' align='left' as='i'>Built by {copyright}</Text>
      </Stack>
    </Container>
  )
}

export default Footer