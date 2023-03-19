import { Box, Icon, Text } from '@chakra-ui/react';
import {
  MdAccountCircle, MdBarChart,
  MdOutlineSportsScore,
} from 'react-icons/md';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';

const columnHelper = createColumnHelper();

const defaultColumns = [
  columnHelper.accessor("rank", {
    id: "rank",
    header: () => <Text>Rank</Text>,
    cell: info => <Text>{info.getValue()}</Text>
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
        { /* eslint-disable-next-line react/no-danger */ }
        <div dangerouslySetInnerHTML={{ __html: info.getValue() }} />
      </Box>
    ),
  }),
  columnHelper.accessor('login', {
    id: 'login',
    header: () => (
      <Icon boxSize="16px" as={MdAccountCircle} />
    ),
    cell: info => (<Text>{info.getValue()}</Text>
    ),
  }),
  columnHelper.accessor('fins', {
    id: 'fins',
    width: "20rem",
    header: () => (
      <>
        <Icon boxSize="16px" as={MdOutlineSportsScore} />
        <Text>#Fins</Text>
      </>
    ),
    cell: info => (<Text>{info.getValue()}</Text>),
  }),
  columnHelper.accessor('avg', {
    id: 'avg',
    header: () => (
      <>
        <Icon boxSize="16px" as={MdBarChart} />
        <Text>avg</Text>
      </>
    ),
    cell: info => (<Text>{parseFloat(info.getValue()).toFixed(3)}</Text>
    ),
  }),
];

export default defaultColumns;