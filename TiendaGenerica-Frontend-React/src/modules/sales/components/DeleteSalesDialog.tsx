import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { deleteSale } from '../sales.service';

import type { Sale } from '../sales.types';

type Props = {
  open: boolean;
  sale: Sale | null;
  onClose: () => void;
  onSuccess: () => void;
};

export function DeleteSaleDialog({ open, sale, onClose, onSuccess }: Props) {
  const handleDelete = async () => {
    if (!sale) return;

    await deleteSale(sale.idVenta);

    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Eliminar Venta</DialogTitle>

      <DialogContent>
        <Typography>
          ¿Seguro que deseas eliminar la venta {sale?.numeroVenta}?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>

        <Button color="error" variant="contained" onClick={handleDelete}>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}