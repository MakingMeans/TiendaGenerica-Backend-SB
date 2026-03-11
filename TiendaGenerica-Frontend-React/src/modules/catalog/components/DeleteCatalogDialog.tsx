import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { deleteProduct } from '../catalog.service';

import type { Product } from '../catalog.types';

type Props = {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onSuccess: () => void;
};

export function DeleteCatalogDialog({
  open,
  product,
  onClose,
  onSuccess,
}: Props) {
  const handleDelete = async () => {
    if (!product) return;

    await deleteProduct(product.idProducto);

    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Desactivar Producto</DialogTitle>

      <DialogContent>
        <Typography>
          ¿Deseas desactivar el producto{' '}
          <strong>{product?.nombre}</strong>?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button color="error" variant="contained" onClick={handleDelete}>
          Desactivar
        </Button>
      </DialogActions>
    </Dialog>
  );
}