import React from 'react';
import { 
  Box, 
  Heading,
  Link,
  SimpleGrid,
  Text } from '@chakra-ui/react'
import { FaInbox, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { contact } from '../../data/data';

const ContactMe = () => {
  return (
    <Box w='100%' flexGrow="1" p='5' className='box-bg social'>
      <Heading as='h3' fontSize='32px'>Contact Me</Heading>
      <Text>Follow me on social or send me some sponsorship opportunities</Text>
      <SimpleGrid columns={2} spacing={1}>
        {/* <Box display='flex' alignItems='flexStart'><FaInbox /> <Link href={contact.mail_url} isExternal>/{contact.mail}</Link></Box> */}
        <Box display='flex' alignItems='flexStart'><FaFacebookF />  <Link href={contact.facebook_url} isExternal>/{contact.facebook}</Link></Box>
        <Box display='flex' alignItems='flexStart'><FaInstagram />  <Link href={contact.instagram_url} isExternal>/{contact.instagram}</Link></Box>
        <Box display='flex' alignItems='flexStart'><FaTwitter />  <Link href={contact.twitter_url} isExternal>/{contact.twitter}</Link></Box>
      </SimpleGrid>
    </Box>
  )
}

export default ContactMe