import { Button, Center, useBoolean, VStack } from '@chakra-ui/react';
import React, { useEffect, useState, useContext } from 'react';
import { MdOutlineViewAgenda, MdOutlineViewHeadline } from 'react-icons/md';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import ServerCard from './ServerCard';

import { getDashboardData } from '../../api/api';

import AuthContext from '../../context/AuthContext';

const Dashboard = () => {
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
        timeLeftArr.push(server.timeLeft);
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
          disabled={isCompactView}
        >
          Compact View
        </Button>
        <Button
          borderRadius="0 6px 6px 0"
          onClick={setIsCompactView.toggle}
          rightIcon={<MdOutlineViewAgenda />}
          disabled={!isCompactView}
        >
          Large View
        </Button>
      </Center>
      <VStack spacing={8}>
        {servers.map((server, index) => (
          <ServerCard
            {...server}
            timeLeft={counter[index]}
            isCompactView={isCompactView}
            key={server.serverNumber}
          />
        ))}
      </VStack>
    </>
  );
};

export default Dashboard;
