import React from 'react'
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText, StatGroup, StatArrow
  } from '@chakra-ui/react'

import { stats } from '../../data/data'

const FighterStats = ({ data }) => {
    console.log(stats.fighter)

    return(
      <>
      <Stat>
        <StatLabel>Stat Label</StatLabel>
        <StatNumber>0</StatNumber>
        <StatHelpText>informative test</StatHelpText>
      </Stat>
      <StatGroup>
      <Stat>
        <StatLabel>Sent</StatLabel>
        <StatNumber>345,670</StatNumber>
        <StatHelpText>
          <StatArrow type='increase' />
          23.36%
        </StatHelpText>
      </Stat>
    
      <Stat>
        <StatLabel>Clicked</StatLabel>
        <StatNumber>45</StatNumber>
        <StatHelpText>
          <StatArrow type='decrease' />
          9.05%
        </StatHelpText>
      </Stat>
    </StatGroup>
    </>
    )
}

export default FighterStats