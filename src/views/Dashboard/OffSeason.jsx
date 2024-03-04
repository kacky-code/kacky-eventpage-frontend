import React from 'react';
import {
  Center,
  Flex,
  VStack,
  HStack,
  Text,
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import PlayerCard from './PlayerCard';

const Offseason = () => (
  <Center maxW='full' h={{ base: '70vh', md: '80vh' }}>
    <VStack spacing={16} mt={4} mb={20}>
      <Text
        fontWeight='500'
        textShadow='glow'
        letterSpacing='0.2em'
        fontSize={{ base: '2xl', md: '5xl' }}
      >
        Kacky Reloaded 4
      </Text>
      <Flex flexDir={'row'} gap={{ base: 0, md: 20 }}>
        <PlayerCard name='Skandear' rank={2} fins={65} avg={41.1} />
        <PlayerCard name='Tekky' rank={1} fins={69} avg={40.5} />
        <PlayerCard name='Dazzzyy' rank={3} fins={63} avg={60.8} />
      </Flex>
      <Text
        mt={{ base: 0, md: 100 }}
        fontSize={{ base: 'md', md: 'xl' }}
        textTransform='none'
        px={4}
      >
        Better get training so your name is here next time!
        <br />
        Join the Kacky Servers in Trackmania Nations Forever or the &quot;Kacky
        Reloaded&quot; Club in Trackmania 2020!
      </Text>
    </VStack>
  </Center>
);

export default Offseason;
