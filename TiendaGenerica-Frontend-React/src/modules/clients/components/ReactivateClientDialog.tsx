import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { updateClient } from '../clients.service';

import type { Client } from '../clients.types';

type Props = {
  open: boolean;
  client: Client | null;
  onClose: () => void;
  onSuccess: () => void;
};

export function ReactivateClientDialog({
  open,
  client,
  onClose,
  onSuccess,
}: Props) {
  const handleReactivate = async () => {
    if (!client) return;

    await updateClient(client.idCliente, {
      cedula: client.cedula,
      nombre: client.nombre,
      apellido: client.apellido,
      direccion: client.direccion,
      telefono: client.telefono,
      email: client.email,
      activo: true,
    });

    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reactivar Cliente</DialogTitle>

      <DialogContent>
        <Typography>
          ¿Deseas reactivar al cliente{' '}
          <strong>
            {client?.nombre} {client?.apellido}
          </strong>
          ?
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