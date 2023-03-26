import {
  Button,
  Center,
  useBoolean,
  VStack,
  useColorMode, Text, Box,
} from '@chakra-ui/react';
import React, { useEffect, useState, useContext } from 'react';
import { MdGridView, MdOutlineViewHeadline } from 'react-icons/md';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getDashboardData, getStreamInfo } from '../../api/api';

import AuthContext from '../../context/AuthContext';
import HotbarCard from './HotbarCard';

const mapChangeEstimate = 20;

const Glance = () => {
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

  const [message, setMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      getStreamInfo(authentication.token)
        .then(json => setMessage(json.data))
    }, 2000);
    return () => clearInterval(interval);
  }, [authentication.token]);

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
          Hotbar View
        </Button>
        <Button
          disabled="True"
          borderRadius="0 6px 6px 0"
          onClick={setIsCompactView.toggle}
          rightIcon={<MdGridView />}
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
          Grid View
        </Button>
      </Center>
      {
        message === "" ?
          <VStack spacing={3}>
            {servers.map((server, index) => (
              <HotbarCard
                {...server}
                timeLeft={counter[index] - mapChangeEstimate}
                key={server.serverNumber}
                style={{ transition: "opacity 1s" }}
              />
            ))}
          </VStack>
        :
          <Center>
            <Box
              w="200px"
              h="500px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Text
                fontSize="2xl"
                letterSpacing='wide'
                lineHeight="1.5"
              >
                {message}
              </Text>
            </Box>
          </Center>
      }
    </>
  );
};

export default Glance;
