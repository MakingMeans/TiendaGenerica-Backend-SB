import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';

import { createUser } from '../users.service';

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export function CreateUserDialog({ open, onClose, onSuccess }: Props) {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activo, setActivo] = useState(true);
  const [rol, setRol] = useState('CLIENTE'); // 👈 nuevo estado

  const availableRoles = [
  "ROLE_ADMIN",
  "ROLE_GERENTE",
  "ROLE_CAJERO",
  "ROLE_INVENTARIO",
  "ROLE_USER"
];
  const handleSubmit = async () => {
    await createUser({
  cedula,
  nombre,
  apellido,
  correo,
  username,
  password,
  roles: [rol],
});

    onSuccess();
    onClose();

    // reset
    setCedula('');
    setNombre('');
    setApellido('');
    setCorreo('');
    setUsername('');
    setPassword('');
    setActivo(true);
    setRol('CLIENTE');
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Crear Usuario</DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <TextField label="Cédula" value={cedula} onChange={(e) => setCedula(e.target.value)} fullWidth />
        <TextField label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} fullWidth />
        <TextField label="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} fullWidth />
        <TextField label="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} fullWidth />
        <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

        {/* 🔥 SELECT DE ROLES */}
        <FormControl fullWidth>
  <InputLabel>Rol</InputLabel>
  <Select
    value={rol}
    label="Rol"
    onChange={(e) => setRol(e.target.value)}
  >
    {availableRoles.map((role) => (
      <MenuItem key={role} value={role}>
        {role.replace("ROLE_", "")}
      </MenuItem>
    ))}
  </Select>
</FormControl>

        <FormControlLabel
          control={<Switch checked={activo} onChange={(e) => setActivo(e.target.checked)} />}
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