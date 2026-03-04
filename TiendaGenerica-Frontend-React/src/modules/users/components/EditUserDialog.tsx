import { useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';

import { updateUser, updateUserRoles } from '../users.service';

import type { User } from '../users.types';

type Props = {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onSuccess: () => void;
};

const availableRoles = [
  'ROLE_ADMIN',
  'ROLE_GERENTE',
  'ROLE_CAJERO',
  'ROLE_INVENTARIO',
  'ROLE_USER',
];

export function EditUserDialog({ open, user, onClose, onSuccess }: Props) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [username, setUsername] = useState('');
  const [activo, setActivo] = useState(true);
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      setNombre(user.nombre);
      setApellido(user.apellido);
      setCorreo(user.correo);
      setUsername(user.username);
      setActivo(user.activo);
      setRoles(user.roles || []);
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!user) return;

    try {
      // 1️⃣ Actualizar datos básicos
      await updateUser(user.id, {
        nombre,
        apellido,
        correo,
        username,
        activo,
      });

      // 2️⃣ Solo actualizar roles si cambiaron
      const rolesChanged =
        JSON.stringify(roles.sort()) !==
        JSON.stringify((user.roles || []).sort());

      if (rolesChanged) {
        await updateUserRoles(user.id, roles);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error actualizando usuario:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Usuario</DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
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
          label="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          fullWidth
        />

        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />

        {/* 🔥 MULTI ROLE SELECT */}
        <FormControl fullWidth>
          <InputLabel>Roles</InputLabel>
          <Select
            multiple
            value={roles}
            label="Roles"
            onChange={(e) =>
              setRoles(
                typeof e.target.value === 'string'
                  ? e.target.value.split(',')
                  : e.target.value
              )
            }
            renderValue={(selected) =>
              selected
                .map((role) => role.replace('ROLE_', ''))
                .join(', ')
            }
          >
            {availableRoles.map((role) => (
              <MenuItem key={role} value={role}>
                <Checkbox checked={roles.includes(role)} />
                <ListItemText primary={role.replace('ROLE_', '')} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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