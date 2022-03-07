import React from 'react';
import { 
  Box,
  Container,
  Heading,
  Link,
  SimpleGrid,
  Text } from '@chakra-ui/react'

import { FaLaptop, FaFacebookF, FaPhoneAlt, FaInstagram, FaYoutube } from 'react-icons/fa';

const Sponsors = () => {
  return (
    <Box w='100%' mb='5'>
        <Container maxW='container.xl'>
            <SimpleGrid columns={[1, null, 2, 3]} spacing='16px'>
              <Box>
                <Heading as='h3' fontSize='42px' align='center'>Thank You</Heading>
                <Text align='center'>Big thank you to all my sponsors and trainers.</Text>
              </Box>
              <Box className='box-bg' p='3'>
                <Heading as='h4' fontSize='24px'>Universal Supplements</Heading>
                <Box display='flex' alignItems='center'><FaLaptop /> <Link href="http://universalsupplements.ca" ml='2' isExternal>/universalsupplements.ca</Link></Box>
                <Box display='flex' alignItems='center'><FaFacebookF /> <Link href="https://www.facebook.com/universalsupplementscanada/"  ml='2' isExternal>/universalsupplementscanada</Link></Box>
              </Box>
              <Box className='box-bg' p='3'>
                <Heading as='h4' fontSize='24px'>JRP Cement Finishing</Heading>
                <Box display='flex' alignItems='center'><FaPhoneAlt /> <Link href="tel:2508122003"  ml='2' isExternal>/250-812-2003</Link></Box>
              </Box>
              <Box className='box-bg' p='3'>
                <Heading as='h4' fontSize='24px'>The Fitness Academy</Heading>
                <Box display='flex' alignItems='center'><FaLaptop /> <Link href="https://tfagym.com" ml='2' isExternal>/tfagym.com</Link></Box>
                <Box display='flex' alignItems='center'><FaFacebookF /> <Link href="https://www.facebook.com/fitnessacademyvic/"  ml='2' isExternal>/fitnessacademyvic</Link></Box>
                <Box display='flex' alignItems='center'><FaInstagram /> <Link href="https://www.instagram.com/tfagym/"  ml='2' isExternal>/tfagym</Link></Box>
                <Box display='flex' alignItems='center'><FaYoutube /> <Link href="https://www.youtube.com/channel/UCIpsm5MD767vsDWjDQhlopg/"  ml='2' isExternal>/The Fitness Academy</Link></Box>
              </Box>
              <Box className='box-bg' p='3'>
                <Heading as='h4' fontSize='24px'>Hood Rich Jiu Jitsu</Heading>
                <Box display='flex' alignItems='center'><FaInstagram /> <Link href="https://www.instagram.com/hoodrichjj/?hl=en"  ml='2' isExternal>/hoodrichjj</Link></Box>
              </Box>
              <Box className='box-bg' p='3'>
                <Heading as='h4' fontSize='24px'>Dr. Parenteau Pain Relief & Rehabilitation</Heading>
                <Box display='flex' alignItems='center'><FaLaptop /> <Link href="http://www.drparenteau.com" ml='2' isExternal>/www.drparenteau.com</Link></Box>
                <Box display='flex' alignItems='center'><FaPhoneAlt /> <Link href="tel:2505896325"  ml='2' isExternal>/250-589-6325</Link></Box>
              </Box>
            </SimpleGrid>
        </Container>
      </Box>
  )
}

export default Sponsors