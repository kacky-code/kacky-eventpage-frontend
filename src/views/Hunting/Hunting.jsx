import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  Fragment,
} from 'react';

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
  Select,
  VStack,
  useColorMode,
  Flex,
  Button,
} from '@chakra-ui/react';

import { MdArrowDownward, MdArrowUpward, MdArrowOutward } from 'react-icons/md';

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
  getExpandedRowModel,
} from '@tanstack/react-table';

import { useQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import Chart from 'react-apexcharts';
import AuthContext from '../../context/AuthContext';
import defaultColumns from './Hunting.service';

import {
  getSpreadsheetData,
  getAllEvents,
  getPersonalBests,
  getPerformance,
} from '../../api/api';

import MapDetailCell from '../HuntingScheduleTableCells/MapDetailCell';
import mergeSpreadsheetAndPBs from '../../components/SheetOperations';
import { donutChartOptionsCharts1 } from '../Dashboard/EventsProgress';

const Hunting = () => {
  const defaultType = 'kk';
  const defaultEdition = 1;

  const { authentication } = useContext(AuthContext);

  const [tableData, setTableData] = useState(() => []);
  // eslint-disable-next-line no-unused-vars
  const [columns, setColumns] = useState(() => [...defaultColumns]);

  function selectorArrayParse(array) {
    const options = [];
    /* eslint-disable no-plusplus */
    for (let i = 0; i < array.length; i++) {
      options.push(
        <option
          key={i}
          value={array[i].type + array[i].edition}
          type={array[i].type}
          edition={array[i].edition}
        >
          {array[i].name}
        </option>
      );
    }
    /* options.push(<option key={array.length} value={array[0].edition} type={array[0].type} edition="all">All</option>) */
    return options;
  }

  const [curEventType, setCurEventType] = useState(defaultType);
  const [curEventEdition, setCurEventEdition] = useState(defaultEdition);
  const [curEventSelector, setCurEventSelector] = useState(
    curEventType + curEventEdition
  );

  const [kkArray, setKkArray] = useState([]);
  const [krArray, setKrArray] = useState([]);

  useEffect(() => {
    (async () => {
      const availableEvents = await getAllEvents();
      setKkArray(
        selectorArrayParse(
          availableEvents
            .filter(event => event.type === 'KK')
            .map(event => ({
              ...event,
              type: event.type.toLowerCase(),
              edition: event.edition,
            }))
        )
      );
      setKrArray(
        selectorArrayParse(
          availableEvents
            .filter(event => event.type === 'KR')
            .map(event => ({
              ...event,
              type: event.type.toLowerCase(),
              edition: event.edition,
            }))
        )
      );
    })();
  }, []);

  const { data: sheetData, isSuccess: sheetIsSuccess } = useQuery(
    ['maps', authentication.token],
    () =>
      getSpreadsheetData(authentication.token, curEventType, curEventEdition),
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  const { data: pbs, isSuccess: pbsIsSuccess } = useQuery(
    ['pbs'],
    () =>
      authentication.isLoggedIn
        ? getPersonalBests(authentication.token, curEventType)
        : Promise.resolve({}),
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  useEffect(() => {
    if (sheetIsSuccess && pbsIsSuccess) {
      const formattedData = mergeSpreadsheetAndPBs(sheetData, pbs);
      setTableData(formattedData);
    }
  }, [sheetData, sheetIsSuccess, pbs, pbsIsSuccess]);

  const [sorting, setSorting] = useState([]);

  const { colorMode } = useColorMode();

  const [expanded, setExpanded] = useState({});

  const table = useReactTable({
    data: tableData,
    columns,
    defaultColumn: defaultColumns,
    state: {
      sorting,
      expanded,
      columnVisibility: {
        finished: authentication.isLoggedIn,
        personalBest: authentication.isLoggedIn,
        kackyRank: authentication.isLoggedIn,
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
    getExpandedRowModel: getExpandedRowModel(),
  });

  function handleChange(event) {
    const option = event.target.selectedOptions[0];
    setCurEventType(option.getAttribute('type'));
    setCurEventEdition(Number(option.getAttribute('edition')));
    setCurEventSelector(
      option.getAttribute('type') + option.getAttribute('edition')
    );
    Promise.all([
      getSpreadsheetData(
        authentication.token,
        option.getAttribute('type'),
        option.getAttribute('edition')
      ),
      authentication.isLoggedIn
        ? getPersonalBests(authentication.token, option.getAttribute('type'))
        : Promise.resolve({}),
    ]).then(queryResults => {
      const newSheet = mergeSpreadsheetAndPBs(queryResults[0], queryResults[1]);
      setTableData(newSheet);
    });
    table.resetExpanded(false);
  }

  const tableContainerRef = useRef(null);
  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 49,
    overscan: 10,
  });

  const rowBGcolor = toggled => {
    if (toggled) {
      return colorMode === 'dark' ? 'grey' : 'lightgrey';
    }
    return colorMode;
  };

  const [kkPerfSeries, setKkPerfSeries] = useState([]);
  const [kkPerfOptions, setKkPerfOptions] = useState({});
  const [krPerfSeries, setKrPerfSeries] = useState([]);
  const [krPerfOptions, setKrPerfOptions] = useState({});

  useEffect(() => {
    if (authentication.isLoggedIn) {
      getPerformance(authentication.token, 'kk').then(performanceKK => {
        const kkseries = performanceKK.map(edition => edition.fins);
        const kkoptions = { ...donutChartOptionsCharts1 };
        kkoptions.labels = performanceKK.map(
          edition => `Kackiest Kacky #${edition.edition}`
        );
        kkoptions.colors = [
          '#93358a',
          '#e45b23',
          '#ff6800',
          '#bf9b0d',
          '#c7940b',
          '#00ff00',
          '#30b808',
          '#0d983a',
          '#d3b812',
          '#a54a10',
          '#8b0613',
        ];
        kkoptions.fill = { colors: kkoptions.colors };
        setKkPerfSeries(kkseries);
        setKkPerfOptions(kkoptions);
      });
    }
  }, [authentication.isLoggedIn, authentication.token, colorMode]);

  useEffect(() => {
    if (authentication.isLoggedIn) {
      getPerformance(authentication.token, 'kr').then(performanceKR => {
        const krseries = performanceKR.map(edition => edition.fins);
        const kroptions = { ...donutChartOptionsCharts1 };
        kroptions.labels = performanceKR.map(
          edition => `Kacky Reloaded #${edition.edition}`
        );
        kroptions.colors = ['#203db9', '#58d6c5', '#4dd033', '#c8ad16'];
        kroptions.fill = { colors: kroptions.colors };
        setKrPerfSeries(krseries);
        setKrPerfOptions(kroptions);
      });
    }
  }, [authentication.isLoggedIn, authentication.token, colorMode]);

  return (
    <Center
      mb={{ base: 24, md: 8 }}
      mt={{ base: 0, md: -8 }}
      px={{ base: 4, md: 8 }}
      w='full'
    >
      <VStack overflow='hidden' spacing={4}>
        {authentication.isLoggedIn ? (
          <Flex 
            justifyContent='space-between' 
            marginBottom='40px'
            display={{ base: 'none', md: 'flex'}}
          >
            <Chart
              options={kkPerfOptions}
              series={kkPerfSeries}
              type='donut'
              width='520'
            />
            <Chart
              options={krPerfOptions}
              series={krPerfSeries}
              type='donut'
              width='520'
            />
          </Flex>
        ) : null}
        <Flex
          flexDir={{ base: 'column', md: 'row'}}
          justifyContent={{ base: null, md: 'space-between' }}
          w='full'
          gap={ 4 }
        >
          <Button
            className='external'
            letterSpacing='0.1em'
            textShadow='glow'
            w='fit-content'
            alignSelf={{ base: 'center', md: null }}
            onClick={() =>
              window.open(
                curEventType === 'kk'
                  ? `https://kackiestkacky.com/hunting/editions/ranking.php?edition=${curEventEdition}`
                  : `https://kackyreloaded.com/hunting/editions/ranking.php?edition=${curEventEdition}`
              )
            }
          >
            Global&nbsp;
            {curEventType === 'kk' ? 'KK' : 'KR'}
            {`${curEventEdition} `}
            Hunting Stats
            {<Icon w={6} h={6} as={MdArrowOutward} />}
          </Button>
          <Flex
            flexDir={ 'row' }
            justifyContent={ 'center' }
            alignItems={ 'center' }
            gap={ 4 }
          >
            <Text
              id='labelSelectEdition'
              letterSpacing='0.1em'
              textShadow='glow'
              className='edition-text'
              display={{ base: 'none', lg: 'block' }}
            >
              Select Kacky Edition :
            </Text>
            <Text
              id='labelSelectEdition'
              letterSpacing='0.1em'
              textShadow='glow'
              className='edition-text'
              display={{ base: 'block', lg: 'none' }}
            >
              Edition
            </Text>
            <Select
              w={80}
              aria-label='labelSelectEdition'
              value={curEventSelector}
              className='edition-select'
              onChange={event => handleChange(event)}
            >
              <optgroup label='Kacky Reloaded'>{krArray}</optgroup>
              <optgroup label='Kackiest Kacky'>{kkArray}</optgroup>
            </Select>
          </Flex>
        </Flex>
        <TableContainer
          ref={tableContainerRef}
          w='container.xl'
          borderWidth='1px'
          borderRadius='md'
        >
          <Table size='sm'>
            <Thead>
              {table.getHeaderGroups().map(headerGroup => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <Th
                      key={header.id.concat('-header')}
                      colSpan={header.colSpan}
                      style={{
                        width:
                          header.id === 'finished'
                            ? 16
                            : header.id === 'difficulty' ||
                              header.id === 'number'
                            ? 100
                            : undefined,
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <Box
                          display='flex'
                          gap={2}
                          alignItems='center'
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
                  <Fragment key={row.id}>
                    <Tr
                      key={row.id.concat('-row')}
                      onClick={() => row.toggleExpanded()}
                      bg={rowBGcolor(row.getIsExpanded())}
                    >
                      {row.getVisibleCells().map(cell => (
                        <Td
                          key={cell.id.concat('-cell')}
                          background={!row.getIsExpanded()}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Td>
                      ))}
                    </Tr>
                    <Tr
                      key={row.id.concat('-collapse')}
                      display={row.getIsExpanded() ? 'relative' : 'none'}
                    >
                      <Td
                        key={row.id.concat('-collapse-elem')}
                        colSpan={table.getHeaderGroups()[0].headers.length}
                      >
                        <MapDetailCell
                          key={row.id.concat('-cell')}
                          data={row.original}
                          mode='hunting'
                          eventtype={curEventType}
                          edition={curEventEdition}
                          table={table}
                          rowIndex={row.index}
                        />
                      </Td>
                    </Tr>
                  </Fragment>
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
