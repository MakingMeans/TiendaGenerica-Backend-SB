import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { updateSupplier } from '../suppliers.service';

import type { Supplier } from '../suppliers.types';

type Props = {
  open: boolean;
  supplier: Supplier | null;
  onClose: () => void;
  onSuccess: () => void;
};

export function DeleteSupplierDialog({
  open,
  supplier,
  onClose,
  onSuccess,
}: Props) {
  const handleDelete = async () => {
    if (!supplier) return;

    await updateSupplier(supplier.idProveedor, {
      nit: supplier.nit,
      nombre: supplier.nombre,
      direccion: supplier.direccion,
      telefono: supplier.telefono,
      ciudad: supplier.ciudad,
      email: supplier.email,
      activo: false,
    });

    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Desactivar Proveedor</DialogTitle>

      <DialogContent>
        <Typography>
          ¿Deseas desactivar al proveedor{' '}
          <strong>{supplier?.nombre}</strong>?
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