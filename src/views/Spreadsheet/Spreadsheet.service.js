import React from 'react';

import { Icon, Text, HStack } from '@chakra-ui/react';

import {
  MdOutlineCheckCircle,
  MdTag,
  MdOutlineLabel,
  MdAccessTime,
  // eslint-disable-next-line no-unused-vars
  MdOutlineLeaderboard,
  MdOutlinePlayCircle,
  MdOutlineDns,
} from 'react-icons/md';

// eslint-disable-next-line no-unused-vars
import { FaDiscord } from 'react-icons/fa';

import { createColumnHelper } from '@tanstack/react-table';

import { DateTime } from 'luxon';

import MapNumberCell from './MapNumberCell';
import MapDifficultyCell from './MapDifficultyCell';
import MapFinishedCell from './MapFinishedCell';
import MapClipCell from './MapClipCell';
// eslint-disable-next-line no-unused-vars
import MapDiscordCell from './MapDiscordCell';

const columnHelper = createColumnHelper();

const defaultColumns = [
  columnHelper.accessor('finished', {
    id: 'finished',
    header: () => <Icon boxSize="16px" as={MdOutlineCheckCircle} />,
    cell: info => <MapFinishedCell finished={info.getValue()} />,
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
        author={info.row.original.author}
        finished={info.row.original.finished}
        number={info.getValue().toString()}
      />
    ),
  }),
  columnHelper.accessor('author', {
    id: 'author',
    header: () => (
      <>
        <Icon boxSize="16px" as={MdTag} />
        <Text display={{ base: 'none', lg: 'inline' }}>Author</Text>
      </>
    ),
    cell: info => (
      <Text fontSize="xs" letterSpacing="0.1em">
        {' '}
        {info.getValue().toString()}
      </Text>
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
      <MapDifficultyCell
        difficulty={info.getValue()}
        rowIndex={info.row.index}
        table={info.table}
        mapId={info.row.original.number}
      />
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
          visibility={info.getValue() >= 60 ? 'visible' : 'hidden'}
          letterSpacing="0.1em"
          textShadow="glow"
          fontSize="xl"
          fontWeight="medium"
        >
          {DateTime.fromSeconds(info.getValue() * 60).toFormat('h') - 1}
        </Text>
        <Text
          visibility={info.getValue() >= 60 ? 'visible' : 'hidden'}
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
          {DateTime.fromSeconds(info.getValue() * 60).toFormat('mm')}
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
          {info.getValue()}
        </Text>
      </HStack>
    ),
  }),
  /* columnHelper.accessor('personalBest', {
    id: 'personalBest',
    header: () => (
      <>
        <Icon boxSize="16px" as={MdAccessTime} />
        <Text display={{ base: 'none', lg: 'inline' }}>PB</Text>
      </>
    ),
    cell: info => (
      <Text letterSpacing="0.1em" textShadow="glow">
        {info.getValue() !== 0
          ? DateTime.fromMillis(info.getValue()).toFormat('mm:ss.SSS')
          : '-'}
      </Text>
    ),
  }), */
  /* columnHelper.accessor('local', {
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
          {info.getValue() !== 0 ? info.getValue() : '-'}
        </Text>
      </HStack>
    ),
  }), */
  columnHelper.accessor('clip', {
    id: 'clip',
    header: () => (
      <>
        <Icon boxSize="16px" as={MdOutlinePlayCircle} />
        <Text display={{ base: 'none', lg: 'inline' }}>Clip</Text>
      </>
    ),
    cell: info => (
      <MapClipCell
        rowIndex={info.row.index}
        table={info.table}
        mapId={info.row.original.number}
        clip={info.getValue()}
      />
    ),
  }),
  /* columnHelper.accessor('discordPing', {
    id: 'discordPing',
    header: () => (
      <>
        <Icon boxSize="16px" as={FaDiscord} />
        <Text display={{ base: 'none', lg: 'inline' }}>Ping</Text>
      </>
    ),
    cell: info => (
      <MapDiscordCell
        rowIndex={info.row.index}
        table={info.table}
        mapId={info.row.original.number}
        discordPing={info.getValue()}
      />
    ),
  }), */
];

export default defaultColumns;
