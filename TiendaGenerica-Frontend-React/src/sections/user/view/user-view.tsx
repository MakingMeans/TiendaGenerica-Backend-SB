import type { User } from 'src/modules/users/users.types';

import { useState , useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { DashboardContent } from 'src/layouts/dashboard';
import { getUsers } from 'src/modules/users/users.service';
import { EditUserDialog } from 'src/modules/users/components/EditUserDialog';
import { CreateUserDialog } from 'src/modules/users/components/CreateUserDialog';
import { DeleteUserDialog } from 'src/modules/users/components/DeleteUserDialog';
import { ReactivateUserDialog } from 'src/modules/users/components/ReactivateUserDialog';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { UserProps } from '../user-table-row';

// ----------------------------------------------------------------------

export function UserView() {
  const table = useTable();

  const [filterName, setFilterName] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
  loadUsers();
}, []);

const loadUsers = async () => {
  const data = await getUsers();
  setUsers(data);
};
  const dataFiltered: UserProps[] = applyFilter({
    inputData: users,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  

const [selectedUser, setSelectedUser] = useState<User | null>(null);
const [openEdit, setOpenEdit] = useState(false);
const [openDelete, setOpenDelete] = useState(false);
const [openCreate, setOpenCreate] = useState(false);


const handleOpenEdit = (user: User) => {
  setSelectedUser(user);
  setOpenEdit(true);
};

const handleOpenDelete = (user: User) => {
  setSelectedUser(user);
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
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Users
        </Typography>
        <Button
  variant="contained"
  color="inherit"
  startIcon={<Iconify icon="mingcute:add-line" />}
  onClick={() => setOpenCreate(true)}
>
  New user
</Button>
      </Box>

      <Card>
        <UserTableToolbar
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
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={users.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    users.map((user) => user.id.toString())
                  )
                }
                headLabel={[
  { id: 'cedula', label: 'Cédula' },
  { id: 'nombre', label: 'Nombre' },
  { id: 'apellido', label: 'Apellido' },
  { id: 'correo', label: 'Correo' },
  { id: 'username', label: 'Username' },
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
                    <UserTableRow
  key={row.id}
  row={row}
  selected={table.selected.includes(row.id.toString())}
  onSelectRow={() => table.onSelectRow(row.id.toString())}
  onEdit={(user) => handleOpenEdit(user)}
  onDelete={(user) => handleOpenDelete(user)}
/>
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, users.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={users.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
      <CreateUserDialog
  open={openCreate}
  onClose={() => setOpenCreate(false)}
  onSuccess={loadUsers}
/>
<EditUserDialog
  open={openEdit}
  user={selectedUser}
  onClose={() => setOpenEdit(false)}
  onSuccess={loadUsers}
/>

<DeleteUserDialog
  open={openDelete}
  user={selectedUser}
  onClose={() => setOpenDelete(false)}
  onSuccess={loadUsers}
/>

<ReactivateUserDialog
  open={openDelete}
  user={selectedUser}
  onClose={() => setOpenDelete(false)}
  onSuccess={loadUsers}
/>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

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
