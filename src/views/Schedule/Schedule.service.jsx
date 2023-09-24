import React from 'react';

import { Icon, Text, HStack, Badge } from '@chakra-ui/react';

import {
  MdOutlineCheckCircle,
  MdTag,
  MdLabelOutline,
  MdTimeline,
  MdAccessTime,
  MdStars,
  MdOutlineLeaderboard,
  MdOutlinePlayCircle,
  MdOutlineDns,
} from 'react-icons/md';

// eslint-disable-next-line no-unused-vars
import { FaDiscord } from 'react-icons/fa';

import { createColumnHelper } from '@tanstack/react-table';

import { DateTime } from 'luxon';

import MapNumberCell from '../HuntingScheduleTableCells/MapNumberCell';
import MapFinishedCell from '../HuntingScheduleTableCells/MapFinishedCell';
import MapClipCell from '../HuntingScheduleTableCells/MapClipCell';
// eslint-disable-next-line no-unused-vars
import MapDiscordCell from '../HuntingScheduleTableCells/MapDiscordCell';

const columnHelper = createColumnHelper();

const diffColorArr = [
  'outline',
  'white',
  'green',
  'yellow',
  'orange',
  'red',
  'purple',
];

const defaultColumns = [
  columnHelper.accessor('finished', {
    id: 'finished',
    width: '20rem',
    header: () => <Icon boxSize='16px' as={MdOutlineCheckCircle} />,
    cell: info => <MapFinishedCell finished={info.getValue()} />,
    sortingFn: (rowA, rowB) => {
      if (
        rowA.getValue('finished') + rowA.getValue('difficulty') / 10 >
        rowB.getValue('finished') + rowB.getValue('difficulty') / 10
      ) {
        return 1;
      }
      if (
        rowA.getValue('finished') + rowA.getValue('difficulty') / 10 <
        rowB.getValue('finished') + rowB.getValue('difficulty') / 10
      ) {
        return -1;
      }
      return 0;
    },
  }),
  columnHelper.accessor('difficulty', {
    id: 'difficulty',
    header: () => <Icon boxSize='16px' as={MdTimeline} />,
    cell: info => (
      <Badge variant={diffColorArr[info.getValue().toString()]}>
        &nbsp;&nbsp;
      </Badge>
    ),
    sortingFn: (rowA, rowB) => {
      if (
        rowA.getValue('finished') / 10 + rowA.getValue('difficulty') >
        rowB.getValue('finished') / 10 + rowB.getValue('difficulty')
      ) {
        return 1;
      }
      if (
        rowA.getValue('finished') / 10 + rowA.getValue('difficulty') <
        rowB.getValue('finished') / 10 + rowB.getValue('difficulty')
      ) {
        return -1;
      }
      return 0;
    },
  }),
  columnHelper.accessor('number', {
    id: 'number',
    header: () => (
      <>
        <Icon boxSize='16px' as={MdTag} />
        <Text display={{ base: 'none', lg: 'inline' }}>Map</Text>
      </>
    ),
    cell: info => (
      <MapNumberCell
        author={info.row.original.author}
        finished={info.row.original.finished}
        number={info.getValue().toString()}
        version={info.row.original.version}
      />
    ),
  }),
  columnHelper.accessor('author', {
    id: 'author',
    header: () => (
      <>
        <Icon boxSize='16px' as={MdLabelOutline} />
        <Text display={{ base: 'none', lg: 'inline' }}>Author</Text>
      </>
    ),
    cell: info => (
      <Text letterSpacing='0.1em' textShadow='glow' fontSize='l'>
        {' '}
        {info.getValue().toString()}
      </Text>
    ),
  }),
  columnHelper.accessor('upcomingIn', {
    id: 'upcomingIn',
    header: () => (
      <>
        <Icon boxSize='16px' as={MdAccessTime} />
        <Text display={{ base: 'none', lg: 'inline' }}>Upcoming In</Text>
      </>
    ),
    cell: info => (
      <HStack spacing={1}>
        <Text
          visibility={info.getValue() >= 60 ? 'visible' : 'hidden'}
          letterSpacing='0.1em'
          textShadow='glow'
          fontSize='lg'
          fontWeight='medium'
        >
          {String(Math.floor(info.getValue() / 60)).padStart(2, '0')}
        </Text>
        <Text
          visibility={info.getValue() >= 60 ? 'visible' : 'hidden'}
          textTransform='lowercase'
        >
          h
        </Text>
        <Text
          pl='2'
          letterSpacing='0.1em'
          textShadow='glow'
          fontSize='lg'
          fontWeight='medium'
        >
          {String(info.getValue() % 60).padStart(2, '0')}
        </Text>
        <Text textTransform='lowercase'>m</Text>
      </HStack>
    ),
  }),
  columnHelper.accessor('server', {
    id: 'server',
    header: () => (
      <>
        <Icon boxSize='16px' as={MdOutlineDns} />
        <Text display={{ base: 'none', lg: 'inline' }}>On Server</Text>
      </>
    ),
    cell: info => (
      <HStack>
        <Text textShadow='glow' fontSize='lg' fontWeight='hairline'>
          #
        </Text>
        <Text textShadow='glow' fontSize='lg' fontWeight='medium'>
          {info.getValue()}
        </Text>
      </HStack>
    ),
  }),
  columnHelper.accessor('personalBest', {
    id: 'personalBest',
    header: () => (
      <>
        <Icon boxSize='16px' as={MdAccessTime} />
        <Text display={{ base: 'none', lg: 'inline' }}>PB</Text>
      </>
    ),
    cell: info => (
      <Text letterSpacing='0.1em' textShadow='glow'>
        {info.getValue() !== 0
          ? DateTime.fromMillis(info.getValue()).toFormat('mm:ss.SSS')
          : '-'}
      </Text>
    ),
  }),
  columnHelper.accessor('wrScore', {
    id: 'wrScore',
    header: () => (
      <>
        <Icon boxSize='16px' as={MdStars} />
        <Text display={{ base: 'none', lg: 'inline' }}>WR</Text>
      </>
    ),
    cell: info => (
      <Text letterSpacing='0.1em' textShadow='glow'>
        {info.getValue() !== 0
          ? DateTime.fromMillis(info.getValue()).toFormat('mm:ss.SSS')
          : '-'}
      </Text>
    ),
  }),
  columnHelper.accessor('wrHolder', {
    id: 'wrHolder',
    header: () => (
      <>
        <Icon boxSize='16px' as={MdStars} />
        <Text display={{ base: 'none', lg: 'inline' }}>WR Holder</Text>
      </>
    ),
    cell: info => (
      <Text letterSpacing='0.1em' textShadow='glow'>
        {info.getValue() !== '' ? info.getValue() : '-'}
      </Text>
    ),
  }),
  columnHelper.accessor('kackyRank', {
    id: 'kackyRank',
    header: () => (
      <>
        <Icon boxSize='16px' as={MdOutlineLeaderboard} />
        <Text display={{ base: 'none', lg: 'inline' }}>Local</Text>
      </>
    ),
    cell: info => (
      <HStack>
        <Text textShadow='glow' fontSize='lg' fontWeight='hairline'>
          {info.getValue() !== 0 ? '#' : ''}
        </Text>
        <Text textShadow='glow' fontSize='lg' fontWeight='medium'>
          {info.getValue() !== 0 ? info.getValue() : '-'}
        </Text>
      </HStack>
    ),
  }),
  columnHelper.accessor('clip', {
    id: 'clip',
    header: () => (
      <>
        <Icon boxSize='16px' as={MdOutlinePlayCircle} />
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
  columnHelper.accessor('discordPing', {
    id: 'discordPing',
    header: () => (
      <>
        <Icon boxSize='16px' as={FaDiscord} />
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
  }),
];

export default defaultColumns;
