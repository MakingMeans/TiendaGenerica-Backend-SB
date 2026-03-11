export type Supplier = {
  idProveedor: number;
  nit: string;
  nombre: string;
  direccion: string;
  telefono: string;
  ciudad: string;
  email: string;
  activo: boolean;
};

export type CreateSupplierDTO = Omit<Supplier, 'idProveedor'>;
export type UpdateSupplierDTO = Partial<CreateSupplierDTO>;