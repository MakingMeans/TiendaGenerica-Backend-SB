import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { uploadCatalogCsv } from '../catalog.service';

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export function UploadCsvDialog({ open, onClose, onSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      await uploadCatalogCsv(file);
      onSuccess(); // recargar productos
      onClose();
      setFile(null);
    } catch (error) {
      console.error('Error subiendo CSV:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Subir catálogo desde CSV</DialogTitle>

      <DialogContent>
        <Typography sx={{ mb: 2 }}>
          Selecciona un archivo CSV para importar productos al catálogo.
        </Typography>

        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!file}
        >
          Subir
        </Button>
      </DialogActions>
    </Dialog>
  );
}