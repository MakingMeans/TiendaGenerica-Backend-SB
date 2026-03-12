import type { Sale } from 'src/modules/sales/sales.types';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { DashboardContent } from 'src/layouts/dashboard';
import { getSales } from 'src/modules/sales/sales.service';
import { CreateSaleDialog } from 'src/modules/sales/components/CreateSalesDialog';
import { DeleteSaleDialog } from 'src/modules/sales/components/DeleteSalesDialog';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { SaleTableRow } from '../sale-table-row';
import { SaleTableHead } from '../sale-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { SaleTableToolbar } from '../sale-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { SaleRowProps } from '../sale-table-row';

// ----------------------------------------------------------------------

export function SalesView() {
  const table = useTable();

  const [filterName, setFilterName] = useState('');
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    const data = await getSales();
    setSales(data);
  };

  const dataFiltered: SaleRowProps[] = applyFilter({
    inputData: sales,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenDelete = (sale: Sale) => {
    setSelectedSale(sale);
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
          Ventas
        </Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => setOpenCreate(true)}
        >
          Nueva venta
        </Button>
      </Box>

      <Card>
        <SaleTableToolbar
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
              <SaleTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={sales.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    sales.map((sale) => sale.idVenta.toString())
                  )
                }
                headLabel={[
                  { id: 'numeroVenta', label: 'Número' },
                  { id: 'idCliente', label: 'Cliente' },
                  { id: 'fecha', label: 'Fecha' },
                  { id: 'totalFinal', label: 'Total (COP)' },
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
                    <SaleTableRow
                      key={row.idVenta}
                      row={row}
                      selected={table.selected.includes(
                        row.idVenta.toString()
                      )}
                      onSelectRow={() =>
                        table.onSelectRow(row.idVenta.toString())
                      }
                      onDelete={(sale) => handleOpenDelete(sale)}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(
                    table.page,
                    table.rowsPerPage,
                    sales.length
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
          count={sales.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>

      <CreateSaleDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSuccess={loadSales}
      />

      <DeleteSaleDialog
        open={openDelete}
        sale={selectedSale}
        onClose={() => setOpenDelete(false)}
        onSuccess={loadSales}
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
