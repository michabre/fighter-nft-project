import React from 'react'

import { Heading } from '@chakra-ui/react'

const Hero = ({ title, children }) => {
    return (
        <>
          <Heading as='h2' fontSize='5xl'>{title}</Heading>
          {children}
        </>
    );
}

export default Hero;