import * as React from 'react'
import {
  Button,
  ButtonGroup,
  Box,
  Flex,
  Heading,
  Spacer
} from '@chakra-ui/react'

import { LockIcon, MoonIcon, SunIcon, StarIcon} from '@chakra-ui/icons'

import shortenAddress from '../helpers/shortenAddress'

import './Header.css'

const Header = ({ title, mode, current, account, connect }) => { 
  let icon = current === 'light' ? <SunIcon /> : <MoonIcon />
  return (
      <Flex>
        <Box p='4'>
          <Heading as='h1' fontSize='32px'>{title}</Heading>
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