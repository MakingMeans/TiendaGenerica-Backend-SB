import type { User } from 'src/modules/users/users.types';

import { useState, useCallback } from 'react';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Label } from 'src/components/label';
// ----------------------------------------------------------------------
import { Iconify } from 'src/components/iconify';

export type UserProps = User;

type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
  onEdit: (user: UserProps) => void;
  onDelete: (user: UserProps) => void;
};

export function UserTableRow({
  row,
  selected,
  onSelectRow,
  onEdit,
  onDelete,
}: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  return (
    <>
      <TableRow
  hover
  tabIndex={-1}
  selected={selected}
  sx={{
    opacity: row.activo ? 1 : 0.5,
    backgroundColor: row.activo ? 'inherit' : 'grey.100',
  }}
>
  <TableCell padding="checkbox">
    <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
  </TableCell>

  <TableCell>{row.cedula}</TableCell>
  <TableCell>{row.nombre}</TableCell>
  <TableCell>{row.apellido}</TableCell>
  <TableCell>{row.correo}</TableCell>
  <TableCell>{row.username}</TableCell>

  <TableCell>
    <Label color={row.activo ? 'success' : 'error'}>
      {row.activo ? 'Activo' : 'Inactivo'}
    </Label>
  </TableCell>

  <TableCell align="right">
    <IconButton onClick={handleOpenPopover}>
      <Iconify icon="eva:more-vertical-fill" />
    </IconButton>
  </TableCell>
</TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem
  onClick={() => {
    handleClosePopover();
    onEdit(row);
  }}
>
            <Iconify icon="solar:pen-bold" />
            Editar
          </MenuItem>

          <MenuItem
  onClick={() => {
    handleClosePopover();
    onDelete(row);
  }}
  sx={{ color: row.activo ? 'error.main' : 'success.main' }}
>
  <Iconify
    icon={
      row.activo
        ? 'solar:trash-bin-trash-bold'
        : 'solar:check-circle-bold'
    }
  />
  {row.activo ? 'Desactivar' : 'Reactivar'}
</MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
