import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  useSortBy,
} from '@tanstack/react-table';
import { Box, Icon, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorMode } from '@chakra-ui/react';
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';
import { useVirtualizer } from '@tanstack/react-virtual';
import PropTypes from 'prop-types';
import AuthContext from '../../context/AuthContext';
import defaultColumns from '../WRHolders/WRHolders.service';
import { getWRHolderLeaderboard } from '../../api/api';

const WRTable = ({eventtype}) => {
  const { colorMode } = useColorMode();
  const { authentication } = useContext(AuthContext);

  const [tableData, setTableData] = useState(() => []);
  // eslint-disable-next-line no-unused-vars
  const [columns, setColumns] = useState(() => [...defaultColumns]);

  const [kkData, setKkData] = useState(null);

  useEffect(() => {
    setKkData(null);
    getWRHolderLeaderboard(authentication.token, eventtype)
      .then(response=>{
        setKkData(response)
      })
  }, [authentication.token, eventtype]);

  useEffect(() => {
    const board = [];
    if (kkData === null || kkData === undefined) {
      return;
    }
    let rank = 0;
    let count = 0;
    let lastScore = null;
    kkData.forEach(entry => {
      const row = {
        rank: null,
        wrs: entry.nwrs,
        nickname: entry.nickname !== "" ? entry.nickname : entry.login,
        login: entry.login,
      };
      if (lastScore === null || lastScore !== entry.nwrs) {
        rank += count + 1;
        count = 0;
        row.rank = rank;
        lastScore = entry.nwrs;
      } else {
        count += 1;
        row.rank = rank;
      }
      board.push(row);
    })
    setTableData(board);
    console.log(board);
  }, [kkData]);

  const [sorting, setSorting] = useState([]);

  const tableKK = useReactTable({
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
  const { rows } = tableKK.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 49,
    overscan: 10,
  });

  return (
    <TableContainer
      ref={tableContainerRef}
      w="container.sm"
      borderWidth="1px"
      borderRadius="md"
    >
      <Table size="sm">
        <Thead>
          {tableKK.getHeaderGroups().map(headerGroup => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <Th
                  key={header.id}
                  colSpan={header.colSpan}
                >
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
        <Tbody
          background={colorMode === 'dark' ? '#3e3d3e' : '#ebebeb'}
        >
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
  )
}

WRTable.propTypes = {
  eventtype: PropTypes.oneOf(["kk", "kr"]).isRequired,
}

export default WRTable;