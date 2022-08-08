import { Button, Center, useBoolean, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { MdOutlineViewAgenda, MdOutlineViewHeadline } from 'react-icons/md';
import ServerCard from './ServerCard';

import mapImage1 from '../../assets/images/Map1.jpg';
import mapImage2 from '../../assets/images/Map2.jpg';
import mapImage3 from '../../assets/images/Map3.jpg';
import mapImage4 from '../../assets/images/Map4.jpg';
import mapImage5 from '../../assets/images/Map5.jpg';
import mapImage6 from '../../assets/images/Map6.jpg';

const getMapsFinished = () => {
  const mapsFinishedArr = [];
  const getKey = key => key.toString();
  for (let i = 151; i <= 225; i += 1) {
    const randomBoolean = Math.random() < 0.3;
    mapsFinishedArr.push({ [getKey(i)]: randomBoolean });
  }
  return mapsFinishedArr;
};
const mapsFinished = getMapsFinished();

const servers = [
  {
    serverNumber: '1',
    mapImageUrl: mapImage1,
    mapNumbers: ['153', '154', '155', '156'],
    serverDifficulty: 'white',
    timeLimit: 900,
    timeLeft: 700,
  },
  {
    serverNumber: '2',
    mapImageUrl: mapImage2,
    mapNumbers: ['180', '181', '182', '183'],
    serverDifficulty: 'white',
    timeLimit: 900,
    timeLeft: 600,
  },
  {
    serverNumber: '3',
    mapImageUrl: mapImage3,
    mapNumbers: ['169', '170', '171', '172'],
    serverDifficulty: 'green',
    timeLimit: 900,
    timeLeft: 850,
  },
  {
    serverNumber: '4',
    mapImageUrl: mapImage4,
    mapNumbers: ['188', '189', '190', '191'],
    serverDifficulty: 'green',
    timeLimit: 900,
    timeLeft: 150,
  },
  {
    serverNumber: '5',
    mapImageUrl: mapImage5,
    mapNumbers: ['181', '182', '183', '184'],
    serverDifficulty: 'blue',
    timeLimit: 900,
    timeLeft: 300,
  },
  {
    serverNumber: '6',
    mapImageUrl: mapImage6,
    mapNumbers: ['193', '194', '195', '196'],
    serverDifficulty: 'red',
    timeLimit: 900,
    timeLeft: 600,
  },
  {
    serverNumber: '7',
    mapImageUrl: mapImage1,
    mapNumbers: ['153', '154', '155', '156'],
    serverDifficulty: 'black',
    timeLimit: 900,
    timeLeft: 400,
  },
];

const Dashboard = () => {
  const [isCompactView, setIsCompactView] = useBoolean();

  const timeLeftArr = () => {
    const arr = [];
    servers.forEach(server => {
      arr.push(server.timeLeft);
    });
    return arr;
  };
  const [counter, setCounter] = useState(timeLeftArr());

  useEffect(() => {
    const counterCopy = [...counter];
    const timer = setInterval(() => {
      counter.forEach((element, index) => {
        if (counterCopy[index] > 0) counterCopy[index] -= 1;
        if (counter.length - 1 === index) setCounter(counterCopy);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [counter]);

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
            mapsFinished={mapsFinished}
            isCompactView={isCompactView}
            key={server.serverNumber}
          />
        ))}
      </VStack>
    </>
  );
};

export default Dashboard;
