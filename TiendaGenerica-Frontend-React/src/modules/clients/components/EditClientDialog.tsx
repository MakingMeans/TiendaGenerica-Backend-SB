import { useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';

import { updateClient } from '../clients.service';

import type { Client } from '../clients.types';

type Props = {
  open: boolean;
  client: Client | null;
  onClose: () => void;
  onSuccess: () => void;
};

export function EditClientDialog({ open, client, onClose, onSuccess }: Props) {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [activo, setActivo] = useState(true);

  useEffect(() => {
    if (client) {
      setCedula(client.cedula);
      setNombre(client.nombre);
      setApellido(client.apellido);
      setDireccion(client.direccion);
      setTelefono(client.telefono);
      setEmail(client.email);
      setActivo(client.activo);
    }
  }, [client]);

  const handleSubmit = async () => {
    if (!client) return;

    try {
      await updateClient(client.idCliente, {
        cedula,
        nombre,
        apellido,
        direccion,
        telefono,
        email,
        activo,
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error actualizando cliente:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Cliente</DialogTitle>

      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
      >
        <TextField
          label="Cédula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          fullWidth
        />

        <TextField
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
        />

        <TextField
          label="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          fullWidth
        />

        <TextField
          label="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          fullWidth
        />

        <TextField
          label="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          fullWidth
        />

        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />

        <FormControlLabel
          control={
            <Switch
              checked={activo}
              onChange={(e) => setActivo(e.target.checked)}
            />
          }
          label="Activo"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}