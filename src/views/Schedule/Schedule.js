import React, { useRef, useState, useEffect, useContext } from 'react';

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
  Heading,
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
  useSortBy,
} from '@tanstack/react-table';

import { useVirtualizer } from '@tanstack/react-virtual';

import AuthContext from '../../context/AuthContext';
import EventContext from '../../context/EventContext';

import defaultColumns from './Schedule.service';
import { getSpreadsheetData } from '../../api/api';

const Spreadsheet = () => {
  const { event } = useContext(EventContext);
  const { authentication } = useContext(AuthContext);

  const [tableData, setTableData] = useState(() => []);
  // eslint-disable-next-line no-unused-vars
  const [columns, setColumns] = useState(() => [...defaultColumns]);

  const [data, setData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (event.type && event.edition) {
      setData(null);
      setIsSuccess(false);
      getSpreadsheetData(authentication.token, event.type, event.edition)
      .then(response=>{
        setData(response)
        setIsSuccess(true);
      })
    }
  }, [event.type, event.edition, authentication.token]);

  useEffect(() => {
    if (isSuccess) {
      const formattedData = [];

      data.forEach(map => {
        const formattedMap = {
          finished: map.finished || false,
          number: map.kacky_id.toString(),
          author: map.author,
          difficulty: map.map_diff || 0,
          upcomingIn: map.upcomingIn,
          server: map.server,
          personalBest: map.map_pb || 0,
          local: map.map_rank || 0,
          clip: map.clip || '',
          discordPing: map.alarm || false,
          wrScore: map.wr_score || 0,
          wrHolder: map.wr_holder || false
        };
        formattedData.push(formattedMap);
      });
      setTableData(formattedData);
    }
  }, [data, isSuccess]);

  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      columnVisibility: {
        finished: authentication.isLoggedIn,
        difficulty: authentication.isLoggedIn,
        personalBest: authentication.isLoggedIn,
        local: authentication.isLoggedIn,
        clip: authentication.isLoggedIn,
        discordPing: authentication.isLoggedIn,
      },
    },
    initialState: {
      sortBy: [
        {
          id: 'number',
          desc: false,
        },
      ],
    },
    useSortBy,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setTableData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });

  const tableContainerRef = useRef(null);
  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 49,
    overscan: 10,
  });

  const columnFilterValue = table
    .getHeaderGroups()[0]
    .headers[1].column.getFilterValue();

  return (
    <Center mb={{ base: 24, md: 8 }} px={{ base: 4, md: 8 }} w="full">
      <VStack overflow="hidden" spacing={4}>
      <Heading>{event.type === "KK" ? "Kackiest Kacky" : "Kacky Reloaded"} {event.edition} Schedule</Heading>
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
        <TableContainer
          ref={tableContainerRef}
          w="container.xl"
          borderWidth="1px"
          borderRadius="md"
        >
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
              {rowVirtualizer.getVirtualItems().map(virtualRow => {
                const row = rows[virtualRow.index];
                return (
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
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Center>
  );
};

export default Spreadsheet;
