import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { deleteBuy } from '../buy.service';

import type { Buy } from '../buy.types';

type Props = {
  open: boolean;
  buy: Buy | null;
  onClose: () => void;
  onSuccess: () => void;
};

export function DeleteBuyDialog({ open, buy, onClose, onSuccess }: Props) {
  const handleDelete = async () => {
    if (!buy) return;

    await deleteBuy(buy.idCompra);

    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Eliminar Compra</DialogTitle>

      <DialogContent>
        <Typography>
          ¿Seguro que deseas eliminar la compra {buy?.numeroCompra}?
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