import React from 'react';

import { Icon, Text, Switch, HStack } from '@chakra-ui/react';

import {
  MdOutlineCheckCircle,
  MdTag,
  MdOutlineLabel,
  MdAccessTime,
  MdOutlineLeaderboard,
  MdOutlinePlayCircle,
  MdOutlineDns,
} from 'react-icons/md';

import { FaDiscord } from 'react-icons/fa';

import { createColumnHelper } from '@tanstack/react-table';

import { DateTime } from 'luxon';

import MapNumberCell from './MapNumberCell';
import MapDifficultyCell from './MapDifficultyCell';
import MapFinishedCell from './MapFinishedCell';
import MapClipCell from './MapClipCell';

const data = [
  {
    finished: true,
    number: '151',
    difficulty: 1,
    upcomingIn: 360,
    server: '1',
    personalBest: 514372,
    local: '15',
    clip: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    discordPing: true,
  },
  {
    finished: false,
    number: '152',
    difficulty: 6,
    upcomingIn: 4450,
    server: '2',
    personalBest: 65165,
    local: '4',
    clip: '',
    discordPing: false,
  },
  {
    finished: true,
    number: '153',
    difficulty: 2,
    upcomingIn: 60,
    server: '4',
    personalBest: 123456,
    local: '5',
    clip: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    discordPing: true,
  },
  {
    finished: false,
    number: '154',
    difficulty: 4,
    upcomingIn: 1014,
    server: '1',
    personalBest: 123,
    local: '4',
    clip: '',
    discordPing: false,
  },
  {
    finished: true,
    number: '155',
    difficulty: 3,
    upcomingIn: 360,
    server: '1',
    personalBest: 514372,
    local: '15',
    clip: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    discordPing: true,
  },
  {
    finished: false,
    number: '156',
    difficulty: 0,
    upcomingIn: 4450,
    server: '2',
    personalBest: 65165,
    local: '4',
    clip: '',
    discordPing: false,
  },
  {
    finished: false,
    number: '157',
    difficulty: 5,
    upcomingIn: 60,
    server: '4',
    personalBest: 123456,
    local: '5',
    clip: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    discordPing: true,
  },
  {
    finished: false,
    number: '158',
    difficulty: 4,
    upcomingIn: 1014,
    server: '1',
    personalBest: 123,
    local: '4',
    clip: '',
    discordPing: false,
  },
];

const columnHelper = createColumnHelper();

const defaultColumns = [
  columnHelper.accessor('finished', {
    id: 'finished',
    header: () => <Icon boxSize="16px" as={MdOutlineCheckCircle} />,
    cell: info => <MapFinishedCell finished={info.row.original.finished} />,
  }),
  columnHelper.accessor('number', {
    id: 'number',
    header: () => (
      <>
        <Icon boxSize="16px" as={MdTag} />
        <Text display={{ base: 'none', lg: 'inline' }}>Map</Text>
      </>
    ),
    cell: info => (
      <MapNumberCell
        finished={info.row.original.finished}
        number={info.row.original.number.toString()}
      />
    ),
  }),
  columnHelper.accessor('difficulty', {
    id: 'difficulty',
    header: () => (
      <>
        <Icon boxSize="16px" as={MdOutlineLabel} />
        <Text display={{ base: 'none', lg: 'inline' }}>Difficulty</Text>
      </>
    ),
    cell: info => (
      <MapDifficultyCell difficulty={info.row.original.difficulty} />
    ),
  }),
  columnHelper.accessor('upcomingIn', {
    id: 'upcomingIn',
    header: () => (
      <>
        <Icon boxSize="16px" as={MdAccessTime} />
        <Text display={{ base: 'none', lg: 'inline' }}>Upcoming In</Text>
      </>
    ),
    cell: info => (
      <HStack spacing={1}>
        <Text
          visibility={
            info.row.original.upcomingIn >= 3600 ? 'visible' : 'hidden'
          }
          letterSpacing="0.1em"
          textShadow="glow"
          fontSize="xl"
          fontWeight="medium"
        >
          {DateTime.fromSeconds(info.row.original.upcomingIn).toFormat('h')}
        </Text>
        <Text
          visibility={
            info.row.original.upcomingIn >= 3600 ? 'visible' : 'hidden'
          }
          textTransform="lowercase"
        >
          h
        </Text>
        <Text
          pl="4"
          letterSpacing="0.1em"
          textShadow="glow"
          fontSize="xl"
          fontWeight="medium"
        >
          {DateTime.fromSeconds(info.row.original.upcomingIn).toFormat('mm')}
        </Text>
        <Text textTransform="lowercase">m</Text>
      </HStack>
    ),
  }),
  columnHelper.accessor('server', {
    id: 'server',
    header: () => (
      <>
        <Icon boxSize="16px" as={MdOutlineDns} />
        <Text display={{ base: 'none', lg: 'inline' }}>On Server</Text>
      </>
    ),
    cell: info => (
      <HStack>
        <Text textShadow="glow" fontSize="xl" fontWeight="hairline">
          #
        </Text>
        <Text textShadow="glow" fontSize="xl" fontWeight="medium">
          {info.row.original.server}
        </Text>
      </HStack>
    ),
  }),
  columnHelper.accessor('personalBest', {
    id: 'personalBest',
    header: () => (
      <>
        <Icon boxSize="16px" as={MdAccessTime} />
        <Text display={{ base: 'none', lg: 'inline' }}>PB</Text>
      </>
    ),
    cell: info => (
      <Text letterSpacing="0.1em" textShadow="glow">
        {info.row.original.personalBest !== 0
          ? DateTime.fromMillis(info.row.original.personalBest).toFormat(
              'mm:ss.SSS'
            )
          : '-'}
      </Text>
    ),
  }),
  columnHelper.accessor('local', {
    id: 'local',
    header: () => (
      <>
        <Icon boxSize="16px" as={MdOutlineLeaderboard} />
        <Text display={{ base: 'none', lg: 'inline' }}>Local</Text>
      </>
    ),
    cell: info => (
      <HStack>
        <Text textShadow="glow" fontSize="xl" fontWeight="hairline">
          #
        </Text>
        <Text textShadow="glow" fontSize="xl" fontWeight="medium">
          {info.row.original.local !== 0 ? info.row.original.local : '-'}
        </Text>
      </HStack>
    ),
  }),
  columnHelper.accessor('clip', {
    id: 'clip',
    header: () => (
      <>
        <Icon boxSize="16px" as={MdOutlinePlayCircle} />
        <Text display={{ base: 'none', lg: 'inline' }}>Clip</Text>
      </>
    ),
    cell: info => <MapClipCell clip={info.row.original.clip} />,
  }),
  columnHelper.accessor('discordPing', {
    id: 'discordPing',
    header: () => (
      <>
        <Icon boxSize="16px" as={FaDiscord} />
        <Text display={{ base: 'none', lg: 'inline' }}>Ping</Text>
      </>
    ),
    cell: info => <Switch defaultChecked={info.row.original.discordPing} />,
  }),
];

export { data, defaultColumns };
