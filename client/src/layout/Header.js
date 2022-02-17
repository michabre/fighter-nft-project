import * as React from 'react'
import {
  Button,
  ButtonGroup,
  Box,
  Flex,
  Heading,
  Image,
  Spacer
} from '@chakra-ui/react'

import { LockIcon, MoonIcon, SunIcon, StarIcon} from '@chakra-ui/icons'

import shortenAddress from '../helpers/shortenAddress'

const Header = ({ title, mode, current, account, connect }) => { 
  let icon = current === 'light' ? <SunIcon /> : <MoonIcon />
  return (
      <Flex className='box-bg'>
        <Box p='4' display='flex' alignItems='center'>
          <Heading as='h1' fontSize='24px'>{title}</Heading>
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
            <Button leftIcon={icon} onClick={mode}>
            I prefer the&nbsp;<strong>{current}</strong>
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>
  )
}

export default Header