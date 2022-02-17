import React from 'react'
import {
  Box,
  Heading,
  Flex,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Spacer
} from '@chakra-ui/react'

import { FaCanadianMapleLeaf } from 'react-icons/fa';

const FighterStats = ({ data }) => {
    let stats = data.fighter

    return(
      <>
        <Text fontSize='xl' pb='0'>{stats.organization}'s</Text>
        <Heading as='h2' fontSize='100px' lineHeight='90px' >{stats.firstname}</Heading>
        <Heading as='h2' fontSize='100px' lineHeight='90px' pb='3'>{stats.lastname}</Heading>
        
        <Text fontSize='lg'>{stats.class}</Text>
        <Text fontSize='lg'>{stats.country} <span className="canada"><FaCanadianMapleLeaf /></span></Text>
        <Text fontSize='lg'>{stats.gym}</Text>

        <Box w='50%' py='5'>
          <StatGroup>
            <Stat>
              <StatLabel>Record</StatLabel>
              <StatNumber>{stats.record}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Style</StatLabel>
              <StatNumber>{stats.style}</StatNumber>
            </Stat>
            <Stat>
            </Stat>
          </StatGroup>
          <StatGroup py='3'>
            <Stat>
              <StatLabel>Height</StatLabel>
              <StatNumber>{stats.height}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Weight</StatLabel>
              <StatNumber>{stats.weight}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Reach</StatLabel>
              <StatNumber>{stats.reach}</StatNumber>
            </Stat>
          </StatGroup>

          <Flex mt='5' alignItems='flex-start' justifyContent='space-between'>
            <Box w='48%'>
              <Text fontSize='md'><strong>Last Fight:</strong></Text>
              <Text fontSize='md'>{stats.lastfight}</Text>
            </Box>
            <Spacer />
            <Box w='48%'>
              <Text fontSize='md'><strong>Next Fight:</strong></Text>
              <Text fontSize='md'>{stats.nextfight}</Text>
            </Box>
          </Flex>
        </Box>
      </>
    )
}

export default FighterStats