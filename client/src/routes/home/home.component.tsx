import { stats } from '../../data/data'
import { 
  Box, 
  Container, 
  SimpleGrid } from '@chakra-ui/react'

import ContactMe from '../../components/contact-me/contact-me.component'
import StayTuned from '../../components/CTAs/StayTuned'
import FighterStats from '../../components/stats/fighter-stats.component'
import Sponsors from '../../components/sponsors/sponsors.component'


const Home = () => {
  return (
   <>
      <Box w='100%' pt='5' pb='5'>
        <Container maxW='container.xl'>
          <FighterStats data={stats} />
        </Container>
      </Box>

     <Box w='100%' mb='5'>
        <Container maxW='container.xl'>
        <SimpleGrid columns={[1, null, 2]} spacing='24px'>
          <ContactMe />
          <StayTuned /> 
          </SimpleGrid>
        </Container>
      </Box>

      <Sponsors />
   </>
  );
}

export default Home