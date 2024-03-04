import {
  Box,
  Flex,
  Skeleton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorMode,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState, useContext, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { getDefaultBackgrounds } from '../../components/Header/Theming/BackgroundColors';

import HorizontalMinimalCard from './HorizontalMinimalCard';

import ServerCard from './ServerCard';

import { getDashboardData } from '../../api/api';

import AuthContext from '../../context/AuthContext';

const mapChangeEstimate = 0;

const diffBadgeColorArr = {
  white: { variant: 'white', text: 'White' },
  green: { variant: 'green', text: 'Green' },
  blue: { variant: 'blue', text: 'Blue' },
  red: { variant: 'red', text: 'Red' },
  black: { variant: 'black', text: 'Black' },
  hard: { variant: 'orange', text: 'Hard' },
  harder: { variant: 'red', text: 'Harder' },
  hardest: { variant: 'purple', text: 'Hardest' },
};

const Dashboard = () => {
  const [servers, setServers] = useState([]);
  const [counter, setCounter] = useState([0]);

  const { authentication } = useContext(AuthContext);

  const { colorMode } = useColorMode();

  // Fetch servers data
  const { data, isSuccess, isLoading } = useQuery(
    ['servers', authentication.token],
    () => getDashboardData(authentication.token),
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
  const queryClient = useQueryClient();
  const newQueryCount = useRef([0]);

  useEffect(() => {
    if (isSuccess) {
      const timeLeftArr = [];
      const formattedData = [];
      data.servers.forEach(server => {
        timeLeftArr.push(server.timeLeft + mapChangeEstimate);
        const formattedServer = {
          serverNumber: server.serverNumber.toString(),
          maps: server.maps,
          serverDifficulty: server.serverDifficulty,
          timeLimit: server.timeLimit * 60,
        };
        formattedData.push(formattedServer);
      });
      setServers(formattedData);
      setCounter(timeLeftArr);
      newQueryCount.current = new Array(timeLeftArr.length).fill(0);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    const counterCopy = [...counter];
    const timer = setInterval(() => {
      counter.forEach((_, index) => {
        if (counterCopy[index] > 0) counterCopy[index] -= 1;
        if (counterCopy[index] === 0) {
          newQueryCount.current[index] =
            (newQueryCount.current[index] + 1) % 20;
          if (newQueryCount.current[index] === 0) {
            queryClient.invalidateQueries(['servers']);
          }
        }

        if (counter.length - 1 === index) setCounter(counterCopy);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [counter, queryClient]);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Box
          display={['flex']} // Use flexbox layout
          flexDirection={['column', 'column', 'column']} // Stack items vertically on small screens, horizontally on larger screens
          justifyContent={['flex-start', 'flex-start', 'center']} // Align items to the start on small screens, space them evenly on larger screens
          alignItems={['flex-start']} // Align items to the start vertically
          flexWrap='wrap' // Allow items to wrap to the next line if there's not enough space
          gap='8px' // Add gap between items
          maxW={{ xl: 'container.xl' }}
        >
          {[...Array(7)].map((_, idx) => (
            <Box
              key={idx}
              width={['100%', '100%', '100%']} // Full width on small screens, half width on larger screens with gap adjustment
              marginBottom={['8px', '8px', '0']} // Add bottom margin to create space between rows on small screens
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Skeleton
                  height='100px'
                  startColor={`${
                    colorMode === 'dark'
                      ? getDefaultBackgrounds().dark[0]
                      : getDefaultBackgrounds().light[0]
                  }75`}
                  endColor={`${
                    colorMode === 'dark'
                      ? getDefaultBackgrounds().dark[1]
                      : getDefaultBackgrounds().light[1]
                  }75`}
                />
              </motion.div>
            </Box>
          ))}
        </Box>
      </motion.div>
    );
  }

  // Collect all unique difficulty levels
  const difficultyLevels = Array.from(
    new Set(servers.map(server => server.serverDifficulty))
  );

  // Filter servers by difficulty level
  const filteredServersByDifficulty = difficultyLevels.map(difficulty =>
    servers.filter(server => server.serverDifficulty === difficulty)
  );

  const filteredServers = servers.filter(
    server =>
      server.maps[0].finished === false || server.maps[1].finished === false
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Box mb='5rem'>
        <VStack mb={8}>
          <Heading as='h2' m={0}>
            Kacky grind
          </Heading>
          <Text as='h3'>servers with your unfinished maps</Text>
        </VStack>
        {filteredServers.length === 0 ? (
          <Text>No servers have unfinished maps in the first two slots.</Text>
        ) : (
          <Flex
            maxW={{ xl: 'container.xl' }}
            justifyContent='center'
            align='center'
            width='100%'
            gap={4}
          >
            {filteredServers.map((server, idx) => (
              <Box key={idx} justifyContent='center' align='center'>
                {isSuccess ? (
                  <HorizontalMinimalCard
                    {...server}
                    timeLeft={counter[idx] - mapChangeEstimate}
                    key={server.serverNumber}
                    style={{ transition: 'opacity 1s' }}
                  />
                ) : (
                  <div>Loading...</div>
                )}
              </Box>
            ))}
          </Flex>
        )}
      </Box>
      <Box>
        <Heading as='h2'>All servers</Heading>
        <Tabs
          width='100%'
          justifyContent='center'
          maxW={{ xl: 'container.xl' }}
          variant='enclosed'
          align='center'
          isLazy
        >
          <TabList gap={2}>
            {difficultyLevels.map((difficulty, index) => (
              <Tab
                _selected={{
                  color: 'white',
                  bg: diffBadgeColorArr[difficulty].variant,
                }}
                textTransform='uppercase'
                color={`${colorMode === 'dark' ? 'white' : 'black'}`}
                fontSize='xl'
                key={index}
                backgroundColor={`${
                  colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'
                }`}
              >
                {difficulty ? difficulty : 'Phase 1'}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {filteredServersByDifficulty.map((serversByDifficulty, index) => (
              <TabPanel key={index} width='100%' px={'0'}>
                {isSuccess ? (
                  serversByDifficulty.map((server, idx) => (
                    <Box
                      key={idx}
                      width={['100%', '100%', '100%']} // Full width on small screens, half width on larger screens with gap adjustment
                      marginBottom={['8px', '8px', '0']} // Add bottom margin to create space between rows on small screens
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                      >
                        <ServerCard
                          {...server}
                          timeLeft={
                            counter[servers.indexOf(server)] - mapChangeEstimate
                          }
                          key={server.serverNumber}
                        />
                      </motion.div>
                    </Box>
                  ))
                ) : (
                  <div>Loading...</div>
                )}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </motion.div>
  );
};

export default Dashboard;
