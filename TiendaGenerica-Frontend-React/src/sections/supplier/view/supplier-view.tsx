import type { Supplier } from 'src/modules/suppliers/suppliers.types';

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
import { getSuppliers } from 'src/modules/suppliers/suppliers.service';
import { EditSupplierDialog } from 'src/modules/suppliers/components/EditSupplierDialog';
import { CreateSupplierDialog } from 'src/modules/suppliers/components/CreateSupplierDialog';
import { DeleteSupplierDialog } from 'src/modules/suppliers/components/DeleteSupplierDialog';
import { ReactivateSupplierDialog } from 'src/modules/suppliers/components/ReactivateSupplierDialog';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { TableEmptyRows } from '../table-empty-rows';
import { SupplierTableRow } from '../supplier-table-row';
import { SupplierTableHead } from '../supplier-table-head';
import { SupplierTableToolbar } from '../supplier-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { SupplierProps } from '../supplier-table-row';

// ----------------------------------------------------------------------

export function SupplierView() {
  const table = useTable();

  const [filterName, setFilterName] = useState('');
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    const data = await getSuppliers();
    setSuppliers(data);
  };

  const dataFiltered: SupplierProps[] = applyFilter({
    inputData: suppliers,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openReactivate, setOpenReactivate] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const handleOpenEdit = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setOpenEdit(true);
  };

  const handleOpenDelete = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setOpenDelete(true);
  };

  const handleOpenReactivate = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setOpenReactivate(true);
  };

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Suppliers
        </Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => setOpenCreate(true)}
        >
          New supplier
        </Button>
      </Box>

      <Card>
        <SupplierTableToolbar
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
              <SupplierTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={suppliers.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    suppliers.map((supplier) => supplier.idProveedor.toString())
                  )
                }
                headLabel={[
                  { id: 'nit', label: 'NIT' },
                  { id: 'nombre', label: 'Nombre' },
                  { id: 'direccion', label: 'Dirección' },
                  { id: 'telefono', label: 'Teléfono' },
                  { id: 'ciudad', label: 'Ciudad' },
                  { id: 'email', label: 'Email' },
                  { id: 'activo', label: 'Estado' },
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
                    <SupplierTableRow
                      key={row.idProveedor}
                      row={row}
                      selected={table.selected.includes(row.idProveedor.toString())}
                      onSelectRow={() => table.onSelectRow(row.idProveedor.toString())}
                      onEdit={(supplier) => handleOpenEdit(supplier)}
                      onDelete={(supplier) =>
                        supplier.activo
                          ? handleOpenDelete(supplier)
                          : handleOpenReactivate(supplier)
                      }
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(
                    table.page,
                    table.rowsPerPage,
                    suppliers.length
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
          count={suppliers.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>

      <CreateSupplierDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSuccess={loadSuppliers}
      />

      <EditSupplierDialog
        open={openEdit}
        provider={selectedSupplier}
        onClose={() => setOpenEdit(false)}
        onSuccess={loadSuppliers}
      />

      <DeleteSupplierDialog
        open={openDelete}
        supplier={selectedSupplier}
        onClose={() => setOpenDelete(false)}
        onSuccess={loadSuppliers}
      />

      <ReactivateSupplierDialog
        open={openReactivate}
        provider={selectedSupplier}
        onClose={() => setOpenReactivate(false)}
        onSuccess={loadSuppliers}
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
