import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';
import EventContext from '../../context/EventContext';
import AuthContext from '../../context/AuthContext';
import defaultColumns from './Leaderboard.service';
import { getLeaderBoardPage, getLeaderBoardPlayer } from '../../api/api';

const Leaderboard = () => {
  const { event } = useContext(EventContext);
  const { authentication } = useContext(AuthContext);

  const [tableData, setTableData] = useState(() => []);
  // eslint-disable-next-line no-unused-vars
  const [columns, setColumns] = useState(() => [...defaultColumns]);

  const [data, setData] = useState(null);

  useEffect(() => {
    if (event.type && event.edition) {
      setData(null);
      getLeaderBoardPage(authentication.token, 0, 10).then(response => {
        setData(response);
      });
    }
  }, [event.type, event.edition, authentication.token]);

  useEffect(() => {
    const board = [];
    if (data === null || data === undefined) {
      return;
    }
    let counter = 1;
    data.forEach(entry => {
      const row = {
        rank: entry.rank === undefined ? counter : entry.rank,
        fins: entry.fins,
        nickname: entry.nick,
        login: entry.login,
        avg: entry.avg,
      };
      counter += 1;
      board.push(row);
    });
    setTableData(board);
  }, [data]);

  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      columnVisibility: {
        login: false,
      },
    },
    initialState: {
      sortBy: [
        {
          id: 'fins',
          desc: false,
        },
      ],
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      eventtype: event.type,
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

  const inputRef = useRef(null);

  function searchLogin() {
    if (inputRef.current.value === '') {
      getLeaderBoardPage(authentication.token, 0, 10).then(response => {
        setData(response);
      });
    } else {
      getLeaderBoardPlayer(authentication.token, inputRef.current.value).then(
        response => {
          setData([response]);
        }
      );
    }
  }

  return (
    <Center mb={{ base: 24, md: 8 }} px={{ base: 4, md: 8 }} w="full">
      <VStack overflow="hidden" spacing={4}>
        <Heading>
          {event.type === 'kk' ? 'Kackiest Kacky' : 'Kacky Reloaded'}{' '}
          {event.edition} Leaderboard
        </Heading>
        <HStack w="full">
          <Text letterSpacing="0.1em" textShadow="glow">
            Find a Login:
          </Text>
          <Input
            w={300}
            ref={inputRef}
            onKeyUp={e => (e.key === 'Enter' ? searchLogin() : null)}
            placeholder="tmlogin"
          />
          <Button onClick={() => searchLogin()}>Search</Button>
          <Button
            onClick={() => {
              inputRef.current.value = '';
              searchLogin();
            }}
          >
            Reset
          </Button>
          <Button
            letterSpacing="0.1em"
            textShadow="glow"
            style={{ marginLeft: 'auto' }}
            onClick={() =>
              window.open(
                event.type === 'kk'
                  ? `https://kackiestkacky.com/event/editions/ranking.php?edition=${event.edition}`
                  : `https://kackyreloaded.com/event/editions/ranking.php?edition=${event.edition}`
              )
            }
          >
            Detailed Leaderboard
          </Button>
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

export default Leaderboard;
