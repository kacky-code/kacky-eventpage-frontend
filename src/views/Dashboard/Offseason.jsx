import React from 'react';
import { Center, Flex, VStack, HStack, Text, Box, useDisclosure } from '@chakra-ui/react';
import PlayerCard from './PlayerCard';

const Offseason = () =>
  <Center>
    <VStack spacing={16} mt={8} mb={32} px={{ base: 4, md: 8 }}>
      <Text
        fontWeight='500'
        textShadow='glow'
        letterSpacing='0.2em'
        fontSize={{ base: 'lg', md: '5xl' }}
      >
        Kacky Reloaded 4 - Results
      </Text>
      <HStack spacing={20}>
        <Flex>
          <PlayerCard name='Skandear' rank={2} fins={65} avg={41.1} />
        </Flex>
        <Flex>
          <PlayerCard name='Tekky' rank={1} fins={69} avg={40.5} />
        </Flex>
        <Flex>
          <PlayerCard name='Dazzzyy' rank={3} fins={63} avg={60.8} />
        </Flex>
      </HStack>
      <Box>
        <Text
          mt={100}
          fontSize={{ base: 'md', md: 'xl' }}
          textTransform="none"
        >
          Better get training so your name is here next time!<br/>
          Join the Kacky Servers in Trackmania Nations Forever or the &quot;Kacky Reloaded&quot; Club in Trackmania 2020!
        </Text>
      </Box>
    </VStack>
  </Center>

export default Offseason;
