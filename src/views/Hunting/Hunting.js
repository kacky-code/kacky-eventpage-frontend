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
  Select,
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

import { useQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';

import AuthContext from '../../context/AuthContext';

import defaultColumns from './Hunting.service';
import { getSpreadsheetData } from '../../api/api';

const Hunting = () => {
  const { authentication } = useContext(AuthContext);

  const [tableData, setTableData] = useState(() => []);
  // eslint-disable-next-line no-unused-vars
  const [columns, setColumns] = useState(() => [...defaultColumns]);

  const { data, isSuccess } = useQuery(['maps', authentication.token], () =>
    getSpreadsheetData(authentication.token)
  );
  useEffect(() => {
    if (isSuccess) {
      const formattedData = [];

      if (authentication.isLoggedIn) {
        data.forEach(map => {
          const formattedMap = {
            finished: map.finished,
            number: map.kacky_id.toString(),
            author: map.author,
            difficulty: map.map_diff,
            personalBest: map.map_pb,
            worldRecord: false,
            local: map.map_rank,
            clip: map.clip,
          };
          formattedData.push(formattedMap);
        });
      } else {
        data.forEach(map => {
          const formattedMap = {
            finished: false,
            number: map.kacky_id.toString(),
            author: map.author,
            difficulty: 0,
            personalBest: 0,
            worldRecord: 0,
            local: 0,
            clip: '',
          };
          formattedData.push(formattedMap);
        });
      }
      setTableData(formattedData);
    }
  }, [data, authentication.isLoggedIn, isSuccess]);

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
        <Heading>Hunt Previous Events</Heading>
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
          <Text letterSpacing="0.1em" textShadow="glow" style={{marginLeft: 'auto'}}>
            Select Kacky Edition :
          </Text>
          <Select w={80}>
            <optgroup label="Kacky Reloaded">
              <option value="kr3">Kacky Reloaded 3</option>
              <option value="kr2">Kacky Reloaded 2</option>
              <option value="kr1">Kacky Reloaded 1</option>
            </optgroup>
            <optgroup label="Kackiest Kacky">
              <option value="kk7">Kackiest Kacky 7</option>
              <option value="kk6">Kackiest Kacky 6</option>
              <option value="kk5">Kackiest Kacky 5</option>
              <option value="kk4">Kackiest Kacky 4</option>
              <option value="kk3">Kackiest Kacky 3</option>
              <option value="kk2">Kackiest Kacky 2</option>
              <option value="kk1">Kackiest Kacky 1</option>
            </optgroup>
          </Select>
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

export default Hunting;