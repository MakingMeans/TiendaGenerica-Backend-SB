import type { Buy } from 'src/modules/buy/buy.types';

import { useState, useCallback } from 'react';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// 👇 ESTE ES EL QUE FALTABA
export type BuyRowProps = Buy;

type Props = {
  row: BuyRowProps;
  selected: boolean;
  onSelectRow: () => void;
  onDelete: (buy: BuyRowProps) => void;
};

export function BuyTableRow({ row, selected, onSelectRow, onDelete }: Props) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpenPopover(event.currentTarget);
    },
    []
  );

  const handleClosePopover = () => setOpenPopover(null);

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell>{row.numeroCompra}</TableCell>
        <TableCell>{row.idProveedor}</TableCell>
        <TableCell>{new Date(row.fecha).toLocaleString()}</TableCell>
        <TableCell>${row.total}</TableCell>

        <TableCell>
          <Label color="info">{row.estado}</Label>
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
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              handleClosePopover();
              onDelete(row);
            }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Eliminar
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}