import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { updateUser } from '../users.service';

import type { User } from '../users.types';

type Props = {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onSuccess: () => void;
};

export function DeleteUserDialog({ open, user, onClose, onSuccess }: Props) {
const handleDelete = async () => {
  if (!user) return;

  await updateUser(user.id, {
    nombre: user.nombre,
    apellido: user.apellido,
    correo: user.correo,
    activo: false,
  });

  onSuccess();
  onClose();
};

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Desactivar Usuario</DialogTitle>

      <DialogContent>
        <Typography>
          ¿Deseas desactivar al usuario <strong>{user?.nombre}</strong>?
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