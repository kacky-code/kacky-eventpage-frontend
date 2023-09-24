/* eslint-disable react/jsx-no-comment-textnodes */
import {
  Text,
  Stack,
  Center,
  ListItem,
  List,
  Code,
  Link,
  Flex,
  VStack,
  HStack,
  Image,
  Box,
} from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import ExpandBox from './ExpandBox';

const WebHowTo = ({ command, message }) => (
  <VStack w='full' alignItems='start'>
    <HStack>
      <Text fontWeight='bold' w={100}>
        Command:
      </Text>
      <Text>{command}</Text>
    </HStack>
    <HStack>
      <Text fontWeight='bold' w={100}>
        Message:
      </Text>
      <Text>{message}</Text>
    </HStack>
  </VStack>
);

WebHowTo.propTypes = {
  command: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

const StreamerInfo = () => (
  <Stack spacing={16} mt={8} mb={32} px={{ base: 4, md: 8 }}>
    <Center pt={2}>
      <div
        style={{
          textAlign: 'left',
          width: '66%',
          lineHeight: '2',
          fontSize: 'larger',
          textTransform: 'none',
        }}
      >
        <Flex
          bg='gray.700'
          border={1}
          borderRadius={16}
          px={5}
          pt={0}
          pb={5}
          mt={4}
          // alignItems="center"
          direction='column'
        >
          <Text
            fontSize='2xl'
            fontWeight='400'
            textDecoration='underline'
            textUnderlineOffset='0.2em'
          >
            Kacky API for Streamers
          </Text>
          <Text
            fontSize='xl'
            fontWeight='400'
            textDecoration='underline'
            textUnderlineOffset='0.2em'
          >
            General Setup
          </Text>
          <p>
            To get the data, you will have to use the <Code>$(urlfetch)</Code>{' '}
            command which calls the API and returns you a string. Usually the
            values returned from the API are in a format that you can just show
            them. If you need another format, please contact{' '}
            <Code>corkscrew.</Code> on Discord (or tell me how to change the
            format in the call, so I can document it here - i have no clue about
            twitch to be honest).
          </p>
          <p>
            Either you use Nightbot&#39;s graphical interface and add the{' '}
            <Code>$(urlfetch)</Code> part in the &quot;Message&quot; field or
            you use the <Code>!addcom</Code> command in chat.{' '}
            <strong>Please set a cooldown! </strong>
            Dont ddos my poor server from your chat. 1s should be fine, that
            prevents multiple queries at once.
          </p>
          <p>
            Things like <Code>*YourNameHere*</Code> or <Code>*tmlogin*</Code>{' '}
            should be replaced by you! <Code>tmlogin</Code> either is the login
            of the account in TMNF/KK or your Ubisoft Username for TM20/KR.{' '}
          </p>
        </Flex>

        <Flex
          bg='gray.700'
          border={1}
          borderRadius={16}
          px={5}
          pt={0}
          pb={5}
          mt={6}
          // alignItems="center"
          direction='column'
        >
          <Text
            fontSize='2xl'
            fontWeight='400'
            textDecoration='underline'
            textUnderlineOffset='0.2em'
            pt={5}
          >
            List of Finished Maps
          </Text>
          <p style={{ marginTop: 15 }}>
            Depending on the argument you provide to <Code>strings</Code> you
            either get a list of all KackyID&#39;s you finished,{' '}
            <Code>scores</Code> adds PBs for each map, and <Code>ranks</Code>{' '}
            shows the Kacky Rank per map.
          </p>
          <Text
            fontSize='m'
            fontWeight='400'
            textDecoration='underline'
            textUnderlineOffset='0.2em'
            pt={5}
          >
            Query Endpoints:
          </Text>
          <List>
            <ListItem>
              <Code>
                https://api.kacky.gg/event/*tmlogin*/finned?string=ids
              </Code>
            </ListItem>
            <ListItem>
              <Code>
                https://api.kacky.gg/event/*tmlogin*/finned?string=scores
              </Code>
            </ListItem>
            <ListItem>
              <Code>
                https://api.kacky.gg/event/*tmlogin*/finned?string=ranks
              </Code>
            </ListItem>
          </List>
          <Text
            fontSize='m'
            fontWeight='400'
            textDecoration='underline'
            textUnderlineOffset='0.2em'
            pt={5}
          >
            Return Value:
          </Text>
          <Code mt={2}>[155, 157, 199, 200, 201, 202]</Code>
          <VStack spacing={5} mt={2}>
            <ExpandBox
              content={
                <pre>
                  <Code>
                    !addcom !finned -cd=1 *YourNameHere* finished these maps:
                    $(urlfetch
                    https://api.kacky.gg/event/*tmlogin*/finned?string=ids)
                  </Code>
                </pre>
              }
              title='How to create Command by using a Nightbot Command?'
            />
            <ExpandBox
              title='How to create Command in Nightbot Webinterface?'
              content={
                <WebHowTo
                  command='!finned'
                  message='*YourNameHere* finished these maps: $(urlfetch https://api.kacky.gg/event/*tmlogin*/finned?string=ids)'
                />
              }
            />
          </VStack>
        </Flex>

        <Flex
          bg='gray.700'
          border={1}
          borderRadius={16}
          px={5}
          pt={0}
          pb={5}
          mt={4}
          // alignItems="center"
          direction='column'
        >
          <Text
            fontSize='2xl'
            fontWeight='400'
            textDecoration='underline'
            textUnderlineOffset='0.2em'
            pt={5}
          >
            List of Unfinished Maps
          </Text>
          <p style={{ marginTop: 15 }}>
            List of maps that are not yet finished by the provided login.
          </p>
          <Text
            fontSize='m'
            fontWeight='400'
            textDecoration='underline'
            textUnderlineOffset='0.2em'
            pt={5}
          >
            Query Endpoints:
          </Text>
          <List>
            <ListItem>
              <Code>
                https://api.kacky.gg/event/*tmlogin*/unfinned?string=1
              </Code>
            </ListItem>
          </List>
          <Text
            fontSize='m'
            fontWeight='400'
            textDecoration='underline'
            textUnderlineOffset='0.2em'
            pt={5}
          >
            Return Value:
          </Text>
          <Code mt={2}>[151, 165, 166, 169]</Code>
          <VStack spacing={5} mt={2}>
            <ExpandBox
              content={
                <pre>
                  <Code>
                    !addcom !unfinned -cd=1 *YourNameHere* is missing these
                    maps: $(urlfetch
                    https://api.kacky.gg/event/*tmlogin*/unfinned?string=1)
                  </Code>
                </pre>
              }
              title='Example Command to create a Nightbot Command'
            />
            <ExpandBox
              title='How to create Command in Nightbot Webinterface?'
              content={
                <WebHowTo
                  command='!unfinned'
                  message='*YourNameHere* is missing these maps: $(urlfetch https://api.kacky.gg/event/*tmlogin*/unfinned?string=1)'
                />
              }
            />
          </VStack>
        </Flex>

        <Flex
          bg='gray.700'
          border={1}
          borderRadius={16}
          px={5}
          pt={0}
          pb={5}
          mt={4}
          // alignItems="center"
          direction='column'
        >
          <Text
            fontSize='2xl'
            fontWeight='400'
            textDecoration='underline'
            textUnderlineOffset='0.2em'
            pt={5}
          >
            Time to Next Unfinished Map
          </Text>
          <p style={{ marginTop: 15 }}>
            Searches for the unfinished map of <Code>tmlogin</Code> which is
            played next and returns when it is played. <Code>simochat</Code> is
            a dumb parameter name, might (should definitely) change before KR4.
            <br />
            Currently this returns a whole sentence, because it seemed easiest,
            as it also handles multple maps&nbsp; being played at the same time.
          </p>
          <Text
            fontSize='m'
            fontWeight='400'
            textDecoration='underline'
            textUnderlineOffset='0.2em'
            pt={5}
          >
            Query Endpoints:
          </Text>
          <List>
            <ListItem>
              <Code>
                https://api.kacky.gg/event/*tmlogin*/nextunfinned?simochat=1
              </Code>
            </ListItem>
          </List>
          <Text
            fontSize='m'
            fontWeight='400'
            textDecoration='underline'
            textUnderlineOffset='0.2em'
            pt={5}
          >
            Return Value:
          </Text>
          <Code mt={2}>Next unfinished map in 15 minutes: 196 (Server 1)</Code>
          <Code mt={2}>
            Next unfinished maps in 15 minutes: 196 (Server 1), 205 (Server 5)
          </Code>
          <VStack spacing={5} mt={2}>
            <ExpandBox
              content={
                <pre>
                  <Code>
                    !addcom !nextunfinned -cd=1 Next unfinished map in
                    $(urlfetch
                    https://api.kacky.gg/event/*tmlogin*/nextunfinned?simochat=1)
                  </Code>
                </pre>
              }
              title='Example Command to create a Nightbot Command'
            />
            <ExpandBox
              title='How to create Command in Nightbot Webinterface?'
              content={
                <WebHowTo
                  command='!nextunfinned'
                  message='Next unfinished map in $(urlfetch https://api.kacky.gg/event/*tmlogin*/nextunfinned?simochat=1)'
                />
              }
            />
          </VStack>
        </Flex>

        <Flex
          bg='gray.700'
          border={1}
          borderRadius={16}
          px={5}
          pt={0}
          pb={5}
          mt={4}
          // alignItems="center"
          direction='column'
        >
          <Text
            fontSize='2xl'
            fontWeight='400'
            textDecoration='underline'
            textUnderlineOffset='0.2em'
            pt={5}
          >
            Stats for Other Players
          </Text>
          <p>
            The api is public. This means, if you want to query stats for other
            players by doing commands like <Code>!finned tmlogin</Code>, feel
            free to do so. You then have to replace <Code>*tmlogin*</Code> in
            the
            <Code>$urlfetch()</Code> part with <Code>$(1)</Code>.<br />
            Just keep a cooldown, as usual :)
          </p>
        </Flex>

        <Flex
          bg='gray.700'
          border={1}
          borderRadius={16}
          px={5}
          pt={0}
          pb={5}
          mt={4}
          // alignItems="center"
          direction='column'
        >
          <Text
            fontSize='2xl'
            fontWeight='400'
            textDecoration='underline'
            textUnderlineOffset='0.2em'
            pt={5}
          >
            Hidden Dashboards
          </Text>
          <HStack>
            <Box w='50%'>
              <p>
                Some might prefer to have a visual schedule on-stream. For this,
                you might want to check out{' '}
                <Link href='https://kacky.gg/glance'>
                  https://kacky.gg/glance
                </Link>
                <br />
                Currently only a vertical layout exists. If you have another
                idea, DM corkscrew.
                <br />
                For full functionality I recommend being logged in and setting
                your TM/Ubisoft login in the Profile.&nbsp; If you did that,
                green map numbers mark that a map is finished, the bar below
                shows how long the map is playing already.
              </p>
            </Box>
            <Center w='50%'>
              <Image
                w={314}
                src='https://static.kacky.gg/misc/glance_example.jpg'
              />
            </Center>
          </HStack>
        </Flex>
      </div>
    </Center>
  </Stack>
);

export default StreamerInfo;
