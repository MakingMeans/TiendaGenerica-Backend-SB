import type { Supplier } from 'src/modules/suppliers/suppliers.types';

import { useState, useEffect } from 'react';

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

import { getActiveProviders } from 'src/modules/suppliers/suppliers.service';

import { Iconify } from 'src/components/iconify';

import { createBuy } from '../buy.service';

type Detail = {
  codigoProducto: string;
  cantidad: number;
  precioUnitario: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export function CreateBuyDialog({ open, onClose, onSuccess }: Props) {
  const [idProveedor, setIdProveedor] = useState<number | ''>('');
  const [detalles, setDetalles] = useState<Detail[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
  loadProviders();
}, []);

const loadProviders = async () => {
  const data = await getActiveProviders();
  setSuppliers(data);
};

  const handleAddDetail = () => {
  setDetalles([
    ...detalles,
    { codigoProducto: '', cantidad: 1, precioUnitario: 0 },
  ]);
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

  const handleSubmit = async () => {
    if (idProveedor === '') return;
    await createBuy({
    idProveedor: Number(idProveedor),
    detalles,
  });

    onSuccess();
    onClose();

    // reset
    setIdProveedor('');
    setDetalles([]);
  };

  const totalCompra = detalles.reduce(
    (acc, d) => acc + d.cantidad * d.precioUnitario,
    0
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Crear Compra</DialogTitle>

      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
      >
        <FormControl fullWidth>
  <InputLabel>Proveedor</InputLabel>

  <Select
  value={idProveedor}
  label="Proveedor"
  onChange={(e) => {
    const value = e.target.value;
    setIdProveedor(value === '' ? '' : Number(value));
  }}
>
  <MenuItem value="">
    <em>Seleccionar proveedor</em>
  </MenuItem>

 {suppliers.map((supplier) => (
  <MenuItem key={supplier.idProveedor} value={supplier.idProveedor}>
    {supplier.nit} - {supplier.nombre}
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
    handleChangeDetail(
      index,
      'codigoProducto',
      e.target.value
    )
  }
/>

            <TextField
              label="Cantidad"
              type="number"
              value={detalle.cantidad}
              onChange={(e) =>
                handleChangeDetail(
                  index,
                  'cantidad',
                  Number(e.target.value)
                )
              }
            />

            <TextField
              label="Precio Unitario"
              type="number"
              value={detalle.precioUnitario}
              onChange={(e) =>
                handleChangeDetail(
                  index,
                  'precioUnitario',
                  Number(e.target.value)
                )
              }
            />

            <Typography sx={{ minWidth: 80 }}>
              ${detalle.cantidad * detalle.precioUnitario}
            </Typography>

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

        <Typography variant="h6">Total: ${totalCompra}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>

        <Button variant="contained" onClick={handleSubmit}>
          Crear Compra
        </Button>
      </DialogActions>
    </Dialog>
  );
}