import { Button, Center, VStack, useColorMode, HStack } from '@chakra-ui/react';
import React, { useEffect, useState, useContext, useRef } from 'react';
import { MdOutlineViewAgenda, MdOutlineViewHeadline } from 'react-icons/md';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import ServerCard from './ServerCard';

import { getDashboardData } from '../../api/api';

import AuthContext from '../../context/AuthContext';

const mapChangeEstimate = 0;

const Dashboard = () => {
  const { colorMode } = useColorMode();
  const [isCompactView, setIsCompactView] = useState(
    localStorage.getItem('isCompactView') === 'true'
  );

  const [servers, setServers] = useState([]);
  const [counter, setCounter] = useState([0]);

  const { authentication } = useContext(AuthContext);
  const { data, isSuccess } = useQuery(
    ['servers', authentication.token],
    () => getDashboardData(authentication.token),
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
  const queryClient = useQueryClient();
  const newQueryCount = useRef([0]);

  const toggleCompactView = () => {
    setIsCompactView(!isCompactView);
  };

  useEffect(() => {
    localStorage.setItem('isCompactView', isCompactView.toString());
  }, [isCompactView]);

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
      counter.forEach((element, index) => {
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

  return (
    <>
      <Center mb={4}>
        <Button
          borderRadius="6px 0 0 6px"
          onClick={toggleCompactView}
          leftIcon={<MdOutlineViewHeadline />}
          borderColor={
            isCompactView
              ? colorMode === 'dark'
                ? 'white'
                : 'black'
              : 'transparent'
          }
          borderWidth="1px"
          pointerEvents={isCompactView ? 'none' : 'auto'}
          shadow={isCompactView ? 'glow' : 'none'}
          textShadow={isCompactView ? 'glow' : 'none'}
        >
          Compact View
        </Button>
        <Button
          borderRadius="0 6px 6px 0"
          onClick={toggleCompactView}
          rightIcon={<MdOutlineViewAgenda />}
          borderColor={
            !isCompactView
              ? colorMode === 'dark'
                ? 'white'
                : 'black'
              : 'transparent'
          }
          borderWidth="1px"
          pointerEvents={!isCompactView ? 'none' : 'auto'}
          shadow={!isCompactView ? 'glow' : 'none'}
          textShadow={!isCompactView ? 'glow' : 'none'}
        >
          Large View
        </Button>
      </Center>
      <HStack w="full" spacing={0}>
        <VStack mb={{ base: 24, md: 0 }} w="50%" pl={2} pr={1}>
          {servers.map((server, idx) => (
            idx < 5 ?
              <ServerCard
                {...server}
                timeLeft={counter[idx] - mapChangeEstimate}
                isCompactView={isCompactView}
                key={server.serverNumber}
              /> : null
          ))}
        </VStack>
        <VStack mb={{ base: 24, md: 0 }} w="50%" pr={2} pl={1}>
          {servers.map((server, idx) => (
            idx >= 5 ?
              <ServerCard
                {...server}
                timeLeft={counter[idx] - mapChangeEstimate}
                isCompactView={isCompactView}
                key={server.serverNumber}
              /> : null
          ))}
        </VStack>
      </HStack>
    </>
  );
};

export default Dashboard;
