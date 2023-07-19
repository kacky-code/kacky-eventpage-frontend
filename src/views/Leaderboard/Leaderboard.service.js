import { Box, Icon, Text } from '@chakra-ui/react';
import {
  MdAccountCircle,
  MdBarChart,
  MdOutlineSportsScore,
} from 'react-icons/md';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import '@fontsource/montserrat';

const columnHelper = createColumnHelper();

const fonts = {
  kk: 'trebuchet ms, Helvetica, sans-serif',
  kr: 'Montserrat, Helvetica Neue, Roboto',
};

const defaultColumns = [
  columnHelper.accessor('rank', {
    id: 'rank',
    header: () => <Text>Rank</Text>,
    cell: info => <Text>{info.getValue()}</Text>,
  }),
  columnHelper.accessor('nickname', {
    id: 'nickname',
    header: () => (
      <>
        <Icon boxSize="16px" as={MdAccountCircle} />
        <Text>Nickname</Text>
      </>
    ),
    cell: info => (
      <Box textTransform="none">
        <span style={{ fontFamily: fonts[info.table.options.meta.eventtype] }}>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: info.getValue() }} />
        </span>
      </Box>
    ),
  }),
  columnHelper.accessor('login', {
    id: 'login',
    header: () => <Icon boxSize="16px" as={MdAccountCircle} />,
    cell: info => <Text>{info.getValue()}</Text>,
  }),
  columnHelper.accessor('fins', {
    id: 'fins',
    width: '20rem',
    header: () => (
      <>
        <Icon boxSize="16px" as={MdOutlineSportsScore} />
        <Text>#Fins</Text>
      </>
    ),
    cell: info => <Text>{info.getValue()}</Text>,
  }),
  columnHelper.accessor('avg', {
    id: 'avg',
    header: () => (
      <>
        <Icon boxSize="16px" as={MdBarChart} />
        <Text>avg</Text>
      </>
    ),
    cell: info => <Text>{parseFloat(info.getValue()).toFixed(3)}</Text>,
  }),
];

export default defaultColumns;
