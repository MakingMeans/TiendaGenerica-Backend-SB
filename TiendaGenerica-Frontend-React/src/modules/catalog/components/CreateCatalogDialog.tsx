import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';

import { createProduct } from '../catalog.service';

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export function CreateCatalogDialog({ open, onClose, onSuccess }: Props) {
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precioVenta, setPrecioVenta] = useState<number>(0);
  const [iva, setIva] = useState<number>(19);
  const [stockActual, setStockActual] = useState<number>(0);
  const [stockMinimo, setStockMinimo] = useState<number>(0);
  const [stockMaximo, setStockMaximo] = useState<number>(0);
  const [activo, setActivo] = useState(true);

  const handleSubmit = async () => {
    await createProduct({
      codigo,
      nombre,
      descripcion,
      precioVenta,
      iva,
      stockActual,
      stockMinimo,
      stockMaximo,
      activo,
    });

    onSuccess();
    onClose();

    // reset
    setCodigo('');
    setNombre('');
    setDescripcion('');
    setPrecioVenta(0);
    setIva(19);
    setStockActual(0);
    setStockMinimo(0);
    setStockMaximo(0);
    setActivo(true);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Crear Producto</DialogTitle>

      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
      >
        <TextField
          label="Código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          fullWidth
        />

        <TextField
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
        />

        <TextField
          label="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          fullWidth
        />

        <TextField
          label="Precio de Venta"
          type="number"
          value={precioVenta}
          onChange={(e) => setPrecioVenta(Number(e.target.value))}
          fullWidth
        />

        <TextField
          label="IVA (%)"
          type="number"
          value={iva}
          onChange={(e) => setIva(Number(e.target.value))}
          fullWidth
        />

        <TextField
          label="Stock Actual"
          type="number"
          value={stockActual}
          onChange={(e) => setStockActual(Number(e.target.value))}
          fullWidth
        />

        <TextField
          label="Stock Mínimo"
          type="number"
          value={stockMinimo}
          onChange={(e) => setStockMinimo(Number(e.target.value))}
          fullWidth
        />

        <TextField
          label="Stock Máximo"
          type="number"
          value={stockMaximo}
          onChange={(e) => setStockMaximo(Number(e.target.value))}
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