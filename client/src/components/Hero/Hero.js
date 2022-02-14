import React from 'react'

import { Heading } from '@chakra-ui/react'

const Hero = ({ title, data }) => {
    return (
        <>
          <Heading as='h2' fontSize='5xl'>{title}</Heading>
        </>
    );
}

export default Hero;