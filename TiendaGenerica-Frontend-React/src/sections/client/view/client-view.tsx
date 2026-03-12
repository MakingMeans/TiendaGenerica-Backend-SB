import type { Client } from 'src/modules/clients/clients.types';

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
import { getClients } from 'src/modules/clients/clients.service';
import { EditClientDialog } from 'src/modules/clients/components/EditClientDialog';
import { CreateClientDialog } from 'src/modules/clients/components/CreateClientDialog';
import { DeleteClientDialog } from 'src/modules/clients/components/DeleteClientDialog';
import { ReactivateClientDialog } from 'src/modules/clients/components/ReactivateClientDialog';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { ClientTableRow } from '../client-table-row';
import { TableEmptyRows } from '../table-empty-rows';
import { ClientTableHead } from '../client-table-head';
import { ClientTableToolbar } from '../client-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils1';

import type { ClientProps } from '../client-table-row';

// ----------------------------------------------------------------------

export function ClientView() {
  const table = useTable();

  const [filterName, setFilterName] = useState('');
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    const data = await getClients();
    setClients(data);
  };

  const dataFiltered: ClientProps[] = applyFilter({
    inputData: clients,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openReactivate, setOpenReactivate] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const handleOpenEdit = (client: Client) => {
    setSelectedClient(client);
    setOpenEdit(true);
  };

  const handleOpenDelete = (client: Client) => {
    setSelectedClient(client);
    setOpenDelete(true);
  };

  const handleOpenReactivate = (client: Client) => {
    setSelectedClient(client);
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
          Clients
        </Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => setOpenCreate(true)}
        >
          New client
        </Button>
      </Box>

      <Card>
        <ClientTableToolbar
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
              <ClientTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={clients.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    clients.map((client) => client.idCliente.toString())
                  )
                }
                headLabel={[
  { id: 'cedula', label: 'Cédula' },
  { id: 'nombre', label: 'Nombre' },
  { id: 'apellido', label: 'Apellido' },
  { id: 'direccion', label: 'Dirección' },
  { id: 'telefono', label: 'Teléfono' },
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
                    <ClientTableRow
                      key={row.idCliente}
                      row={row}
                      selected={table.selected.includes(row.idCliente.toString())}
                      onSelectRow={() => table.onSelectRow(row.idCliente.toString())}
                      onEdit={(client) => handleOpenEdit(client)}
                      onDelete={(client) =>
                        client.activo
                          ? handleOpenDelete(client)
                          : handleOpenReactivate(client)
                      }
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, clients.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={clients.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>

      <CreateClientDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSuccess={loadClients}
      />

      <EditClientDialog
        open={openEdit}
        client={selectedClient}
        onClose={() => setOpenEdit(false)}
        onSuccess={loadClients}
      />

      <DeleteClientDialog
        open={openDelete}
        client={selectedClient}
        onClose={() => setOpenDelete(false)}
        onSuccess={loadClients}
      />

      <ReactivateClientDialog
        open={openReactivate}
        client={selectedClient}
        onClose={() => setOpenReactivate(false)}
        onSuccess={loadClients}
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
