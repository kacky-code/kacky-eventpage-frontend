import React from 'react';

import { Icon, Text, HStack, Badge, Tooltip } from '@chakra-ui/react';

import {
  MdOutlineCheckCircle,
  MdTag,
  MdLabelOutline,
  MdTimeline,
  MdAccessTime,
  MdStars,
  MdOutlineLeaderboard,
  MdOutlinePlayCircle,
} from 'react-icons/md';

import { createColumnHelper } from '@tanstack/react-table';

import { DateTime } from 'luxon';

import MapNumberCell from '../HuntingScheduleTableCells/MapNumberCell';
import MapFinishedCell from '../HuntingScheduleTableCells/MapFinishedCell';
import MapClipCell from '../HuntingScheduleTableCells/MapClipCell';
import { diffBadgeColorArr } from '../HuntingScheduleTableCells/MapDifficultyCell';

const columnHelper = createColumnHelper();

function mapsSort(rowA, rowB) {
  if (
    rowA.getValue('finished') +
      rowA.getValue('difficulty') / 10 +
      rowA.original.rating / 1000 >
    rowB.getValue('finished') +
      rowB.getValue('difficulty') / 10 +
      rowB.original.rating / 1000
  ) {
    return 1;
  }
  if (
    rowA.getValue('finished') +
      rowA.getValue('difficulty') / 10 +
      rowA.original.rating / 1000 <
    rowB.getValue('finished') +
      rowB.getValue('difficulty') / 10 +
      rowB.original.rating / 1000
  ) {
    return -1;
  }
  return 0;
}

const defaultColumns = [
  columnHelper.accessor('finished', {
    id: 'finished',
    width: '20rem',
    header: () => <Icon boxSize="16px" as={MdOutlineCheckCircle} />,
    cell: info => <MapFinishedCell finished={info.getValue()} />,
    sortingFn: (rowA, rowB) => mapsSort(rowA, rowB),
  }),
  columnHelper.accessor('difficulty', {
    id: 'difficulty',
    header: () => <Icon boxSize="16px" as={MdTimeline} />,
    cell: info => (
      <Tooltip label={info.row.original.rating} placement="end">
        <Badge variant={diffBadgeColorArr[info.getValue().toString()].variant}>
          &nbsp;&nbsp;
        </Badge>
      </Tooltip>
    ),
    sortingFn: (rowA, rowB) => mapsSort(rowA, rowB),
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
        version={info.row.original.version}
      />
    ),
  }),
  columnHelper.accessor('author', {
    id: 'author',
    header: () => (
      <>
        <Icon boxSize="16px" as={MdLabelOutline} />
        <Text display={{ base: 'none', lg: 'inline' }}>Author</Text>
      </>
    ),
    cell: info => (
      <Text letterSpacing="0.1em" textShadow="glow" fontSize="l">
        {' '}
        {info.getValue().toString()}
      </Text>
    ),
  }),
  columnHelper.accessor('wrScore', {
    id: 'wrScore',
    header: () => (
      <>
        <Icon boxSize="16px" as={MdStars} />
        <Text display={{ base: 'none', lg: 'inline' }}>WR</Text>
      </>
    ),
    cell: info => (
      <Text letterSpacing="0.1em" textShadow="glow" fontSize="l">
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
        <Icon boxSize="16px" as={MdStars} />
        <Text display={{ base: 'none', lg: 'inline' }}>WR Holder</Text>
      </>
    ),
    cell: info => (
      <Text letterSpacing="0.1em" textShadow="glow" fontSize="l">
        {' '}
        {info.getValue().toString()}
      </Text>
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
      <Text letterSpacing="0.1em" textShadow="glow" fontSize="l">
        {info.getValue() !== 0
          ? DateTime.fromMillis(info.getValue()).toFormat('mm:ss.SSS')
          : '-'}
      </Text>
    ),
  }),
  columnHelper.accessor('kackyRank', {
    id: 'kackyRank',
    header: () => (
      <>
        <Icon boxSize="16px" as={MdOutlineLeaderboard} />
        <Text display={{ base: 'none', lg: 'inline' }}>Kacky Rank</Text>
      </>
    ),
    cell: info => (
      <HStack>
        <Text letterSpacing="0.1em" textShadow="glow" fontSize="l">
          {info.getValue() !== 0 ? '#' : ''}
        </Text>
        <Text letterSpacing="0.1em" textShadow="glow">
          {info.getValue() !== 0 ? info.getValue() : '-'}
        </Text>
      </HStack>
    ),
    sortUndefined: 1,
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
