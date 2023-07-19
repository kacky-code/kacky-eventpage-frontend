import {
  Text,
  Stack, HStack, Center, Link, List, ListItem,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

const PreEvent = () => {
  const eventStart = DateTime.fromISO("2023-08-18T20:00:00.000", { zone: "CET" });
  const mappingDeadine = DateTime.fromISO("2023-07-31T22:00:00.000", { zone: "CET" });

  function updateTimer(diffDate) {
    const now = DateTime.now();
    const remainDays = Math.floor((diffDate - now) / (1000 * 60 * 60 * 24));
    const remainHours = Math.floor((diffDate - now) / (1000 * 60 * 60) % 24);
    const remainMinutes = Math.floor((diffDate - now) / (1000 * 60) % 60);
    const remainSeconds = Math.floor((diffDate - now) / (1000) % 60);
    return {
      days: String(remainDays).padStart(2, "0"),
      hours: String(remainHours).padStart(2, "0"),
      minutes: String(remainMinutes).padStart(2, "0"),
      seconds: String(remainSeconds).padStart(2, "0")
    };
  }

  const [remainingTime, setRemainingTime] = useState(updateTimer(eventStart));
  const [mappingEnd, setMappingEnd] = useState(updateTimer(mappingDeadine));

  useEffect(() => {
    setTimeout(() => {
      setRemainingTime(updateTimer(eventStart));
    }, 1000);
  });

  useEffect(() => {
    setTimeout(() => {
      setMappingEnd(updateTimer(mappingDeadine));
    }, 1000);
  });

  function toCETtoUserTime(datetimeString) {
    const inputDateTime = DateTime.fromISO(datetimeString, { zone: 'Europe/Berlin' });
    const userTimezone = DateTime.local().zoneName;
    const userDateTime = inputDateTime.setZone(userTimezone);

    const intlDate = userDateTime.toLocaleString({
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const intlTime = userDateTime.toLocaleString({
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    });

    return `${intlDate.toString()}, ${intlTime.toString()} (${userDateTime.toFormat("ZZZZ")})`;
  }

  return (
    <Stack spacing={16} mt={8} mb={32} px={{ base: 4, md: 8 }}>
      <Text
        fontWeight="500"
        textShadow="glow"
        letterSpacing="0.2em"
        fontSize={{ base: 'lg', md: '5xl' }}
      >
        Kacky Reloaded 4 - August 2023
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
      <Center pt={2}>
        <div style={{textAlign: "left", width: "66%", lineHeight: "2", fontSize: "larger", textTransform: "none"}} >
          <Text fontSize="2xl" fontWeight="400" textTransform="uppercase" textDecoration="underline" textUnderlineOffset="0.2em">General Info:</Text>
          <List>
            <ListItem>
              📅  Duration: {toCETtoUserTime("2023-08-18T20:00:00.000")} - {toCETtoUserTime("2023-09-17T22:00:00.000")}
            </ListItem>
            <ListItem>
            🎮  Servers: Join the servers in the &quot;Kacky Reloaded&quot; club (playing KR4 requires TM2020 Standard Access on PC)
            </ListItem>
            <ListItem>
            🗺️  Maps: Kacky Reloaded #226 - #300
            </ListItem>
            <ListItem>
            🌐  Kacky Event-Website: <Link href="https://kacky.gg">https://kacky.gg/</Link>
            </ListItem>
            <ListItem>
            📊  Kacky Statistics & History: <Link href="https://kackyreloaded.com/">https://kackyreloaded.com/</Link>
            </ListItem>
            <ListItem>
            🔗  Discord Invite: <Link href="http://kacky.gg/discord">http://kacky.gg/discord</Link>
            </ListItem>
            <ListItem>
            📬  Mapping Deadline: {toCETtoUserTime("2023-07-31T22:00:00.000")}
              {mappingEnd.days + mappingEnd.hours + mappingEnd.minutes + mappingEnd.seconds > 0 ?
                ` (Closes in ${mappingEnd.days}:${mappingEnd.hours}:${mappingEnd.minutes}:${mappingEnd.seconds})`
              :
                " - I hope you submitted already"
              }
            </ListItem>
          </List>
        </div>
      </Center>
      {mappingEnd.days + mappingEnd.hours + mappingEnd.minutes + mappingEnd.seconds > 0 ?
      <Center>
        <div style={{textAlign: "left", width: "66%", lineHeight: "2", fontSize: "larger", textTransform: "none"}} >
          <Text fontSize="2xl" fontWeight="400" textTransform="uppercase" textDecoration="underline" textUnderlineOffset="0.2em">Mapping Information:</Text>
          Do you want to build a map for KR4? Join the Kacky Discord Server (<Link href="http://kacky.gg/discord">http://kacky.gg/discord</Link>) and check channel #📢kacky-reloaded-4<br/>
          It get&apos;s updated with the latest info and rules.<br/>
          Have questions about building a map for Kacky? Ask them in #kacky-reloaded!
        </div>
      </Center>
        :
        null
      }
    </Stack>
  )
};

export default PreEvent;
