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
  provider: Supplier | null;
  onClose: () => void;
  onSuccess: () => void;
};

export function ReactivateSupplierDialog({
  open,
  provider,
  onClose,
  onSuccess,
}: Props) {
  const handleReactivate = async () => {
    if (!provider) return;

    await updateSupplier(provider.idProveedor, {
      nit: provider.nit,
      nombre: provider.nombre,
      direccion: provider.direccion,
      telefono: provider.telefono,
      ciudad: provider.ciudad,
      email: provider.email,
      activo: true,
    });

    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reactivar Proveedor</DialogTitle>

      <DialogContent>
        <Typography>
          ¿Deseas reactivar al proveedor{' '}
          <strong>{provider?.nombre}</strong>?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button color="success" variant="contained" onClick={handleReactivate}>
          Reactivar
        </Button>
      </DialogActions>
    </Dialog>
  );
}