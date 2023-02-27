import {
  Text,
  Stack, HStack, Center, Link,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

const PreEvent = () => {
  const eventStart = DateTime.fromISO("2023-03-03T20:00:00.000", { zone: "CET" });

  function updateTimer() {
    const now = DateTime.now();
    const remainDays = Math.floor((eventStart - now) / (1000 * 60 * 60 * 24));
    const remainHours = Math.floor((eventStart - now) / (1000 * 60 * 60) % 24);
    const remainMinutes = Math.floor((eventStart - now) / (1000 * 60) % 60);
    const remainSeconds = Math.floor((eventStart - now) / (1000) % 60);
    return {
      days: String(remainDays).padStart(2, "0"),
      hours: String(remainHours).padStart(2, "0"),
      minutes: String(remainMinutes).padStart(2, "0"),
      seconds: String(remainSeconds).padStart(2, "0")
    };
  }

  const [remainingTime, setRemainingTime] = useState(updateTimer);

  useEffect(() => {
    setTimeout(() => {
      setRemainingTime(updateTimer());
    }, 1000);
  });

  return (
    <Stack spacing={16} mt={8} mb={32} px={{ base: 4, md: 8 }}>
      <Text
        fontWeight="500"
        textShadow="glow"
        letterSpacing="0.2em"
        fontSize={{ base: 'lg', md: '5xl' }}
      >
        See you in March for Kackiest Kacky 8!
      </Text>
      <Center>
        <HStack>
          <Text
            fontWeight="500"
            textShadow="glow"
            letterSpacing="0.2em"
            fontSize={{ base: 'lg', md: '4xl' }}
          >
            {`${remainingTime.days}`}
          </Text>
          <Text
            fontWeight="500"
            textShadow="glow"
            letterSpacing="0.2em"
            fontSize={{ base: 'lg', md: '4xl' }}
          >
            :
          </Text>
          <Text
            fontWeight="500"
            textShadow="glow"
            letterSpacing="0.2em"
            fontSize={{ base: 'lg', md: '4xl' }}
          >
            {`${remainingTime.hours}`}
          </Text>
          <Text
            fontWeight="500"
            textShadow="glow"
            letterSpacing="0.2em"
            fontSize={{ base: 'lg', md: '4xl' }}
          >
            :
          </Text>
          <Text
            fontWeight="500"
            textShadow="glow"
            letterSpacing="0.2em"
            fontSize={{ base: 'lg', md: '4xl' }}
          >
            {`${remainingTime.minutes}`}
          </Text>
          <Text
            fontWeight="500"
            textShadow="glow"
            letterSpacing="0.2em"
            fontSize={{ base: 'lg', md: '4xl' }}
          >
            :
          </Text>
          <Text
            fontWeight="500"
            textShadow="glow"
            letterSpacing="0.2em"
            fontSize={{ base: 'lg', md: '4xl' }}
          >
            {`${remainingTime.seconds}`}
          </Text>
        </HStack>
      </Center>
      <Center paddingTop="75px">
        <div style={{textAlign: "left", width: "66%", lineHeight: "2", fontSize: "larger", textTransform: "none"}} >
          <Text fontSize="2xl" fontWeight="400" textTransform="uppercase">Kackiest Kacky 8 Info:</Text>
          KK8 will be played in Trackmania Nations Forever from March 3rd to April 2nd.<br/>
          This year, we once again go negative again with a smaller mappack of 50 maps. Because of the smaller selection, mappers tend to submit harder maps for negative editions. But fear not, our goal is always to deliver a balanced experience, suited for all skill levels, no matter if positive or negative.<br/>
          For more information, <Link href="https://kacky.gg/discord" target="_blank" rel="noopener noreferrer" style={{textDecoration: "underline"}}>join the Discord Server</Link>!
        </div>
      </Center>
      {/* <Center>
        <div style={{textAlign: "left", width: "66%", lineHeight: "2", fontSize: "larger", textTransform: "none"}} >
          <Text fontSize="2xl" fontWeight="400" textTransform="uppercase">Servers:</Text>
          Need some training? Join the <Link href="tmtp://#join=sky_kacky" target="_blank" rel="noopener noreferrer" style={{textDecoration: "underline"}}>Hunting Server</Link> or add it to <Link href="tmtp://#addfavorite=sky_kacky" target="_blank" rel="noopener noreferrer" style={{textDecoration: "underline"}}>your Favorites</Link> and join from the ingame browser!<br/>
          Prepare by adding the event servers to your Favorites:
          <ul style={{paddingLeft: "30px", paddingTop: "10px", paddingBottom: "10px"}}>
            <li><Link href="tmtp://#addfavorite=sky_event1" target="_blank" rel="noopener noreferrer" style={{textDecoration: "underline"}}>Server 1</Link></li>
            <li><Link href="tmtp://#addfavorite=sky_event1" target="_blank" rel="noopener noreferrer" style={{textDecoration: "underline"}}>Server 2</Link></li>
            <li><Link href="tmtp://#addfavorite=sky_event1" target="_blank" rel="noopener noreferrer" style={{textDecoration: "underline"}}>Server 3</Link></li>
          </ul>
          Be aware that you can only have 10 servers in your Favorites with a free account. If you cannot add more, check <Link href="https://players.trackmaniaforever.com/" target="_blank" rel="noopener noreferrer" style={{textDecoration: "underline"}}>https://players.trackmaniaforever.com/</Link> if there are some offline servers in your Favorites and remove them.
        </div>
      </Center> */}
    </Stack>
  )
};

export default PreEvent;
