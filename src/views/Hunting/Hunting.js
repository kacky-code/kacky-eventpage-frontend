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
  useColorMode,
} from '@chakra-ui/react';

import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
  useSortBy, getExpandedRowModel,
} from '@tanstack/react-table';

import { useQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';

import AuthContext from '../../context/AuthContext';

import defaultColumns from './Hunting.service';
import { getSpreadsheetData, getAllEvents, getPersonalBests } from '../../api/api';
import MapDetailCell from '../HuntingScheduleTableCells/MapDetailCell';

const Hunting = () => {
  const defaultType = 'kk';
  const defaultEdition = 1;

  const { authentication } = useContext(AuthContext);

  const [tableData, setTableData] = useState(() => []);
  // eslint-disable-next-line no-unused-vars
  const [columns, setColumns] = useState(() => [...defaultColumns]);

  function selectorArrayParse(array) {
    const options = []
    /* eslint-disable no-plusplus */
    for (let i = 0; i < array.length; i++) {
      options.push(<option key={i} value={array[i].type + array[i].edition} type={array[i].type} edition={array[i].edition}>{array[i].name}</option>)
    }
    return options;
  }

  const [curEventType, setCurEventType] = useState(defaultType);
  const [curEventEdition, setCurEventEdition] = useState(defaultEdition);
  const [curEventSelector, setCurEventSelector] = useState(curEventType + curEventEdition);

  function mergeSpreadsheetAndPBs(sheet, pb) {
    const formattedData = [];

    sheet.forEach(map => {
      const formattedMap = {
        finished: map.finished || false,
        number: map.kacky_id.toString(),
        author: map.author,
        difficulty: map.map_diff || 0,
        personalBest: 0,
        kackyRank: 0,
        clip: map.clip || '',
        discordPing: map.alarm || false,
        wrScore: map.wr_score,
        wrHolder: map.wr_holder
      };
      if (pb[formattedMap.number] !== undefined) {
        formattedMap.finished = true;
        formattedMap.personalBest = pb[formattedMap.number].score;
        formattedMap.kackyRank = pb[formattedMap.number].kacky_rank;
      }
      formattedData.push(formattedMap);
    });
    return formattedData;
  }

  function handleChange(event) {
    const option = event.target.selectedOptions[0];
    setCurEventType(option.getAttribute('type'));
    setCurEventEdition(Number(option.getAttribute('edition')));
    setCurEventSelector(option.getAttribute('type')+option.getAttribute('edition'));
    Promise.all([
      getSpreadsheetData(authentication.token, option.getAttribute('type'), option.getAttribute('edition')),
      getPersonalBests(option.getAttribute('type'), "amgreborn")
    ]).then(queryResults => {
      const newSheet = mergeSpreadsheetAndPBs(queryResults[0], queryResults[1]);
      setTableData(newSheet);
    });
  }

  const [kkArray, setKkArray] = useState([]);
  const [krArray, setKrArray] = useState([]);

  useEffect(() => {
    getAllEvents()
      .then(json => json.filter(event => event.type === 'KK')
        .map(event => ({...event, type: event.type.toLowerCase(), edition: event.edition})))
      .then(array => setKkArray(selectorArrayParse(array)));
    getAllEvents()
      .then(json => json.filter(event => event.type === 'KR')
        .map(event => ({...event, type: event.type.toLowerCase(), edition: event.edition})))
      .then(array => setKrArray(selectorArrayParse(array)));
  }, []);

  const { data: sheetData, isSuccess: sheetIsSuccess } = useQuery(['maps', authentication.token], () =>
    getSpreadsheetData(authentication.token, curEventType, curEventEdition)
  );

  const { data: pbs, isSuccess: pbsIsSuccess } = useQuery(["pbs"], () =>
    getPersonalBests(curEventType, "el-djinn")
  );

  useEffect(() => {
    if (sheetIsSuccess && pbsIsSuccess) {
      const formattedData = mergeSpreadsheetAndPBs(sheetData, pbs);
      setTableData(formattedData);
    }
  }, [sheetData, sheetIsSuccess, pbs, pbsIsSuccess]);

  const [sorting, setSorting] = useState([]);

  const { colorMode } = useColorMode();

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

  const rowBGcolor = (toggled) => {
    if (toggled) {
      return colorMode === "dark" ? "grey" : "lightgrey";
    }
    return colorMode;
  };

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
          <Select w={80} value={ curEventSelector } onChange={event => handleChange(event)}>
            <optgroup label="Kacky Reloaded">
              { krArray }
            </optgroup>
            <optgroup label="Kackiest Kacky">
              { kkArray }
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
                        <MapDetailCell data={row.original} eventtype={curEventType} edition={curEventEdition} mode="hunting"/>
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

export default Hunting;