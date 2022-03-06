import React from 'react'
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup
} from '@chakra-ui/react'

import { FaCanadianMapleLeaf } from 'react-icons/fa';

const FighterStats = ({ data }) => {
    let stats = data.fighter

    return(
      <>
        <Text fontSize='xl' pb='0'>{stats.organization}'s</Text>
        <Heading as='h2' fontSize='75px' lineHeight='75px' >{stats.firstname}</Heading>
        <Heading as='h2' fontSize='75px' lineHeight='75px' pb='3'>{stats.lastname}</Heading>
        
        <Text fontSize='lg'>{stats.class}</Text>
        <Text fontSize='lg'>{stats.country} <span className="canada"><FaCanadianMapleLeaf /></span></Text>
        <Text fontSize='lg'>{stats.gym}</Text>

        <Box w={{ sm: '100%', md: '50%'}} mt='5' p='3' className='box-bg'>
          <StatGroup>
            <Stat>
              <StatLabel>Record</StatLabel>
              <StatNumber fontSize={{ sm: '20px', md: '24px'}}>{stats.record}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Style</StatLabel>
              <StatNumber fontSize={{ sm: '20px', md: '24px'}}>{stats.style}</StatNumber>
            </Stat>
            <Stat>
            </Stat>
          </StatGroup>
          <StatGroup py='3'>
            <Stat>
              <StatLabel>Height</StatLabel>
              <StatNumber fontSize={{ sm: '20px', md: '24px'}}>{stats.height}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Weight</StatLabel>
              <StatNumber fontSize={{ sm: '20px', md: '24px'}}>{stats.weight}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Reach</StatLabel>
              <StatNumber fontSize={{ sm: '20px', md: '24px'}}>{stats.reach}</StatNumber>
            </Stat>
          </StatGroup>

          <SimpleGrid columns={[1, null, 2]} spacing='16px'>
            <Box w='100%'>
              <Text fontSize='md'><strong>Last Fight:</strong></Text>
              <Text fontSize='md'>{stats.lastfight}</Text>
            </Box>
            <Box w='100%'>
              <Text fontSize='md'><strong>Next Fight:</strong></Text>
              <Text fontSize='md'>{stats.nextfight}</Text>
            </Box>
          </SimpleGrid>
        </Box>
      </>
    )
}

export default FighterStats