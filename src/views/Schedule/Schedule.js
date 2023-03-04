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
  VStack, useColorMode,
} from '@chakra-ui/react';

import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
  useSortBy,
  getExpandedRowModel,
} from '@tanstack/react-table';

import { useVirtualizer } from '@tanstack/react-virtual';

import AuthContext from '../../context/AuthContext';
import EventContext from '../../context/EventContext';

import defaultColumns from './Schedule.service';
import { getScheduleData, getPersonalBests } from '../../api/api';
import MapDetailCell from '../HuntingScheduleTableCells/MapDetailCell';
import { mergeScheduleAndPBs } from '../../components/SheetOperations';

const Spreadsheet = () => {
  const { event } = useContext(EventContext);
  const { authentication } = useContext(AuthContext);

  const [tableData, setTableData] = useState(() => []);
  // eslint-disable-next-line no-unused-vars
  const [columns, setColumns] = useState(() => [...defaultColumns]);

  const [data, setData] = useState(null);
  const [dataIsSuccess, setDataIsSuccess] = useState(false);
  const [pbs, setPbs] = useState(null);
  const [pbsIsSuccess, setPbsIsSuccess] = useState(false);

  useEffect(() => {
    if (event.type && event.edition) {
      setData(null);
      setDataIsSuccess(false);
      getScheduleData(authentication.token)
      .then(response=>{
        setData(response)
        setDataIsSuccess(true);
      })
    }
  }, [event.type, event.edition, authentication.token]);

  useEffect(() => {
    if (event.type && event.edition && authentication.isLoggedIn) {
      setPbs(null);
      setPbsIsSuccess(false);
      getPersonalBests(authentication.token, event.type)
        .then(response=>{
          setPbs(response)
          setPbsIsSuccess(true);
        })
    }
    setPbsIsSuccess(true);
  }, [authentication.token, authentication.isLoggedIn, event.type, event.edition]);

  useEffect(() => {
    if (dataIsSuccess && pbsIsSuccess) {
      const formattedData = mergeScheduleAndPBs(data, pbs);
      setTableData(formattedData);
    }
  }, [data, pbs, dataIsSuccess, pbsIsSuccess]);

  const [sorting, setSorting] = useState([]);

  const [expanded, setExpanded] = useState({})

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      expanded,
      columnVisibility: {
        finished: authentication.isLoggedIn,
        difficulty: false,
        personalBest: authentication.isLoggedIn,
        local: authentication.isLoggedIn,
        wrScore: !authentication.isLoggedIn,
        wrHolder: !authentication.isLoggedIn,
        clip: false,
        discordPing: false,
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
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel()
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

  const { colorMode } = useColorMode();

  const rowBGcolor = (toggled) => {
    if (toggled) {
      return colorMode === "dark" ? "grey" : "lightgrey";
    }
    return colorMode;
  };

  return (
    <Center mb={{ base: 24, md: 8 }} px={{ base: 4, md: 8 }} w="full">
      <VStack overflow="hidden" spacing={4}>
      <Heading>{event.type === "kk" ? "Kackiest Kacky" : "Kacky Reloaded"} {event.edition} Schedule</Heading>
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
                  <>
                    <Tr key={row.id} onClick={() => row.toggleExpanded()} bg={rowBGcolor(row.getIsExpanded())}>
                      {row.getVisibleCells().map(cell => (
                        <Td key={cell.id} background={!row.getIsExpanded()}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Td>
                      ))}
                    </Tr>
                    <Tr key={row.id.concat("-collapse")} display={row.getIsExpanded() ? "relative" : "none"}>
                      <Td key={row.id.concat("-collapse-elem")} colSpan={table.getHeaderGroups()[0].headers.length}>
                        <MapDetailCell data={row.original} eventtype={event.type} edition={event.edition} mode="schedule" table={table} rowIndex={row.index}/>
                      </Td>
                    </Tr>
                  </>
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
