import { Grid, GridItem } from '@chakra-ui/react';
import React, { useEffect, useState, useContext, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import ServerCard from './ServerCard';

import { getDashboardData } from '../../api/api';

import AuthContext from '../../context/AuthContext';

const mapChangeEstimate = 0;

const Dashboard = () => {
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

  return (
    <Grid
      templateAreas={`"_1 _7"
                    "_2 _8"
                    "_3 _9"
                    "_4 _10"
                    "_5 _11"
                    "_6 _12"
                    "_13 _13"`}
      templateColumns='49.5% 49.5%'
      templateRows='repeat(7, 1fr)'
      justifyContent='space-around'
      rowGap='8px'
    >
      {servers.map((server, idx) => (
        <GridItem gridArea={`_${server.serverNumber}`} key={idx} pl={2}>
          <ServerCard
            {...server}
            timeLeft={counter[idx] - mapChangeEstimate}
            key={server.serverNumber}
          />
        </GridItem>
      ))}
    </Grid>
  );
};

export default Dashboard;
