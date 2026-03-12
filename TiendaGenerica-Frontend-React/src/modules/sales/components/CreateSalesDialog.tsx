import type { Client } from 'src/modules/clients/clients.types';

import { useState , useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { getActiveClients } from 'src/modules/clients/clients.service';

import { Iconify } from 'src/components/iconify';

import { createSale } from '../sales.service';

type Detail = {
  codigoProducto: string;
  cantidad: number;
};

type Payment = {
  idMetodo: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export function CreateSaleDialog({ open, onClose, onSuccess }: Props) {
  const [idCliente, setIdCliente] = useState<number | ''>('');
  const [detalles, setDetalles] = useState<Detail[]>([]);
  const [pagos, setPagos] = useState<Payment[]>([{ idMetodo: 1 }]);

  const handleAddDetail = () => {
    setDetalles([...detalles, { codigoProducto: '', cantidad: 1 }]);
  };

  const handleRemoveDetail = (index: number) => {
    setDetalles(detalles.filter((_, i) => i !== index));
  };

  const handleChangeDetail = (
    index: number,
    field: keyof Detail,
    value: string | number
  ) => {
    const updated = [...detalles];
    updated[index] = { ...updated[index], [field]: value };
    setDetalles(updated);
  };

  const getUserFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  };

  const handleSubmit = async () => {
    if (idCliente === '') return;

    const user = getUserFromToken();
    const idUsuario = user?.userId;

    await createSale({
      idCliente: Number(idCliente),
      idUsuario,
      detalles,
      pagos,
    });

    onSuccess();
    onClose();

    setIdCliente('');
    setDetalles([]);
  };

    useEffect(() => {
    loadClients();
  }, []);

  const [clients, setClients] = useState<Client[]>([]);

  const loadClients = async () => {
    const data = await getActiveClients();
    setClients(data);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Crear Venta</DialogTitle>

      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
      >
        <FormControl fullWidth>
  <InputLabel>Cliente</InputLabel>

  <Select
    value={idCliente}
    label="Cliente"
    onChange={(e) => {
      const value = e.target.value;
      setIdCliente(value === '' ? '' : Number(value));
    }}
  >
    <MenuItem value="">
      <em>Seleccionar cliente</em>
    </MenuItem>

    {clients.map((client) => (
      <MenuItem key={client.idCliente} value={client.idCliente}>
        {client.cedula} - {client.nombre} {client.apellido}
      </MenuItem>
    ))}
  </Select>
</FormControl>
        <Typography variant="subtitle1">Detalles</Typography>

        {detalles.map((detalle, index) => (
          <div
            key={index}
            style={{ display: 'flex', gap: 10, alignItems: 'center' }}
          >
            <TextField
              label="Código Producto"
              value={detalle.codigoProducto}
              onChange={(e) =>
                handleChangeDetail(index, 'codigoProducto', e.target.value)
              }
            />

            <TextField
              label="Cantidad"
              type="number"
              value={detalle.cantidad}
              onChange={(e) =>
                handleChangeDetail(index, 'cantidad', Number(e.target.value))
              }
            />

            <IconButton onClick={() => handleRemoveDetail(index)}>
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>
          </div>
        ))}

        <Button
          variant="outlined"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleAddDetail}
        >
          Agregar producto
        </Button>

        <FormControl fullWidth>
          <InputLabel>Método de pago</InputLabel>
          <Select
            value={pagos[0].idMetodo}
            label="Método de pago"
            onChange={(e) =>
              setPagos([{ idMetodo: Number(e.target.value) }])
            }
          >
            <MenuItem value={1}>Efectivo</MenuItem>
            <MenuItem value={2}>Tarjeta</MenuItem>
            <MenuItem value={3}>Transferencia</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>

        <Button variant="contained" onClick={handleSubmit}>
          Crear Venta
        </Button>
      </DialogActions>
    </Dialog>
  );
}