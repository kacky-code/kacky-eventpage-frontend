import {
  Button,
  Center,
  useBoolean,
  VStack,
  useColorMode,
} from '@chakra-ui/react';
import React, { useEffect, useState, useContext } from 'react';
import { MdOutlineViewAgenda, MdOutlineViewHeadline } from 'react-icons/md';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import ServerCard from './ServerCard';

import { getDashboardData } from '../../api/api';

import AuthContext from '../../context/AuthContext';

const mapChangeEstimate = 0;

const Dashboard = () => {
  const { colorMode } = useColorMode();
  const [isCompactView, setIsCompactView] = useBoolean();

  const [servers, setServers] = useState([]);
  const [counter, setCounter] = useState([0]);

  const { authentication } = useContext(AuthContext);
  const { data, isSuccess } = useQuery(['servers', authentication.token], () =>
    getDashboardData(authentication.token)
  );
  const queryClient = useQueryClient();

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
    }
  }, [data, isSuccess]);

  useEffect(() => {
    const counterCopy = [...counter];
    const timer = setInterval(() => {
      counter.forEach((element, index) => {
        if (counterCopy[index] > 0) counterCopy[index] -= 1;
        if (counterCopy[index] === 0)
          queryClient.invalidateQueries(['servers']);
        if (counter.length - 1 === index) setCounter(counterCopy);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [counter, queryClient]);

  return (
    <>
      <Center mb={8}>
        <Button
          borderRadius="6px 0 0 6px"
          onClick={setIsCompactView.toggle}
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
          onClick={setIsCompactView.toggle}
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
      <VStack mb={{ base: 24, md: 0 }} spacing={8}>
        {servers.map((server, index) => (
          <ServerCard
            {...server}
            timeLeft={counter[index] - mapChangeEstimate}
            isCompactView={isCompactView}
            key={server.serverNumber}
          />
        ))}
      </VStack>
    </>
  );
};

export default Dashboard;
