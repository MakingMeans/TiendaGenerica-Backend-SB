import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';

import { createSupplier } from '../suppliers.service';

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export function CreateSupplierDialog({ open, onClose, onSuccess }: Props) {
  const [nit, setNit] = useState('');
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [email, setEmail] = useState('');
  const [activo, setActivo] = useState(true);

  const handleSubmit = async () => {
    await createSupplier({
      nit,
      nombre,
      direccion,
      telefono,
      ciudad,
      email,
      activo,
    });

    onSuccess();
    onClose();

    // reset
    setNit('');
    setNombre('');
    setDireccion('');
    setTelefono('');
    setCiudad('');
    setEmail('');
    setActivo(true);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Crear Proveedor</DialogTitle>

      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
      >
        <TextField
          label="NIT"
          value={nit}
          onChange={(e) => setNit(e.target.value)}
          fullWidth
        />

        <TextField
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
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
          label="Ciudad"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
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
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
}