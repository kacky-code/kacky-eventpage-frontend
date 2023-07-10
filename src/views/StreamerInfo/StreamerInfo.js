/* eslint-disable react/jsx-no-comment-textnodes */
import {
  Text,
  Stack,
  Center, ListItem, List, Code, Link,
} from '@chakra-ui/react';
import React from 'react';

const StreamerInfo = () => (
    <Stack spacing={16} mt={8} mb={32} px={{ base: 4, md: 8 }}>
      <Center pt={2}>
        <div style={{textAlign: "left", width: "66%", lineHeight: "2", fontSize: "larger", textTransform: "none"}} >
          <Text fontSize="2xl" fontWeight="400" textDecoration="underline" textUnderlineOffset="0.2em">Kacky API for Streamers</Text>
          <Text fontSize="xl" fontWeight="400" textDecoration="underline" textUnderlineOffset="0.2em" pt={5}>General Setup</Text>
          <p>To get the data, you will have to use the <Code>$(urlfetch)</Code> command which calls the API and returns
            you a string. Usually the values returned from the API are in a format that you can just show them. If you
            need another format, please contact <Code>corkscrew.</Code> on Discord (or tell me how to change the format in the call,
            so I can document it here - i have no clue about twitch to be honest).</p>
          <p>Either you use Nightbot&#39;s graphical interface and add the <Code>$(urlfetch)</Code> part in
            the &quot;Message&quot; field or you use the <Code>!addcom</Code> command in chat. <strong>PLEASE SET A
              TIMEOUT!</strong> Dont ddos my poor server from your chat. 1s should be fine, that prevents multiple
            queries at once.</p>
          <p>Things like <Code>*YourNameHere*</Code> or <Code>*tmlogin*</Code> should be replaced by
            you! <Code>tmlogin</Code> either is the login of the account in TMNF/KK or your Ubisoft Username for
            TM20/KR. </p>
          <Text fontSize="2xl" fontWeight="400" textDecoration="underline" textUnderlineOffset="0.2em" pt={5}>List of Finished Maps</Text>
          <Text fontSize="m" fontWeight="400" textDecoration="underline" textUnderlineOffset="0.2em" pt={5}>Query Endpoints:</Text>
          <List>
            <ListItem>
              <Code>https://api.kacky.info/event/*tmlogin*/finned?string=ids</Code>
            </ListItem>
            <ListItem>
          <Code>https://api.kacky.info/event/*tmlogin*/finned?string=scores</Code>
            </ListItem>
            <ListItem>
          <Code>https://api.kacky.info/event/*tmlogin*/finned?string=ranks</Code>
            </ListItem>
          </List>
          <p>Depending on the argument you provide to <Code>strings</Code> you either get a list of all KackyID&#39;s
            you finished, <Code>scores</Code> adds PBs for each map, and <Code>ranks</Code> shows the Kacky Rank per
            map.</p>
          <Text fontSize="m" fontWeight="400" textDecoration="underline" textUnderlineOffset="0.2em" pt={5}>Example:</Text>
          <pre><Code>!addcom !finned -cd=1 *YourNameHere* finished these maps: $(urlfetch https://api.kacky.info/event/*tmlogin*/finned?string=ids)
</Code></pre>
          <Text fontSize="2xl" fontWeight="400" textDecoration="underline" textUnderlineOffset="0.2em" pt={5}>List of Unfinished Maps</Text>
          <Text fontSize="m" fontWeight="400" textDecoration="underline" textUnderlineOffset="0.2em" pt={5}>Query Endpoints:</Text>
          <pre><Code>https://api.kacky.info/event/*tmlogin*/unfinned?string=1
</Code></pre>
          <p>List of maps that are not yet finished by the provided login.</p>
          <Text fontSize="m" fontWeight="400" textDecoration="underline" textUnderlineOffset="0.2em" pt={5}>Example:</Text>
          <pre><Code>!addcom !unfinned -cd=1 *YourNameHere* is missing these maps: $(urlfetch https://api.kacky.info/event/*tmlogin*/unfinned?string=1)
</Code></pre>
          <Text fontSize="2xl" fontWeight="400" textDecoration="underline" textUnderlineOffset="0.2em" pt={5}>Time to Next Unfinished Map</Text>
          <Text fontSize="m" fontWeight="400" textDecoration="underline" textUnderlineOffset="0.2em" pt={5}>Query Endpoints:</Text>
          <pre><Code>https://api.kacky.info/event/*tmlogin*/nextunfinned?simochat=1
</Code></pre>
          <p>Searched for the unfinished map of <Code>tmlogin</Code> which is played next and returns when it is
            played. <Code>simochat</Code> is a dumb parameter name, might (should definitely) change before KR4</p>
          <Text fontSize="m" fontWeight="400" textDecoration="underline" textUnderlineOffset="0.2em" pt={5}>Example:</Text>
          <pre><Code>!addcom !nextunfinned -cd=1 Next unfinished map in $(urlfetch https://api.kacky.info/event/*tmlogin*/nextunfinned?simochat=1)
</Code></pre>
          <Text fontSize="2xl" fontWeight="400" textDecoration="underline" textUnderlineOffset="0.2em" pt={5}>Stats for Other Players</Text>
          <p>API is public and I only enforce rate limiting (dw, that&#39;s mostly so I can react to DDOS attacks,
            shouldn&#39;t bother you to much). This means, if you want to query stats for other players by doing
            commands like <Code>!finned tmlogin</Code>, feel free to do so. Just keep a cooldown, as usual :)</p>
          <Text fontSize="2xl" fontWeight="400" textDecoration="underline" textUnderlineOffset="0.2em" pt={5}>Hidden Dashboards</Text>
          <p>Some might prefer to have a visual schedule on-stream. For this, you might want to check out <Link
            href="https://kacky.gg/glance">https://kacky.gg/glance</Link></p>
        </div>
      </Center>
    </Stack>
  );

export default StreamerInfo;
