import { useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';

import { updateProduct } from '../catalog.service';

import type { Product } from '../catalog.types';

type Props = {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onSuccess: () => void;
};

export function EditCatalogDialog({ open, product, onClose, onSuccess }: Props) {
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precioVenta, setPrecioVenta] = useState<number>(0);
  const [iva, setIva] = useState<number>(0);
  const [stockActual, setStockActual] = useState<number>(0);
  const [stockMinimo, setStockMinimo] = useState<number>(0);
  const [stockMaximo, setStockMaximo] = useState<number>(0);
  const [activo, setActivo] = useState(true);

  useEffect(() => {
    if (product) {
      setCodigo(product.codigo);
      setNombre(product.nombre);
      setDescripcion(product.descripcion ?? '');
      setPrecioVenta(product.precioVenta);
      setIva(product.iva);
      setStockActual(product.stockActual);
      setStockMinimo(product.stockMinimo);
      setStockMaximo(product.stockMaximo);
      setActivo(product.activo);
    }
  }, [product]);

  const handleSubmit = async () => {
    if (!product) return;

    try {
      await updateProduct(product.idProducto, {
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
    } catch (error) {
      console.error('Error actualizando producto:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Producto</DialogTitle>

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
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}