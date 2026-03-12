import type { Buy } from 'src/modules/buy/buy.types';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { getBuys } from 'src/modules/buy/buy.service';
import { DashboardContent } from 'src/layouts/dashboard';
import { CreateBuyDialog } from 'src/modules/buy/components/CreateBuyDialog';
import { DeleteBuyDialog } from 'src/modules/buy/components/DeleteBuyDialog';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { BuyTableRow } from '../buy-table-row';
import { BuyTableHead } from '../buy-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { BuyTableToolbar } from '../buy-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { BuyRowProps } from '../buy-table-row';

// ----------------------------------------------------------------------

export function BuyView() {
  const table = useTable();

  const [filterName, setFilterName] = useState('');
  const [buys, setBuys] = useState<Buy[]>([]);

  useEffect(() => {
    loadBuys();
  }, []);

  const loadBuys = async () => {
    const data = await getBuys();
    setBuys(data);
  };

  const dataFiltered: BuyRowProps[] = applyFilter({
    inputData: buys,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const [selectedBuy, setSelectedBuy] = useState<Buy | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenDelete = (buy: Buy) => {
    setSelectedBuy(buy);
    setOpenDelete(true);
  };

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Compras
        </Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => setOpenCreate(true)}
        >
          Nueva compra
        </Button>
      </Box>

      <Card>
        <BuyTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <BuyTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={buys.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    buys.map((buy) => buy.idCompra.toString())
                  )
                }
                headLabel={[
                  { id: 'numeroCompra', label: 'Número' },
                  { id: 'idProveedor', label: 'Proveedor' },
                  { id: 'fecha', label: 'Fecha' },
                  { id: 'total', label: 'Total' },
                  { id: 'estado', label: 'Estado' },
                  { id: '' },
                ]}
              />

              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <BuyTableRow
                      key={row.idCompra}
                      row={row}
                      selected={table.selected.includes(
                        row.idCompra.toString()
                      )}
                      onSelectRow={() =>
                        table.onSelectRow(row.idCompra.toString())
                      }
                      onDelete={(buy) => handleOpenDelete(buy)}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(
                    table.page,
                    table.rowsPerPage,
                    buys.length
                  )}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={buys.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>

      <CreateBuyDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSuccess={loadBuys}
      />

      <DeleteBuyDialog
        open={openDelete}
        buy={selectedBuy}
        onClose={() => setOpenDelete(false)}
        onSuccess={loadBuys}
      />
    </DashboardContent>
  );
}

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
