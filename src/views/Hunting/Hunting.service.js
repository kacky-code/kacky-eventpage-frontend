import React from 'react';

import { Icon, Text, HStack } from '@chakra-ui/react';

import {
  MdOutlineCheckCircle,
  MdTag,
  MdOutlineLabel,
  MdAccessTime,
  MdStars,
  // eslint-disable-next-line no-unused-vars
  MdOutlineLeaderboard,
  MdOutlinePlayCircle,
} from 'react-icons/md';

import { createColumnHelper } from '@tanstack/react-table';

import { DateTime } from 'luxon';

import MapNumberCell from '../HuntingScheduleTableCells/MapNumberCell';
import MapDifficultyCell from '../HuntingScheduleTableCells/MapDifficultyCell';
import MapFinishedCell from '../HuntingScheduleTableCells/MapFinishedCell';
import MapClipCell from '../HuntingScheduleTableCells/MapClipCell';

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
        {info.getValue() !== 0
          ? DateTime.fromMillis(info.getValue()).toFormat('mm:ss.SSS')
          : '-'}
      </Text>
    ),
  }),
  columnHelper.accessor('worldRecord', {
    id: 'worldRecord',
    header: () => (
      <>
        <Icon boxSize="16px" as={MdStars} />
        <Text display={{ base: 'none', lg: 'inline' }}>WR</Text>
      </>
    ),
    cell: info => (
      <Text letterSpacing="0.1em" textShadow="glow">
        {info.getValue() !== 0 ? info.getValue() : '-'}
        {/* {info.getValue() !== 0
          ? DateTime.fromMillis(info.getValue()).toFormat('mm:ss.SSS')
          : '-'} */}
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
          {info.getValue() !== 0 ? '#' : ''}
        </Text>
        <Text textShadow="glow" fontSize="xl" fontWeight="medium">
          {info.getValue() !== 0 ? info.getValue() : '-'}
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
    cell: info => (
      <MapClipCell
        rowIndex={info.row.index}
        table={info.table}
        mapId={info.row.original.number}
        clip={info.getValue()}
      />
    ),
  }),
];

export default defaultColumns;
