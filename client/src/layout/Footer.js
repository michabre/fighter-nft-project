import * as React from 'react'
import { Text, Stack } from '@chakra-ui/react'

const Footer = ({ copyright, twitterHandle, twitterLink }) => { 
  return (
    <Stack bg='gray.800' h='30vh' pt='5' spacing='1'>
      <Text color='gray.200' fontSize='md' align='center'><a
            className="footer-text"
            href={twitterLink}
            target="_blank"
            rel="noreferrer"
          >{`built by @${twitterHandle}`}</a>
      </Text>
      <Text color='gray.200' fontSize='md' align='center' as='i'>{copyright}</Text>
    </Stack>
  )
}

export default Footer