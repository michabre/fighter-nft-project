import * as React from 'react'
import {
  Button,
  ButtonGroup,
  Box,
  Flex,
  Heading,
  Spacer
} from '@chakra-ui/react'
import { LockIcon, StarIcon} from '@chakra-ui/icons'
import shortenAddress from '../../utils/shortenAddress'

const Header = ({ title, account, connect }:{title:string, account:string, connect:() => void}) => { 
  return (
      <Flex>
        <Box p='4' display='flex' alignItems='center'>
          <Heading as='h1' size='md'>{title}</Heading>
        </Box>
        <Spacer />
        
        <Box p='4'>
        <ButtonGroup variant='outline' spacing='2'>
          {!account && (
            <Button leftIcon={<StarIcon />} onClick={connect}>
              Connect
            </Button>
          )}
          {account && (
            <Button leftIcon={<LockIcon />}>
              {shortenAddress(account)}
            </Button>
          )}
          </ButtonGroup>
        </Box>
      </Flex>
  )
}

export default Header