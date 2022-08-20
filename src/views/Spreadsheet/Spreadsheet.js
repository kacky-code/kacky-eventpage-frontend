import React, { useState, useEffect, useContext } from 'react';

import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  Box,
  Text,
  Center,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';

import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
} from '@tanstack/react-table';

import { useQuery } from '@tanstack/react-query';

import AuthContext from '../../context/AuthContext';

import { defaultColumns } from './Spreadsheet.service';
import { getSpreadsheetData } from '../../api/api';

const Spreadsheet = () => {
  const { token, isLoggedIn } = useContext(AuthContext);

  const [tableData, setTableData] = useState(() => []);
  // eslint-disable-next-line no-unused-vars
  const [columns, setColumns] = useState(() => [...defaultColumns]);

  const { data, isSuccess } = useQuery(['maps'], () =>
    getSpreadsheetData(token)
  );
  useEffect(() => {
    if (isSuccess) {
      const formattedData = [];
      data.forEach(map => {
        const formattedMap = {
          finished: isLoggedIn ? map.finished : false,
          number: map.kacky_id.toString(),
          difficulty: isLoggedIn ? map.map_diff : 0,
          upcomingIn: map.upcomingIn,
          server: map.server,
          personalBest: isLoggedIn ? map.map_pb : 0,
          local: isLoggedIn ? map.map_rank : 0,
          clip: isLoggedIn ? map.clip : '',
          discordPing: isLoggedIn ? map.alarm : false,
        };
        formattedData.push(formattedMap);
      });
      setTableData(formattedData);
    }
  }, [data, isLoggedIn, isSuccess]);

  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const columnFilterValue = table
    .getHeaderGroups()[0]
    .headers[1].column.getFilterValue();

  return (
    <Center px={{ base: 4, md: 8 }} w="full">
      <VStack overflow="hidden" spacing={4}>
        <HStack w="full">
          <Text letterSpacing="0.1em" textShadow="glow">
            Filter for a Map :
          </Text>
          <Input
            w={20}
            value={columnFilterValue ?? ''}
            onChange={e =>
              table
                .getHeaderGroups()[0]
                .headers[1].column.setFilterValue(e.target.value)
            }
            placeholder="#000"
          />
        </HStack>
        <TableContainer w="container.xl" borderWidth="1px" borderRadius="md">
          <Table size="sm">
            <Thead>
              {table.getHeaderGroups().map(headerGroup => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <Th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <Box
                          display="flex"
                          gap={2}
                          alignItems="center"
                          sx={
                            header.column.getCanSort() && {
                              cursor: 'pointer',
                              select: 'none',
                            }
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <Icon w={4} h={4} as={MdArrowUpward} />,
                            desc: <Icon w={4} h={4} as={MdArrowDownward} />,
                          }[header.column.getIsSorted()] ??
                            (header.column.getCanSort() ? (
                              <Box w={4} h={4} />
                            ) : null)}
                        </Box>
                      )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map(row => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Center>
  );
};

export default Spreadsheet;
