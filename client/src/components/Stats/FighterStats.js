import React from 'react'
import {
  Box,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText, StatGroup, StatArrow
} from '@chakra-ui/react'

  import { FaWeight, FaCanadianMapleLeaf } from 'react-icons/fa';



const FighterStats = ({ data }) => {
    let stats = data.fighter

    return(
      <>
        
        <Text fontSize='xl' pb='0'>One Championship's</Text>
        <Heading as='h2' size='4xl'>{stats.firstname}</Heading>
        <Heading as='h2' size='4xl' pb='5'>{stats.lastname}</Heading>
        <Text fontSize='lg'>{stats.class}</Text>
        <Text fontSize='lg'>{stats.country} <span class="canada"><FaCanadianMapleLeaf /></span></Text>
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
        </Box>

        <Text fontSize='md'><strong>Next Fight:</strong> To Be Announced...</Text>
    </>
    )
}

export default FighterStats